"use client"

import Head from 'next/head'
import Image from 'next/image'

import { useEffect, useState, FormEvent, SyntheticEvent, ChangeEvent } from 'react'
// import React, { useState, FormEvent } from 'react'

// import { useRouter } from 'next/router'
// import Link from "next/link"
// import { redirect } from 'next/navigation'

// import authService, { setAuthService2 } from '../../services/auth/auth.service'
// const [authService, setAuthService] = useState<AuthService>(new AuthService());
// const authService = new AuthService()
// export default authService
// export const setAuthService2 = setAuthService



import { AuthReqDto } from '@monorepo/lib-common'

export default function Home() {

  const authState = {
    isSignUp: true,
    isSignIn: true,
    isLoading: false,
  }  

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    password2: "",
  });

  const handleInput = (e: any) => {
    const fieldName = e.target.name;
    const fieldValue = e.target.value;

    setFormData((prevState) => ({
      ...prevState,
      [fieldName]: fieldValue
    }));
  }  

  
  // const router = useRouter()

  const [users, setUsers] = useState([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isValidationError, setIsValidationError] = useState<boolean>(false)
  const [error, setError] = useState<{element: string, text: string}>({element: '', text: ''})

  // const isAuthPage = (type: string): boolean => {
  //   return router.asPath === `/auth?sign=${type}`
  // }

  // const [isSignUp, setIsSignUp] = useState<boolean>(false)
  // // const [isSignIn, setIsSignIn] = useState<boolean>(false)

  // useEffect(() => {
  //   setIsSignUp(isAuthPage('up'))
  // }, [router])    

  // const router = useRouter()
  // whatever
  // const doSomething = () => router.replace('sign')  
  // const doSomething = () => {
  //   // redirect('/sign', 'push')  
  //   // redirect('/sign')
  //   // router.push("/sign")
  //   router.push({
  //     pathname: '/auth',
  //     query: { 'sign': 'in' }
  // })
  // }
  // redirect
  

  // router.push({
  //   pathname: '/sign',
  //   query: { name: 'Someone' }
  // })  

  // useEffect(() => {
  //   fetch('http://localhost:3001/students', {
  //     headers: {
  //       mode: 'cors'
  //     }
  //   })
  //     .then((response: Response) => response.json())
  //     .then((users: any) => {
  //       setUsers(users)
  //     })
  //     .finally(() => {
  //       setTimeout(() => {
  //         doSomething()
  //       }, 2000)
        
  //     })
  // }, [])

  // useEffect(() => {
  //   fetch('http://localhost:3001/user/authenticate', {
  //     method: 'POST',
  //     headers: {
  //       mode: 'cors',
  //     }
  //   })
  //   .then((response: Response) => response.json())
  //   .then((responseData: any) => {
  //     console.log(responseData);
  //   })
  //   .then((users: any) => {
  //     setUsers(users)
  //   })
  // }, [])
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
    const data = new FormData()
    Object.entries(formData).forEach(([key, value]) => {
      console.log(key, value)
      data.append(key, value);
    })

    const dataDto: AuthReqDto = {
      email: formData.email,
      password: formData.password,
    }
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
    
    setIsLoading(true) // Set loading to true when the request starts
 
    try {
      // const formData = new FormData(event.currentTarget)
      const response = await fetch(`http://localhost:3001/auth/sign-${authState.isSignUp ? 'up' : 'in'}`, {
        
        method: 'POST',
        headers: {
          'mode': 'cors',
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },        
        // body: JSON.stringify({a: 'b'}),
        // body:  JSON.stringify(dataDto),
        body: JSON.stringify(dataDto),
        
      })
 
      // Handle response if necessary
      const responseData = await response.json()
      console.log(responseData)
      if (responseData.id && responseData.email) {
        // authService.user.id = responseData.id
        // authService.user.email = responseData.email     
        // setAuthService2({user: {id: responseData.id, email: responseData.email}, isAuthorised: true})
      } 
      // ...
    } catch (error) {
      // Handle error if necessary
      console.error(error)
    } finally {
      setIsLoading(false) // Set loading to false when the request completes
    }
  }

  function emailOnBlur(event: ChangeEvent<HTMLInputElement>): void {
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
                      <div className='field' >
                        <label className='label'>Email <span className={`is-size-7 has-text-danger ${error.element !=='email' ? 'is-hidden' : ''}`}> - {error.text}</span></label>
                        <div className={`control is-flex ${authState.isLoading ? 'is-loading' : ''}`}>
                          <input name='email' onChange={handleInput} onBlur={emailOnBlur} value={formData.email} className={`input ${isValidationError ? 'is-danger' : ''}`} type="text" placeholder="Email" disabled={isLoading} />
                        </div>
                      </div>  
                      <div className='field' >
                        <label className='label'>Password</label>
                        <div className={`control is-flex ${isLoading ? 'is-loading' : ''}`}>
                          <input name='password' onChange={handleInput} value={formData.password} className='input' type="password" placeholder="Password" disabled={isLoading} />
                        </div>
                      </div>      
                      <div className={`field ${authState.isSignUp ? '' : 'is-hidden'}`} >
                        <label className='label'>Retype password</label>
                        <div className={`control is-flex ${isLoading ? 'is-loading' : ''}`}>
                          <input name='password2' onChange={handleInput} value={formData.password2} className='input' type="password" placeholder="Retype password" disabled={isLoading} />
                        </div>
                      </div>                        
                      <div className='field' >
                        <button className={`button is-primary`} disabled={authState.isLoading}>{authState.isSignUp ? 'Sign up' : 'Log in'}</button>
                      </div>                
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        





        {/* <div>
          {users.map((user: any) => {
            return (
              <div key={`user-${user.id}`}>
                <span>#{user.id} {user.name}</span><br />
              </div>
            )
          })}
        </div> */}


      </main>
    </>
  )
}
