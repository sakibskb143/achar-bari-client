function TasteQuestion({
  question,
  options,
  value,
  onChange,
}) {
  return (
    <fieldset>
      <legend className="text-xl font-bold text-brand-primary sm:text-2xl">
        {question}
      </legend>

      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        {options.map((option) => {
          const isSelected = value === option.value

          return (
            <label
              key={option.value}
              className={[
                'cursor-pointer rounded-2xl border p-4 transition',
                isSelected
                  ? 'border-brand-primary bg-brand-primary text-white'
                  : 'border-brand-secondary/20 bg-brand-surface text-brand-text hover:border-brand-primary',
              ].join(' ')}
            >
              <input
                type="radio"
                name="taste-question"
                value={option.value}
                checked={isSelected}
                onChange={() => onChange(option.value)}
                className="sr-only"
              />

              <span className="block font-semibold">
                {option.label}
              </span>

              {option.description && (
                <span
                  className={[
                    'mt-1 block text-sm',
                    isSelected
                      ? 'text-white/75'
                      : 'text-brand-muted',
                  ].join(' ')}
                >
                  {option.description}
                </span>
              )}
            </label>
          )
        })}
      </div>
    </fieldset>
  )
}

export default TasteQuestion
