import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Button,
  ErrorMessage,
} from '../../components/common'
import { FormField } from '../../components/forms'
import { useAuth } from '../../context/AuthContext'
import { getFirebaseErrorMessage } from '../../utils/getFirebaseErrorMessage'
import AuthPageLayout from './AuthPageLayout'

function ForgotPassword() {
  const { sendPasswordReset } = useAuth()

  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')
    setSuccess('')
    setIsSubmitting(true)

    try {
      await sendPasswordReset(email)

      setSuccess(
        'If an account exists for this email, a password reset link has been sent.',
      )
      setEmail('')
    } catch (authError) {
      setError(getFirebaseErrorMessage(authError))
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <AuthPageLayout
      eyebrow="Account Recovery"
      title="Reset Your Password"
      description="Enter your email address and Firebase will send instructions to reset your password."
    >
      <form
        onSubmit={handleSubmit}
        className="space-y-5"
      >
        <ErrorMessage message={error} />

        {success && (
          <p
            className="rounded-xl border border-green-200 bg-green-50 p-4 text-sm leading-6 text-green-700"
            role="status"
          >
            {success}
          </p>
        )}

        <FormField
          label="Email address"
          name="email"
          type="email"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value)
            setError('')
            setSuccess('')
          }}
          placeholder="you@example.com"
          autoComplete="email"
          required
          disabled={isSubmitting}
        />

        <Button
          type="submit"
          fullWidth
          loading={isSubmitting}
          disabled={isSubmitting}
        >
          Send Reset Link
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-brand-muted">
        Remember your password?{' '}
        <Link
          to="/login"
          className="font-semibold text-brand-primary hover:text-brand-secondary"
        >
          Return to Login
        </Link>
      </p>
    </AuthPageLayout>
  )
}

export default ForgotPassword
