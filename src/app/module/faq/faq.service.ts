import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Faq, FaqDocument } from './entities/faq.entity';
import { CreateFaqDto } from './dto/create-faq.dto';

@Injectable()
export class FaqService {
  constructor(@InjectModel(Faq.name) private readonly faqModel: Model<FaqDocument>) {}

  async create(dto: CreateFaqDto) {
    return this.faqModel.create(dto);
  }

  async findAll(category?: string) {
    const filter: Record<string, any> = { isActive: true };
    if (category) filter.category = category;
    return this.faqModel.find(filter).sort({ order: 1 });
  }

  async findAllAdmin() {
    return this.faqModel.find().sort({ order: 1 });
  }

  async update(id: string, dto: Partial<CreateFaqDto>) {
    const result = await this.faqModel.findByIdAndUpdate(id, dto, { new: true });
    if (!result) throw new HttpException('FAQ not found', 404);
    return result;
  }

  async remove(id: string) {
    const result = await this.faqModel.findByIdAndDelete(id);
    if (!result) throw new HttpException('FAQ not found', 404);
    return result;
  }
}
