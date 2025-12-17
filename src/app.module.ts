import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookCategoryModule } from './book-category/book-category.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'admin',
      password: 'password123',
      database: 'bookstore_dev',
      autoLoadEntities: true, // ✅ โหลด Entity อัตโนมัติ ไม่ต้องใส่ array เอง
      synchronize: true,      // ✅ สร้างตารางให้อัตโนมัติ (ใช้เฉพาะตอน Dev)
    }),
    BookCategoryModule,
  ],
})
export class AppModule {}