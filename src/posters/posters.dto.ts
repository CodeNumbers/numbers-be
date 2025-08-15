import { ApiProperty } from '@nestjs/swagger';
import { PosterProps } from 'src/common/interface/poster.interface';

export class PosterDto {
  @ApiProperty()
  musicalId: number;

  @ApiProperty()
  title: string;

  @ApiProperty()
  imageUrl: string;

  constructor(posterData: PosterProps) {
    this.musicalId = posterData.musical.id;
    this.title = posterData.musical.title;
    this.imageUrl = posterData.imageUrl;
  }
}
