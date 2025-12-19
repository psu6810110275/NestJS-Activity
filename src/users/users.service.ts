import { Injectable, OnModuleInit } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User, UserRole } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
@Injectable()
export class UsersService implements OnModuleInit {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  // ✅ Admin Seeding: สร้าง Admin อัตโนมัติถ้ายังไม่มี
  async onModuleInit() {
    const admin = await this.findOneByEmail('admin@bookstore.com');
    if (!admin) {
      console.log('🌱 Seeding Admin User...');
      // เราเรียกใช้ฟังก์ชัน create เพื่อให้มัน Hash password ให้
      await this.create({
        email: 'admin@bookstore.com',
        password: 'adminpassword',
        role: UserRole.ADMIN,
      });
      console.log('✅ Admin Created');
    }
  }

  async create(createUserDto: CreateUserDto) {
    // ✅ 1. Hash Password ก่อนบันทึก
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(createUserDto.password, salt);

    // ✅ 2. สร้าง User โดยใช้ password ที่ hash แล้ว
    const user = this.userRepository.create({
      ...createUserDto,
      password: hashedPassword,
    });

    return this.userRepository.save(user);
  }

  findAll() {
    return this.userRepository.find();
  }

  findOne(id: string) {
    return this.userRepository.findOneBy({ id });
  }

  // ✅ เพิ่มฟังก์ชันนี้เพื่อใช้ตอน Login
  async findOneByEmail(email: string) {
    return this.userRepository.findOneBy({ email });
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return this.userRepository.update(id, updateUserDto);
  }

  remove(id: string) {
    return this.userRepository.delete(id);
  }
}