import { Controller, Get, Query } from '@nestjs/common';
import { PostersService } from './posters.service';
import { ResponseDto } from 'src/common/dto/response.dto';
import { PostersDto } from './posters.dto';
import { success } from 'src/common/utils/response.util';

@Controller('posters')
export class PostersController {
  constructor(private readonly postersService: PostersService) {}

  @Get()
  getPosters(): ResponseDto<PostersDto> {
    const posters = this.postersService.findPosters();
    return success(posters, 'Get poster list');
  }

  @Get('filter')
  filterPosters(@Query('initialRange') initialRange: string): string {
    return initialRange;
  }
}
