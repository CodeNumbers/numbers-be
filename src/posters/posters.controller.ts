import { Controller, Get, Query } from '@nestjs/common';
import { PostersService } from './posters.service';
import { ResponseDto } from 'src/common/dto/response.dto';
import { PosterDto } from './posters.dto';
import { success } from 'src/common/utils/response.util';

@Controller('posters')
export class PostersController {
  constructor(private readonly postersService: PostersService) {}

  @Get('search')
  getPosters(@Query('keyword') keyword: string): ResponseDto<PosterDto[]> {
    const posters = this.postersService.findPosters(keyword);
    return success(posters, 'Get poster list');
  }

  @Get('filter')
  filterPosters(@Query('initialRange') initialRange: string): string {
    return initialRange;
  }
}
