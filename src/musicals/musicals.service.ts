import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Musical } from '../common/entities/musical.entity';
import { ChoseongFilterMap } from 'src/common/config/query-parameters';
import { MusicalDto } from './musicals.dto';

@Injectable()
export class MusicalsService {
  constructor(
    @InjectRepository(Musical)
    private musicalsRepository: Repository<Musical>,
  ) {}

  // musical (id, title) poster (imageUrl)
  async findFilteredMusicals(initialRange: string): Promise<MusicalDto[]> {
    const musicals = await this.musicalsRepository
      .createQueryBuilder('musical')
      .leftJoinAndSelect('musical.poster', 'poster')
      .select(['musical.id', 'musical.title', 'poster.imageUrl'])
      .where('musical.firstChoseong IN (:...choseongGroup)', {
        choseongGroup: ChoseongFilterMap[initialRange],
      })
      .getMany();

    return musicals.map((musical) => new MusicalDto(musical));
  }
}
