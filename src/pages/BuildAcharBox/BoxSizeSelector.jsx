const boxSizes = [
  {
    value: 2,
    label: 'Mini Box',
    description: 'Choose 2 pickle jars',
  },
  {
    value: 3,
    label: 'Family Box',
    description: 'Choose 3 pickle jars',
  },
  {
    value: 4,
    label: 'Gift Box',
    description: 'Choose 4 pickle jars',
  },
]

function BoxSizeSelector({
  value,
  onChange,
}) {
  return (
    <fieldset>
      <legend className="text-xl font-bold text-brand-primary">
        Choose your box size
      </legend>

      <div className="mt-5 grid gap-4 sm:grid-cols-3">
        {boxSizes.map((box) => {
          const isSelected = value === box.value

          return (
            <label
              key={box.value}
              className={[
                'cursor-pointer rounded-2xl border p-5 transition',
                isSelected
                  ? 'border-brand-primary bg-brand-primary text-white'
                  : 'border-brand-secondary/20 bg-brand-surface hover:border-brand-primary',
              ].join(' ')}
            >
              <input
                type="radio"
                name="box-size"
                value={box.value}
                checked={isSelected}
                onChange={() => onChange(box.value)}
                className="sr-only"
              />

              <span className="block text-lg font-bold">
                {box.label}
              </span>

              <span
                className={[
                  'mt-2 block text-sm',
                  isSelected
                    ? 'text-white/75'
                    : 'text-brand-muted',
                ].join(' ')}
              >
                {box.description}
              </span>
            </label>
          )
        })}
      </div>
    </fieldset>
  )
}

export default BoxSizeSelector
