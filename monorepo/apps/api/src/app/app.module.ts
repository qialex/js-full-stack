import { Module } from '@nestjs/common'
import { AuthModule } from './auth'

// import { TypeOrmModule } from '@nestjs/typeorm'
// import { ConfigModule, ConfigService } from '@nestjs/config'

import { EmailModule } from '../email/email.module'
// import { UserModule } from './modules/user/user.module'
// import { TypedEventEmitterModule } from './event-emitter/typed-event-emitter.module'
// import { EventEmitterModule } from '@nestjs/event-emitter'
import { DbModule } from '../db/db.module'
import { EncryptModule } from '../encrypt'


import { AppController } from './app.controller'
import { AppService } from './app.service'

@Module({
  imports: [
    AuthModule,

    DbModule,
    EmailModule,
    EncryptModule,
    // UserModule,
    // TypedEventEmitterModule,
    // EventEmitterModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [AppService],
  // exports: [
  //   EmailModule,
  // ],  
})
export class AppModule {}
