import AuthHoc from '../../components/auth-hoc'
import AuthForm from './auth-form'

function AuthPage() {

  return <>
    <AuthHoc>
      <AuthForm />
    </AuthHoc>
  </>
}
export default (AuthPage)