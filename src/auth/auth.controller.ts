import {
  Controller,
  HttpStatus,
  Post,
  HttpCode,
  UseGuards,
  Request,
} from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { ResponseDto } from 'src/common/dto/response.dto';
import { SignInDto } from './auth.dto';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('admin')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signin')
  @UseGuards(LocalAuthGuard)
  @HttpCode(HttpStatus.OK)

  // Swagger: /admin/signin API Description
  @ApiOperation({
    summary: '로그인 ▶️ 사용자 인증',
    description: 'Body: id, password required',
  })

  // /admin/signin Function
  signin(@Request() req: { user: SignInDto }) {
    const accessToken = this.authService.publishAccessToken(req.user.id);
    return new ResponseDto('Success to sign in.', accessToken);
  }
}
