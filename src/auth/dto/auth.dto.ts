import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class AuthLoginDto {
  @ApiProperty()
  @Expose()
  id: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  token: string;
}


export class AuthLoginBodyDto {
  @ApiProperty({type: String})
  @Expose()
  email: string;

  @ApiProperty({type: String})
  @Expose()
  password: string;
}