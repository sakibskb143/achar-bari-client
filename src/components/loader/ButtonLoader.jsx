function ButtonLoader({ label = 'Processing' }) {
  return (
    <span className="inline-flex items-center gap-2">
      <span
        className="loading loading-spinner loading-sm"
        aria-hidden="true"
      />

      <span>{label}</span>
    </span>
  )
}

export default ButtonLoader
