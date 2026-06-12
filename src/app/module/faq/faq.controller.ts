import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { FaqService } from './faq.service';
import { CreateFaqDto } from './dto/create-faq.dto';
import { ApiBearerAuth, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import AuthGuard from 'src/app/middlewares/auth.guard';

@ApiTags('FAQ')
@Controller('faq')
export class FaqController {
  constructor(private readonly faqService: FaqService) {}

  @Post()
  @ApiOperation({ summary: 'Create FAQ entry (admin)' })
  @ApiBearerAuth('access-token')
  @UseGuards(AuthGuard('admin'))
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() dto: CreateFaqDto) {
    const result = await this.faqService.create(dto);
    return { message: 'FAQ created', data: result };
  }

  // Public: returns only active FAQs sorted by order
  @Get()
  @ApiOperation({ summary: 'Get all active FAQs (public)' })
  @ApiQuery({ name: 'category', required: false, type: String })
  @HttpCode(HttpStatus.OK)
  async findAll(@Query('category') category?: string) {
    const data = await this.faqService.findAll(category);
    return { message: 'FAQs fetched', data };
  }

  @Get('admin')
  @ApiOperation({ summary: 'Get all FAQs including inactive (admin)' })
  @ApiBearerAuth('access-token')
  @UseGuards(AuthGuard('admin'))
  @HttpCode(HttpStatus.OK)
  async findAllAdmin() {
    const data = await this.faqService.findAllAdmin();
    return { message: 'All FAQs fetched', data };
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update FAQ entry (admin)' })
  @ApiBearerAuth('access-token')
  @UseGuards(AuthGuard('admin'))
  @HttpCode(HttpStatus.OK)
  async update(@Param('id') id: string, @Body() dto: Partial<CreateFaqDto>) {
    const result = await this.faqService.update(id, dto);
    return { message: 'FAQ updated', data: result };
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete FAQ entry (admin)' })
  @ApiBearerAuth('access-token')
  @UseGuards(AuthGuard('admin'))
  @HttpCode(HttpStatus.OK)
  async remove(@Param('id') id: string) {
    const result = await this.faqService.remove(id);
    return { message: 'FAQ deleted', data: result };
  }
}
