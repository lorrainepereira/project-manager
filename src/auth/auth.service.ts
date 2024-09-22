import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { AuthLoginBodyDto, AuthLoginDto } from './dto/auth.dto';
import { AUTH_USER_ERRORS, WrongAuthError } from './exceptions/auth.error.handler';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService, private jwtService: JwtService) { }

  async authenticateUser(loginData: AuthLoginBodyDto): Promise<AuthLoginDto> {
    const user = await this.usersService.findByEmail(loginData.email);
    if (!user) {
      throw new WrongAuthError(AUTH_USER_ERRORS.WrongAuth);
    }
    // if (!compareHashes(loginData.password, user.password)) {
    //   throw new WrongAuthError(AUTH_USER_ERRORS.WrongAuth);
    // }
    // @ts-ignore
    const payload = { id: user.id, email: user.email };
    const token = this.jwtService.sign(payload);
    // @ts-ignore
    return { ...user, token };
  }
}
