import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BookCategory } from '../../book-category/entities/book-category.entity';

@Entity()
export class Book {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  author: string;

  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @Column({ default: 0 })
  likeCount: number;

  // เชื่อมกับตาราง BookCategory (Many Books -> One Category)
  @ManyToOne(() => BookCategory, (category) => category.id, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'categoryId' })
  category: BookCategory;

  @Column({ nullable: true })
  categoryId: string; // ใช้รับค่า ID ตรงๆ เพื่อบันทึก
}