function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'center',
  className = '',
}) {
  const alignmentClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  }

  return (
    <div
      className={[
        'mb-8',
        alignmentClasses[align] || alignmentClasses.center,
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {eyebrow && (
        <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-brand-secondary">
          {eyebrow}
        </p>
      )}

      <h2 className="text-3xl font-bold text-brand-primary md:text-4xl">
        {title}
      </h2>

      {description && (
        <p className="mx-auto mt-3 max-w-2xl leading-7 text-brand-muted">
          {description}
        </p>
      )}
    </div>
  )
}

export default SectionHeading
