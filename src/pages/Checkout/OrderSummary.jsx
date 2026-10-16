import { formatPrice } from '../../utils/formatPrice'

function OrderSummary({
  cartItems,
  totals,
  appliedCoupon,
}) {
  return (
    <aside className="rounded-2xl border border-brand-secondary/15 bg-brand-surface p-6 shadow-sm lg:sticky lg:top-28 lg:self-start">
      <h2 className="text-xl font-bold text-brand-primary">
        Order Summary
      </h2>

      <div className="mt-5 space-y-4">
        {cartItems.map((item) => (
          <div
            key={item.product.id}
            className="flex justify-between gap-4 text-sm"
          >
            <div>
              <p className="font-semibold text-brand-text">
                {item.product.name}
              </p>

              <p className="mt-1 text-brand-muted">
                {item.quantity} × {formatPrice(item.product.price)}
              </p>
            </div>

            <p className="font-semibold text-brand-text">
              {formatPrice(
                item.product.price * item.quantity,
              )}
            </p>
          </div>
        ))}
      </div>

      <div className="my-5 border-t border-brand-secondary/15" />

      <div className="space-y-3 text-sm">
        <div className="flex justify-between gap-4">
          <span className="text-brand-muted">
            Subtotal
          </span>

          <span className="font-semibold text-brand-text">
            {formatPrice(totals.subtotal)}
          </span>
        </div>

        <div className="flex justify-between gap-4">
          <span className="text-brand-muted">
            Delivery
          </span>

          <span className="font-semibold text-brand-text">
            {formatPrice(totals.shipping)}
          </span>
        </div>

        {appliedCoupon && (
          <div className="flex justify-between gap-4">
            <span className="text-green-700">
              Coupon discount
            </span>

            <span className="font-semibold text-green-700">
              -{formatPrice(totals.discount)}
            </span>
          </div>
        )}
      </div>

      <div className="my-5 border-t border-brand-secondary/15" />

      <div className="flex items-center justify-between gap-4">
        <span className="font-semibold text-brand-text">
          Total
        </span>

        <span className="text-2xl font-bold text-brand-primary">
          {formatPrice(totals.total)}
        </span>
      </div>
    </aside>
  )
}

export default OrderSummary
