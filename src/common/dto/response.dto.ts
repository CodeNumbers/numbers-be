import { ApiProperty } from '@nestjs/swagger';

export class ResponseDtoInArray<T> {
  @ApiProperty()
  message: string;

  @ApiProperty({ type: [Object] })
  data: T[];

  constructor(message: string, data: T[]) {
    this.message = message;
    this.data = data.slice();
  }
}

export class ResponseDto<T> {
  @ApiProperty()
  message: string;

  @ApiProperty({ type: Object })
  data?: T | null;

  constructor(message: string, data?: T) {
    this.message = message;
    if (data) this.data = data;
  }
}
