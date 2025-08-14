import { DataSource } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { faker } from '@faker-js/faker';
import { Poster } from '../common/entities/poster.entity';
import { Musical } from '../common/entities/musical.entity';
import { MusicalData } from './data';
import { getFirstChoseong } from 'src/common/utils/choseong';

@Injectable()
export class MusicalSeeder {
  constructor(private readonly dataSource: DataSource) {}

  async seed(count = 10) {
    const posterRepo = this.dataSource.getRepository(Poster);
    const musicalRepo = this.dataSource.getRepository(Musical);

    for (let i = 0; i < count; i++) {
      const title = MusicalData[i].title;
      const firstChoseong = getFirstChoseong(title);
      const imageUrl = MusicalData[i].imageUrl;
      const synopsis = faker.lorem.paragraph();

      const poster = posterRepo.create({ imageUrl });
      await posterRepo.save(poster);
      const musical = musicalRepo.create({
        title,
        firstChoseong,
        synopsis,
        poster,
      });
      await musicalRepo.save(musical);
    }

    console.log(`✅ ${count} musicals with posters inserted.`);
  }
}
