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
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiExtraModels,
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  getSchemaPath,
} from '@nestjs/swagger';
import { MusicalsService } from './musicals.service';
import { ResponseDto } from 'src/common/dto/response.dto';
import {
  ReadMusicalDto,
  CreateMusicalDto,
  CreateMusicalResponseDto,
} from './musicals.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('musicals')
export class MusicalsController {
  constructor(private readonly musicalsService: MusicalsService) {}
  @ApiExtraModels(ResponseDto, CreateMusicalDto, ReadMusicalDto)

  // POST /musicals
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(JwtAuthGuard)

  // Swagger
  @ApiBearerAuth('access-token')
  @ApiOperation({
    summary: '뮤지컬 정보 생성',
    description: 'POST /poster 전에 실행돼야 함.',
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        title: {
          type: 'string',
          example: '레미제라블',
          description: '중복 데이터 불가능.',
        },
        synopsis: { type: 'string', example: 'synopsis' },
        numbers: {
          type: 'array',
          description: 'videoUrl 중복 데이터 불가능',
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
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Musical already created.',
  })

  // Function
  async createMusicalInformation(
    @Body() musicalInfo: CreateMusicalDto,
  ): Promise<ResponseDto<CreateMusicalDto>> {
    if (await this.musicalsService.isExistMusical(musicalInfo.title)) {
      throw new BadRequestException(`${musicalInfo.title} already created.`);
    }

    const musical = await this.musicalsService.createMusical(musicalInfo);

    return new ResponseDto(
      `Success to insert ${musicalInfo.title} musical information.`,
      new CreateMusicalResponseDto(musical),
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
    @Param('id') id: number,
  ): Promise<
    ResponseDto<ReadMusicalDto> | BadRequestException | NotFoundException
  > {
    if (isNaN(Number(id))) throw new BadRequestException();

    const musical = await this.musicalsService.findMusicalById(Number(id));

    return new ResponseDto(
      'Success to get musical information by ID.',
      new ReadMusicalDto(musical),
    );
  }
}
