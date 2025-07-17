import { Controller, Get } from '@nestjs/common';
import { PostersService } from './posters.service';

@Controller()
export class PostersController {
  constructor(private readonly appService: PostersService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
