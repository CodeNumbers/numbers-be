import {
  Body,
  Controller,
  HttpStatus,
  Post,
  UnauthorizedException,
  HttpCode,
} from '@nestjs/common';
import { ApiBody, ApiOperation } from '@nestjs/swagger';
import { AdminService } from './admin.service';
import { SignInDto } from './admin.dto';
import { ResponseDto } from 'src/common/dto/response.dto';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  // Swagger: /admin/signin API Description
  @Post('signin')
  @ApiOperation({
    summary: '로그인 ▶️ 사용자 인증',
    description: 'Body: id, password required',
  })
  @ApiBody({
    type: SignInDto,
  })

  // /admin/signin Function
  @HttpCode(HttpStatus.OK)
  async signin(
    @Body() signInDto: SignInDto,
  ): Promise<ResponseDto<SignInDto> | UnauthorizedException> {
    const isAdminResult = await this.adminService.isAdmin(signInDto);
    if (isAdminResult) return new ResponseDto('Admin Verification Success.');
    else throw new UnauthorizedException();
  }
}
