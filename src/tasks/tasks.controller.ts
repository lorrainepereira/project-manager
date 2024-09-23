import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  InternalServerErrorException,
  Param,
  Patch,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt.auth.guard';
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
import { TaskUpdateRequestDto } from './dto/task.update.request.dto';

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

  @ApiOperation({ summary: 'Rota para atualizar o status de uma tarefa.' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: TaskDto,
    description: 'Success',
  })
  @HttpCode(HttpStatus.OK)
  @Patch(':status')
  @ApiBody({ type: TaskUpdateRequestDto })
  @ApiParam({ name: 'status', enum: TaskStatus })
  async updateStatus(
    @Param('status') status: TaskStatus,
    @Body() dto: any,
  ): Promise<TaskDto> {
    try {
      return await this.tasksService.updateStatus(dto, status);
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
}