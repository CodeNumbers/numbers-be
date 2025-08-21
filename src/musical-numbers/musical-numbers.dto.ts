import { ApiProperty } from '@nestjs/swagger';

export class MusicalNumbersDto {
  @ApiProperty({ type: 'number' })
  act: number;

  @ApiProperty({ type: 'string' })
  title: string;

  @ApiProperty({ type: 'number' })
  order: number;

  @ApiProperty({ type: 'string' })
  videoUrl: string;

  @ApiProperty({ type: [String] })
  actors: string[];
}
