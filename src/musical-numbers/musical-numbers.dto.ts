import { ApiProperty } from '@nestjs/swagger';
import { MusicalNumber } from 'src/common/entities/musical-number.entity';

export class MusicalNumbersDto {
  @ApiProperty({ type: 'number', description: '막' })
  act: number;

  @ApiProperty({ type: 'string' })
  title: string;

  @ApiProperty({ type: 'number' })
  order: number;

  @ApiProperty({ type: 'string', description: '영상 링크. 중복 불가능' })
  videoUrl: string;

  @ApiProperty({ type: [String] })
  actors: string[];

  constructor(musicalNumber: MusicalNumber) {
    this.act = musicalNumber.act;
    this.title = musicalNumber.title;
    this.order = musicalNumber.order;
    this.videoUrl = musicalNumber.videoUrl;
    this.actors = musicalNumber.actors.map((actor) => actor.name);
  }
}
