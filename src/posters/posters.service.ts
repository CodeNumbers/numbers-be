import { Injectable } from '@nestjs/common';

@Injectable()
export class PostersService {
  getHello(): string {
    return 'Posters';
  }
}
