import {
  Controller,
  Param,
  Body,
  Get,
  Post,
  Put,
  Delete,
  HttpCode,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { Room, CreateRoomDTO } from 'src/room';
import { InjectRepository } from '@nestjs/typeorm';
import {
  ApiOkResponse,
  ApiNoContentResponse,
} from '@nestjs/swagger';
import { RoomResponse } from 'src/api-doc';

@Controller('rooms')
export class RoomController {
  constructor(
    @InjectRepository(Room)
    private roomRepo: Repository<Room>,
  ) {}

  @ApiOkResponse({ type: RoomResponse })
  @Get()
  async index(): Promise<Room[]> {
    return this.roomRepo.find();
  }

  @ApiOkResponse({
    type: RoomResponse,
  })
  @Get(':id')
  async show(@Param('id') id: string): Promise<Room> {
    return this.roomRepo.findOneOrFail(Number(id));
  }

  @ApiOkResponse({
    type: RoomResponse,
  })
  @Post()
  async store(@Body() body: any): Promise<Room> {
    const room = this.roomRepo.create(body as CreateRoomDTO); // Tive que fazer esse hack pq tava dando erro na node_modules '-'
    return await this.roomRepo.save(room);
  }

  @ApiOkResponse({
    type: RoomResponse,
  })
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() body: any,
  ): Promise<void> {
    await this.roomRepo.findOneOrFail(Number(id));
    this.roomRepo.update({ id: Number(id) }, body as CreateRoomDTO);
  }

  @ApiNoContentResponse()
  @Delete(':id')
  @HttpCode(204)
  async destroy(@Param('id') id: string): Promise<void> {
    await this.roomRepo.findOneOrFail(Number(id));
    this.roomRepo.delete(Number(id));
  }
}
