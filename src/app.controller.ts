import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { AppService } from './app.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller()
export class AppController {
  constructor(private readonly service: AppService) {}

  @Get('api')
  async index() {
    return await this.service.findAll();
  }

  @Get('api/:id')
  async find(@Param('id') id: string) {
    return await this.service.findOne(id);
  }

  @Post('api')
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.service.create(createUserDto);
  }

  @Put('api/:id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return await this.service.update(id, updateUserDto);
  }

  @Delete('api/:id')
  async delete(@Param('id') id: string) {
    return await this.service.delete(id);
  }
  // @Get()
  // getHello(): string {
  //   return this.service.getHello();
  // }
}
