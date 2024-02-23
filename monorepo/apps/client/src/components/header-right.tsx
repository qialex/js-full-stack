// components/header-right.tsx
import React from 'react'
import Link from 'next/link'
import { useDispatch } from 'react-redux'
import { connect } from 'react-redux'
import { logout, selectSlice } from '../store/features/user/user-slice'
import { AuthHocState } from './auth-hoc'
import { AuthUserDto } from '@monorepo/lib-common'

// const HeaderRight: React.FC = ({user, authHocState}: {user: AuthUserDto, authHocState: AuthHocState}) => {
// const HeaderRight: React.FC = ({user, authHocState}: {user: any, authHocState: any}) => {
const HeaderRight: React.FC = ({user, authHocState}: any) => {  
  const dispatch = useDispatch()

  const handleLogoutClick = () => {
    dispatch<any>(logout(null))
  }

  return  <div className='navbar-menu'>
            <div className='navbar-end'>
              <div className='field is-grouped'>
                {authHocState.isAuthenticated &&
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
                {!authHocState.isAuthenticated && 
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
            </div>
          </div>
};
// export default HeaderRight
export default connect(selectSlice)(HeaderRight) 