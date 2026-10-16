function PageLoader({ label = 'Loading page' }) {
  return (
    <div
      className="flex min-h-[60vh] items-center justify-center bg-brand-background px-6"
      role="status"
      aria-live="polite"
      aria-label={label}
    >
      <div className="flex flex-col items-center gap-4">
        <span
          className="loading loading-spinner loading-lg text-brand-primary"
          aria-hidden="true"
        />

        <p className="text-sm font-medium text-brand-muted">
          {label}
        </p>
      </div>
    </div>
  )
}

export default PageLoader
