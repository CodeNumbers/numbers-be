import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PosterDto } from './posters.dto';
import { Poster } from '../common/entities/poster.entity';
import { ChoseongFilterMap } from 'src/common/config/query-parameters';
import { MusicalsService } from 'src/musicals/musicals.service';

@Injectable()
export class PostersService {
  constructor(
    @InjectRepository(Poster)
    private postersRepository: Repository<Poster>,
    private musicalsService: MusicalsService,
  ) {}

  async findPostersByMode(mode: string, limit: number): Promise<PosterDto[]> {
    if (mode === 'random') {
      const posters = await this.postersRepository
        .createQueryBuilder('poster')
        .select(['musical.id', 'musical.title', 'poster.imageUrl'])
        .leftJoin('poster.musical', 'musical')
        .orderBy('RAND()')
        .limit(limit)
        .getMany();
      return posters.map((poster) => new PosterDto(poster));
    } else {
      // Based on views
      const posters = await this.postersRepository
        .createQueryBuilder('poster')
        .select([
          'musical.id',
          'musical.title',
          'musical.views',
          'poster.imageUrl',
        ])
        .leftJoin('poster.musical', 'musical')
        .orderBy('musical.views', 'DESC')
        .orderBy('musical.id', 'ASC')
        .limit(limit)
        .getMany();
      return posters.map((poster) => new PosterDto(poster));
    }
  }

  async findPostersByInitialRange(initialRange: string): Promise<PosterDto[]> {
    const posters = await this.postersRepository
      .createQueryBuilder('poster')
      .select(['musical.id', 'musical.title', 'poster.imageUrl'])
      .leftJoin('poster.musical', 'musical')
      .where('musical.firstChoseong IN (:...choseongGroup)', {
        choseongGroup: ChoseongFilterMap[initialRange],
      })
      .getMany();

    let postersInDto = posters.map((poster) => new PosterDto(poster));
    postersInDto = this.sortKoreanAsc(postersInDto);

    return postersInDto;
  }

  sortKoreanAsc(arr: PosterDto[]): PosterDto[] {
    return arr.sort((poster1, poster2) => {
      const title1 = poster1.musicalTitle;
      const title2 = poster2.musicalTitle;
      return title1.localeCompare(title2, 'ko');
    });
  }

  async createPoster(musicalId: number, imageUrl: string): Promise<Poster> {
    const poster = this.postersRepository.create({ imageUrl });
    await this.postersRepository.save(poster);

    await this.musicalsService.makeRelationshipWithPoster(musicalId, poster);

    return poster;
  }
}
