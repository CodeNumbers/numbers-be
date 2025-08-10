import { ApiProperty } from '@nestjs/swagger';
import { Poster } from './poster.entity';

export class PosterDto implements Omit<Poster, 'createdAt'> {
  @ApiProperty()
  id: number;

  @ApiProperty()
  imageUrl: string;

  constructor(posterData: PosterDto) {
    Object.assign(this, posterData);
  }
}
