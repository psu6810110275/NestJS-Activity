import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
// 👇 1. Import ของที่ต้องใช้สำหรับการป้องกัน
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { UserRole } from '../users/entities/user.entity';

@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  // 🔒 POST: สร้างหนังสือ (ต้อง Login + ต้องเป็น ADMIN)
  @Post()
  @UseGuards(AuthGuard('jwt'), RolesGuard) // ตรวจ Token ก่อน แล้วค่อยตรวจ Role
  @Roles(UserRole.ADMIN) // แปะป้ายว่าห้องนี้เฉพาะ ADMIN
  create(@Body() createBookDto: CreateBookDto) {
    return this.bookService.create(createBookDto);
  }

  // 🔓 GET: ดูหนังสือทั้งหมด (เปิด Public)
  @Get()
  findAll() {
    return this.bookService.findAll();
  }

  // 🔓 GET: ดูเล่มเดียว (เปิด Public)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bookService.findOne(id);
  }

  // 🔒 PATCH Like: กดไลค์ (ต้อง Login แต่เป็น Role อะไรก็ได้)
  @Patch(':id/like')
  @UseGuards(AuthGuard('jwt')) // แค่มี Token ก็กดไลค์ได้
  likeBook(@Param('id') id: string) {
    return this.bookService.incrementLikes(id);
  }

  // 🔒 PATCH Update: แก้ไขข้อมูล (ต้อง Login + ต้องเป็น ADMIN)
  @Patch(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.ADMIN)
  update(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto) {
    return this.bookService.update(id, updateBookDto);
  }

  // 🔒 DELETE: ลบหนังสือ (ต้อง Login + ต้องเป็น ADMIN)
  @Delete(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.ADMIN)
  remove(@Param('id') id: string) {
    return this.bookService.remove(id);
  }
}