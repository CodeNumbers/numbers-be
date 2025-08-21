import { ApiProperty } from '@nestjs/swagger';

export class SignInDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  password: string;
}
