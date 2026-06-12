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
  Req,
  UseGuards,
} from '@nestjs/common';
import { LandlordService } from './landlord.service';
import { CreateLandlordDto } from './dto/create-landlord.dto';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import AuthGuard from 'src/app/middlewares/auth.guard';
import pick from 'src/app/helpers/pick';
import type { Request } from 'express';

@ApiTags('Landlord')
@Controller('landlord')
export class LandlordController {
  constructor(private readonly landlordService: LandlordService) {}

  // Public: anyone can submit a landlord offer
  @Post()
  @ApiOperation({ summary: 'Submit a landlord property offer (public)' })
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() dto: CreateLandlordDto) {
    const result = await this.landlordService.create(dto);
    return { message: 'Submission received. We will contact you soon.', data: result };
  }

  @Get()
  @ApiOperation({ summary: 'Get all landlord submissions (admin)' })
  @ApiBearerAuth('access-token')
  @UseGuards(AuthGuard('admin'))
  @HttpCode(HttpStatus.OK)
  async findAll(@Req() req: Request) {
    const options = pick(req.query, ['page', 'limit', 'sortBy', 'sortOrder']);
    const result = await this.landlordService.findAll(options);
    return { message: 'Landlord submissions fetched', meta: result.meta, data: result.data };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get single landlord submission (admin)' })
  @ApiBearerAuth('access-token')
  @UseGuards(AuthGuard('admin'))
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('id') id: string) {
    const result = await this.landlordService.findOne(id);
    return { message: 'Landlord submission fetched', data: result };
  }

  @Patch(':id/status')
  @ApiOperation({ summary: 'Update landlord submission status (admin)' })
  @ApiBearerAuth('access-token')
  @UseGuards(AuthGuard('admin'))
  @ApiBody({ schema: { properties: { status: { type: 'string', enum: ['new', 'contacted', 'closed'] } } } })
  @HttpCode(HttpStatus.OK)
  async updateStatus(@Param('id') id: string, @Body('status') status: string) {
    const result = await this.landlordService.updateStatus(id, status);
    return { message: 'Status updated', data: result };
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete landlord submission (admin)' })
  @ApiBearerAuth('access-token')
  @UseGuards(AuthGuard('admin'))
  @HttpCode(HttpStatus.OK)
  async remove(@Param('id') id: string) {
    const result = await this.landlordService.remove(id);
    return { message: 'Deleted successfully', data: result };
  }
}
