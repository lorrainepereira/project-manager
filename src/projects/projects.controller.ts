import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  InternalServerErrorException,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ProjectsService } from './projects.service';
import { ProjectResponseDto } from './dto/project.response.dto';
import { AuthLoginDto } from '../auth/dto/auth.dto';
import { AuthUserDecorator } from '../auth/decorators/auth-user.decorator';
import { QueryFailedError } from 'typeorm';
import { ProjectRequestDto } from './dto/project.request.dto';
import { JwtAuthGuard } from '../auth/guards/jwt.auth.guard';
import { TaskDto } from '../tasks/dto/task.dto';

@UseGuards(JwtAuthGuard)
@ApiTags('Project')
@ApiBearerAuth('access-token')
@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @ApiOperation({
    summary: 'Rota para listar os projetos do usuário autenticado.',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: ProjectResponseDto,
    description: 'Success',
  })
  @HttpCode(HttpStatus.OK)
  @Get()
  async findAllByUser(
    @AuthUserDecorator() user: AuthLoginDto,
  ): Promise<ProjectResponseDto[]> {
    try {
      return await this.projectsService.findAllByUser(user);
    } catch (error) {
      if (error instanceof QueryFailedError) {
        throw new BadRequestException(error.message);
      }
      throw new InternalServerErrorException('Server error');
    }
  }

  @ApiOperation({ summary: 'Rota para criar um projeto.' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: ProjectResponseDto,
    description: 'Success',
  })
  @HttpCode(HttpStatus.OK)
  @ApiBody({ type: ProjectRequestDto })
  @Post()
  async create(
    @AuthUserDecorator() user: AuthLoginDto,
    @Body() dto: any,
  ): Promise<ProjectResponseDto> {
    try {
      return await this.projectsService.create(user, dto.name);
    } catch (error) {
      if (error instanceof QueryFailedError) {
        throw new BadRequestException(error.message);
      }
      throw new InternalServerErrorException('Server error');
    }
  }

  @ApiOperation({ summary: 'Rota para editar um projeto existente.' })
  @ApiBody({ type: ProjectRequestDto })
  @ApiResponse({
    status: HttpStatus.OK,
    type: ProjectResponseDto,
    description: 'Success',
  })
  @HttpCode(HttpStatus.OK)
  @Put(':id')
  async update(
    @Param('id') idProject: number,
    @Body() dto: any,
  ): Promise<ProjectResponseDto> {
    try {
      return await this.projectsService.update(idProject, dto.name);
    } catch (error) {
      if (
        error instanceof QueryFailedError ||
        error instanceof BadRequestException
      ) {
        throw new BadRequestException(error.message);
      } else {
      }
      throw new InternalServerErrorException('Server error');
    }
  }

  @ApiOperation({ summary: 'Rota para excluir um projeto.' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
  })
  @HttpCode(HttpStatus.OK)
  @Delete(':id')
  async delete(@Param('id') idProject: number): Promise<HttpStatus> {
    try {
      let responseDelete = await this.projectsService.deleteById(idProject);
      return responseDelete.affected ? HttpStatus.OK : HttpStatus.BAD_REQUEST;
    } catch (error) {
      if (
        error instanceof QueryFailedError ||
        error instanceof BadRequestException
      ) {
        throw new BadRequestException(error.message);
      } else {
      }
      throw new InternalServerErrorException('Server error');
    }
  }

  @ApiOperation({
    summary: 'Rota para listar as tarefas de um projeto específico.',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: TaskDto,
    description: 'Success',
  })
  @HttpCode(HttpStatus.OK)
  @Get(':id/tasks')
  async findAllTasks(@Param('id') idProject: number): Promise<TaskDto[]> {
    try {
      return await this.projectsService.findAllTasksByProject(idProject);
    } catch (error) {
      if (error instanceof QueryFailedError) {
        throw new BadRequestException(error.message);
      }
      throw new InternalServerErrorException('Server error');
    }
  }
}