import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserService } from './user.service'
import { UserController } from './user.controller'
import { User } from './user.entity'
import { EncryptModule, EncryptService } from '../../../encrypt'
import { EmailModule } from '../../../email/email.module'
import { EmailService } from '../../../email/email.service'

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    ConfigModule.forRoot(),
    EncryptModule,
    EmailModule,
  ],
  providers: [
    UserService,
    EncryptService,
    EmailService,
  ],
  controllers: [
    UserController,
  ],
})
export class UserModule {}