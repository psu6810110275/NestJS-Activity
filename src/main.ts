import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // ตั้งค่าให้ API ทั้งหมดขึ้นต้นด้วย /api (เช่น localhost:3000/api/book-category)
  app.setGlobalPrefix('api'); 

  // ตั้งค่า Validation (ตรวจสอบข้อมูลขาเข้า)
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(3000);
}
bootstrap();