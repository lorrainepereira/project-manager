import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { TaskDto } from '../../tasks/dto/task.dto';

export class ProjectResponseDto {
  @ApiProperty()
  @Expose()
  id: number;

  @ApiProperty()
  @Expose()
  name: string;

  @ApiProperty()
  @Expose()
  user_id: number;

  @ApiProperty()
  @Expose()
  tasks: TaskDto[];
}
