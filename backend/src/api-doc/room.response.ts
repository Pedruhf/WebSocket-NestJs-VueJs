import { ApiProperty } from '@nestjs/swagger';

export class RoomResponse {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  createdAt: Date;
}
