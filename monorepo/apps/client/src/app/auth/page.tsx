"use client"
import { useEffect, useState, FormEvent, SyntheticEvent, ChangeEvent } from 'react'
import { usePathname, useSearchParams, useParams, useRouter } from 'next/navigation'
import { useDispatch, connect } from 'react-redux'
import { AuthDto, messagesDto, AuthUserReqDto, PasswordDto, SignUpFormDto } from '@monorepo/lib-common'
import { AuthField, authFieldInitial, AuthFieldP } from '../../components/auth-field'
import { signUp, signIn, selectAuth } from '../../store/features/user/user-slice'


import {
  validate,
  validateSync,
  validateOrReject,
  Contains,
  IsInt,
  Length,
  IsEmail,
  IsFQDN,
  IsDate,
  Min,
  Max,
} from 'class-validator';

// import {AuthUserReqDto} from 



export interface AuthState {
  isLoading: boolean,
  isAuthPage: boolean,
  isSignUp: boolean,
  isSignIn: boolean,
  isRestore: boolean,
  fields: {
    email: AuthFieldP,
    password: AuthFieldP,
    pwdRetype: AuthFieldP,
  }
}

export const authStateInitial: AuthState =  {
  isLoading: false,
  isAuthPage: false,
  isSignUp: false,
  isSignIn: false,
  isRestore: false,
  fields: {
    email: {...authFieldInitial},
    password: {...authFieldInitial},
    pwdRetype: {...authFieldInitial},
  }
}

function AuthPage({isAuth}: any) {

  // if we are authorised, we don't need auth page
  useEffect(() => {
    if (isAuth) {
      router.push('/')
    }      
  }, [isAuth]);

  const dispatch = useDispatch()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const router = useRouter()
  const params = useParams()



  function checkPath(pathname: any, params: any, searchParams: any): any {
    let isAuthPage, isSignUp, isSignIn, isRestore = false
    if (pathname === '/auth') {
      isAuthPage = true
    }    
    if (pathname === '/auth' &&  searchParams.get('sign') === 'in') {
      isSignIn = true
    }
    if (pathname === '/auth' &&  searchParams.get('sign') === 'up') {
      isSignUp = true
    }
    return {isAuthPage, isSignUp, isSignIn, isRestore}
  }

  const pathProps = checkPath(pathname, params, searchParams)

  const [authState, setAuthState] = useState<AuthState>({
    ...authStateInitial,
    ...pathProps,
    fields: {
      email: {...authFieldInitial, name: 'email', label: 'Email', placeholder: 'Email'},
      password: {...authFieldInitial, name: 'password', label: 'Password', placeholder: 'Password', type: 'password'},
      pwdRetype: {...authFieldInitial, name: 'pwdRetype', label: 'Confirm password', placeholder: 'Confirm password', type: 'password'},
    }
  });

  useEffect(() => {
    const pathProps = checkPath(pathname, params, searchParams)  
    setAuthState({...authState, ...pathProps})   
  }, [pathname, params, searchParams] );    


  function validation(): boolean {
    let allGood = true
    let validationFields: any
    if (authState.isSignIn) {
      validationFields = new AuthUserReqDto()
    }

    if (authState.isSignUp) {
      validationFields = new SignUpFormDto()
      validationFields.pwdRetype = authState.fields.pwdRetype.value      
    }

    validationFields.password = authState.fields.password.value
    validationFields.email = authState.fields.email.value    

    let validations: any[] = validateSync(validationFields)
    allGood = allGood && !validations.length

    const newState = {...authState}
    validations.forEach((validation: any) => {
      (newState.fields as any)[validation.property].error = Object.values(validation.constraints).join(' ')
    })

    if (!validations.length && authState.isSignUp && validationFields.password !== validationFields.pwdRetype) {
      allGood = false
      newState.fields.pwdRetype.error = 'Passwords should match'
    }
    if (!allGood) {
      setAuthState(newState)
    } else {
      newState.fields.email.error =  ''
      newState.fields.password.error = ''
      newState.fields.pwdRetype.error = ''
      setAuthState(newState)
    }

    return allGood;    
  }
  
  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (authState.isLoading) {
      return
    } 

    if (!validation()) {
      return;
    }



    setAuthState({...authState, isLoading: true})

    const authUserReqDto: AuthUserReqDto = {email: authState.fields.email.value, password: authState.fields.password.value} as AuthUserReqDto
    dispatch<any>((authState.isSignUp ? signUp : signIn)(authUserReqDto))
    .unwrap()
    .then((originalPromiseResult: any) => {
      // setUser({...user, token: originalPromiseResult.token.access.token})
      console.log(originalPromiseResult)
    })
    .catch((rejectedValueOrSerializedError: any) => {
      console.log(rejectedValueOrSerializedError)
    })
    .finally(() => {
      setAuthState({...authState, isLoading: false})
    })
  }

  // handle change value
  function handleInput (event: ChangeEvent<HTMLInputElement>)  {
    const fieldName = event.target.name
    const fieldValue = event.target.value

    setAuthState((prevState: AuthState) => {
      const state: AuthState = {...prevState} as AuthState;
      (state.fields as any)[fieldName].value = fieldValue;
      return state;
    })
  }   

  function handleBlur(event: ChangeEvent<HTMLInputElement>): void {
    // console.log(event)
  }

  if (isAuth) {
    return <></>
  }

  return (
    <>
      <main className='container is-family-primary'>
        {/* {authService.isAuthorised} */}
        <section className='hero'>
          <div className='hero-body'>
            <p className='title'>
              {authState.isSignUp ? 'Sign up' : 'Log in'}
            </p>
            <p className='subtitle'>
              {authState.isSignUp ? 'Create account' : 'With username and password'}
            </p>
          </div>
        </section>


        <section className='mt-6'>
          <div className='columns is-mobile is-centered'>
            <div className='column is-one-third'>
              <div className='is-one-third'>
                <div className='card'>

                  <div className='card-content'>    
                    <form onSubmit={onSubmit}>
                      {Object.keys(authState.fields).map((key) => {

                        if (authState.isSignIn && key === 'pwdRetype') {
                          return <div key={key}></div>
                        }

                        const item: AuthFieldP = {...(authState.fields as any)[key]};

                        return <AuthField 
                                  key={key}
                                  label={item.label}
                                  placeholder={item.placeholder}
                                  type={item.type}
                                  name={item.name}
                                  value={item.value}
                                  error={item.error}
                                  // isLoading={item.isLoading}
                                  isLoading={authState.isLoading}
                                  isValid={item.isValid}
                                  isTouched={item.isTouched}
                                  handleBlur={handleBlur}
                                  handleInput={handleInput}
                                  />
                      })}
                      

                      <div className='field' >
                        <button className={`button is-primary`} disabled={authState.isLoading}>{authState.isSignUp ? 'Sign up' : 'Log in'}</button>
                      </div>             
                      {/* { 
                        (user && user.token) &&

                          <div className='field'>
                            <button className='button is-primary' disabled={authState.isLoading} onClick={onRefreshTokenClick}>Refresh token</button>
                            <button className='button is-primary' disabled={authState.isLoading} onClick={onRefreshTokenClick2}>Refresh token bad</button>
                          </div>  
                      } */}
                           
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
export default connect(selectAuth)(AuthPage)