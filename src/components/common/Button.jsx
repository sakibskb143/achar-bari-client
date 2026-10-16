import { LoaderCircle } from 'lucide-react'

const variantClasses = {
  primary:
    'border-brand-primary bg-brand-primary text-white hover:border-brand-primary hover:bg-brand-primary/90',
  secondary:
    'border-brand-secondary bg-brand-secondary text-white hover:border-brand-secondary hover:bg-brand-secondary/90',
  accent:
    'border-brand-accent bg-brand-accent text-brand-text hover:border-brand-accent hover:bg-brand-accent/90',
  outline:
    'border-brand-primary bg-transparent text-brand-primary hover:border-brand-primary hover:bg-brand-primary hover:text-white',
  ghost:
    'border-transparent bg-transparent text-brand-primary hover:border-brand-primary/10 hover:bg-brand-primary/10',
  danger:
    'border-red-700 bg-red-700 text-white hover:border-red-800 hover:bg-red-800',
}

const sizeClasses = {
  sm: 'btn-sm',
  md: 'btn-md',
  lg: 'btn-lg',
}

function Button({
  children,
  type = 'button',
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  fullWidth = false,
  className = '',
  onClick,
}) {
  const buttonClasses = [
    'btn',
    sizeClasses[size] || sizeClasses.md,
    variantClasses[variant] || variantClasses.primary,
    fullWidth ? 'w-full' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <button
      type={type}
      className={buttonClasses}
      disabled={disabled || loading}
      onClick={onClick}
    >
      {loading && (
        <LoaderCircle
          size={18}
          className="animate-spin"
          aria-hidden="true"
        />
      )}

      {loading ? 'Please wait' : children}
    </button>
  )
}

export default Button
