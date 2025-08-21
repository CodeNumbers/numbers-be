import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  private adminId: string;
  private adminPasswordHashed: string;

  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {
    this.adminId = this.configService.get<string>('ADMIN_ID')!;
    const adminPassword = this.configService.get<string>('ADMIN_PASSWORD')!;
    this.adminPasswordHashed = bcrypt.hashSync(adminPassword, 10);
  }

  async isAdmin(id: string, password: string): Promise<boolean> {
    // Compare ID
    if (id !== this.adminId) return false;

    // Compare password
    const compareResult = await bcrypt.compare(
      password,
      this.adminPasswordHashed,
    );

    console.log(compareResult);

    return compareResult;
  }

  publishAccessToken(id: string) {
    const payload = { id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
