import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateOnOfficeCredentialsDto {
  @ApiPropertyOptional({ example: 'abc123token' })
  @IsOptional()
  @IsString()
  token?: string;

  @ApiPropertyOptional({ example: 'abc123secret' })
  @IsOptional()
  @IsString()
  secret?: string;

  @ApiPropertyOptional({ example: 'estate_token' })
  @IsOptional()
  @IsString()
  estateToken?: string;

  @ApiPropertyOptional({ example: 'estate_secret' })
  @IsOptional()
  @IsString()
  estateSecret?: string;

  @ApiPropertyOptional({ example: 'picture_token' })
  @IsOptional()
  @IsString()
  pictureToken?: string;

  @ApiPropertyOptional({ example: 'picture_secret' })
  @IsOptional()
  @IsString()
  pictureSecret?: string;
}
