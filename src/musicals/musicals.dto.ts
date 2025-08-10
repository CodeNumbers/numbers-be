import { ApiProperty } from '@nestjs/swagger';
import { Poster } from 'src/common/interface/poster.interface';

export class MusicalDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  title: string;

  @ApiProperty()
  poster: Poster;

  constructor(musicalData: MusicalDto) {
    Object.assign(this, musicalData);
  }
}
