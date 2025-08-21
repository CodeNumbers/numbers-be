import { Controller, Get, HttpCode, Query } from '@nestjs/common';
import {
  ApiQuery,
  ApiResponse,
  ApiOkResponse,
  getSchemaPath,
  ApiExtraModels,
  ApiOperation,
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
  @ApiOperation({ deprecated: true })
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
    const posters = await this.postersService.findPostersByMode(select, 5);
    return success(posters, 'Success to get poster list.');
  }

  @Get('filter')
  @ApiOperation({ deprecated: true })
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
      await this.postersService.findPostersByInitialRange(initialRange);
    return success(posters, 'Success to get filtered poster list.');
  }

  // Swagger: /posters API Request Description
  @ApiOperation({
    summary: 'Home 페이지 포스터 조회용 API(search & filter 통합)',
    description: `
**Query 사용 규칙:** <br>
▶️ Option 1: mode + limit 함께 사용 <br>
▶️ Option 2: initialRange 독립 사용 <br>
▶️ 다른 조합은 허용되지 않음`,
  })
  @ApiQuery({
    name: 'mode',
    required: false,
    enum: ['random', 'views'],
    description: 'limit과 함께 사용(initialRange와 동시에 사용 불가)',
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    type: Number,
    description: 'mode와 함께 사용(initialRange와 동시에 사용 불가)',
  })
  @ApiQuery({
    name: 'initialRange',
    required: false,
    enum: ['ㄱ~ㄷ', 'ㄹ~ㅂ', 'ㅅ~ㅈ', 'ㅊ~ㅌ', 'ㅍ~ㅎ', 'A~Z/0~9'],
    type: String,
    description: '독립적으로만 사용 가능(mode, limit과 함께 사용 불가)',
  })
  @HttpCode(200)

  // Swagger: /posters API Response Description
  @ApiResponse({
    status: 200,
    description: `
- mode+limit: 모드(mode) 기반 포스터 조회 성공
- initialRange: 초성 필터(initialRange) 기반 포스터 조회 성공`,
    schema: {
      type: 'object',
      properties: {
        message: { type: 'string' },
        data: { type: 'array', items: { $ref: getSchemaPath(PosterDto) } },
      },
    },
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })

  // /posters API function
  @Get()
  async selectModeAndFilter(
    @Query('mode') mode?: 'random' | 'views',
    @Query('limit') limit?: number,
    @Query('initialRange') initialRange?: string,
  ) {
    if (mode && limit && !initialRange) {
      const posters = await this.postersService.findPostersByMode(mode, limit);
      return { message: 'Success to get poster list by mode.', data: posters };
    } else if (initialRange) {
      const posters =
        await this.postersService.findPostersByInitialRange(initialRange);
      return {
        message: 'Success to get poster list by initial range.',
        data: posters,
      };
    }
    return fail();
  }
}
