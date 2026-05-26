import { HttpException, Injectable } from '@nestjs/common';
import { CreateInquiryDto } from './dto/create-inquiry.dto';
import { UpdateInquiryDto } from './dto/update-inquiry.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Inquiry, InquiryDocument } from './entities/inquiry.entity';
import { Model } from 'mongoose';
import { User, UserDocument } from '../user/entities/user.entity';
import { IFilterParams } from 'src/app/helpers/pick';
import paginationHelper, { IOptions } from 'src/app/helpers/pagenation';
import buildWhereConditions from 'src/app/helpers/buildWhereConditions';
import {
  Onoffice,
  OnofficeDocument,
} from '../onoffice/entities/onoffice.entity';

@Injectable()
export class InquiryService {
  constructor(
    @InjectModel(Inquiry.name)
    private readonly inquiryModel: Model<InquiryDocument>,
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    @InjectModel(Onoffice.name)
    private readonly onofficeModel: Model<OnofficeDocument>,
  ) {}

  async createInquiry(userId: string, createInquiryDto: CreateInquiryDto) {
    const user = await this.userModel.findById(userId);
    if (!user) throw new HttpException('User not found', 404);
    const onoffice = await this.onofficeModel.findById(
      createInquiryDto.onOfficeId,
    );
    if (!onoffice) throw new HttpException('Onoffice not found', 404);
    const inquiry = await this.inquiryModel.create({
      ...createInquiryDto,
      user: user._id,
    });
    return inquiry;
  }

  async updateInquiry(id: string, updateInquiryDto: UpdateInquiryDto) {
    const inquiry = await this.inquiryModel.findById(id);
    if (!inquiry) throw new HttpException('Inquiry not found', 404);
    const onoffice = await this.onofficeModel.findById(
      updateInquiryDto.onOfficeId,
    );
    if (!onoffice) throw new HttpException('Onoffice not found', 404);
    const updatedInquiry = await this.inquiryModel.findByIdAndUpdate(
      id,
      updateInquiryDto,
      { new: true },
    );
    return updatedInquiry;
  }

  async findAllInquiries(
    userId: string,
    params: IFilterParams,
    options: IOptions,
  ) {
    const user = await this.userModel.findById(userId);

    if (!user) {
      throw new HttpException('User not found', 404);
    }

    const { limit, page, skip, sortBy, sortOrder } = paginationHelper(options);

    const extraConditions = user.role !== 'admin' ? { user: user._id } : {};

    const whereConditions = buildWhereConditions(
      params,
      ['firstName', 'lastName', 'email', 'phoneNumber', 'message'],
      extraConditions,
    );

    const inquiries = await this.inquiryModel
      .find(whereConditions)
      .populate('user', 'firstName lastName email phoneNumber')
      .populate('onOfficeId', 'objekttitel')
      .sort({
        [sortBy || 'createdAt']: sortOrder || 'desc',
      })
      .skip(skip)
      .limit(limit);

    const total = await this.inquiryModel.countDocuments(whereConditions);

    return {
      data: inquiries,
      meta: {
        page,
        limit,
        total,
      },
    };
  }

  async findInquiryById(id: string) {
    const inquiry = await this.inquiryModel.findById(id);
    if (!inquiry) throw new HttpException('Inquiry not found', 404);
    return inquiry;
  }

  async deleteInquiry(id: string) {
    const inquiry = await this.inquiryModel.findById(id);
    if (!inquiry) throw new HttpException('Inquiry not found', 404);
    await this.inquiryModel.findByIdAndDelete(id);
    return { message: 'Inquiry deleted successfully' };
  }
}
