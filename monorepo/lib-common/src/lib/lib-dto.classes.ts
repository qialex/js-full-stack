import { IsEmail, IsNotEmpty, MinLength, IsNumber, IsString } from 'class-validator';


const MIN_PASSWORD_LENGTH = 6;
// this will be used for one time pin in recovery email
const MIN_ONE_TIME_PASSWORD_LENGTH = 4;

export class EmailDto {
  @IsEmail()
  email: string;
}

export class PasswordDto {
  @MinLength(MIN_PASSWORD_LENGTH)
  password: string;
}

export class AuthUserReqDto implements EmailDto, PasswordDto {
  @IsEmail()
  email: string;  
  @MinLength(MIN_PASSWORD_LENGTH)
  password: string
}

export class SignUpFormDto implements EmailDto, PasswordDto {
  @IsEmail()
  email: string;  
  @MinLength(MIN_PASSWORD_LENGTH)
  password: string
  @MinLength(MIN_PASSWORD_LENGTH)
  pwdRetype: string
}

export class AuthUserDto extends EmailDto {
    @IsNumber()
    id: number;
}

export class TokenDto {
  @IsString()
  token: string;
  @IsNumber()
  expiresAt: number;
}

export class AuthDto {
  user: AuthUserDto
  token: {
    access: TokenDto,
    refresh: TokenDto,
  }
}