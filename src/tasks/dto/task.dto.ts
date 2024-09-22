import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class TaskDto {
  @ApiProperty()
  @Expose()
  id: number;

  @ApiProperty()
  @Expose()
  title: string;

  @ApiProperty()
  @Expose()
  status: string;

  @ApiProperty()
  @Expose()
  description: string;

  @ApiProperty()
  @Expose()
  due_date: Date;

  @ApiProperty()
  @Expose()
  project: number;
}