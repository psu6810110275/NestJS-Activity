import { IsEmail, IsNotEmpty, MinLength, IsOptional, IsEnum } from 'class-validator';
import { UserRole } from '../entities/user.entity'; // ตรวจสอบ path ให้ถูกต้อง

export class CreateUserDto {
  @IsNotEmpty({ message: 'Email ห้ามว่าง' })
  @IsEmail({}, { message: 'รูปแบบ Email ไม่ถูกต้อง' })
  email: string;

  @IsNotEmpty({ message: 'Password ห้ามว่าง' })
  @MinLength(6, { message: 'Password ต้องยาวอย่างน้อย 6 ตัวอักษร' })
  password: string;

  // ✅ เพิ่ม field นี้เพื่อให้ Seeding ใน Service ทำงานได้โดยไม่ต้องใช้ 'as any'
  // ใช้ @IsOptional() เพราะตอน User สมัครสมาชิกเอง เราจะไม่ให้เขาส่ง role มา (เราจะ set default เป็น USER เอง)
  @IsOptional() 
  @IsEnum(UserRole)
  role?: UserRole;
}