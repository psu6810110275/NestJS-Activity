import { Injectable, OnModuleInit } from '@nestjs/common';
import { CreateBookCategoryDto } from './dto/create-book-category.dto';
import { UpdateBookCategoryDto } from './dto/update-book-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BookCategory } from './entities/book-category.entity';

@Injectable()
export class BookCategoryService implements OnModuleInit {
  
  constructor(
    @InjectRepository(BookCategory)
    private readonly bookCategoryRepository: Repository<BookCategory>,
  ) {}

  // ✅ Data Seeding: สร้างข้อมูลตัวอย่างถ้าตารางยังว่าง
  async onModuleInit() {
    const count = await this.bookCategoryRepository.count();
    if (count === 0) {
      console.log('🌱 Seeding Book Categories...');
      await this.bookCategoryRepository.save([
        { name: 'Fiction', description: 'Stories and novels' },
        { name: 'Technology', description: 'Computers and engineering' },
        { name: 'History', description: 'Past events' },
      ]);
      console.log('✅ Seeding Completed!');
    }
  }

  create(createBookCategoryDto: CreateBookCategoryDto) {
    return this.bookCategoryRepository.save(createBookCategoryDto);
  }

  findAll() {
    return this.bookCategoryRepository.find(); // ✅ ดึงข้อมูลจริงจาก DB
  }

  findOne(id: string) { // ✅ รับ id เป็น string
    return this.bookCategoryRepository.findOneBy({ id });
  }

  update(id: string, updateBookCategoryDto: UpdateBookCategoryDto) { // ✅ รับ id เป็น string
    return this.bookCategoryRepository.update(id, updateBookCategoryDto);
  }

  remove(id: string) { // ✅ รับ id เป็น string
    return this.bookCategoryRepository.delete(id);
  }
}