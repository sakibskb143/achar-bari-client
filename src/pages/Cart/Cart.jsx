import { Link } from 'react-router-dom'
import { SectionHeading } from '../../components/common'
import {
  CartItem,
  CartSummary,
  EmptyCart,
} from '../../components/cart'
import { useCart } from '../../context/CartContext'

function Cart() {
  const { cartItems, subtotal } = useCart()

  return (
    <section className="px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Shopping Cart"
          title="Your AcharBari Cart"
          description="Review your selected pickles before continuing to checkout."
        />

        {cartItems.length === 0 ? (
          <EmptyCart />
        ) : (
          <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
            <div className="rounded-2xl border border-brand-secondary/15 bg-brand-surface px-5 sm:px-7">
              {cartItems.map((item) => (
                <CartItem
                  key={item.product.id}
                  item={item}
                />
              ))}

              <Link
                to="/shop"
                className="inline-block py-5 text-sm font-semibold text-brand-secondary hover:text-brand-primary"
              >
                Continue Shopping
              </Link>
            </div>

            <CartSummary subtotal={subtotal} />
          </div>
        )}
      </div>
    </section>
  )
}

export default Cart
