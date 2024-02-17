import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserService } from './user.service'
import { User } from './user.entity'
import { EncryptModule, EncryptService } from '../../../encrypt'

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    ConfigModule.forRoot(),
    EncryptModule,
  ],
  providers: [
    UserService,
    EncryptService,
  ],
  exports: [
    UserService,
  ]
})
export class UserModule {}