import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { InquiryService } from './inquiry.service';
import { CreateInquiryDto } from './dto/create-inquiry.dto';
import { UpdateInquiryDto } from './dto/update-inquiry.dto';
import { ApiBearerAuth, ApiOperation, ApiQuery } from '@nestjs/swagger';
import type { Request } from 'express';
import AuthGuard from 'src/app/middlewares/auth.guard';
import pick from 'src/app/helpers/pick';

@Controller('inquiry')
export class InquiryController {
  constructor(private readonly inquiryService: InquiryService) {}

  @Post()
  @ApiOperation({ summary: 'Create inquiry' })
  @ApiBearerAuth('access-token')
  @UseGuards(AuthGuard('user', 'admin'))
  @HttpCode(HttpStatus.CREATED)
  async createInquiry(
    @Req() req: Request,
    @Body() createInquiryDto: CreateInquiryDto,
  ) {
    const result = await this.inquiryService.createInquiry(
      req.user!.id,
      createInquiryDto,
    );

    return {
      message: 'Inquiry create successfully',
      data: result,
    };
  }

  @Get()
  @ApiOperation({ summary: 'Get all inquiries' })
  @ApiBearerAuth('access-token')
  @UseGuards(AuthGuard('admin', 'user'))
  @ApiQuery({
    name: 'searchTerm',
    type: String,
    required: false,
    description: 'Search term',
  })
  @ApiQuery({
    name: 'firstName',
    type: String,
    required: false,
    description: 'First name',
  })
  @ApiQuery({
    name: 'lastName',
    type: String,
    required: false,
    description: 'Last name',
  })
  @ApiQuery({
    name: 'email',
    type: String,
    required: false,
    description: 'Email',
  })
  @ApiQuery({
    name: 'phoneNumber',
    type: String,
    required: false,
    description: 'Phone number',
  })
  @ApiQuery({
    name: 'message',
    type: String,
    required: false,
    description: 'Message',
  })
  @ApiQuery({
    name: 'limit',
    type: Number,
    required: false,
    description: 'Limit',
  })
  @ApiQuery({
    name: 'page',
    type: Number,
    required: false,
    description: 'Page',
  })
  @ApiQuery({
    name: 'sortBy',
    type: String,
    required: false,
    description: 'Sort by',
  })
  @ApiQuery({
    name: 'sortOrder',
    type: String,
    required: false,
    description: 'Sort order',
  })
  @HttpCode(HttpStatus.OK)
  async getAllInquiries(@Req() req: Request) {
    const filters = pick(req.query, [
      'searchTerm',
      'firstName',
      'lastName',
      'email',
      'phoneNumber',
      'message',
    ]);

    const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);
    const result = await this.inquiryService.findAllInquiries(
      req.user!.id,
      filters,
      options,
    );

    return {
      message: 'All inquiries fetched successfully',
      data: result.data,
      meta: result.meta,
    };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get inquiry by ID' })
  @HttpCode(HttpStatus.OK)
  async findInquiryById(@Param('id') id: string) {
    const result = await this.inquiryService.findInquiryById(id);
    return {
      message: 'Inquiry fetched successfully',
      data: result,
    };
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update inquiry' })
  @ApiBearerAuth('access-token')
  @UseGuards(AuthGuard('admin', 'user'))
  @HttpCode(HttpStatus.OK)
  async updateInquiry(@Param('id') id: string, @Body() updateInquiryDto: UpdateInquiryDto) {
    const result = await this.inquiryService.updateInquiry(id, updateInquiryDto);
    return {
      message: 'Inquiry updated successfully',
      data: result,
    };
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete inquiry' })
  @ApiBearerAuth('access-token')
  @UseGuards(AuthGuard('admin'))
  @HttpCode(HttpStatus.OK)
  async deleteInquiry(@Param('id') id: string) {
    const result = await this.inquiryService.deleteInquiry(id);
    return {
      message: 'Inquiry deleted successfully',
      data: result,
    };
  }
}
