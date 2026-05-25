import { Module } from '@nestjs/common';
import { CrmService } from './crm.service';
import { CrmController } from './crm.controller';
<<<<<<< HEAD
import { OnofficeModule } from '../onoffice/onoffice.module';

@Module({
  imports: [OnofficeModule],
=======
import { ProductModule } from '../product/product.module';

@Module({
  imports: [ProductModule],
>>>>>>> 431f750ae3cc5be5eb5fbdf8934da32a84e20e78
  controllers: [CrmController],
  providers: [CrmService],
})
export class CrmModule {}
