import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { User, UserController } from './user';
import { WebsocketService } from './websocket/websocket.service';
import { Room, RoomController } from './room';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.TYPEORM_HOST,
      port: parseInt(process.env.TYPEORM_PORT),
      username: process.env.TYPEORM_USERNAME,
      password: process.env.TYPEORM_PASSWORD,
      database: process.env.TYPEORM_DATABASE,
      entities: [User, Room],
      migrations: ['dist/migrations/**/*.js'],
    }),
    TypeOrmModule.forFeature([User, Room]),
  ],
  controllers: [AppController, UserController, RoomController],
  providers: [AppService, WebsocketService],
})
export class AppModule {}
