import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class CreateBlogDto {
  @ApiPropertyOptional({ example: 'Blog Title' })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiPropertyOptional({
    type: 'string',
    format: 'binary',
    example: 'blog-thumbnail.jpg',
  })
  @IsOptional()
  thembnail?: string;

  @ApiPropertyOptional({ example: 'Blog Description' })
  @IsOptional()
  @IsString()
  description?: string;
}
