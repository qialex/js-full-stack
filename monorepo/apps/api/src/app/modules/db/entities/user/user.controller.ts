import { Body, Controller, Post, Req } from '@nestjs/common'
import { UserService } from './user.service'
import { User } from './user.entity'
import { CreateUserDTO } from './user.entity'
import { EmailService } from '../../../email/email.service'

@Controller('user')
export class UserController {
  constructor(
    private readonly emailService: EmailService,
    private readonly userService: UserService,
  ) {}

  @Post('sign-up')
  async signUn(@Body() body: CreateUserDTO) {
    const user: User|Error = await this.userService.addOne(body);
    if (user['id'] && user['email']) {
      // send email
      const welcomeVerifyEmail = await this.emailService.welcomeVerifyEmail(user['email']) 
    }

    return user
  }

  @Post('sign-in')
  async signIn(@Body() body) {
    return this.userService.findOne(body.email, body.password)
  }  
}
