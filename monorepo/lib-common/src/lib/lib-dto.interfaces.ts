export interface StatusDto {
  code: string,
  message: string,
}

export interface EmailDto {
  email: string,    
}

export interface AuthUserReqDto extends EmailDto {
  email: string,    
  password: string, 
}

export interface AuthUserDto extends EmailDto {
    id: number, 
    email: string,    
}

export interface TokenDto {
  token: string,
  expiresAt: number,
}

export interface AuthDto {
  user: AuthUserDto
  token: {
    access: TokenDto,
    refresh: TokenDto,
  }
}

export const emptyStatusDto: StatusDto = {
  code: '',
  message: '',
}
export const emptyEmail: EmailDto = {
  email: '',
}
export const emptyUserReqDto: AuthUserReqDto = {
  email: '',
  password: '',
}
export const emptyUserDto: AuthUserDto = {
  id: 0,
  email: '',
}
export const emptyTokenDto: TokenDto = {
  token: '',    
  expiresAt: 0,
}
export const emptyAuthDto: AuthDto = {
  user: {...emptyUserDto} as AuthUserDto,
  token: {
    access: {...emptyTokenDto} as TokenDto,
    refresh: {...emptyTokenDto} as TokenDto,
  },
}