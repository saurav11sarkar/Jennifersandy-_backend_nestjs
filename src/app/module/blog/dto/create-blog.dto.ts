import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsBoolean, IsDateString, IsOptional, IsString } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateBlogDto {
  @ApiProperty({ example: 'Living in Düsseldorf: The Ultimate Guide' })
  @IsString()
  title!: string;

  @ApiPropertyOptional({ type: 'string', format: 'binary' })
  @IsOptional()
  thumbnail?: string;

  @ApiPropertyOptional({ example: 'A short preview of the blog post...' })
  @IsOptional()
  @IsString()
  excerpt?: string;

  @ApiPropertyOptional({ example: '<p>Full article HTML/Markdown content here...</p>' })
  @IsOptional()
  @IsString()
  content?: string;

  @ApiPropertyOptional({ example: 'Living' })
  @IsOptional()
  @IsString()
  category?: string;

  @ApiPropertyOptional({ example: ['düsseldorf', 'tips', 'expat'] })
  @IsOptional()
  @IsArray()
  @Transform(({ value }) => (typeof value === 'string' ? JSON.parse(value) : value))
  tags?: string[];

  @ApiPropertyOptional({ example: 'Jenny Fischer' })
  @IsOptional()
  @IsString()
  author?: string;

  @ApiPropertyOptional({ example: '2025-01-01T00:00:00.000Z' })
  @IsOptional()
  @IsDateString()
  publishedAt?: string;

  @ApiPropertyOptional({ example: true })
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => (typeof value === 'string' ? value === 'true' : value))
  isPublished?: boolean;
}
