import { Injectable } from '@nestjs/common';
import { PosterDto } from './posters.dto';

@Injectable()
export class PostersService {
  findPosters(keyword: string): PosterDto {
    console.log(keyword);
    return new PosterDto({ id: 1, url: 'poster.com' });
  }
}
