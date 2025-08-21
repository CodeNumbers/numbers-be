import { ApiProperty } from '@nestjs/swagger';

export class MusicalNumberDto {
  @ApiProperty()
  act: number;

  @ApiProperty()
  title: string;

  @ApiProperty()
  order: number;

  @ApiProperty()
  videoUrl: string;

  @ApiProperty()
  actors: string[];
}
