const variantClasses = {
  primary: 'bg-brand-primary/10 text-brand-primary',
  secondary: 'bg-brand-secondary/15 text-brand-secondary',
  accent: 'bg-brand-accent/25 text-brand-text',
  success: 'bg-green-100 text-green-700',
  warning: 'bg-yellow-100 text-yellow-800',
  danger: 'bg-red-100 text-red-700',
  neutral: 'bg-gray-100 text-gray-700',
}

function Badge({
  children,
  variant = 'primary',
  className = '',
}) {
  return (
    <span
      className={[
        'inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold',
        variantClasses[variant] || variantClasses.primary,
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {children}
    </span>
  )
}

export default Badge
