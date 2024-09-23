import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { TaskDto } from '../../tasks/dto/task.dto';
import { JoinColumn, ManyToOne } from 'typeorm';
import { User } from '../../users/entity/user';
import { AuthLoginDto } from '../../auth/dto/auth.dto';
import { string } from 'zod';

export class ProjectRequestDto {

  @ApiProperty({type: string})
  @Expose()
  name: string;

}
