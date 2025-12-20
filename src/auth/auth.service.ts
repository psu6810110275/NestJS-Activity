import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  // 1. ตรวจสอบ Email และ Password
  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOneByEmail(email);
    
    // ถ้าเจอ user และ password ตรงกัน (ใช้ bcrypt เช็ค)
    if (user && (await bcrypt.compare(pass, user.password))) {
      const { password, ...result } = user; // ตัด password ออกก่อนส่งกลับ
      return result;
    }
    return null;
  }

  // 2. สร้าง Token (Payload คือข้อมูลที่จะฝังใน Token)
  async login(user: any) {
    const payload = { username: user.email, sub: user.id, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}