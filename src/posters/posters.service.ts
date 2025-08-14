import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PosterDto } from './posters.dto';
import { Poster } from './poster.entity';

@Injectable()
export class PostersService {
  constructor(
    @InjectRepository(Poster)
    private postersRepository: Repository<Poster>,
  ) {}

  async findPostersByKeyword(keyword: string): Promise<PosterDto[]> {
    if (keyword === 'random') {
      const posters = await this.postersRepository
        .createQueryBuilder('poster')
        .leftJoinAndSelect('poster.musical', 'musical')
        .select(['musical.id', 'musical.title', 'poster.imageUrl'])
        .orderBy('RAND()')
        .limit(5)
        .getMany();
      return posters.map((poster) => new PosterDto(poster));
    } else {
      // Based on views
      const posters = await this.postersRepository
        .createQueryBuilder('poster')
        .leftJoinAndSelect('poster.musical', 'musical')
        .select(['musical.id', 'musical.title', 'poster.imageUrl'])
        .orderBy('musical.views', 'DESC')
        .orderBy('musical.id', 'ASC')
        .limit(5)
        .getMany();
      return posters.map((poster) => new PosterDto(poster));
    }
  }

  /* async findFilteredMusicals(initialRange: string): Promise<PosterDto[]> {
    const posters = await this.postersRepository
      .createQueryBuilder('poster')
      .leftJoinAndSelect('poster.musical', 'musical')
      .select(['musical.id', 'musical.title', 'poster.imageUrl'])
      .where('musical.firstChoseong IN (:...choseongGroup)', {
        choseongGroup: ChoseongFilterMap[initialRange],
      })
      .getMany();

    return posters.map((poster) => new PosterDto(poster));
  } */
}
