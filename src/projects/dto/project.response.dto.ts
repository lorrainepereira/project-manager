import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { TaskDto } from '../../tasks/dto/task.dto';
import { AuthLoginDto } from '../../auth/dto/auth.dto';

export class ProjectResponseDto {
  @ApiProperty()
  @Expose()
  id: number;

  @ApiProperty()
  @Expose()
  name: string;

  @ApiProperty()
  @Expose()
  user: AuthLoginDto;

  @ApiProperty()
  @Expose()
  tasks: TaskDto[];
}
