import { Controller, Get, Query } from '@nestjs/common';
import {
  ApiQuery,
  ApiResponse,
  ApiOkResponse,
  getSchemaPath,
  ApiExtraModels,
  // ApiCreatedResponse,
} from '@nestjs/swagger';
import { PostersService } from './posters.service';
import { PosterDto } from './posters.dto';
import { ResponseDto } from 'src/common/dto/response.dto';
import { success, fail } from 'src/common/utils/response.util';
import { isValidQuery } from 'src/common/utils/validation.util';
import { PosterSearchKeyword } from 'src/common/config/query-parameters';

@Controller('posters')
export class PostersController {
  constructor(private readonly postersService: PostersService) {}

  @Get('search')
  @ApiQuery({ name: 'keyword', enum: ['random', 'views'] })
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
    @Query('keyword') keyword: string,
  ): Promise<ResponseDto<PosterDto | null>> {
    if (!isValidQuery(keyword, PosterSearchKeyword)) {
      return fail();
    }
    const posters = await this.postersService.findPostersByKeyword(keyword);
    return success(posters, 'Success to get poster list.');
  }
}
