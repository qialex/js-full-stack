import { Module } from '@nestjs/common'
// import { TypeOrmModule } from '@nestjs/typeorm'
// import { ConfigModule, ConfigService } from '@nestjs/config'
import { AppController } from './app.controller'
// import { AppService } from './app.service'
import { EmailModule } from './modules/email/email.module'
// import { UserModule } from './modules/user/user.module'
// import { TypedEventEmitterModule } from './event-emitter/typed-event-emitter.module'
// import { EventEmitterModule } from '@nestjs/event-emitter'
import { DbModule } from './modules/db/db.module'
import { EncryptModule } from './modules/encrypt'

@Module({
  imports: [
    DbModule,
    EmailModule,
    EncryptModule,
    // UserModule,
    // TypedEventEmitterModule,
    // EventEmitterModule.forRoot(),
  ],
  controllers: [AppController],
  // providers: [AppService],
  // exports: [
  //   EmailModule,
  // ],  
})
export class AppModule {}
