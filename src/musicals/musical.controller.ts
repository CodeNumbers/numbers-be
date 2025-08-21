import {
  BadRequestException,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  Query,
} from '@nestjs/common';
import {
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
import { success } from 'src/common/utils/response.util';
import { PosterFilterKeyword } from 'src/common/config/query-parameters';
import { MusicalDto, MusicalPosterDto } from './musicals.dto';

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
    return success(musicals, 'Success to get filtered poster list.');
  }

  // Swagger: musical/:id API Description
  @Get(':id')
  @ApiOperation({
    summary: 'id 기반 뮤지컬 조회',
    description: 'Path parameter: id',
  })
  @ApiExtraModels(ResponseDto, MusicalDto)
  @ApiOkResponse({
    description: 'Success to get musical information by ID.',
    schema: {
      allOf: [
        { $ref: getSchemaPath(ResponseDto) },
        {
          properties: {
            data: {
              items: { $ref: getSchemaPath(MusicalDto) },
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
  @HttpCode(HttpStatus.OK)
  async getMusicalInformationWithId(
    @Param('id') id: string,
  ): Promise<
    ResponseDto<MusicalDto> | BadRequestException | NotFoundException
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
