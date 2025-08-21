import { ApiProperty } from '@nestjs/swagger';

export class DeprecatedResponseDto<T> {
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

export class ResponseDto<T> {
  @ApiProperty()
  message: string;

  data: T[];

  constructor(message: string, data: T[] | null = null) {
    this.message = message;
    if (data) this.data = data.slice();
  }
}
