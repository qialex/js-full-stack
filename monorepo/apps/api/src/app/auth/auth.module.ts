import { Module } from '@nestjs/common'
// import { TypeOrmModule } from '@nestjs/typeorm'
// import { ConfigModule, ConfigService } from '@nestjs/config'
// import { AppController } from './app.controller'
// import { AppService } from './app.service'

// import { UserModule } from './modules/user/user.module'
// import { TypedEventEmitterModule } from './event-emitter/typed-event-emitter.module'
// import { EventEmitterModule } from '@nestjs/event-emitter'
import { EmailModule } from '../../email/email.module'
import { EmailService } from '../../email/email.service'

// import { DbModule } from '../../db/db.module'
// import { DbService } from '../../db/db.service'

import { UserModule } from '../../db/entities/user/user.module'
import { UserService } from '../../db/entities/user/user.service'


// import { EncryptModule } from '../../encrypt'



import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'

@Module({
  imports: [
    // DbModule,
    EmailModule,
    // EncryptModule,
    UserModule,
    // TypedEventEmitterModule,
    // EventEmitterModule.forRoot(),
  ],
  controllers: [
    AuthController,
  ],
  providers: [
    // EmailService,    
    // UserService,
    // EncryptService,
    
    AuthService,
  ],
})
export class AuthModule {}
