import { Check } from 'lucide-react'
import { formatPrice } from '../../utils/formatPrice'

function BoxProductSelector({
  products,
  selectedProducts,
  capacity,
  onToggle,
}) {
  const selectedIds = selectedProducts.map(
    (product) => product.id,
  )

  return (
    <fieldset className="mt-10">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <legend className="text-xl font-bold text-brand-primary">
          Choose your pickles
        </legend>

        <p className="text-sm text-brand-muted">
          {selectedProducts.length} of {capacity} selected
        </p>
      </div>

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        {products
          .filter((product) => product.stock > 0)
          .map((product) => {
            const isSelected = selectedIds.includes(product.id)
            const capacityReached =
              selectedProducts.length >= capacity

            const isDisabled =
              !isSelected && capacityReached

            return (
              <label
                key={product.id}
                className={[
                  'relative cursor-pointer overflow-hidden rounded-2xl border transition',
                  isSelected
                    ? 'border-brand-primary ring-2 ring-brand-primary/20'
                    : 'border-brand-secondary/20',
                  isDisabled
                    ? 'cursor-not-allowed opacity-50'
                    : 'hover:border-brand-primary',
                ].join(' ')}
              >
                <input
                  type="checkbox"
                  checked={isSelected}
                  disabled={isDisabled}
                  onChange={() => onToggle(product)}
                  className="sr-only"
                />

                <img
                  src={product.image}
                  alt={product.name}
                  className="h-36 w-full object-cover"
                />

                {isSelected && (
                  <span className="absolute right-3 top-3 rounded-full bg-brand-primary p-2 text-white">
                    <Check size={16} aria-hidden="true" />
                  </span>
                )}

                <div className="p-4">
                  <p className="font-semibold text-brand-primary">
                    {product.name}
                  </p>

                  <p className="mt-1 text-sm text-brand-muted">
                    {product.weight}
                  </p>

                  <p className="mt-3 font-bold text-brand-primary">
                    {formatPrice(product.price)}
                  </p>
                </div>
              </label>
            )
          })}
      </div>
    </fieldset>
  )
}

export default BoxProductSelector
