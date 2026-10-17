import {  Globe } from 'lucide-react'
import { useState } from 'react'
import {
  Link,
  useLocation,
  useNavigate,
} from 'react-router-dom'
import {
  Button,
  ErrorMessage,
} from '../../components/common'
import {
  FormField,
  PasswordField,
} from '../../components/forms'
import { useAuth } from '../../context/AuthContext'
import { getFirebaseErrorMessage } from '../../utils/getFirebaseErrorMessage'
import {
  getAuthenticatedUserRole,
  getDashboardPathForRole,
} from '../../utils/userRole'
import AuthPageLayout from './AuthPageLayout'

function Login() {
  const navigate = useNavigate()
  const location = useLocation()

  const {
    loginWithEmail,
    loginWithGoogle,
  } = useAuth()

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const requestedPath =
    location.state?.from?.pathname

  const handleChange = (event) => {
    const { name, value } = event.target

    setFormData((current) => ({
      ...current,
      [name]: value,
    }))

    setError('')
  }

  const redirectUserByRole = async (user) => {
    const role =
      await getAuthenticatedUserRole(user)

    const defaultPath =
      getDashboardPathForRole(role)

    /*
     * Preserve a protected destination only when it
     * matches the user's role.
     */
    if (
      role === 'admin' &&
      requestedPath?.startsWith('/admin')
    ) {
      navigate(requestedPath, {
        replace: true,
      })

      return
    }

    if (
      role === 'user' &&
      requestedPath?.startsWith('/dashboard')
    ) {
      navigate(requestedPath, {
        replace: true,
      })

      return
    }

    navigate(defaultPath, {
      replace: true,
    })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')
    setIsSubmitting(true)

    try {
      const user = await loginWithEmail(
        formData.email,
        formData.password,
      )

      await redirectUserByRole(user)
    } catch (authError) {
      setError(getFirebaseErrorMessage(authError))
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleGoogleLogin = async () => {
    setError('')
    setIsSubmitting(true)

    try {
      const user = await loginWithGoogle()

      await redirectUserByRole(user)
    } catch (authError) {
      setError(getFirebaseErrorMessage(authError))
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <AuthPageLayout
      eyebrow="Welcome Back"
      title="Login to AcharBari"
      description="Sign in to manage your account, orders, and saved flavors."
    >
      <form
        onSubmit={handleSubmit}
        className="space-y-5"
      >
        <ErrorMessage message={error} />

        <FormField
          label="Email address"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="you@example.com"
          autoComplete="email"
          required
          disabled={isSubmitting}
        />

        <PasswordField
          label="Password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          autoComplete="current-password"
          disabled={isSubmitting}
        />

        <div className="text-right">
          <Link
            to="/forgot-password"
            className="text-sm font-semibold text-brand-secondary hover:text-brand-primary"
          >
            Forgot password?
          </Link>
        </div>

        <Button
          type="submit"
          fullWidth
          loading={isSubmitting}
          disabled={isSubmitting}
        >
          Login
        </Button>

        <div className="divider text-xs text-brand-muted">
          OR
        </div>

        <Button
          type="button"
          fullWidth
          variant="outline"
          disabled={isSubmitting}
          onClick={handleGoogleLogin}
        >
          <Globe size={18} aria-hidden="true" />
          Continue with Google
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-brand-muted">
        Do not have an account?{' '}
        <Link
          to="/register"
          className="font-semibold text-brand-primary hover:text-brand-secondary"
        >
          Register
        </Link>
      </p>
    </AuthPageLayout>
  )
}

export default Login
