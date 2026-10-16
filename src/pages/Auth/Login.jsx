import { RoutePlaceholder } from '../../components/common'

function Login() {
  return (
    <RoutePlaceholder
      eyebrow="Welcome Back"
      title="Login to AcharBari"
      description="Firebase email/password login, Google sign-in, validation, and error handling will be implemented in Phase 8."
      actionLabel="Create an Account"
      actionPath="/register"
    />
  )
}

export default Login
