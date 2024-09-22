import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { Project } from './entity/project';
import { ProjectResponseDto } from './dto/project.response.dto';
import { User } from '../users/entity/user';
import { TasksService } from '../tasks/tasks.service';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private projectsRepository: Repository<Project>,
    private readonly tasksService: TasksService,
  ) {}

  async findAllByUser(user: User): Promise<ProjectResponseDto[]> {
    let projects = this.projectsRepository.find({
      relations: ['user'],
      loadRelationIds: true,
      where: {
        user: user,
      },
    });
    return this.convertEntitiesToDtos(await projects);
  }

  async createProject(project: Project): Promise<Project> {
    return this.projectsRepository.create(project);
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
      tasks: this.tasksService.convertEntitiesToDtos(entity.tasks),
      id: entity.id,
      name: entity.name,
      user_id: entity.user.id,
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