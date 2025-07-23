import { Injectable } from '@nestjs/common';
import { PosterDto } from './posters.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Poster } from './poster.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PostersService {
  constructor(
    @InjectRepository(Poster)
    private postersRepository: Repository<Poster>,
  ) {}

  findPosters(keyword: string): PosterDto {
    console.log(keyword);
    return new PosterDto({ id: 1, url: 'poster.com' });
  }
}
