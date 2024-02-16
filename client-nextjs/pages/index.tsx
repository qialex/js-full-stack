import Head from 'next/head'
import Image from 'next/image'
import styles from '@/styles/variables.module.scss'
import { useEffect, useState, FormEvent } from 'react'
// import React, { useState, FormEvent } from 'react'

import { useRouter } from 'next/router'
import Link from "next/link"
import { redirect } from 'next/navigation'


export default function Home() {

  const [users, setUsers] = useState([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isValidationError, setIsValidationError] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  const router = useRouter()
  // whatever
  // const doSomething = () => router.replace('sign')  
  const doSomething = () => {
    // redirect('/sign', 'push')  
    // redirect('/sign')
    // router.push("/sign")
    router.push({
      pathname: '/auth',
      query: { 'sign': 'in' }
  })
  }
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
  //       // setTimeout(() => {
  //       //   doSomething()
  //       // }, 2000)
        
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
    console.dir(event.currentTarget)
    const formData = new FormData(event.currentTarget)
    console.log(formData.values())
    if (validateEmail('asd')) {
      setIsValidationError(false)
      setError(null)
    } else {
      setIsValidationError(true)
      setError('Not a valid email')
      return;      
    }
    
    setIsLoading(true) // Set loading to true when the request starts
 
    try {
      const formData = new FormData(event.currentTarget)
      const response = await fetch('http://localhost:3001/user/authenticate', {
        method: 'POST',
        headers: {
          mode: 'cors',
        },        
        body: formData,
      })
 
      // Handle response if necessary
      const data = await response.json()
      // ...
    } catch (error) {
      // Handle error if necessary
      console.error(error)
    } finally {
      setIsLoading(false) // Set loading to false when the request completes
    }
  }


  return (
    <>
      <main className={`${styles.container} ${styles['is-family-primary']}`}>

        <section className={styles['hero']}>
          <div className={styles['hero-body']}>
            <p className={styles['title']}>
              Not gerular sign in / sign up flow
            </p>
            <p className={styles['subtitle']}>
              Single form managing authentication process
            </p>
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
