import { Injectable } from '@nestjs/common';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Blog, BlogDocument } from './entities/blog.entity';
import { fileUpload } from 'src/app/helpers/fileUploder';
import { IFilterParams } from 'src/app/helpers/pick';
import paginationHelper, { IOptions } from 'src/app/helpers/pagenation';
import buildWhereConditions from 'src/app/helpers/buildWhereConditions';

@Injectable()
export class BlogService {
  constructor(@InjectModel(Blog.name) private blogModel: Model<BlogDocument>) {}

  async createBlog(createBlogDto: CreateBlogDto, file: Express.Multer.File) {
    if (file) {
      const { url } = await fileUpload.uploadToCloudinary(file);
      createBlogDto.thembnail = url;
    }
    const newBlog = new this.blogModel(createBlogDto);
    return newBlog.save();
  }

  async findAllBlogs(params: IFilterParams, options: IOptions) {
    const { limit, page, skip, sortBy, sortOrder } = paginationHelper(options);

    const whereConditions = buildWhereConditions(params, [
      'title',
      'description',
    ]);

    const result = await this.blogModel
      .find(whereConditions)
      .limit(limit)
      .skip(skip)
      .sort({ [sortBy]: sortOrder });
    const total = await this.blogModel.countDocuments(whereConditions);

    return {
      meta: {
        page,
        limit,
        total,
      },
      data: result,
    };
  }

  async findOneBlog(id: string) {
    const result = await this.blogModel.findById(id);
    return result;
  }

  async updateBlog(
    id: string,
    updateBlogDto: UpdateBlogDto,
    file?: Express.Multer.File,
  ) {
    if (file) {
      const { url } = await fileUpload.uploadToCloudinary(file);
      updateBlogDto.thembnail = url;
    }
    const result = await this.blogModel.findByIdAndUpdate(id, updateBlogDto, {
      new: true,
    });
    return result;
  }

  async removeBlog(id: string) {
    const result = await this.blogModel.findByIdAndDelete(id);
    return result;
  }
}
