import { Minus, Plus } from 'lucide-react'

function QuantitySelector({
  value,
  onChange,
  min = 1,
  max = 99,
  disabled = false,
}) {
  const decreaseQuantity = () => {
    if (value > min) {
      onChange(value - 1)
    }
  }

  const increaseQuantity = () => {
    if (value < max) {
      onChange(value + 1)
    }
  }

  return (
    <div className="inline-flex items-center overflow-hidden rounded-lg border border-brand-secondary/30 bg-brand-surface">
      <button
        type="button"
        onClick={decreaseQuantity}
        disabled={disabled || value <= min}
        className="p-2 text-brand-primary transition hover:bg-brand-primary/10 disabled:cursor-not-allowed disabled:opacity-40"
        aria-label="Decrease quantity"
      >
        <Minus size={18} aria-hidden="true" />
      </button>

      <span
        className="min-w-10 border-x border-brand-secondary/20 px-3 py-2 text-center text-sm font-semibold text-brand-text"
        aria-live="polite"
        aria-label={`Quantity: ${value}`}
      >
        {value}
      </span>

      <button
        type="button"
        onClick={increaseQuantity}
        disabled={disabled || value >= max}
        className="p-2 text-brand-primary transition hover:bg-brand-primary/10 disabled:cursor-not-allowed disabled:opacity-40"
        aria-label="Increase quantity"
      >
        <Plus size={18} aria-hidden="true" />
      </button>
    </div>
  )
}

export default QuantitySelector
