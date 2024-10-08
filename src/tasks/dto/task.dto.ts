import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { TaskStatus } from '../enum/task.status';

export class TaskDto {
  @ApiProperty()
  @Expose()
  id: number;

  @ApiProperty()
  @Expose()
  title: string;

  @ApiProperty({ enum: TaskStatus })
  @Expose()
  status: TaskStatus;

  @ApiProperty()
  @Expose()
  description: string;

  @ApiProperty()
  @Expose()
  due_date: Date;

  @ApiProperty({description: 'Id do projeto'})
  @Expose()
  project: number;
}