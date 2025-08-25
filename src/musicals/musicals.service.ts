import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Musical } from '../common/entities/musical.entity';
import { CreateMusicalDto } from './musicals.dto';
import { getFirstChoseong } from 'src/common/utils/choseong';
import { MusicalNumbersService } from 'src/musical-numbers/musical-numbers.service';
import { Poster } from 'src/common/entities/poster.entity';

@Injectable()
export class MusicalsService {
  constructor(
    @InjectRepository(Musical)
    private readonly musicalsRepository: Repository<Musical>,
    private readonly musicalNumbersService: MusicalNumbersService,
  ) {}

  async findMusicalById(id: number): Promise<Musical> {
    const musical = await this.musicalsRepository
      .createQueryBuilder('musical')
      .leftJoinAndSelect('musical.poster', 'poster')
      .leftJoinAndSelect('musical.numbers', 'number')
      .leftJoinAndSelect('number.actors', 'actor')
      .where('musical.id = :id', { id })
      .orderBy('number.act', 'ASC')
      .orderBy('number.order', 'ASC')
      .getOne();

    if (!musical) throw new NotFoundException();

    return musical;
  }

  async isExistMusical(title: string) {
    return this.musicalsRepository.findOneBy({ title });
  }

  async createMusical(musicalInfo: CreateMusicalDto): Promise<Musical> {
    // Insert Actor & Numbers
    const musicalNumberInstances =
      await this.musicalNumbersService.createMusicalNumbers(
        musicalInfo.numbers,
      );

    // Insert Musical
    const musicalInstance = this.musicalsRepository.create({
      title: musicalInfo.title,
      synopsis: musicalInfo.synopsis,
      numbers: musicalNumberInstances,
      firstChoseong: getFirstChoseong(musicalInfo.title),
    });

    // Add relationship : musical.numbers <> numbers.id
    musicalInstance.numbers = musicalNumberInstances;
    await this.musicalsRepository.save(musicalInstance);

    return musicalInstance;
  }

  async makeRelationshipWithPoster(
    musical: Musical,
    poster: Poster,
  ): Promise<void> {
    musical.poster = poster;
    await this.musicalsRepository.save(musical);
  }
}
