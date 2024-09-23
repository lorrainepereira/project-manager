import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { TaskStatus } from '../enum/task.status';

export class TaskRequestDto {

  @ApiProperty()
  @Expose()
  title: string;

  @ApiProperty({ enum: TaskStatus, default: TaskStatus.IN_PROGRSES })
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