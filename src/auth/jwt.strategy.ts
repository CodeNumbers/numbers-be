import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SignInDto } from './auth.dto';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly configService: ConfigService) {
    super({
      // Get token from header
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),

      // Verifying JWT expiration time flag : true false
      ignoreExpiration: false,

      // jwt.verify -> Verifying JWT
      // After verification pass payload to validate
      secretOrKey: configService.get<string>('JWT_SECRET')!,
    });
  }

  validate(payload: SignInDto) {
    return { id: payload.id };
  }
}
