import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  InternalServerErrorException,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { ApiBody, ApiConsumes, ApiOperation, ApiProduces, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { AuthLoginBodyDto, AuthLoginDto } from './dto/auth.dto';
import { WrongAuthError } from './exceptions/auth.error.handler';
import { UserNotFoundError } from '../users/exceptions/user.error.handler';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {

  constructor(private authService: AuthService) { }

  @ApiOperation({ summary: 'Rota para autenticação de usuários.' })
  @ApiBody({ type: AuthLoginBodyDto })
  @ApiResponse({ status: 200, type: AuthLoginDto, description: 'Success' })
  @ApiResponse({ status: 401, type: AuthLoginDto, description: 'Invalid email or password' })
  @HttpCode(200)
  @Post('login')
  @ApiProduces('application/json')
  @ApiConsumes('application/json')
  async login(@Body() loginBody: any): Promise<AuthLoginDto> {
    try {
      return await this.authService.authenticateUser(loginBody);
    } catch (error) {
      if (error instanceof UserNotFoundError || error instanceof WrongAuthError) {
        throw new BadRequestException(error.message);
      }

      throw new InternalServerErrorException('Erro do servidor.');
    }
  }

}
