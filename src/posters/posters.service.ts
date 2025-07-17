import { Injectable } from '@nestjs/common';
import { PostersDto } from './posters.dto';

@Injectable()
export class PostersService {
  findPosters(): PostersDto {
    return new PostersDto({ id: 1, url: 'poster.com' });
  }
}
