import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { faker } from '@faker-js/faker';
import { Poster } from '../common/entities/poster.entity';
import { Musical } from '../common/entities/musical.entity';
import { MusicalNumber } from 'src/common/entities/musical-number.entity';
import { Actor } from 'src/common/entities/actor.entity';
import { getFirstChoseong } from 'src/common/utils/choseong';
import { MusicalData } from './data';
import { MusicalNumbersDto } from 'src/musical-numbers/musical-numbers.dto';
@Injectable()
export class MusicalSeeder {
  posterRepo: Repository<Poster>;
  musicalRepo: Repository<Musical>;
  musicalNumberRepo: Repository<MusicalNumber>;
  actorRepo: Repository<Actor>;

  constructor(private readonly dataSource: DataSource) {
    this.posterRepo = this.dataSource.getRepository(Poster);
    this.musicalRepo = this.dataSource.getRepository(Musical);
    this.musicalNumberRepo = this.dataSource.getRepository(MusicalNumber);
    this.actorRepo = this.dataSource.getRepository(Actor);
  }

  async seed(count = 10) {
    for (let index = 0; index < count; index++) {
      const title = MusicalData[index].title;
      const firstChoseong = getFirstChoseong(title);
      const imageKey = MusicalData[index].imageKey;
      const synopsis = faker.lorem.paragraph();

      // Insert Poster
      const posterInstance = this.posterRepo.create({ imageKey: imageKey });
      await this.posterRepo.save(posterInstance);

      // Insert Musical
      const musicalInstance = this.musicalRepo.create({
        title,
        firstChoseong,
        synopsis,
        poster: posterInstance,
      });
      await this.musicalRepo.save(musicalInstance);

      // Insert Musical Number & Actor: "데스노트"
      if (!index) {
        await this.seedActData(MusicalData[0].numbers!, musicalInstance);
      }
    }

    console.log(`✅ ${count} seed data inserted.`);
  }

  async seedActData(numbers: MusicalNumbersDto[], musicalInstance: Musical) {
    for (let index = 0; index < numbers.length; index++) {
      const act = numbers[index].act;
      const order = numbers[index].order;
      const title = numbers[index].title;
      const actors = numbers[index].actors;
      const videoUrl = numbers[index].videoUrl;

      const musicalNumberInstance = this.musicalNumberRepo.create({
        act,
        musical: musicalInstance,
        order,
        title,
        videoUrl,
      });
      await this.musicalNumberRepo.save(musicalNumberInstance);

      // Many-to-Many 연결
      musicalNumberInstance.actors = await this.seedActors(actors);
      await this.musicalNumberRepo.save(musicalNumberInstance);
    }
  }

  async seedActors(actors: string[]) {
    // actors 배열에서 Actor 엔티티 가져오기 또는 생성
    const actorInstances = await Promise.all(
      actors.map(async (name: string) => {
        let actor = await this.actorRepo.findOne({ where: { name } });
        if (!actor) {
          actor = this.actorRepo.create({ name });
          await this.actorRepo.save(actor);
        }
        return actor;
      }),
    );

    return actorInstances;
  }
}
