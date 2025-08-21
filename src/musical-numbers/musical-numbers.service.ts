import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MusicalNumber } from 'src/common/entities/musical-number.entity';
import { ActorsService } from 'src/actors/actors.service';
import { MusicalNumbersDto } from './musical-numbers.dto';

@Injectable()
export class MusicalNumbersService {
  constructor(
    @InjectRepository(MusicalNumber)
    private readonly musicalNumbersRepository: Repository<MusicalNumber>,
    private readonly actorService: ActorsService,
  ) {}

  async createMusicalNumbers(
    musicalNumbers: MusicalNumbersDto[],
  ): Promise<MusicalNumber[]> {
    const musicalNumberInstances: MusicalNumber[] = [];

    for (const musicalNumber of musicalNumbers) {
      // Insert Actors
      const actorInstances = await this.actorService.createActors(
        musicalNumber.actors,
      );

      // Insert Musical Number
      const musicalNumberInstance = this.musicalNumbersRepository.create({
        act: musicalNumber.act,
        order: musicalNumber.order,
        title: musicalNumber.title,
        videoUrl: musicalNumber.videoUrl,
      });
      musicalNumberInstance.actors = actorInstances;
      await this.musicalNumbersRepository.save(musicalNumberInstance);

      musicalNumberInstances.push(musicalNumberInstance);
    }

    return musicalNumberInstances;
  }
}
