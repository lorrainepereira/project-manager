import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { TaskDto } from '../../tasks/dto/task.dto';
import { JoinColumn, ManyToOne } from 'typeorm';
import { User } from '../../users/entity/user';

export class ProjectRequestDto {

  @ApiProperty()
  @Expose()
  name: string;

  @ApiProperty()
  user_id: number;

}
