import { Link } from 'react-router-dom'
import { Button } from '../common'
import { formatPrice } from '../../utils/formatPrice'


function CartSummary({
  subtotal,
  deliveryCharge = 0,
  showCheckoutButton = true,
}) {
  const total = subtotal + deliveryCharge

  return (
    <aside className="rounded-2xl border border-brand-secondary/15 bg-brand-surface p-6 shadow-sm">
      <h2 className="text-xl font-bold text-brand-primary">
        Order Summary
      </h2>

      <div className="mt-6 space-y-4 text-sm">
        <div className="flex items-center justify-between gap-4">
          <span className="text-brand-muted">
            Subtotal
          </span>

          <span className="font-semibold text-brand-text">
            {formatPrice(subtotal)}
          </span>
        </div>

        <div className="flex items-center justify-between gap-4">
          <span className="text-brand-muted">
            Delivery
          </span>

          <span className="font-semibold text-brand-text">
            {deliveryCharge > 0
              ? formatPrice(deliveryCharge)
              : 'Calculated at checkout'}
          </span>
        </div>
      </div>

      <div className="my-5 border-t border-brand-secondary/15" />

      <div className="flex items-center justify-between gap-4">
        <span className="font-semibold text-brand-text">
          Total
        </span>

        <span className="text-2xl font-bold text-brand-primary">
          {formatPrice(total)}
        </span>
      </div>

      {showCheckoutButton && (
        <Link
          to="/checkout"
          className="mt-6 block"
        >
          <Button fullWidth>
            Proceed to Checkout
          </Button>
        </Link>
      )}
    </aside>
  )
}

export default CartSummary
