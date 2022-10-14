import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Repository } from 'typeorm';

import { User } from 'src/user';
import { InjectRepository } from '@nestjs/typeorm';
import { ApiCreatedResponse, ApiResponse } from '@nestjs/swagger';
import { UserResponse } from 'src/api-doc/user.response';
import { CreateUserDTO } from 'src/user/create-user.dto';

@Controller('users')
export class UserController {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) {}

  @Get()
  async getAll(): Promise<User[] | HttpException> {
    const users = await this.userRepo.find();
    return users;
  }

  @ApiResponse({
    type: UserResponse,
  })
  @Get(':id')
  async getById(@Param('id') id: string): Promise<User | HttpException> {
    const user = await this.userRepo.findOne(id);
    if (!user) {
      throw new HttpException(
        { message: 'Usuário não encontrado' },
        HttpStatus.NOT_FOUND,
      );
    }
    return user;
  }

  @ApiCreatedResponse({
    type: UserResponse,
  })
  @Post()
  async store(
    @Body() body: CreateUserDTO,
  ): Promise<User | HttpException> {
    const user = this.userRepo.create(body);
    const result = await this.userRepo.save(user);
    return result;
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() body: User,
  ): Promise<void | HttpException> {
    const user = await this.userRepo.findOne(id);
    if (!user) {
      throw new HttpException({ message: 'Usuário não encontrado' }, HttpStatus.NOT_FOUND);
    }
    await this.userRepo.update(id, body);
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id') id: string): Promise<void | HttpException> {
    const user = await this.userRepo.findOne(id);
    if (!user) {
      throw new HttpException({ message: 'Usuário não encontrado' }, HttpStatus.NOT_FOUND);
    }
    await this.userRepo.delete(id);
}
}
