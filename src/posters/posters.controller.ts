import {
  BadRequestException,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Query,
} from '@nestjs/common';
import {
  ApiQuery,
  ApiResponse,
  ApiOkResponse,
  getSchemaPath,
  ApiExtraModels,
  ApiOperation,
} from '@nestjs/swagger';
import { PostersService } from './posters.service';
import {
  DeprecatedResponseDto,
  ResponseDto,
} from 'src/common/dto/response.dto';
import { success } from 'src/common/utils/response.util';
import { isValidQuery } from 'src/common/utils/validation.util';
import {
  PosterSearchKeyword,
  PosterFilterKeyword,
} from 'src/common/config/query-parameters';
import { PosterDto } from './posters.dto';

@Controller('posters')
export class PostersController {
  constructor(private readonly postersService: PostersService) {}

  @Get('search')
  @ApiOperation({ deprecated: true })
  @ApiQuery({ name: 'select', enum: ['random', 'views'] })
  @ApiExtraModels(DeprecatedResponseDto, PosterDto)
  @ApiOkResponse({
    description: 'Success to get poster list.',
    schema: {
      allOf: [
        { $ref: getSchemaPath(DeprecatedResponseDto) },
        {
          properties: {
            data: {
              type: 'array',
              items: { $ref: getSchemaPath(PosterDto) },
            },
          },
        },
      ],
    },
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request.' })
  async getPosters(
    @Query('select') select: string,
  ): Promise<DeprecatedResponseDto<PosterDto> | BadRequestException> {
    if (!isValidQuery(select, PosterSearchKeyword)) {
      throw new BadRequestException();
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
  @ApiExtraModels(DeprecatedResponseDto, PosterDto)
  @ApiOkResponse({
    description: 'Success to get filtered poster list.',
    schema: {
      allOf: [
        { $ref: getSchemaPath(DeprecatedResponseDto) },
        {
          properties: {
            data: {
              type: 'array',
              items: { $ref: getSchemaPath(PosterDto) },
            },
          },
        },
      ],
    },
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request.' })
  async filterPosters(
    @Query('initialRange') initialRange: string,
  ): Promise<DeprecatedResponseDto<PosterDto> | BadRequestException> {
    if (!isValidQuery(initialRange, PosterFilterKeyword)) {
      throw new BadRequestException();
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

  // Swagger: /posters API Response Description
  @ApiResponse({
    status: HttpStatus.OK,
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
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request.' })

  // /posters API function
  @Get()
  @HttpCode(HttpStatus.OK)
  async selectModeAndFilter(
    @Query('mode') mode?: 'random' | 'views',
    @Query('limit') limit?: number,
    @Query('initialRange') initialRange?: string,
  ): Promise<ResponseDto<PosterDto> | BadRequestException> {
    // Mode Query Version
    if (mode && limit && !initialRange) {
      const posters = await this.postersService.findPostersByMode(mode, limit);
      return { message: 'Success to get poster list by mode.', data: posters };
    } else if (initialRange) {
      // Initial Range Filter Version
      const posters =
        await this.postersService.findPostersByInitialRange(initialRange);
      return {
        message: 'Success to get poster list by initial range.',
        data: posters,
      };
    }
    throw new BadRequestException();
  }
}
