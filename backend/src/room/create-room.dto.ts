import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateRoomDTO {
  @ApiProperty({
    type: String,
    description: 'Nome da sala',
  })
  @IsString()
  @IsNotEmpty()
  name: string;
}
