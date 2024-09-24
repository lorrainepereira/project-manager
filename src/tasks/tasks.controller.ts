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
  Patch,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { TasksService } from './tasks.service';
import { QueryFailedError } from 'typeorm';
import { TaskRequestDto } from './dto/task.request.dto';
import { TaskDto } from './dto/task.dto';
import { TaskStatus } from './enum/task.status';
import { TaskStatusDto } from './dto/task.status.dto';
import { JwtAuthGuard } from '../auth/guards/jwt.auth.guard';

@UseGuards(JwtAuthGuard)
@ApiTags('Task')
@ApiBearerAuth('access-token')
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @ApiOperation({ summary: 'Rota para criar uma tarefa em um projeto.' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: TaskRequestDto,
    description: 'Success',
  })
  @HttpCode(HttpStatus.OK)
  @ApiBody({ type: TaskRequestDto })
  @Post()
  async create(@Body() dto: any): Promise<TaskDto> {
    try {
      return await this.tasksService.create(dto);
    } catch (error) {
      if (error instanceof QueryFailedError) {
        throw new BadRequestException(error.message);
      }
      throw new InternalServerErrorException('Server error');
    }
  }

  @ApiOperation({ summary: 'Rota para excluir uma tarefa.' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
  })
  @HttpCode(HttpStatus.OK)
  @Delete(':id')
  async delete(@Param('id') idTask: number): Promise<HttpStatus> {
    try {
      const responseDelete = await this.tasksService.deleteById(idTask);
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

  @ApiOperation({ summary: 'Rota para editar uma tarefa existente.' })
  @ApiBody({ type: TaskRequestDto })
  @ApiResponse({
    status: HttpStatus.OK,
    type: TaskDto,
    description: 'Success',
  })
  @HttpCode(HttpStatus.OK)
  @Put(':id')
  async update(
    @Param('id') idTask: number,
    @Body() dto: any,
  ): Promise<TaskDto> {
    try {
      return await this.tasksService.update(idTask, dto);
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
    summary: 'Rota para atualizar o status de todas as tarefas.',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: TaskDto,
    description: 'Success',
  })
  @HttpCode(HttpStatus.OK)
  @Patch(':status')
  @ApiParam({ name: 'status', enum: TaskStatus })
  async updateAllStatus(
    @Param('status') status: TaskStatus,
  ): Promise<HttpStatus> {
    try {
      const response = this.tasksService.updateAllStatus(status);
      return response ? HttpStatus.OK : HttpStatus.BAD_REQUEST;
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
    summary: 'Rota para listar todos os tipos de status da task.',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: TaskStatusDto,
    description: 'Success',
  })
  @HttpCode(HttpStatus.OK)
  @Get('all-status')
  async findAllStatus(): Promise<TaskStatusDto[]> {
    try {
      return this.tasksService.getAllStatus();
    } catch (error) {
      if (error instanceof QueryFailedError) {
        throw new BadRequestException(error.message);
      }
      throw new InternalServerErrorException('Server error');
    }
  }
}