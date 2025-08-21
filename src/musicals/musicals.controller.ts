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
} from '@nestjs/common';
import {
  ApiBody,
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

@Controller('musicals')
export class MusicalsController {
  constructor(private readonly musicalsService: MusicalsService) {}

  @Get('filter')
  @ApiOperation({ deprecated: true })
  @ApiExtraModels(DeprecatedResponseDto, MusicalPosterDto)
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

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiBody({ type: CreateMusicalDto })
  async createMusicalInformation(@Body() musicalInfo: CreateMusicalDto) {
    const musical = await this.musicalsService.createMusical(musicalInfo);
    return new ResponseDto(
      `Success to insert ${musicalInfo.title} musical information.`,
      musical,
    );
  }

  // Swagger: musical/:id API Description
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'id 기반 뮤지컬 조회',
    description: 'Path parameter: id',
  })
  @ApiExtraModels(ResponseDto, ReadMusicalDto)
  @ApiOkResponse({
    description: 'Success to get musical information by ID.',
    schema: {
      allOf: [
        { $ref: getSchemaPath(ResponseDto) },
        {
          properties: {
            data: {
              items: { $ref: getSchemaPath(ReadMusicalDto) },
            },
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

  // /musical/:id API Function
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
