import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { Project } from './entity/project';
import { ProjectResponseDto } from './dto/project.response.dto';
import { TasksService } from '../tasks/tasks.service';
import { AuthLoginDto } from '../auth/dto/auth.dto';
import { ProjectRequestDto } from './dto/project.request.dto';
import { UsersService } from '../users/users.service';
import { Task } from '../tasks/entity/task';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private projectsRepository: Repository<Project>,
    private readonly tasksService: TasksService,
    private readonly usersService: UsersService
  ) {}

  async findAllByUser(user: AuthLoginDto): Promise<ProjectResponseDto[]> {
    let projects = await this.projectsRepository.find({
      relations: ['user.projects'],
      loadRelationIds: true,
      where: {
        user: { id: user.id },
      },
    });
    return this.convertEntitiesToDtos(projects);
  }

  async create(user: AuthLoginDto, project: ProjectRequestDto): Promise<ProjectResponseDto> {
    project.user_id = user.id;
    let projectSaved = await this.projectsRepository.save(project);
    return plainToInstance(ProjectResponseDto, projectSaved, { excludeExtraneousValues: true });
  }

  async updateProject(project: Project): Promise<Project> {
    return this.projectsRepository.save(project);
  }

  async findById(id: number): Promise<Project> {
    return this.projectsRepository.findOneBy({ id: id });
  }

  async deleteById(id: number): Promise<DeleteResult> {
    return this.projectsRepository.delete(id);
  }

  public convertEntityToDto(entity: Project): ProjectResponseDto {
    return {
      tasks: entity.tasks != undefined ? this.tasksService.convertEntitiesToDtos(entity.tasks) : null,
      id: entity.id,
      name: entity.name,
      user: entity.user.id,
    };
  }

  public convertEntitiesToDtos(entities: Project[]): ProjectResponseDto[] {
    let dtos: ProjectResponseDto[] = [];

    entities.forEach(function (entry) {
      dtos.push(this.convertEntityToDto(entry));
    });

    return dtos;
  }
}