import Head from 'next/head'
import Image from 'next/image'
import styles from '@/styles/variables.module.scss'
import { useEffect, useState, FormEvent, SyntheticEvent, ChangeEvent } from 'react'
// import React, { useState, FormEvent } from 'react'

import { useRouter } from 'next/router'
import Link from "next/link"
import { redirect } from 'next/navigation'

// import authService, { setAuthService2 } from '../../services/auth/auth.service'
// const [authService, setAuthService] = useState<AuthService>(new AuthService());
// const authService = new AuthService()
// export default authService
// export const setAuthService2 = setAuthService


export default function Home() {

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

  
  const router = useRouter()

  const [users, setUsers] = useState([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isValidationError, setIsValidationError] = useState<boolean>(false)
  const [error, setError] = useState<{element: string, text: string}>({element: '', text: ''})

  const isAuthPage = (type: string): boolean => {
    return router.asPath === `/auth?sign=${type}`
  }

  const [isSignUp, setIsSignUp] = useState<boolean>(false)
  // const [isSignIn, setIsSignIn] = useState<boolean>(false)

  useEffect(() => {
    setIsSignUp(isAuthPage('up'))
  }, [router])    

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
    if (isLoading) {
      return;
    }
    const data = new FormData()
    Object.entries(formData).forEach(([key, value]) => {
      console.log(key, value)
      data.append(key, value);
    })
    console.log(data.values)
    console.log(data.values())
    // for (const v of formData.values()) {
    //   console.log(v);
    // }    

    if (validateEmail(formData['email'])) {
      setIsValidationError(false)
      setError({element: '', text: ''})
    } else {
      setIsValidationError(true)
      setError({element: 'email', text: 'please enter a valid email'})
      return;      
    }
    
    setIsLoading(true) // Set loading to true when the request starts
 
    try {
      // const formData = new FormData(event.currentTarget)
      const response = await fetch(`http://localhost:3001/user/sign-${isSignUp ? 'up' : 'in'}`, {
        
        method: 'POST',
        headers: {
          'mode': 'cors',
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },        
        // body: JSON.stringify({a: 'b'}),
        body:  JSON.stringify(formData),
      })
 
      // Handle response if necessary
      const responseData = await response.json()
      console.log(responseData)
      // {"id":17,"email":"t@t.te"}
      // {"name":"DB_23505","message":"email_already_exist"}
      
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
    if (event.target.value) {
      if (validateEmail(event.target.value)) {
        setIsValidationError(false)
        setError({element: '', text: ''})
      } else {
        setIsValidationError(true)
        setError({element: 'email', text: 'please enter a valid email'})
        return;      
      }
    }
  }


  return (
    <>
      <main className={`${styles.container} ${styles['is-family-primary']}`}>
        {/* {authService.isAuthorised} */}
        <section className={styles['hero']}>
          <div className={styles['hero-body']}>
            <p className={styles['title']}>
              {isSignUp ? 'Sign up' : 'Log in'}
            </p>
            <p className={styles['subtitle']}>
              {isSignUp ? 'Create account' : 'With username and password'}
            </p>
          </div>
        </section>


        <section className={styles['mt-6']}>
          <div className={`${styles.columns} ${styles['is-mobile']} ${styles['is-centered']}`}>
            <div className={`${styles.column} ${styles['is-one-third']} `}>
              <div className={`${styles['is-one-third']}`}>
                <div className={`${styles.card}`}>
                  {/* <header className={`${styles['card-header']}`}>
                    <p className={styles['card-header-title']}>
                      Authentication
                    </p>
                    <button class="card-header-icon" aria-label="more options">
                      <span class="icon">
                        <i class="fas fa-angle-down" aria-hidden="true"></i>
                      </span>
                    </button>
                  </header>       */}
                  <div className={styles['card-content']}>    
                    <form onSubmit={onSubmit}>
                      <div className={styles.field} >
                        <label className={styles.label}>Email <span className={`${styles['is-size-7']} ${styles['has-text-danger']} ${error.element !=='email' ? styles['is-hidden'] : ''}`}> - {error.text}</span></label>
                        <div className={`${styles.control} ${styles['is-flex']} ${isLoading ? styles['is-loading'] : ''}`}>
                          <input name='email' onChange={handleInput} onBlur={emailOnBlur} value={formData.email} className={`${styles.input} ${isValidationError ? styles['is-danger'] : ''}`} type="text" placeholder="Email" disabled={isLoading} />
                        </div>
                      </div>  
                      <div className={styles.field} >
                        <label className={styles.label}>Password</label>
                        <div className={`${styles.control} ${styles['is-flex']} ${isLoading ? styles['is-loading'] : ''}`}>
                          <input name='password' onChange={handleInput} value={formData.password} className={`${styles.input}`} type="password" placeholder="Password" disabled={isLoading} />
                        </div>
                      </div>      
                      <div className={`${styles.field} ${isSignUp ? '' : styles['is-hidden']}`} >
                        <label className={styles.label}>Retype password</label>
                        <div className={`${styles.control} ${styles['is-flex']} ${isLoading ? styles['is-loading'] : ''}`}>
                          <input name='password2' onChange={handleInput} value={formData.password2} className={`${styles.input}`} type="password" placeholder="Retype password" disabled={isLoading} />
                        </div>
                      </div>                        
                      <div className={styles.field} >
                        <button className={`${styles.button} ${styles['is-primary']}`} disabled={isLoading}>{isSignUp ? 'Sign up' : 'Log in'}</button>
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
