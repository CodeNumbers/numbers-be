import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { SignInDto } from './admin.dto';

@Injectable()
export class AdminService {
  private adminId: string;
  private adminPasswordHashed: string;

  constructor(private readonly configService: ConfigService) {
    this.adminId = this.configService.get<string>('ADMIN_ID')!;
    const adminPassword = this.configService.get<string>('ADMIN_PASSWORD')!;
    this.adminPasswordHashed = bcrypt.hashSync(adminPassword, 10);
  }

  async isAdmin(signInDto: SignInDto) {
    // Compare ID
    if (signInDto.id !== this.adminId) return false;

    // Compare password
    const passwordHashed = await bcrypt.hash(signInDto.password, 10);
    const compareResult = await bcrypt.compare(
      passwordHashed,
      this.adminPasswordHashed,
    );
    if (compareResult) return false;
    return true;
  }
}
