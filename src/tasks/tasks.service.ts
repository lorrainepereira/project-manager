import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { Task } from './entity/task';
import { TaskDto } from './dto/task.dto';
import { plainToInstance } from 'class-transformer';
import { TaskRequestDto } from './dto/task.request.dto';
import { TaskStatus } from './enum/task.status';
import { TaskUpdateRequestDto } from './dto/task.update.request.dto';
import { TaskStatusDto } from './dto/task.status.dto';
import { UpdateResult } from 'typeorm/query-builder/result/UpdateResult';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>,
  ) {}

  async create(dto: TaskRequestDto): Promise<TaskDto> {
    const taskForToSave: Task = plainToInstance(Task, dto);
    const taskSaved = await this.tasksRepository.save(taskForToSave);

    return plainToInstance(TaskDto, taskSaved, {
      excludeExtraneousValues: true,
    });
  }

  async deleteById(id: number): Promise<DeleteResult> {
    return await this.tasksRepository.delete(id);
  }

  async findAllByProject(idProject: number): Promise<TaskDto[]> {
    const tasks = await this.tasksRepository.find({
      relations: ['project.tasks'],
      loadRelationIds: true,
      where: {
        project: { id: idProject },
      },
    });
    return plainToInstance(TaskDto, tasks, {
      excludeExtraneousValues: true,
    });
  }

  async update(id: number, dto: TaskRequestDto): Promise<TaskDto> {
    const task = await this.tasksRepository.findOneBy({ id: id });

    if (!task) {
      throw new BadRequestException('Task not found.');
    }

    task.description = dto.description;
    task.status = dto.status;
    task.title = dto.title;
    task.due_date = dto.due_date;

    const taskUpdated = await this.tasksRepository.save(task);

    return plainToInstance(TaskDto, taskUpdated, {
      excludeExtraneousValues: true,
    });
  }

  async updateStatus(
    dto: TaskUpdateRequestDto,
    status: TaskStatus,
  ): Promise<TaskDto> {
    const task = await this.tasksRepository.findOneBy({ id: dto.idTask });

    if (!task) {
      throw new BadRequestException('Task not found.');
    }

    task.status = status;

    const taskUpdated = await this.tasksRepository.save(task);

    return plainToInstance(TaskDto, taskUpdated, {
      excludeExtraneousValues: true,
    });
  }

  async updateAllStatus(status: TaskStatus): Promise<UpdateResult> {
    return await this.tasksRepository
      .createQueryBuilder()
      .update(Task)
      .set({ status: TaskStatus[status] })
      .execute();
  }

  public getAllStatus(): TaskStatusDto[] {
    let status: TaskStatusDto[] = [];

    for (let enumValue in TaskStatus) {
      const dto: TaskStatusDto = new TaskStatusDto();
      dto.name = enumValue;
      dto.description = TaskStatus[enumValue];
      status.push(dto);
    }

    return status;
  }
}