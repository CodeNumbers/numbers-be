import { Injectable } from '@nestjs/common';
import { PostersDto } from './posters.dto';

@Injectable()
export class PostersService {
  findPosters(keyword: string): PostersDto {
    console.log(keyword);
    return new PostersDto({ id: 1, url: 'poster.com' });
  }
}
