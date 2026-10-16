import { Eye, EyeOff } from 'lucide-react'
import { useState } from 'react'

function PasswordField({
  label = 'Password',
  name = 'password',
  value,
  onChange,
  required = true,
  autoComplete = 'current-password',
  disabled = false,
}) {
  const [isVisible, setIsVisible] = useState(false)

  return (
    <label className="block">
      <span className="mb-2 block text-sm font-semibold text-brand-text">
        {label}
        {required && (
          <span className="ml-1 text-red-600" aria-hidden="true">
            *
          </span>
        )}
      </span>

      <span className="relative block">
        <input
          id={name}
          name={name}
          type={isVisible ? 'text' : 'password'}
          value={value}
          onChange={onChange}
          required={required}
          autoComplete={autoComplete}
          disabled={disabled}
          className="input input-bordered w-full border-brand-secondary/25 bg-brand-surface pr-12 text-brand-text outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 disabled:cursor-not-allowed disabled:opacity-60"
        />

        <button
          type="button"
          onClick={() => setIsVisible((current) => !current)}
          disabled={disabled}
          className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full p-2 text-brand-muted transition hover:bg-brand-primary/10 hover:text-brand-primary disabled:opacity-50"
          aria-label={
            isVisible
              ? 'Hide password'
              : 'Show password'
          }
        >
          {isVisible ? (
            <EyeOff size={18} aria-hidden="true" />
          ) : (
            <Eye size={18} aria-hidden="true" />
          )}
        </button>
      </span>
    </label>
  )
}

export default PasswordField
