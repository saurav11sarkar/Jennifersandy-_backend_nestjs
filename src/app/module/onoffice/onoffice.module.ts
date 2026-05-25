import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { MongooseModule } from '@nestjs/mongoose';
import { OnofficeService } from './onoffice.service';
import { OnofficeController } from './onoffice.controller';
import { Onoffice, OnofficeSchema } from './entities/onoffice.entity';

@Module({
  imports: [
    HttpModule,
    MongooseModule.forFeature([
      { name: Onoffice.name, schema: OnofficeSchema },
    ]),
  ],
  controllers: [OnofficeController],
  providers: [OnofficeService],
  exports: [OnofficeService],
})
export class OnofficeModule {}
