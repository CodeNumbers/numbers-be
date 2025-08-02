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
        .select(['poster.id', 'poster.imageUrl'])
        .orderBy('RAND()')
        .limit(5)
        .getMany();
      return posters.map((poster) => new PosterDto(poster));
    } else {
      // Based on views
      return [new PosterDto({ id: 1, imageUrl: 'views on work' })];
    }
  }
}
