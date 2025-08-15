import { Controller, Get, Param, Query } from '@nestjs/common';
import {
  ApiExtraModels,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  getSchemaPath,
} from '@nestjs/swagger';
import { MusicalsService } from './musicals.service';
import { ResponseDto } from 'src/common/dto/response.dto';
import { isValidQuery } from 'src/common/utils/validation.util';
import { success, fail } from 'src/common/utils/response.util';
import { PosterFilterKeyword } from 'src/common/config/query-parameters';
import { MusicalDto, MusicalPosterDto } from './musicals.dto';

@Controller('musicals')
export class MusicalsController {
  constructor(private readonly musicalsService: MusicalsService) {}

  @Get('filter')
  @ApiOperation({ deprecated: true })
  @ApiQuery({
    name: 'initialRange',
    enum: ['ㄱ~ㄷ', 'ㄹ~ㅂ', 'ㅅ~ㅈ', 'ㅊ~ㅌ', 'ㅍ~ㅎ', 'A~Z/0~9'],
  })
  @ApiExtraModels(ResponseDto, MusicalPosterDto)
  @ApiOkResponse({
    description: 'Success to get filtered poster list.',
    schema: {
      allOf: [
        { $ref: getSchemaPath(ResponseDto) },
        {
          properties: {
            data: {
              type: 'array',
              items: { $ref: getSchemaPath(MusicalPosterDto) },
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
  ): Promise<ResponseDto<MusicalPosterDto | null>> {
    if (!isValidQuery(initialRange, PosterFilterKeyword)) {
      return fail();
    }

    const musicals =
      await this.musicalsService.findFilteredMusicals(initialRange);
    return success(musicals, 'Success to get filtered poster list.');
  }

  @Get(':id')
  @ApiResponse({ status: 404, description: 'Musical not found.' })
  async getMusicalInformationWithId(
    @Param('id') id: string,
  ): Promise<ResponseDto<MusicalDto | null>> {
    if (isNaN(Number(id))) return fail(400, 'Bad Request');

    const musical = await this.musicalsService.findMusicalById(Number(id));

    if (!musical) return fail(404, 'Musical not found');

    return success([musical], 'Success to get musical information by ID.');
  }
}
