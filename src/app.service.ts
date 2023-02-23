import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './schema/user.schema';
import { UserAlreadyExists } from './user-already-exists.exception';
import { UserDontExists } from './user-not-exist';

@Injectable()
export class AppService {
  constructor(
    @InjectModel(User.name) private readonly model: Model<UserDocument>,
  ) {}
  async findAll(): Promise<User[]> {
    return await this.model.find().exec();
  }
  async findOne(id: string): Promise<User> {
    return await this.model.findById(id).exec();
  }
  async create(createUserDto: CreateUserDto): Promise<User> {
    const existingUser = await this.model.findOne({
      email: createUserDto.email,
    });
    if (existingUser) {
      throw new UserAlreadyExists();
    }
    const createdUser = new this.model(createUserDto);
    return await createdUser.save();
  }
  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    return await this.model.findByIdAndUpdate(id, updateUserDto).exec();
  }
  async delete(id: string): Promise<User> {
    const notExistingUser = await this.model.findById(id);
    if (!notExistingUser) {
      throw new UserDontExists();
    }
    return await this.model.findByIdAndDelete(id).exec();
  }
}
