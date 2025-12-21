import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from './entities/book.entity';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>,
  ) {}

  create(createBookDto: CreateBookDto) {
    return this.bookRepository.save(createBookDto);
  }

  findAll() {
    // relations: ['category'] คือสั่งให้ดึงข้อมูลหมวดหมู่มาโชว์ด้วย
    return this.bookRepository.find({ relations: ['category'] });
  }

  async findOne(id: string) {
    const book = await this.bookRepository.findOne({
      where: { id },
      relations: ['category'],
    });
    if (!book) throw new NotFoundException(`Book #${id} not found`);
    return book;
  }

  update(id: string, updateBookDto: UpdateBookDto) {
    return this.bookRepository.update(id, updateBookDto);
  }

  async remove(id: string) {
    const result = await this.bookRepository.delete(id);
    
    // 👇 เช็คตรงนี้: ถ้าไม่มีแถวไหนโดนกระทบ (affected === 0) แปลว่า ID มั่ว
    if (result.affected === 0) {
      throw new NotFoundException(`Book #${id} not found`);
    }

    return { message: `Book #${id} deleted successfully` };
  }

  async incrementLikes(id: string) {
    const book = await this.findOne(id);
    book.likeCount += 1;
    return this.bookRepository.save(book);
  }
}