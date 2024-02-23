'use client'
import { usePathname, useSearchParams, useParams, useRouter, ReadonlyURLSearchParams } from 'next/navigation'
import { useEffect, useState, cloneElement, ReactNode, Dispatch, SetStateAction, ReactElement } from 'react'
import { connect } from 'react-redux'
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'
import { selectAuthenticated } from '../store/features/user/user-slice'

export interface AuthHocUrlState {
  isAuthPage: boolean,
  isSignUp: boolean,
  isSignIn: boolean,
  isRestore: boolean,
}

export interface AuthHocState extends AuthHocUrlState {
  isLoading: boolean,
  isAuthenticated: boolean,
}

export interface UsedParams {
  [key: string]: string | string[]
}

function AuthHoc({
  children,
  isAuthenticated,
}: {
  children: ReactNode;
  isAuthenticated: boolean;
}): ReactNode {
  function checkIfNeedToRedirrect(state: AuthHocState): void {
    if (state.isAuthenticated && state.isAuthPage) {
      router.push('/')
    }  
  }

  function checkPath(pathname: string, params: UsedParams, searchParams: ReadonlyURLSearchParams): AuthHocUrlState {

    let isAuthPage  : boolean = false
    let isSignUp    : boolean = false
    let isSignIn    : boolean = false
    let isRestore   : boolean = false

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

  const pathname: string = usePathname()
  const searchParams: ReadonlyURLSearchParams = useSearchParams()
  const router: AppRouterInstance = useRouter()
  const params: UsedParams = useParams()    

  const pathProps = checkPath(pathname, params, searchParams)  

  const [authHocState, setAuthHocState]: [AuthHocState, Dispatch<SetStateAction<AuthHocState>>] = useState<AuthHocState>({isLoading: false, isAuthenticated, ...pathProps})  

  useEffect(() => {
    const newParams: AuthHocState = {...authHocState, ...checkPath(pathname, params, searchParams), isAuthenticated}
    setAuthHocState(newParams)
    
    // if we are authorised, we don't need auth page
    checkIfNeedToRedirrect(newParams)

  }, [pathname, params, searchParams, isAuthenticated] );  

  if (children) {
    return <>{cloneElement(children as ReactElement, { authHocState } as {authHocState: AuthHocState})}</>
  } else {
    return <></>
  }
}
export default connect(selectAuthenticated)(AuthHoc)