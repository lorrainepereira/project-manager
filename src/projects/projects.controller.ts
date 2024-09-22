import {
  BadRequestException,
  Controller,
  Get,
  HttpCode,
  InternalServerErrorException,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt.auth.guard';
import {
  ApiBearerAuth,
  ApiConsumes,
  ApiOperation,
  ApiProduces,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ProjectsService } from './projects.service';
import { UserNotFoundError } from '../users/exceptions/user.error.handler';
import { WrongAuthError } from '../auth/exceptions/auth.error.handler';
import { ProjectResponseDto } from './dto/project.response.dto';
import { AuthService } from '../auth/auth.service';

@UseGuards(JwtAuthGuard)
@ApiTags('Projects')
@ApiBearerAuth('access-token')
@Controller('projects')
export class ProjectsController {
  constructor(
    private readonly projectsService: ProjectsService,
    private readonly authService: AuthService,
  ) {}

  @ApiOperation({
    summary: 'Rota para listar os projetos do usuário autenticado.',
  })
  @ApiResponse({
    status: 200,
    type: ProjectResponseDto,
    description: 'Success',
  })
  @ApiResponse({
    status: 401,
    type: ProjectResponseDto,
    description: 'Not found.',
  })
  @HttpCode(200)
  @Get()
  @ApiProduces('application/json')
  @ApiConsumes('application/json')
  async findAll(): Promise<ProjectResponseDto[]> {
    try {
      return await this.projectsService.findAllByUser(null);
    } catch (error) {
      if (
        error instanceof UserNotFoundError ||
        error instanceof WrongAuthError
      ) {
        throw new BadRequestException(error.message);
      }

      throw new InternalServerErrorException('Server error');
    }
  }
}