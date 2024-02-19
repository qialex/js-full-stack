"use client"
import { useEffect, useState, FormEvent, SyntheticEvent, ChangeEvent } from 'react'
import { usePathname, useSearchParams, useParams } from 'next/navigation'
import { useDispatch } from 'react-redux'
import { AuthDto, messagesDto, AuthUserReqDto } from '@monorepo/lib-common'
import { AuthField, authFieldInitial, AuthFieldP } from '../../components/auth-field'
import { signUp, signIn } from '../../store/features/user/user-slice'


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

export default function Home() {
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

  const dispatch = useDispatch()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const params = useParams()

  const pathProps = checkPath(pathname, params, searchParams)

  const [authState, setAuthState] = useState<AuthState>({
    ...authStateInitial,
    ...pathProps,
    fields: {
      email: {...authFieldInitial, name: 'email', label: 'Email', placeholder: 'Email'},
      password: {...authFieldInitial, name: 'password', label: 'Password', placeholder: 'Password'},
      pwdRetype: {...authFieldInitial, name: 'pwdRetype', label: 'Confirm password', placeholder: 'Confirm password'},
    }
  });

  useEffect(() => {
    const pathProps = checkPath(pathname, params, searchParams)  
    setAuthState({...authState, ...pathProps})   
  }, [pathname, params, searchParams] );    


  const validateEmail = (email: string) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    console.dir(event);
    // if (isLoading) {
    //   return;
    // }
    // const data = new FormData()
    // Object.entries(formData).forEach(([key, value]) => {
    //   console.log(key, value)
    //   data.append(key, value);
    // })

    // const dataDto: AuthReqDto = {
    //   email: formData.email,
    //   password: formData.password,
    // }
    // console.log(data.values)
    // console.log(data.values())
    // for (const v of formData.values()) {
    //   console.log(v);
    // }    

    // if (validateEmail(formData['email'])) {
    //   setIsValidationError(false)
    //   setError({element: '', text: ''})
    // } else {
    //   setIsValidationError(true)
    //   setError({element: 'email', text: 'please enter a valid email'})
    //   return;      
    // }
    
    // setIsLoading(true) // Set loading to true when the request starts

     

    const authUserReqDto: AuthUserReqDto = {
      email: authState.fields.email.value,
      password: authState.fields.password.value,
    }
    dispatch<any>((authState.isSignUp ? signUp : signIn)(authUserReqDto))
    .unwrap()
    .then((originalPromiseResult: any) => {
      // setUser({...user, token: originalPromiseResult.token.access.token})
      console.log(originalPromiseResult)
    })
    .catch((rejectedValueOrSerializedError: any) => {
      console.log(rejectedValueOrSerializedError)
    })
  }

  // handle change value
  function handleInput (event: ChangeEvent<HTMLInputElement>)  {
    console.log(event)
    const fieldName = event.target.name
    const fieldValue = event.target.value
    console.log(fieldName, fieldValue)
    console.log(authState)

    setAuthState((prevState: AuthState) => {
      const state: AuthState = {...prevState} as AuthState;
      (state.fields as any)[fieldName].value = fieldValue;
      return state;
    })
  }   

  function handleBlur(event: ChangeEvent<HTMLInputElement>): void {
    console.log(event)
    // if (event.target.value) {
    //   if (validateEmail(event.target.value)) {
    //     setIsValidationError(false)
    //     setError({element: '', text: ''})
    //   } else {
    //     setIsValidationError(true)
    //     setError({element: 'email', text: 'please enter a valid email'})
    //     return;      
    //   }
    // }
  }

  // async function onRefreshTokenClick(event: any) {
  //   event.preventDefault()

  //   const token: string = user['token']
  //   const response = await fetch('http://localhost:3001/auth/token', {
  //     method: 'POST',
  //     headers: {
  //       'mode': 'cors',
  //       'Accept': 'application/json',
  //       'Content-Type': 'application/json',
  //       'Authorization': `Bearer ${token}`
  //     },        
  //   })
  //   console.log(response)
  // }
  // async function onRefreshTokenClick2(event: any) {
  //   event.preventDefault()

  //   const token: string = user['token']
  //   const response = await fetch('http://localhost:3001/auth/token', {
  //     method: 'POST',
  //     headers: {
  //       'mode': 'cors',
  //       'Accept': 'application/json',
  //       'Content-Type': 'application/json',
  //       'Authorization': `Bearer ${token}`
  //     },        
  //   })
  //   console.log(response)
  // }

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
                                  isLoading={item.isLoading}
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
