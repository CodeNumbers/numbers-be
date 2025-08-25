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
  getSchemaPath,
  ApiExtraModels,
  ApiOperation,
} from '@nestjs/swagger';
import { PostersService } from './posters.service';
import { ResponseDtoInArray } from 'src/common/dto/response.dto';
import { PosterDto } from './posters.dto';

@Controller('posters')
export class PostersController {
  constructor(private readonly postersService: PostersService) {}
  @ApiExtraModels(ResponseDtoInArray, PosterDto)

  // GET /posters
  @Get()
  @HttpCode(HttpStatus.OK)

  // Swagger
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
  @ApiResponse({
    status: HttpStatus.OK,
    description: `
- mode+limit: 모드(mode) 기반 포스터 조회 성공
- initialRange: 초성 필터(initialRange) 기반 포스터 조회 성공`,
    schema: {
      allOf: [
        { $ref: getSchemaPath(ResponseDtoInArray) },
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

  // Function
  async selectModeAndFilter(
    @Query('mode') mode?: 'random' | 'views',
    @Query('limit') limit?: number,
    @Query('initialRange') initialRange?: string,
  ): Promise<ResponseDtoInArray<PosterDto> | BadRequestException> {
    // Mode Query Version
    if (mode && limit && !initialRange) {
      const posters = await this.postersService.findPostersByMode(mode, limit);
      return new ResponseDtoInArray(
        'Success to get poster list by mode.',
        posters,
      );
    } else if (initialRange && !mode && !limit) {
      // Initial Range Filter Version
      const posters =
        await this.postersService.findPostersByInitialRange(initialRange);
      return new ResponseDtoInArray(
        'Success to get poster list by initial range.',
        posters,
      );
    }
    throw new BadRequestException();
  }
}
