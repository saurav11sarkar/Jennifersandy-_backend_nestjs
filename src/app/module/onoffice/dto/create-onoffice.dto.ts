import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  IsNumber,
  IsBoolean,
  IsArray,
  IsOptional,
  IsNotEmpty,
  ValidateNested,
  IsObject,
} from 'class-validator';
import { Type } from 'class-transformer';

class AmenitiesDto {
  @ApiProperty({ example: true }) @IsBoolean() furnished: boolean;
  @ApiProperty({ example: true }) @IsBoolean() transportationParking: boolean;
  @ApiProperty({ example: true }) @IsBoolean() wifi: boolean;
  @ApiProperty({ example: false }) @IsBoolean() elevator: boolean;
  @ApiProperty({ example: true }) @IsBoolean() fittedKitchen: boolean;
  @ApiProperty({ example: true }) @IsBoolean() emergencyAlertSystem: boolean;
  @ApiProperty({ example: true }) @IsBoolean() moveInCoordination: boolean;
  @ApiProperty({ example: true }) @IsBoolean() mealPreparationService: boolean;
  @ApiProperty({ example: false }) @IsBoolean() petFriendly: boolean;
  @ApiProperty({ example: true }) @IsBoolean() balcony: boolean;
}

class LocationHighlightDto {
  @ApiProperty({ example: 'Subway/S-Bahn' }) @IsString() label: string;
  @ApiProperty({ example: '5 min' }) @IsString() distance: string;
}

export class CreateOnofficeDto {
  @ApiProperty({ example: 229 })
  @IsNumber()
  onofficeId: number;

  @ApiPropertyOptional({ example: 'May 1, 2026' })
  @IsOptional()
  @IsString()
  availableFrom: string;

  @ApiPropertyOptional({ example: '3 months' })
  @IsOptional()
  @IsString()
  minimumStay: string;

  @ApiPropertyOptional({ example: '1,800€' })
  @IsOptional()
  @IsString()
  deposit: string;

  @ApiPropertyOptional({ example: 'None' })
  @IsOptional()
  @IsString()
  serviceFee: string;

  @ApiProperty({ type: AmenitiesDto })
  @IsObject()
  @ValidateNested()
  @Type(() => AmenitiesDto)
  amenities: AmenitiesDto;

  @ApiPropertyOptional({ example: ['Comfortable living spaces'] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  whyChoose: string[];

  @ApiPropertyOptional({
    type: [LocationHighlightDto],
    example: [{ label: 'Subway/S-Bahn', distance: '5 min' }],
  })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => LocationHighlightDto)
  locationHighlights: LocationHighlightDto[];

  
}
