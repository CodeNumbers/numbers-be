import { Controller, Get, Query } from '@nestjs/common';
import {
  ApiQuery,
  ApiResponse,
  ApiOkResponse,
  getSchemaPath,
  ApiExtraModels,
} from '@nestjs/swagger';
import { PostersService } from './posters.service';
import { PosterDto } from './posters.dto';
import { ResponseDto } from 'src/common/dto/response.dto';
import { success, fail } from 'src/common/utils/response.util';
import { isValidQuery } from 'src/common/utils/validation.util';
import {
  PosterSearchKeyword,
  PosterFilterKeyword,
} from 'src/common/config/query-parameters';

@Controller('posters')
export class PostersController {
  constructor(private readonly postersService: PostersService) {}

  @Get('search')
  @ApiQuery({ name: 'select', enum: ['random', 'views'] })
  @ApiExtraModels(ResponseDto, PosterDto)
  @ApiOkResponse({
    description: 'Success to get poster list.',
    schema: {
      allOf: [
        { $ref: getSchemaPath(ResponseDto) },
        {
          properties: {
            data: {
              type: 'array',
              items: { $ref: getSchemaPath(PosterDto) },
            },
          },
          example: {
            statusCode: 200,
            message: 'Success to get poster list.',
            data: [
              {
                id: 1,
                imageUrl: 'https://example.com/image1',
              },
              {
                id: 2,
                imageUrl: 'https://example.com/image2',
              },
            ],
          },
        },
      ],
    },
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  async getPosters(
    @Query('select') select: string,
  ): Promise<ResponseDto<PosterDto | null>> {
    if (!isValidQuery(select, PosterSearchKeyword)) {
      return fail();
    }
    const posters = await this.postersService.findPostersByKeyword(select);
    return success(posters, 'Success to get poster list.');
  }

  @Get('filter')
  @ApiQuery({
    name: 'initialRange',
    enum: ['ㄱ~ㄷ', 'ㄹ~ㅂ', 'ㅅ~ㅈ', 'ㅊ~ㅌ', 'ㅍ~ㅎ', 'A~Z/0~9'],
  })
  @ApiExtraModels(ResponseDto, PosterDto)
  @ApiOkResponse({
    description: 'Success to get filtered poster list.',
    schema: {
      allOf: [
        { $ref: getSchemaPath(ResponseDto) },
        {
          properties: {
            data: {
              type: 'array',
              items: { $ref: getSchemaPath(PosterDto) },
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
  ): Promise<ResponseDto<PosterDto | null>> {
    if (!isValidQuery(initialRange, PosterFilterKeyword)) {
      return fail();
    }

    const posters =
      await this.postersService.findFilteredMusicals(initialRange);
    return success(posters, 'Success to get filtered poster list.');
  }
}
