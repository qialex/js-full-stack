import { Body, Controller, Post, Req } from '@nestjs/common'
// import { UserDto } from '@monorepo/lib-common'
// import { UserService } from './user.service'
// import { User } from './user.entity'
// import { CreateUserDTO } from './user.entity'
// import { EmailService } from '../../../email/email.service'

// @Controller('auth')
export class AuthService {
  constructor(
    // private readonly emailService: EmailService,
    // private readonly userService: UserService,
  ) {}

  // @Post('sign-up')
  // async signUn(@Body() body: UserDto): Promise<UserDto|Error> {
  //   // const user: User|Error = await this.userService.addOne(body);
  //   // if (user['id'] && user['email']) {
  //     // send email
  //     // const welcomeVerifyEmail = await this.emailService.welcomeVerifyEmail(user['email']) 
  //   // }

  //   // return user
  //   return body
  // }

  // @Post('sign-in')
  // async signIn(@Body() body: UserDto): Promise<UserDto|Error> {
  //   // return this.userService.findOne(body.email, body.password)
  //   return body
  // }  
}
