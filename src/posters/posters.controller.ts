import { Controller, Get, Query } from '@nestjs/common';
import { PostersService } from './posters.service';
import { PosterDto } from './posters.dto';
import { ResponseDto } from 'src/common/dto/response.dto';
import { success, fail } from 'src/common/utils/response.util';
import { isValidQuery } from 'src/common/utils/validation.util';
import {
  PosterSearchKeyword,
  PosterFilterKeyword,
} from 'src/common/enum/query-keyword';

@Controller('posters')
export class PostersController {
  constructor(private readonly postersService: PostersService) {}

  @Get('search')
  async getPosters(
    @Query('keyword') keyword: string,
  ): Promise<ResponseDto<PosterDto[] | null>> {
    if (!isValidQuery(keyword, PosterSearchKeyword)) {
      return fail();
    }
    const posters = await this.postersService.findPostersByKeyword(keyword);
    return success(posters, 'Get poster list');
  }

  @Get('filter')
  filterPosters(
    @Query('initialRange') initialRange: string,
  ): ResponseDto<null> | string {
    if (!isValidQuery(initialRange, PosterFilterKeyword)) {
      return fail();
    }
    return initialRange;
  }
}
