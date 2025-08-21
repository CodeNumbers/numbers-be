import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
// import { ResponseDto } from 'src/common/dto/response.dto';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'id',
    });
  }

  async validate(id: string, password: string) {
    const isAdminResult = await this.authService.isAdmin(id, password);
    if (!isAdminResult) {
      throw new UnauthorizedException();
    }
    return { id };
  }
}
