import { Controller, Get, Query } from '@nestjs/common';
import { MusicalsService } from './musicals.service';
import { ResponseDto } from 'src/common/dto/response.dto';
import { isValidQuery } from 'src/common/utils/validation.util';
import { success, fail } from 'src/common/utils/response.util';
import { PosterFilterKeyword } from 'src/common/config/query-parameters';
import { MusicalDto } from './musicals.dto';

@Controller('musicals')
export class MusicalsController {
  constructor(private readonly musicalsService: MusicalsService) {}

  @Get('filter')
  async filterPosters(
    @Query('initialRange') initialRange: string,
  ): Promise<ResponseDto<MusicalDto[] | null>> {
    if (!isValidQuery(initialRange, PosterFilterKeyword)) {
      return fail();
    }

    const musicals =
      await this.musicalsService.findFilteredMusicals(initialRange);
    return success(musicals, 'Success to get filtered poster list');
  }
}
