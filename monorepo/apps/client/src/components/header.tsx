// components/Header.tsx
import React from 'react'
import Link from 'next/link'
// import { useRouter } from 'next/router'
// import { useEffect, useState } from 'react'

const Header: React.FC = () => {
  
  // const router = useRouter()

  // const isAuthPage = (type: string): boolean => {
  //   return router.asPath === `/auth?sign=${type}`
  // }

  // const [isSignUp, setIsSignUp] = useState<boolean>(false)
  // const [isSignIn, setIsSignIn] = useState<boolean>(false)

  // useEffect(() => {
  //   setIsSignUp(isAuthPage('up'))
  //   setIsSignIn(isAuthPage('in'))
  // }, [router, authService])  

  const isSignUp = false
  const isSignIn = false

  return <header >
    <section className='container is-family-primary'>
      <nav className='navbar is-transparent'>
        <div className='navbar-brand'>
          {/* <a className={'navbar-start href="/">
            <h1>Demo fullstack project</h1>
          </a> */}
          {/* <a class="navbar-item" href="https://github.com/qialex/js-full-stack">
            <h1>qialex/js-full-stack</h1>
          </a> */}

          {/* <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a> */}
        </div>
        
        <div className='navbar-menu'>
          <div className='navbar-start'>
            <a className='navbar-item pt-4 pb-4' href="/">
              Home
            </a>
            <a className='navbar-item pt-4 pb-4' href="https://github.com/qialex/js-full-stack">
              github.com/qialex/js-full-stack
            </a>              

            <a className='navbar-item pt-4 pb-4' href="https://qialex.me">
              CV / Resume website
            </a>
          </div>
        </div>

        <div className='navbar-menu'>
          <div className='navbar-end'>
            <div className='navbar-item'>
              <div className='field is-grouped'>
                <p className='control'>
                </p>
                <div className='buttons'>
                  <Link href="/auth?sign=up" className={`button is-primary ${isSignUp ? 'is-hidden' : ''}`}>
                    <strong>Sign up</strong>
                  </Link>
                  <Link href="/auth?sign=in" className={`button is-light ${isSignIn ? 'is-hidden' : ''}`}>
                    Log in
                  </Link>
                </div>                
              </div>
            </div>
          </div>
        </div>
      </nav>
    </section>
  </header>;
};

export default Header;