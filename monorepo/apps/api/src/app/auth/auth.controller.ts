import { Body, Controller, Post, Req, ValidationPipe } from '@nestjs/common'
import { AuthReqDto, AuthResDto } from '@monorepo/lib-common'

import { UserService } from '../../db/entities/user/user.service'
import { EmailService } from '../../email/email.service'

@Controller('auth')
export class AuthController {
  constructor(
    private readonly emailService: EmailService,
    private readonly userService: UserService,
  ) {}

  @Post('sign-up')
  // async signUn(@Body() body: AuthReqDto): Promise<AuthResDto|Error> {
  async index(@Body(new ValidationPipe({whitelist: true})) body: AuthReqDto) {    
    const res: AuthResDto|Error = await this.userService.addOne(body);
    // if (user['id'] && user['email']) {
      // send email
      // const welcomeVerifyEmail = await this.emailService.welcomeVerifyEmail(user['email']) 
    // }

    // return {...body} as AuthResDto
    return res
    // return {id: 1, email: body.email || '', token: '1'} as AuthResDto
  }

  // @Post('sign-in')
  // async signIn(@Body() body: UserDto): Promise<UserDto|Error> {
  //   // return this.userService.findOne(body.email, body.password)
  //   return body
  // }  
}
