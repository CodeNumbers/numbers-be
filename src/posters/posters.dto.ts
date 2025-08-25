import { ApiProperty } from '@nestjs/swagger';
import { Poster } from 'src/common/entities/poster.entity';

export class PosterDto {
  @ApiProperty()
  musicalId: number;

  @ApiProperty()
  musicalTitle: string;

  @ApiProperty()
  imageUrl: string;

  @ApiProperty({ type: 'number' })
  views?: number;

  constructor(posterData: Poster) {
    this.musicalId = posterData.musical.id;
    this.musicalTitle = posterData.musical.title;
    if (!isNaN(posterData.musical.views)) this.views = posterData.musical.views;
    this.imageUrl = posterData.imageUrl;
  }
}

export class CreatePosterDto {
  @ApiProperty({ type: 'number' })
  posterId: number;

  @ApiProperty({ type: 'string' })
  musicalTitle: string;

  @ApiProperty({ type: 'string' })
  imageurl: string;

  constructor(musicalTitle: string, posterData: Poster) {
    this.musicalTitle = musicalTitle;
    this.posterId = posterData.id;
    this.imageurl = posterData.imageUrl;
  }
}
