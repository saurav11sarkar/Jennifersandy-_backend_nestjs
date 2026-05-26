import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsEmail,
  IsPhoneNumber,
  IsNotEmpty,
  MinLength,
  MaxLength,
  IsMongoId,
} from 'class-validator';

export class CreateInquiryDto {
  @ApiProperty({ example: '691f8f4a6e1c2d5c1b3f4a6e' })
  @IsMongoId()
  @IsNotEmpty()
  onOfficeId: string;

  @ApiProperty({ example: 'Saurav' })
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({ example: 'Sarkar' })
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @ApiProperty({ example: '[EMAIL_ADDRESS]' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: '+919876543210' })
  @IsString()
  @IsNotEmpty()
  @IsPhoneNumber()
  phoneNumber: string;

  @ApiProperty({
    example:
      'Hello, I am interested in your property. Can you please provide me with more information?',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(10)
  @MaxLength(500)
  message: string;
}
