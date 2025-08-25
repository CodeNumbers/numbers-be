import { ApiProperty } from '@nestjs/swagger';
import { Musical } from 'src/common/entities/musical.entity';
import { MusicalNumbersDto } from 'src/musical-numbers/musical-numbers.dto';

class MusicalDto {
  @ApiProperty({ type: 'string' })
  title: string;

  @ApiProperty({ type: 'string' })
  synopsis: string;

  @ApiProperty({ type: [MusicalNumbersDto] })
  numbers: MusicalNumbersDto[];

  constructor(musicalData: Musical) {
    this.title = musicalData.title;
    this.synopsis = musicalData.synopsis;
    this.numbers = musicalData.numbers.map(
      (number) => new MusicalNumbersDto(number), // 필요한 필드만 DTO로 변환
    );
  }
}

export class ReadMusicalDto extends MusicalDto {
  @ApiProperty({ type: 'string' })
  imageUrl: string;

  constructor(musicalData: Musical) {
    super(musicalData);
    this.imageUrl = musicalData.poster.imageUrl;
  }
}

export class CreateMusicalDto extends MusicalDto {
  constructor(musicalData: Musical) {
    super(musicalData);
  }
}
