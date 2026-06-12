import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Landlord, LandlordDocument } from './entities/landlord.entity';
import { CreateLandlordDto } from './dto/create-landlord.dto';
import paginationHelper, { IOptions } from 'src/app/helpers/pagenation';

@Injectable()
export class LandlordService {
  constructor(
    @InjectModel(Landlord.name)
    private readonly landlordModel: Model<LandlordDocument>,
  ) {}

  async create(dto: CreateLandlordDto) {
    return this.landlordModel.create(dto);
  }

  async findAll(options: IOptions) {
    const { limit, page, skip, sortBy, sortOrder } = paginationHelper(options);
    const [data, total] = await Promise.all([
      this.landlordModel.find().skip(skip).limit(limit).sort({ [sortBy]: sortOrder } as any),
      this.landlordModel.countDocuments(),
    ]);
    return { data, meta: { total, page, limit } };
  }

  async findOne(id: string) {
    const result = await this.landlordModel.findById(id);
    if (!result) throw new HttpException('Not found', 404);
    return result;
  }

  async updateStatus(id: string, status: string) {
    const result = await this.landlordModel.findByIdAndUpdate(
      id,
      { status },
      { new: true },
    );
    if (!result) throw new HttpException('Not found', 404);
    return result;
  }

  async remove(id: string) {
    const result = await this.landlordModel.findByIdAndDelete(id);
    if (!result) throw new HttpException('Not found', 404);
    return result;
  }
}
