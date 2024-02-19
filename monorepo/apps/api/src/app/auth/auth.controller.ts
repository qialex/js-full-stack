import { Body, Controller, Post, Req, Res, ValidationPipe, UseGuards, HttpStatus, BadRequestException, ConflictException, InternalServerErrorException, UnauthorizedException } from '@nestjs/common'
import { AuthUserReqDto, AuthUserDto, AuthDto, messagesDto, TokenDto, ErrorDto } from '@monorepo/lib-common'
import { Response } from 'express';

import { UserService } from '../../db/entities/user/user.service'
import { DbService } from '../../db/db.service'
import { EmailService } from '../../email/email.service'
import { AuthService } from './auth.service'
import { AuthGuard, Public } from './auth.guard';

// TODO: need to refactor to use RxJs

@Controller('auth')
export class AuthController {
  constructor(
    private readonly emailService: EmailService,
    private readonly userService: UserService,
    private readonly dbService: DbService,
    private readonly authService: AuthService,
  ) {}

  @Public()
  @Post('sign-up')
  async signUp(
    @Body(new ValidationPipe({whitelist: false})) body: AuthUserReqDto,
  ): Promise<AuthDto|Error|any> {    
    // DB
    const addOneResult: AuthUserDto|Error = await this.userService.addOne(body);

    if (!addOneResult['id'] && !addOneResult['email']) {
      if (this.dbService.checkErrorIfUniqueViolation(addOneResult as Error)) {
        throw new ConflictException(messagesDto.AUTH_EMAIL_ALREADY_EXISTS.message, { cause: addOneResult, description: messagesDto.AUTH_EMAIL_ALREADY_EXISTS.error })
      } else {
        throw new InternalServerErrorException(messagesDto.INTERNAL_ERROR.message, { cause: addOneResult, description: messagesDto.INTERNAL_ERROR.error })
      }
    } else {
      // JWT
      const tokenResultAccess: TokenDto|Error = this.authService.getJWT(addOneResult['id'], addOneResult['email'], 'access');
      const tokenResultRefresh: TokenDto|Error = this.authService.getJWT(addOneResult['id'], addOneResult['email'], 'refresh');

      if (!tokenResultAccess.token || !tokenResultAccess.expiresAt) {
        throw new InternalServerErrorException(messagesDto.INTERNAL_ERROR.message, { cause: tokenResultAccess, description: messagesDto.INTERNAL_ERROR.error })
        return
      }
      if (!tokenResultRefresh.token || !tokenResultRefresh.expiresAt) {
        throw new InternalServerErrorException(messagesDto.INTERNAL_ERROR.message, { cause: tokenResultRefresh, description: messagesDto.INTERNAL_ERROR.error })
        return
      }      

      // Send email
      // Special case. We don't need to wait because no matter whether email was sent or not we need to return user their credentials
      this.emailService.welcomeVerifyEmail(addOneResult['email'])
        .then(() => {})
        .catch(() => {/*only need to log errors*/})

      return {
        user: addOneResult as AuthUserDto,
        token: {
          access: tokenResultAccess as TokenDto,
          refresh: tokenResultRefresh as TokenDto,
        }
      } as AuthDto
    }
  }

  // TODO : fix issue
  @Public()
  @Post('sign-in')
  async signIn(
    @Body(new ValidationPipe({whitelist: false})) body: AuthUserReqDto,
  ): Promise<any|Error> {
    const findOneResult: AuthUserDto|ErrorDto = await this.userService.findOne(body.email, body.password)

    if (findOneResult['error'] === messagesDto.USER_NOT_FOUNT) {
      throw new ConflictException(messagesDto.USER_NOT_FOUNT.message, { description: messagesDto.USER_NOT_FOUNT.error })
      return
    } else if (findOneResult['error'] === messagesDto.WRONG_PASSWORD) {
      throw new ConflictException(messagesDto.WRONG_PASSWORD.message, { description: messagesDto.WRONG_PASSWORD.error })
      return
    }

    // JWT
    const tokenResultAccess: TokenDto|Error = this.authService.getJWT(findOneResult['id'], findOneResult['email'], 'access');
    const tokenResultRefresh: TokenDto|Error = this.authService.getJWT(findOneResult['id'], findOneResult['email'], 'refresh');

    if (!tokenResultAccess.token || !tokenResultAccess.expiresAt) {
      throw new InternalServerErrorException(messagesDto.INTERNAL_ERROR.message, { cause: tokenResultAccess, description: messagesDto.INTERNAL_ERROR.error })
    }
    if (!tokenResultRefresh.token || !tokenResultRefresh.expiresAt) {
      throw new InternalServerErrorException(messagesDto.INTERNAL_ERROR.message, { cause: tokenResultRefresh, description: messagesDto.INTERNAL_ERROR.error })
    }    

    return {
      user: findOneResult as AuthUserDto,
      token: {
        access: tokenResultAccess as TokenDto,
        refresh: tokenResultRefresh as TokenDto,
      }
    } as AuthDto
  }  

  @UseGuards(AuthGuard)  
  @Post('token')
  async token(
    @Body(new ValidationPipe({whitelist: false})) body: any,
    @Req() req: Request,
  ): Promise<any|Error> {

    // TODO: check if user exists

    // TODO: generate new tokens

    return {r: req['user'], o: {...req['jwt_options']}, b: {...body}}
  }  

  @UseGuards(AuthGuard)  
  @Post('logout')
  logout(
    @Res() res: Response,
  ): void {

    // TODO: do some logout things

    res.status(200).json({status: true}).send()
  }    
}
