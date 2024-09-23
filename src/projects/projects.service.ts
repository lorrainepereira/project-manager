import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { Project } from './entity/project';
import { ProjectResponseDto } from './dto/project.response.dto';
import { TasksService } from '../tasks/tasks.service';
import { AuthLoginDto } from '../auth/dto/auth.dto';
import { UsersService } from '../users/users.service';
import { plainToInstance } from 'class-transformer';
import { TaskDto } from '../tasks/dto/task.dto';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private projectsRepository: Repository<Project>,
    private readonly tasksService: TasksService,
    private readonly usersService: UsersService,
  ) {}

  async findAllByUser(user: AuthLoginDto): Promise<ProjectResponseDto[]> {
    const projects = await this.projectsRepository.find({
      relations: ['user.projects'],
      loadRelationIds: true,
      where: {
        user: { id: user.id },
      },
    });
    return this.convertEntitiesToDtos(projects);
  }

  async create(user: AuthLoginDto, name: string): Promise<ProjectResponseDto> {
    const userEntity = plainToInstance(
      AuthLoginDto,
      await this.usersService.findById(user.id),
    );

    const projectForToSave = {
      user: userEntity,
      name: name,
    };
    const projectSaved = await this.projectsRepository.save(projectForToSave);
    return plainToInstance(ProjectResponseDto, projectSaved, {
      excludeExtraneousValues: true,
    });
  }

  async update(id: number, name: string): Promise<ProjectResponseDto> {
    const project = await this.projectsRepository.findOneBy({ id: id });

    if (!project) {
      throw new BadRequestException('Project not found.');
    }

    project.name = name;
    const projectUpdated = await this.projectsRepository.save(project);
    return plainToInstance(ProjectResponseDto, projectUpdated, {
      excludeExtraneousValues: true,
    });
  }

  async findById(id: number): Promise<Project> {
    return await this.projectsRepository.findOneBy({ id: id });
  }

  async deleteById(id: number): Promise<DeleteResult> {
    return await this.projectsRepository.delete(id);
  }

  public convertEntitiesToDtos(entities: Project[]): ProjectResponseDto[] {
    return entities.map((entry) => plainToInstance(ProjectResponseDto, entry));
  }

  async findAllTasksByProject(idProject: number): Promise<TaskDto[]> {
    return await this.tasksService.findAllByProject(idProject);
  }
}