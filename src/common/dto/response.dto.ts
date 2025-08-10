import { ApiProperty } from '@nestjs/swagger';

export class ResponseDto<T> {
  @ApiProperty()
  statusCode: number;

  @ApiProperty()
  message: string;

  data: T[];

  constructor(statusCode: number, message: string, data: T[] | null = null) {
    this.statusCode = statusCode;
    this.message = message;
    if (data) this.data = data.slice();
  }
}
