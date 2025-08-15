import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Musical } from '../common/entities/musical.entity';
import { ChoseongFilterMap } from 'src/common/config/query-parameters';
import { MusicalPosterDto, MusicalDto } from './musicals.dto';

@Injectable()
export class MusicalsService {
  constructor(
    @InjectRepository(Musical)
    private musicalsRepository: Repository<Musical>,
  ) {}

  // musical (id, title) poster (imageUrl)
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

  async findMusicalById(id: number): Promise<MusicalDto | null> {
    const musical = await this.musicalsRepository
      .createQueryBuilder('musical')
      .leftJoin('musical.poster', 'poster')
      .leftJoin('musical.numbers', 'number')
      .leftJoin('number.actor', 'actor')
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
      .orderBy('number.order', 'ASC')
      .getOne();

    if (!musical) return null;

    return new MusicalDto(musical);
  }
}
