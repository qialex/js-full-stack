// components/header-right.tsx
import React from 'react'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname, useSearchParams, useParams } from 'next/navigation'
import { useDispatch } from 'react-redux'
import { connect } from 'react-redux'
import { selectAuth, logout } from '../store/features/user/user-slice'

const HeaderRight: React.FC = ({isAuth, user, logoutLocal}: any) => {
  const dispatch = useDispatch()

  function checkPath(pathname: any, params: any, logoutLocal: any): any {
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

  const pathname = usePathname()
  const searchParams = useSearchParams()
  const params = useParams()

  const pathProps = checkPath(pathname, params, searchParams)  

  const [headState, setHeadState] = useState({...pathProps})
  
  useEffect(() => {
    setHeadState({...checkPath(pathname, params, searchParams)})  
  }, [pathname, params, searchParams] );  

  const handleLogoutClick = () => {
    console.log('handleLogoutClick')
    // logoutLocal()
    // dispatch(logoutLocal())
    dispatch<any>(logout(null))
  }

  return  <div className='navbar-menu'>
            <div className='navbar-end'>
              {/* <div className='navbar-item'> */}
                <div className='field is-grouped'>
                  {isAuth &&
                    <>
                      <a className="navbar-item pt-4 pb-4">
                        <strong>
                          {user.email}
                        </strong>
                      </a>
                      <a className="navbar-item pt-4 pb-4" onClick={handleLogoutClick}>
                        <span className='is-size-6'>
                          Log out
                        </span>
                        <span className="icon is-size-5 ml-1 pt-1">
                          <i className="fas fa-sign-out-alt"></i>
                        </span>
                      </a>
                    </>
                  }
                  {!isAuth && 
                    <div className='buttons'>
                      {/* {(headState.isSignIn || headState.isRestore || !headState.isAuthPage) &&  */}
                        <Link href="/auth?sign=up" className='button is-primary'>
                          <strong>Sign up</strong>
                        </Link>
                      {/* } */}
                      {/* {(headState.isSignUp || headState.isRestore || !headState.isAuthPage) &&  */}
                        <Link href="/auth?sign=in" className='button is-light'>
                          Log in
                        </Link>                
                      {/* }  */}
                    </div>      
                  }          
                </div>
              {/* </div> */}
            </div>
          </div>
};
// export default HeaderRight
export default connect(selectAuth, {logoutLocal: logout})(HeaderRight)