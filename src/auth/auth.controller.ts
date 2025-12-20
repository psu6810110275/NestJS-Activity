import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

// DTO สำหรับรับค่า Login (สร้างในไฟล์นี้เลยเพื่อความง่าย)
export class LoginDto {
  email: string;
  password: string;
}

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() body: LoginDto) {
    // ส่งไปเช็คที่ Service
    const user = await this.authService.validateUser(body.email, body.password);
    
    if (!user) {
      throw new UnauthorizedException('Email หรือ Password ไม่ถูกต้อง');
    }
    
    // ถ้าผ่าน ให้สร้าง Token กลับไป
    return this.authService.login(user);
  }
}