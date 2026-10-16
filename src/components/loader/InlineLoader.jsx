function InlineLoader({ label = 'Loading' }) {
  return (
    <div
      className="inline-flex items-center gap-2 text-sm text-brand-muted"
      role="status"
      aria-live="polite"
      aria-label={label}
    >
      <span
        className="loading loading-spinner loading-sm text-brand-primary"
        aria-hidden="true"
      />

      <span>{label}</span>
    </div>
  )
}

export default InlineLoader
