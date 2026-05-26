import { Module } from '@nestjs/common';
import { InquiryService } from './inquiry.service';
import { InquiryController } from './inquiry.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Inquiry, InquirySchema } from './entities/inquiry.entity';
import { User, UserSchema } from '../user/entities/user.entity';
import { Onoffice, OnofficeSchema } from '../onoffice/entities/onoffice.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Inquiry.name, schema: InquirySchema },
      { name: User.name, schema: UserSchema },
      { name: Onoffice.name, schema: OnofficeSchema },
    ]),
  ],
  controllers: [InquiryController],
  providers: [InquiryService],
})
export class InquiryModule {}
