import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class TaskUpdateRequestDto {

  @ApiProperty()
  @Expose()
  idTask: number;

}