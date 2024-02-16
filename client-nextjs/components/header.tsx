import styles from '@/styles/variables.module.scss'
import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

const Header: React.FC = () => {
  
  const router = useRouter()

  const isAuthPage = (type: string): boolean => {
    return router.asPath === `/auth?sign=${type}`
  }

  const [isSignUp, setIsSignUp] = useState<boolean>(false)
  const [isSignIn, setIsSignIn] = useState<boolean>(false)

  useEffect(() => {
    setIsSignUp(isAuthPage('up'))
    setIsSignIn(isAuthPage('in'))
  }, [router])  

  return <header >
    <section className={`${styles.container} ${styles['is-family-primary']}`}>
      <nav className={`${styles['navbar']} ${styles['is-transparent']}`}>
        <div className={`${styles['navbar-brand']}`}>
          {/* <a className={styles['navbar-start']} href="/">
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
        
        <div className={styles['navbar-menu']}>
          <div className={styles['navbar-start']}>
            <a className={styles['navbar-item']} href="/">
              Home
            </a>
            <a className={styles['navbar-item']} href="https://github.com/qialex/js-full-stack">
              github.com/qialex/js-full-stack
            </a>              

            <a className={styles['navbar-item']} href="https://qialex.me">
              CV / Resume website
            </a>
          </div>
        </div>

        <div className={styles['navbar-menu']}>
          <div className={styles['navbar-end']}>
            <div className={styles['navbar-item']}>
              <div className={`${styles['field']}  ${styles['is-grouped']}`}>
                <p className={styles['control']}>
                </p>
                <div className={styles['buttons']}>
                  {/* <Link href="/auth?sign=up" className={`${styles['button']} ${styles['is-primary']} ${isSignUp ? styles['is-hidden'] : ''}`}> */}
                  <Link href="/auth?sign=up" className={`${styles['button']} ${styles['is-primary']} ${isSignUp ? styles['is-hidden'] : ''}`}>
                  
                    <strong>Sign up</strong>
                  </Link>
                  <Link href="/auth?sign=in" className={`${styles['button']} ${styles['is-light']} ${isSignIn ? styles['is-hidden'] : ''}`}>
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