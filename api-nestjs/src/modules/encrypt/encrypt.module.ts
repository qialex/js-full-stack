import { Module } from '@nestjs/common'
import { EncryptService } from './encrypt.service'
import { ConfigModule } from '@nestjs/config'

@Module({
  imports: [
    ConfigModule,
  ],
  providers: [
    EncryptService,
  ],
})
export class EncryptModule {}
