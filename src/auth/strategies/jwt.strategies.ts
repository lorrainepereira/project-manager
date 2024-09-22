import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: (typeof configService.get<string>('JWT_SECRET') !== 'undefined') ? configService.get<string>('JWT_SECRET') : '',
    });
  }

  /**
   * Validate
   * This method gets the verified/decoded JWT JSON as its single parameter.
   * The data returnet will be attached to the Request object
   * @param payload
   * @returns payload
   */
  async validate(payload: any) {
    return { id: payload.id, email: payload.email };
  }
}