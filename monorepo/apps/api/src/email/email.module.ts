import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config'
import { EmailService } from './email.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { join } from 'path';
import { EjsAdapter } from '@nestjs-modules/mailer/dist/adapters/ejs.adapter';


@Module({
  imports: [
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        transport: {
          host: configService.get('MAIL_HOST'),
          port: Number(configService.get('MAIL_PORT')),
          secure: false,
          auth: {
            user: configService.get('MAIL_USER'),
            pass: configService.get('MAIL_PASSWORD'),
          },
        },      
        defaults: {
          from: configService.get('MAIL_FROM'),
        },
        template: {
          dir: join(__dirname, 'modules/email/templates'),
          adapter: new EjsAdapter(),
          options: {
            strict: true,
          },
        },
      })
    }),    
  ],
  providers: [
    EmailService,
  ],
  exports: [
    EmailService,
  ],
})
export class EmailModule {}
