import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsNumber, Min } from 'class-validator';

export class SyncOnOfficeProductsDto {
  @ApiPropertyOptional({ example: 0, description: 'Start from page' })
  @IsOptional()
  @IsNumber()
  @Min(0)
  page?: number = 0;

  @ApiPropertyOptional({ example: 20, description: 'How many per page' })
  @IsOptional()
  @IsNumber()
  limit?: number = 20;
}
