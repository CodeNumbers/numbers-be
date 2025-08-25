import { ApiProperty } from '@nestjs/swagger';

export class SignInDto {
  @ApiProperty({ type: 'string', example: 'admin' })
  id: string;

  @ApiProperty({ type: 'string', example: 'admin' })
  password: string;
}
