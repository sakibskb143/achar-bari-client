function PaymentMethodSelector({
  value,
  onChange,
  disabled = false,
}) {
  const paymentMethods = [
    {
      value: 'cod',
      title: 'Cash on Delivery',
      description: 'Pay when your order arrives.',
    },
    {
      value: 'bkash',
      title: 'Manual bKash Payment',
      description: 'Send payment manually and wait for verification.',
    },
  ]

  return (
    <fieldset className="mt-8">
      <legend className="text-xl font-bold text-brand-primary">
        Payment Method
      </legend>

      <div className="mt-5 space-y-3">
        {paymentMethods.map((method) => {
          const isSelected = value === method.value

          return (
            <label
              key={method.value}
              className={[
                'block cursor-pointer rounded-2xl border p-4 transition',
                isSelected
                  ? 'border-brand-primary bg-brand-primary/5 ring-2 ring-brand-primary/10'
                  : 'border-brand-secondary/20 hover:border-brand-primary',
              ].join(' ')}
            >
              <span className="flex items-start gap-3">
                <input
                  type="radio"
                  name="paymentMethod"
                  value={method.value}
                  checked={isSelected}
                  onChange={(event) =>
                    onChange(event.target.value)
                  }
                  disabled={disabled}
                  className="radio mt-1 border-brand-primary checked:bg-brand-primary"
                />

                <span>
                  <span className="block font-semibold text-brand-text">
                    {method.title}
                  </span>

                  <span className="mt-1 block text-sm leading-6 text-brand-muted">
                    {method.description}
                  </span>
                </span>
              </span>
            </label>
          )
        })}
      </div>
    </fieldset>
  )
}

export default PaymentMethodSelector
