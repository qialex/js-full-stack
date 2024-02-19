import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import ms from 'ms';

import { TokenDto } from '@monorepo/lib-common'


@Injectable()
export class AuthService {
  constructor(
    private configService: ConfigService,
    private jwtService: JwtService,
  ) {}

  getJWT(sub: string, username: string, type: string): TokenDto {
    const expiresIn = this.configService.get(type === 'access' ? 'JWT_ACCESS_TOKEN_EXPIRES_IN' : 'JWT_REFRESH_TOKEN_EXPIRES_IN')
    const expiresInSec = Number(expiresIn) ? Number(expiresIn) : (ms(expiresIn as string) / 1000)
    const expiresAt = Math.floor(new Date().getTime() / 1000 + expiresInSec)

    // return {token: expiresIn, expiresAt}

    const payload = { sub, username, t: type, ein: expiresIn };
    const config  = {
      secret: this.configService.get('JWT_SECRET'),
      expiresIn: expiresInSec,
    }
    
    const token: string = this.jwtService.sign(payload, config)
    if (typeof token !== 'string') {
      throw token
    }

    return {token, expiresAt}
  }
}
