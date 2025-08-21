import { ApiProperty } from '@nestjs/swagger';
import { Musical } from 'src/common/entities/musical.entity';
import { MusicalNumberDto } from 'src/musicalNumbers/musicalNumber.dto';

// For deprecated API
export class MusicalPosterDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  title: string;

  @ApiProperty()
  poster: {
    imageUrl: string;
  };

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

  @ApiProperty({ type: [MusicalNumberDto] })
  numbers: MusicalNumberDto[];

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
