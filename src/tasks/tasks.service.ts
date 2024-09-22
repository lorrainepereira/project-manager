import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './entity/task';
import { TaskDto } from './dto/task.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>,
  ) {}

  public convertEntityToDto(entity: Task): TaskDto {
    return {
      id: entity.id,
      title: entity.title,
      status: entity.status,
      description: entity.description,
      due_date: entity.due_date,
      project: entity.project.id,
    };
  }

  public convertEntitiesToDtos(entities: Task[]): TaskDto[] {
    let dtos: TaskDto[] = [];

    entities.forEach(function(entry){
      dtos.push(this.convertEntityToDto(entry))
    });

    return dtos;
  }
}