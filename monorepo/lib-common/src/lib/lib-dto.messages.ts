import { IsEmail, IsNotEmpty, MinLength, IsNumber, IsString } from 'class-validator';
/*
const example = {
  error: "Some error description"
  message: "Something bad happened"
  statusCode: 409
} */

export class ErrorDto {
  @IsString()
  error: string
  @IsString()
  message: string
}

export const messagesDto = {
  AUTH_EMAIL_ALREADY_EXISTS: {
    error: '',
    message: 'Email already exsit',
  } as ErrorDto,
  INTERNAL_ERROR: {
    error: '',
    message: 'Internal error',
  } as ErrorDto,
  USER_NOT_FOUNT: {
    error: '',
    message: 'User not found',
  } as ErrorDto,
  WRONG_PASSWORD: {
    error: '',
    message: 'Wrong password',
  } as ErrorDto,
}

Object.keys(messagesDto).forEach(key => {
  messagesDto[key].error = key
})

