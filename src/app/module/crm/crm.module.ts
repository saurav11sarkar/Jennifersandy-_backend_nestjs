import { Module } from '@nestjs/common';
import { CrmService } from './crm.service';
import { CrmController } from './crm.controller';
import { OnofficeModule } from '../onoffice/onoffice.module';

@Module({
  imports: [OnofficeModule],
  controllers: [CrmController],
  providers: [CrmService],
})
export class CrmModule {}
