import { ApiProperty } from '@nestjs/swagger';
import { Poster } from 'src/common/entities/poster.entity';

export class PosterDto {
  @ApiProperty()
  musicalId: number;

  @ApiProperty()
  title: string;

  @ApiProperty()
  imageUrl: string;

  constructor(posterData: Poster) {
    this.musicalId = posterData.musical.id;
    this.title = posterData.musical.title;
    this.imageUrl = posterData.imageUrl;
  }
}
