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
  constructor(private readonly appService: AppService) {}

  @Get('api')
  async index() {
    return await this.appService.findAll();
  }

  @Get('api/:id')
  async find(@Param('id') id: string) {
    return await this.appService.findOne(id);
  }

  @Post('api')
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.appService.create(createUserDto);
  }

  @Put('api/:id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return await this.appService.update(id, updateUserDto);
  }

  @Delete('api/:id')
  async delete(@Param('id') id: string) {
    return await this.appService.delete(id);
  }
  // @Get()
  // getHello(): string {
  //   return this.service.getHello();
  // }
}
