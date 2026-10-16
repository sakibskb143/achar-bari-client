import { useState } from 'react'
import {
  Button,
  ErrorMessage,
  SectionHeading,
} from '../../components/common'
import { FormField } from '../../components/forms'
import { useAuth } from '../../context/AuthContext'

function EditProfile() {
  const { currentUser, updateUserProfile } = useAuth()

  const [name, setName] = useState(
    currentUser?.displayName || '',
  )
  const [success, setSuccess] = useState('')
  const [error, setError] = useState('')
  const [isSaving, setIsSaving] = useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault()
    setSuccess('')
    setError('')

    if (!name.trim()) {
      setError('Please enter your name.')
      return
    }

    setIsSaving(true)

    try {
      await updateUserProfile(name.trim())
      setSuccess('Your profile was updated successfully.')
    } catch {
      setError(
        'We could not update your profile. Please try again.',
      )
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div>
      <SectionHeading
        align="left"
        eyebrow="Profile"
        title="Edit Your Profile"
        description="Update the name displayed on your AcharBari account."
      />

      <div className="max-w-2xl rounded-2xl border border-brand-secondary/15 bg-brand-surface p-6 shadow-sm">
        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >
          <ErrorMessage message={error} />

          {success && (
            <p
              className="rounded-xl border border-green-200 bg-green-50 p-4 text-sm text-green-700"
              role="status"
            >
              {success}
            </p>
          )}

          <FormField
            label="Full name"
            name="name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Your full name"
            autoComplete="name"
            required
            disabled={isSaving}
          />

          <div>
            <p className="mb-2 text-sm font-semibold text-brand-text">
              Email address
            </p>

            <p className="rounded-xl bg-brand-background px-4 py-3 text-sm text-brand-muted">
              {currentUser?.email}
            </p>

            <p className="mt-2 text-xs text-brand-muted">
              Email changes should be handled through a dedicated verified-account flow.
            </p>
          </div>

          <Button
            type="submit"
            loading={isSaving}
            disabled={isSaving}
          >
            Save Changes
          </Button>
        </form>
      </div>
    </div>
  )
}

export default EditProfile
