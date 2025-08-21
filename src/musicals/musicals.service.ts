import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Musical } from '../common/entities/musical.entity';
import { ChoseongFilterMap } from 'src/common/config/query-parameters';
import {
  CreateMusicalDto,
  MusicalPosterDto,
  ReadMusicalDto,
} from './musicals.dto';
import { getFirstChoseong } from 'src/common/utils/choseong';
import { PostersService } from 'src/posters/posters.service';
import { MusicalNumbersService } from 'src/musical-numbers/musical-numbers.service';

@Injectable()
export class MusicalsService {
  constructor(
    @InjectRepository(Musical)
    private readonly musicalsRepository: Repository<Musical>,
    private readonly postersService: PostersService,
    private readonly musicalNumbersService: MusicalNumbersService,
  ) {}

  async findFilteredMusicals(
    initialRange: string,
  ): Promise<MusicalPosterDto[]> {
    const musicals = await this.musicalsRepository
      .createQueryBuilder('musical')
      .leftJoin('musical.poster', 'poster')
      .select(['musical.id', 'musical.title', 'poster.imageUrl'])
      .where('musical.firstChoseong IN (:...choseongGroup)', {
        choseongGroup: ChoseongFilterMap[initialRange],
      })
      .getMany();

    return musicals.map((musical) => new MusicalPosterDto(musical));
  }

  async findMusicalById(id: number): Promise<ReadMusicalDto | null> {
    const musical = await this.musicalsRepository
      .createQueryBuilder('musical')
      .leftJoin('musical.poster', 'poster')
      .leftJoin('musical.numbers', 'number')
      .leftJoin('number.actors', 'actor')
      .select([
        'musical.title',
        'musical.synopsis',
        'poster.imageUrl',
        'number.act',
        'number.order',
        'number.title',
        'number.videoUrl',
        'actor.name',
      ])
      .where('musical.id = :id', { id })
      .orderBy('number.act', 'ASC')
      .orderBy('number.order', 'ASC')
      .getOne();

    if (!musical) return null;

    return new ReadMusicalDto(musical);
  }

  async createMusical(musicalInfo: CreateMusicalDto) {
    // Insert Actor & Numbers
    const musicalNumberInstances =
      await this.musicalNumbersService.createMusicalNumbers(
        musicalInfo.numbers,
      );

    // Insert Poster
    // S3 image upload
    const imageUrl = 'sample.com';
    const posterInstance = await this.postersService.createPoster(imageUrl);

    // Insert Musical
    const musicalInstance = this.musicalsRepository.create({
      title: musicalInfo.title,
      synopsis: musicalInfo.synopsis,
      numbers: musicalNumberInstances,
      firstChoseong: getFirstChoseong(musicalInfo.title),
    });
    musicalInstance.poster = posterInstance;
    musicalInstance.numbers = musicalNumberInstances;
    await this.musicalsRepository.save(musicalInstance);

    return musicalInstance;
  }
}
