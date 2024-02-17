// import { EventPayloads } from '@/interface/event-types.interface';
import { MailerService } from '@nestjs-modules/mailer';
// import { SentMessageInfo } from 'nodemailer';
import { Injectable } from '@nestjs/common';
// import { OnEvent } from '@nestjs/event-emitter';


@Injectable()
export class EmailService {
  constructor(private readonly mailerService: MailerService) {}

  // @OnEvent('user.welcome')
  async welcomeVerifyEmail(email: string): Promise<any> {
    const subject = `Welcome to the full stack demo!`;

    return await this.mailerService.sendMail({
      to: email,
      subject,
      template: './welcome',
      // context: {
      //   name,
      // },
    })
    // .then()
    // .then((va) => {

    // })
    // .catch((reason: any) => {
    //   return reason
    // })
  }

  // @OnEvent('user.reset-password')
  // async forgotPasswordEmail(data: EventPayloads['user.reset-password']) {
  //   const { name, email, link } = data;

  //   const subject = `Company: Reset Password`;

  //   await this.mailerService.sendMail({
  //     to: email,
  //     subject,
  //     template: './forgot-password',
  //     context: {
  //       link,
  //       name,
  //     },
  //   });
  // }

  // // @OnEvent('user.verify-email')
  // async verifyEmail(data: EventPayloads['user.verify-email']) {
  //   const { name, email, otp } = data;

  //   const subject = `Company: OTP To Verify Email`;

  //   await this.mailerService.sendMail({
  //     to: email,
  //     subject,
  //     template: './verify-email',
  //     context: {
  //       otp,
  //       name,
  //     },
  //   });
  // }
}
