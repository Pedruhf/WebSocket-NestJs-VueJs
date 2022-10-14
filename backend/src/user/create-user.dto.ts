import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsEmail} from 'class-validator';

export class CreateUserDTO {
  @ApiProperty({
    type: String,
    description: 'Nome do usuário',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;
}
