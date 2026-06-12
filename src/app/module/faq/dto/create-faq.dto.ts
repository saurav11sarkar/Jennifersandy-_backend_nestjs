import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateFaqDto {
  @ApiProperty({ example: 'How do I schedule a viewing?' })
  @IsString()
  @IsNotEmpty()
  question!: string;

  @ApiProperty({ example: 'You can schedule a viewing by clicking the "Schedule a Viewing" button on the property page.' })
  @IsString()
  @IsNotEmpty()
  answer!: string;

  @ApiPropertyOptional({ example: 'Viewings' })
  @IsOptional()
  @IsString()
  category?: string;

  @ApiPropertyOptional({ example: 1 })
  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => Number(value))
  order?: number;

  @ApiPropertyOptional({ example: true })
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => (typeof value === 'string' ? value === 'true' : value))
  isActive?: boolean;
}
