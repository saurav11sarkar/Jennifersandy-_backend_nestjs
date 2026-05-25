import {
  Controller,
  Get,
  Post,
  Query,
  HttpCode,
  HttpStatus,
  Param,
} from '@nestjs/common';
import { OnofficeService } from './onoffice.service';
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiTags('onoffice')
@Controller('onoffice')
export class OnofficeController {
  constructor(private readonly onofficeService: OnofficeService) {}

  // DB থেকে fast get
  @Get('estates')
  @ApiOperation({ summary: 'Get all estates from DB (fast)' })
  @ApiQuery({ name: 'page', required: false, type: Number, example: 0 })
  @ApiQuery({ name: 'limit', required: false, type: Number, example: 20 })
  @HttpCode(HttpStatus.OK)
  async getEstates(
    @Query('page') page: number = 0,
    @Query('limit') limit: number = 20,
  ) {
    const result = await this.onofficeService.getEstatesFromDB(
      Number(page),
      Number(limit),
    );
    return {
      message: 'Estates fetched successfully',
      meta: result.meta,
      data: result.data,
    };
  }

  // Single estate by onofficeId
  @Get('estates/:id')
  @ApiOperation({ summary: 'Get single estate by onofficeId' })
  @HttpCode(HttpStatus.OK)
  async getEstateById(@Param('id') id: string) {
    const result = await this.onofficeService.getEstateByIdFromDB(parseInt(id));
    return { message: 'Estate fetched successfully', data: result };
  }
}
