import { X } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useCart } from '../../context/CartContext'
import { Button } from '../common'
import CartItem from './CartItem'
import { formatPrice } from '../../utils/formatPrice'

function CartDrawer({ isOpen, onClose }) {
  const { cartItems, subtotal } = useCart()

  if (!isOpen) {
    return null
  }

  return (
    <div className="fixed inset-0 z-50">
      <button
        type="button"
        className="absolute inset-0 h-full w-full bg-brand-text/40"
        onClick={onClose}
        aria-label="Close cart drawer"
      />

      <aside className="relative ml-auto flex h-full w-[min(94%,460px)] flex-col bg-brand-background shadow-2xl">
        <div className="flex items-center justify-between border-b border-brand-secondary/15 px-5 py-5">
          <div>
            <h2 className="text-xl font-bold text-brand-primary">
              Your Cart
            </h2>

            <p className="mt-1 text-sm text-brand-muted">
              {cartItems.length} product type
              {cartItems.length === 1 ? '' : 's'}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-full p-2 text-brand-muted transition hover:bg-brand-primary/10 hover:text-brand-primary"
            aria-label="Close cart drawer"
          >
            <X size={22} aria-hidden="true" />
          </button>
        </div>

        {cartItems.length === 0 ? (
          <div className="flex flex-1 items-center px-5">
            <div className="w-full">
              <p className="text-center text-brand-muted">
                Your cart is empty.
              </p>

              <Link
                to="/shop"
                onClick={onClose}
                className="mt-5 block"
              >
                <Button fullWidth>
                  Start Shopping
                </Button>
              </Link>
            </div>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-5">
              {cartItems.map((item) => (
                <CartItem
                  key={item.product.id}
                  item={item}
                />
              ))}
            </div>

            <div className="border-t border-brand-secondary/15 bg-brand-surface p-5">
              <div className="mb-4 flex items-center justify-between">
                <span className="text-brand-muted">
                  Subtotal
                </span>

                <span className="text-xl font-bold text-brand-primary">
                  {formatPrice(subtotal)}
                </span>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <Link
                  to="/cart"
                  onClick={onClose}
                >
                  <Button
                    fullWidth
                    variant="outline"
                  >
                    View Cart
                  </Button>
                </Link>

                <Link
                  to="/checkout"
                  onClick={onClose}
                >
                  <Button fullWidth>
                    Checkout
                  </Button>
                </Link>
              </div>
            </div>
          </>
        )}
      </aside>
    </div>
  )
}

export default CartDrawer
