import { Controller, Get, Query } from '@nestjs/common';
import { PostersService } from './posters.service';
import { ResponseDto } from 'src/common/response.dto';
import { PostersDto } from './posters.dto';

@Controller('posters')
export class PostersController {
  constructor(private readonly postersService: PostersService) {}

  @Get()
  getPosters(): ResponseDto<PostersDto> {
    const posters = this.postersService.findPosters();
    return {
      statusCode: 200,
      message: 'Get poster list',
      data: posters,
    };
  }

  @Get('filter')
  filterPosters(@Query('initialRange') initialRange: string): string {
    return initialRange;
  }
}
