import { ApiProperty } from '@nestjs/swagger';
import { PosterProps } from 'src/common/interface/poster.interface';

export class MusicalDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  title: string;

  @ApiProperty()
  poster: PosterProps;

  constructor(musicalData: MusicalDto) {
    Object.assign(this, musicalData);
  }
}
