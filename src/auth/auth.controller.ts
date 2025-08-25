import {
  Controller,
  HttpStatus,
  Post,
  HttpCode,
  UseGuards,
  Request,
} from '@nestjs/common';
import {
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { ResponseDto } from 'src/common/dto/response.dto';
import { SignInDto } from './auth.dto';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // POST /auth/signin
  @Post('signin')
  @UseGuards(LocalAuthGuard)
  @HttpCode(HttpStatus.OK)

  // Swagger
  @ApiOperation({
    summary: '로그인 ▶️ 사용자 인증',
    description: 'Body: id, password required',
  })
  @ApiBody({ type: SignInDto })
  @ApiOkResponse({
    description: 'Success to sign in',
    schema: {
      type: 'object',
      properties: {
        message: { type: 'string', example: 'Success to sign in' },
        data: {
          type: 'object',
          example: {
            accessToken: 'accessToken sample',
          },
        },
      },
    },
  })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })

  // Function
  signin(
    @Request() req: { user: SignInDto },
  ): ResponseDto<{ accessToken: string }> {
    const accessToken = this.authService.publishAccessToken(req.user.id);
    return new ResponseDto('Success to sign in.', accessToken);
  }
}
