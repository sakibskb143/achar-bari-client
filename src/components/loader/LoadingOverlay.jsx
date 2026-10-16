function LoadingOverlay({
  isLoading,
  label = 'Please wait',
  children,
}) {
  return (
    <div className="relative">
      {children}

      {isLoading && (
        <div
          className="absolute inset-0 z-10 flex items-center justify-center rounded-inherit bg-white/75 p-6 backdrop-blur-[2px]"
          role="status"
          aria-live="polite"
          aria-label={label}
        >
          <div className="flex items-center gap-3 rounded-xl bg-white px-4 py-3 shadow-md">
            <span
              className="loading loading-spinner text-brand-primary"
              aria-hidden="true"
            />

            <span className="text-sm font-medium text-brand-text">
              {label}
            </span>
          </div>
        </div>
      )}
    </div>
  )
}

export default LoadingOverlay
