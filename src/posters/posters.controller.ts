import {
  BadRequestException,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiQuery,
  ApiResponse,
  getSchemaPath,
  ApiExtraModels,
  ApiOperation,
  ApiBody,
  ApiConsumes,
} from '@nestjs/swagger';
import * as fs from 'fs';
import { PostersService } from './posters.service';
import { ResponseDto, ResponseDtoInArray } from 'src/common/dto/response.dto';
import { CreatePosterDto, PosterDto } from './posters.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { extname, join } from 'path';

@Controller('posters')
export class PostersController {
  constructor(private readonly postersService: PostersService) {}
  @ApiExtraModels(ResponseDtoInArray, PosterDto)

  // POST /posters
  @Post()
  @HttpCode(HttpStatus.CREATED)

  // Swagger
  @ApiQuery({ name: 'musicalId', description: '뮤지컬 ID' })
  @ApiQuery({ name: 'musicalTitle', description: '뮤지컬 제목' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: '포스터 파일',
    schema: {
      type: 'object',
      required: ['posterFile'],
      properties: {
        posterFile: { type: 'string', format: 'binary' },
      },
    },
  })
  @UseInterceptors(FileInterceptor('posterFile'))

  // Function
  async uploadPoster(
    @Query('musicalId') musicalId: number,
    @Query('musicalTitle') musicalTitle: string,
    @UploadedFile() posterFile: Express.Multer.File,
    /* @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 1000 * 1024 }),
          new FileTypeValidator({ fileType: 'image/png' }),
        ],
      }),
    ) */
  ) {
    const ext = extname(posterFile.originalname);
    const uploadPath = join(process.cwd(), '/upload');
    fs.writeFileSync(
      uploadPath + `${musicalId}-${musicalTitle}-${Date.now()}${ext}`,
      posterFile.buffer,
    );

    // S3
    const imageUrl = 'sample.com';
    const poster = await this.postersService.createPoster(musicalId, imageUrl);
    return new ResponseDto(
      'Success to create poster.',
      new CreatePosterDto(musicalTitle, poster),
    );
  }

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
