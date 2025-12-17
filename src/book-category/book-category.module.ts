import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookCategoryService } from './book-category.service';
import { BookCategoryController } from './book-category.controller';
import { BookCategory } from './entities/book-category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BookCategory])], // ✅ ลงทะเบียน Entity ตรงนี้
  controllers: [BookCategoryController],
  providers: [BookCategoryService],
})
export class BookCategoryModule {}