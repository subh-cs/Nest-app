import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './schema/user.schema';

@Injectable()
export class AppService {
  constructor(
    @InjectModel(User.name) private readonly model: Model<UserDocument>,
  ) {}
  // getHello(): string {
  //   return 'Hello World!';
  // }
  // getAnotherHello(): string {
  //   return `Hello World new !`;
  // }
  async findAll(): Promise<User[]> {
    return await this.model.find().exec();
  }
  async findOne(id: string): Promise<User> {
    return await this.model.findById(id).exec();
  }
  async create(createUserDto: CreateUserDto): Promise<User> {
    return await new this.model({
      ...createUserDto,
    }).save();
  }
  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    return await this.model.findByIdAndUpdate(id, updateUserDto).exec();
  }
  async delete(id: string): Promise<User> {
    return await this.model.findByIdAndDelete(id).exec();
  }
}
