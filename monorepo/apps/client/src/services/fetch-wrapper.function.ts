import { AuthUserDto, AuthDto, AuthUserReqDto, TokenDto } from '@monorepo/lib-common'

export { useFetchWrapper }

export const defautltApiUrl = 'http://localhost:3001'

const ENDPOINTS = {
  SIGN_UP : '/auth/sign-up',
  SIGN_IN : '/auth/sign-in',
  TOKEN   : '/auth/token',
  LOGOUT  : '/auth/logout',
}

function useFetchWrapper() {
  return {
    get     : request('GET'),
    post    : request('POST'),
    put     : request('PUT'),
    delete  : request('DELETE'),

    signUp  : (authUserReqDto: AuthUserReqDto) => {return request('POST')(ENDPOINTS.SIGN_UP, authUserReqDto)},
    signIn  : (authUserReqDto: AuthUserReqDto) => {return request('POST')(ENDPOINTS.SIGN_IN, authUserReqDto)},
    token   : (_: any, token: string) => {return request('POST')(ENDPOINTS.TOKEN, _, token)},
    logout  : (_: any, token: string) => {return request('POST')(ENDPOINTS.LOGOUT, _, token)},
  }

  function request(method: string) {
    return (url: string, body: BodyInit | null | any, token?: string) => {
      const urlPrepared = `${process.env.API_URL_FOR_CLIENT || defautltApiUrl}${url}`
      const requestOptions: RequestInit  = {
        method,
        headers: authHeader(token),
      };
      if (body) {
        requestOptions.body = JSON.stringify(body)
      }
      return fetch(urlPrepared, requestOptions)
    }
  }
    
    // helper functions
    
  function authHeader(token?: string): HeadersInit {
    const headers: HeadersInit = {
      'mode': 'cors',
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }
    if (token){
      headers['Authorization'] = `Bearer ${token}`
    }
    return headers;
  }
}