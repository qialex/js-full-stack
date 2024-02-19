import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { JwtModule, JwtService } from '@nestjs/jwt'
// import { PassportModule } from '@nestjs/passport';

import { EmailModule } from '../../email/email.module'
// import { EmailService } from '../../email/email.service'

import { DbModule } from '../../db/db.module'
import { UserModule } from '../../db/entities/user/user.module'
// import { UserService } from '../../db/entities/user/user.service'

import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { AuthGuard } from './auth.guard';

@Module({
  imports: [
    EmailModule,
    UserModule,
    DbModule,
    ConfigModule.forRoot(),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        global: true,
        secret: configService.get('JWT_SECRET'),
        signOptions: { expiresIn: configService.get('JWT_ACCESS_TOKEN_EXPIRES_IN') },
        // signOptions: { expiresIn: configService.get('JWT_REFRESH_TOKEN_EXPIRES_IN') },
      }),
    }),
  ],
  controllers: [
    AuthController,
  ],
  providers: [
    AuthService,
    AuthGuard,
    JwtService,
  ],
  exports: [
    AuthService,
    AuthGuard,
  ],
})
export class AuthModule {}
