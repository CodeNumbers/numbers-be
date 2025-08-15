import { ApiProperty } from '@nestjs/swagger';
import { PosterProps } from 'src/common/interface/poster.interface';
import { Musical } from 'src/common/entities/musical.entity';
import { MusicalNumberProps } from 'src/common/interface/musical-number.interface';

// For deprecated API
export class MusicalPosterDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  title: string;

  @ApiProperty()
  poster: PosterProps;

  constructor(musicalData: MusicalPosterDto) {
    Object.assign(this, musicalData);
  }
}

export class MusicalDto {
  @ApiProperty()
  title: string;

  @ApiProperty()
  synopsis: string;

  @ApiProperty()
  imageUrl: string;

  @ApiProperty()
  numbers: MusicalNumberProps[];

  constructor(musicalData: Musical) {
    this.title = musicalData.title;
    this.synopsis = musicalData.synopsis;
    this.imageUrl = musicalData.poster.imageUrl;
    this.numbers = musicalData.numbers.map((number) => {
      const actors = number.actors.map((actor) => actor.name);

      return { ...number, actors };
    });
  }
}
