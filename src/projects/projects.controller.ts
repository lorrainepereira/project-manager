import {
  BadRequestException, Body,
  Controller,
  Get,
  HttpCode,
  InternalServerErrorException,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt.auth.guard';
import { ApiBearerAuth, ApiConsumes, ApiOperation, ApiProduces, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ProjectsService } from './projects.service';
import { ProjectResponseDto } from './dto/project.response.dto';
import { AuthLoginDto } from '../auth/dto/auth.dto';
import { AuthUserDecorator } from '../auth/decorators/auth-user.decorator';
import { QueryFailedError } from 'typeorm';
import { ProjectRequestDto } from './dto/project.request.dto';

@UseGuards(JwtAuthGuard)
@ApiTags('Project')
@ApiBearerAuth('access-token')
@Controller('projects')
export class ProjectsController {
  constructor(
    private readonly projectsService: ProjectsService
  ) {}

  @ApiOperation({ summary: 'Rota para listar os projetos do usuário autenticado.', })
  @ApiResponse({
    status: 200,
    type: ProjectResponseDto,
    description: 'Success',
  })
  @HttpCode(200)
  @Get()
  @ApiProduces('application/json')
  @ApiConsumes('application/json')
  async findAll(
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
    status: 200,
    type: ProjectResponseDto,
    description: 'Success',
  })
  @HttpCode(200)
  @Post()
  @ApiProduces('application/json')
  @ApiConsumes('application/json' )
  async create(
    @AuthUserDecorator() user: AuthLoginDto,
    @Body() projectDto: any
  ): Promise<ProjectResponseDto> {
    try {
      return await this.projectsService.create(user, projectDto);
    } catch (error) {
      if (error instanceof QueryFailedError) {
        throw new BadRequestException(error.message);
      }
      throw new InternalServerErrorException('Server error');
    }
  }
}