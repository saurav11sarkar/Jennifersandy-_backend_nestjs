import {
  Controller,
  Post,
  HttpStatus,
  HttpCode,
  UseGuards,
} from '@nestjs/common';
import { CrmService } from './crm.service';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import AuthGuard from 'src/app/middlewares/auth.guard';

@ApiTags('crm')
@Controller('crm')
export class CrmController {
  constructor(private readonly crmService: CrmService) {}

  @Post('sync/onoffice')
  @ApiOperation({ summary: 'Manually trigger full onOffice sync (admin)' })
  @ApiBearerAuth('access-token')
  @UseGuards(AuthGuard('admin'))
  @HttpCode(HttpStatus.OK)
  async syncProducts() {
    const result = await this.crmService.syncProducts();
    return { message: 'CRM sync completed successfully', data: result };
  }
}
