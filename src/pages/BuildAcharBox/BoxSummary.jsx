import { formatPrice } from '../../utils/formatPrice'
import { Button } from '../../components/common'

function BoxSummary({
  boxSize,
  selectedProducts,
  discountPercentage,
  onAddToCart,
}) {
  const basePrice = selectedProducts.reduce(
    (total, product) => total + product.price,
    0,
  )

  const discountAmount =
    basePrice * (discountPercentage / 100)

  const finalPrice = Math.round(basePrice - discountAmount)

  const canAddToCart =
    selectedProducts.length === boxSize

  return (
    <aside className="rounded-2xl border border-brand-secondary/15 bg-brand-surface p-6 shadow-sm lg:sticky lg:top-28 lg:self-start">
      <h2 className="text-xl font-bold text-brand-primary">
        Your Box Summary
      </h2>

      <div className="mt-5 space-y-3">
        {selectedProducts.length === 0 ? (
          <p className="text-sm text-brand-muted">
            Choose products to build your box.
          </p>
        ) : (
          selectedProducts.map((product) => (
            <div
              key={product.id}
              className="flex items-center justify-between gap-3 text-sm"
            >
              <span className="text-brand-muted">
                {product.name}
              </span>

              <span className="font-semibold text-brand-text">
                {formatPrice(product.price)}
              </span>
            </div>
          ))
        )}
      </div>

      <div className="my-5 border-t border-brand-secondary/15" />

      <div className="space-y-3 text-sm">
        <div className="flex justify-between gap-3">
          <span className="text-brand-muted">
            Original price
          </span>

          <span className="font-semibold text-brand-text">
            {formatPrice(basePrice)}
          </span>
        </div>

        <div className="flex justify-between gap-3">
          <span className="text-brand-muted">
            Box discount
          </span>

          <span className="font-semibold text-green-700">
            -{discountPercentage}%
          </span>
        </div>
      </div>

      <div className="my-5 border-t border-brand-secondary/15" />

      <div className="flex items-center justify-between gap-3">
        <span className="font-semibold text-brand-text">
          Final price
        </span>

        <span className="text-2xl font-bold text-brand-primary">
          {formatPrice(finalPrice)}
        </span>
      </div>

      <Button
        fullWidth
        className="mt-6"
        disabled={!canAddToCart}
        onClick={onAddToCart}
      >
        {canAddToCart
          ? 'Add Box to Cart'
          : `Select ${boxSize - selectedProducts.length} more`}
      </Button>
    </aside>
  )
}

export default BoxSummary
