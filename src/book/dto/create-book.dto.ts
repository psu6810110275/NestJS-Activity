import { IsString, IsNotEmpty, IsNumber, IsUUID, Min, IsOptional } from 'class-validator';

export class CreateBookDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  author: string;

  @IsNumber()
  @Min(0)
  price: number;

  @IsUUID()
  @IsNotEmpty()
  categoryId: string; // ต้องส่ง ID หมวดหมู่มาด้วยเสมอ

  @IsOptional()
  likeCount?: number;
}