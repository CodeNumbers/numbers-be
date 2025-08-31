import { ApiProperty } from '@nestjs/swagger';
import { Poster } from 'src/common/entities/poster.entity';

export class PosterDto {
  @ApiProperty({ type: 'number', description: '뮤지컬 ID' })
  musicalId: number;

  @ApiProperty({ type: 'string', description: '뮤지컬 이름' })
  musicalTitle: string;

  @ApiProperty({ type: 'string', description: '이미지 이름' })
  imageKey: string;

  @ApiProperty({ type: 'string', description: '이미지 링크' })
  imageUrl: string;

  @ApiProperty({ type: 'number' })
  views?: number;

  constructor(posterData: Poster, imageUrl: string) {
    this.musicalId = posterData.musical.id;
    this.musicalTitle = posterData.musical.title;
    if (!isNaN(posterData.musical.views)) this.views = posterData.musical.views;
    this.imageKey = posterData.imageKey;
    this.imageUrl = imageUrl;
  }
}

export class CreatePosterDto {
  @ApiProperty({ type: 'number' })
  posterId: number;

  @ApiProperty({ type: 'string' })
  musicalTitle: string;

  @ApiProperty({ type: 'string' })
  imageKey: string;

  constructor(musicalTitle: string, posterData: Poster) {
    this.musicalTitle = musicalTitle;
    this.posterId = posterData.id;
    this.imageKey = posterData.imageKey;
  }
}
