import { Controller, Get, Query } from '@nestjs/common';
import {
  ApiExtraModels,
  ApiOkResponse,
  ApiQuery,
  ApiResponse,
  getSchemaPath,
} from '@nestjs/swagger';
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
  @ApiQuery({
    name: 'initialRange',
    enum: ['ㄱ~ㄷ', 'ㄹ~ㅂ', 'ㅅ~ㅈ', 'ㅊ~ㅌ', 'ㅍ~ㅎ', 'A~Z/0~9'],
  })
  @ApiExtraModels(ResponseDto, MusicalDto)
  @ApiOkResponse({
    description: 'Success to get filtered poster list.',
    schema: {
      allOf: [
        { $ref: getSchemaPath(ResponseDto) },
        {
          properties: {
            data: {
              type: 'array',
              items: { $ref: getSchemaPath(MusicalDto) },
            },
          },
          example: {
            statusCode: 200,
            message: 'Success to get filtered poster list.',
            data: [
              {
                id: 1,
                title: 'title1',
                poster: {
                  imageUrl: 'https://example.com/image1',
                },
              },
              {
                id: 2,
                title: 'title2',
                poster: {
                  imageUrl: 'https://example.com/image2',
                },
              },
            ],
          },
        },
      ],
    },
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  async filterPosters(
    @Query('initialRange') initialRange: string,
  ): Promise<ResponseDto<MusicalDto | null>> {
    if (!isValidQuery(initialRange, PosterFilterKeyword)) {
      return fail();
    }

    const musicals =
      await this.musicalsService.findFilteredMusicals(initialRange);
    return success(musicals, 'Success to get filtered poster list.');
  }
}
