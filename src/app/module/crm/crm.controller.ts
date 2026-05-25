import {
  Controller,
  Post,
  Put,
  Body,
  HttpStatus,
  HttpCode,
  UseGuards,
} from '@nestjs/common';
import { CrmService } from './crm.service';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import AuthGuard from 'src/app/middlewares/auth.guard';
import { UpdateOnOfficeCredentialsDto } from './dto/update-onoffice-credentials.dto';
import { SyncOnOfficeProductsDto } from '../onoffice/dto/syncOnOfficeProducts.dto';

@ApiTags('crm')
@Controller('crm')
export class CrmController {
  constructor(private readonly crmService: CrmService) {}

  @Post('sync/onoffice')
  @ApiOperation({ summary: 'Sync onOffice estates into DB' })
  @ApiBearerAuth('access-token')
  @UseGuards(AuthGuard('admin'))
  @ApiBody({ type: SyncOnOfficeProductsDto, required: false })
  @HttpCode(HttpStatus.OK)
  async syncProducts(@Body() syncDto: SyncOnOfficeProductsDto) {
    const result = await this.crmService.syncProducts(syncDto);
    return { message: 'CRM products synced successfully', data: result };
  }

  @Put('onoffice/credentials')
  @ApiOperation({ summary: 'Update regenerated onOffice token and secret' })
  @ApiBearerAuth('access-token')
  @UseGuards(AuthGuard('admin'))
  @ApiBody({ type: UpdateOnOfficeCredentialsDto })
  @HttpCode(HttpStatus.OK)
  async updateOnOfficeCredentials(@Body() dto: UpdateOnOfficeCredentialsDto) {
    const result = await this.crmService.updateOnOfficeCredentials(dto);
    return {
      message: 'onOffice credentials updated successfully',
      data: result,
    };
  }
}
