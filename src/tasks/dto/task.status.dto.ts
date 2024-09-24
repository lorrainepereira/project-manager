import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class TaskStatusDto {
  @ApiProperty()
  @Expose()
  name: string;

  @ApiProperty()
  @Expose()
  description: string;
}