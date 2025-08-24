import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBody,
  ApiConsumes,
  ApiExtraModels,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  getSchemaPath,
} from '@nestjs/swagger';
import { MusicalsService } from './musicals.service';
import {
  DeprecatedResponseDto,
  ResponseDto,
} from 'src/common/dto/response.dto';
import { isValidQuery } from 'src/common/utils/validation.util';
import { PosterFilterKeyword } from 'src/common/config/query-parameters';
import {
  ReadMusicalDto,
  MusicalPosterDto,
  CreateMusicalDto,
} from './musicals.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { MusicalNumbersDto } from 'src/musical-numbers/musical-numbers.dto';

@Controller('musicals')
export class MusicalsController {
  constructor(private readonly musicalsService: MusicalsService) {}
  @ApiExtraModels(
    DeprecatedResponseDto,
    ResponseDto,
    MusicalPosterDto,
    CreateMusicalDto,
    ReadMusicalDto,
  )

  // Deprecated
  @Get('filter')
  @ApiOperation({ deprecated: true })
  @ApiQuery({
    name: 'initialRange',
    enum: ['ㄱ~ㄷ', 'ㄹ~ㅂ', 'ㅅ~ㅈ', 'ㅊ~ㅌ', 'ㅍ~ㅎ', 'A~Z/0~9'],
  })
  @ApiOkResponse({
    description: 'Success to get filtered poster list.',
    schema: {
      allOf: [
        { $ref: getSchemaPath(DeprecatedResponseDto) },
        {
          properties: {
            data: {
              type: 'array',
              items: { $ref: getSchemaPath(MusicalPosterDto) },
            },
          },
        },
      ],
    },
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request.' })
  async filterPosters(
    @Query('initialRange') initialRange: string,
  ): Promise<DeprecatedResponseDto<MusicalPosterDto> | BadRequestException> {
    if (!isValidQuery(initialRange, PosterFilterKeyword)) {
      throw new BadRequestException();
    }

    const musicals =
      await this.musicalsService.findFilteredMusicals(initialRange);
    return new DeprecatedResponseDto(
      HttpStatus.OK,
      'Success to get filtered poster list.',
      musicals,
    );
  }

  // POST /musicals
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UseInterceptors(FileInterceptor('file'))

  // Swagger
  @ApiOperation({
    summary: '뮤지컬 정보 생성',
  })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: { type: 'string', format: 'binary' },
        title: {
          type: 'string',
          example: '레미제라블',
          description: '중복 데이터 불가능.',
        },
        synopsis: { type: 'string', example: 'synopsis' },
        numbers: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              act: { type: 'number' },
              order: { type: 'number' },
              title: { type: 'string' },
              videoUrl: { type: 'string', description: '중복 데이터 불가능.' },
              actors: {
                type: 'array',
                items: { type: 'string' },
              },
            },
          },
          example: [
            {
              act: 1,
              order: 1,
              title: '제목',
              videoUrl: 'https://youtu.be/abc',
              actors: ['옥주현', '이지혜'],
            },
          ],
        },
      },
      required: ['title', 'synopsis', 'numbers'],
    },
  })
  @ApiOkResponse({
    description: 'Success to insert musical information.',
    schema: {
      allOf: [
        { $ref: getSchemaPath(ResponseDto) },
        {
          properties: {
            data: { $ref: getSchemaPath(CreateMusicalDto) },
          },
        },
      ],
    },
  })

  // Function
  async createMusicalInformation(
    /* @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 1000 * 1024 }),
          new FileTypeValidator({ fileType: 'image/png' }),
        ],
      }),
    ) */
    @UploadedFile() poster: Express.Multer.File,
    @Body() musicalInfo: { title: string; synopsis: string; numbers: string },
  ): Promise<ResponseDto<CreateMusicalDto>> {
    const musicalNumbers = JSON.parse(
      musicalInfo.numbers,
    ) as MusicalNumbersDto[];
    const musical = await this.musicalsService.createMusical({
      ...musicalInfo,
      numbers: musicalNumbers,
    });

    return new ResponseDto(
      `Success to insert ${musicalInfo.title} musical information.`,
      new CreateMusicalDto(musical),
    );
  }

  // GET /musicals/:id
  @Get(':id')
  @HttpCode(HttpStatus.OK)

  // Swagger
  @ApiOperation({
    summary: 'id 기반 뮤지컬 조회',
    description: 'Path parameter: id',
  })
  @ApiOkResponse({
    description: 'Success to get musical information by ID.',
    schema: {
      allOf: [
        { $ref: getSchemaPath(ResponseDto) },
        {
          properties: {
            data: { $ref: getSchemaPath(ReadMusicalDto) },
          },
        },
      ],
    },
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request.' })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Musical not found.',
  })

  // Function
  async getMusicalInformationWithId(
    @Param('id') id: string,
  ): Promise<
    ResponseDto<ReadMusicalDto> | BadRequestException | NotFoundException
  > {
    if (isNaN(Number(id))) throw new BadRequestException();

    const musical = await this.musicalsService.findMusicalById(Number(id));

    if (!musical) throw new NotFoundException();

    return new ResponseDto(
      'Success to get musical information by ID.',
      musical,
    );
  }
}
