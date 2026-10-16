import { Trash2 } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useCart } from '../../context/CartContext'
import { QuantitySelector } from '../common'
import { formatPrice } from '../../utils/formatPrice'

function CartItem({ item }) {
  const {
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
  } = useCart()

  const { product, quantity } = item

  return (
    <article className="flex gap-4 border-b border-brand-secondary/15 py-5 last:border-b-0">
      <Link
        to={`/products/${product.id}`}
        className="shrink-0"
      >
        <img
          src={product.image}
          alt={product.name}
          className="h-24 w-24 rounded-xl object-cover sm:h-28 sm:w-28"
        />
      </Link>

      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-3">
          <div>
            <Link
              to={`/products/${product.id}`}
              className="font-semibold text-brand-primary hover:text-brand-secondary"
            >
              {product.name}
            </Link>

            <p className="mt-1 text-sm text-brand-muted">
              {product.weight}
            </p>
          </div>

          <button
            type="button"
            onClick={() => removeFromCart(product.id)}
            className="rounded-full p-2 text-red-600 transition hover:bg-red-50"
            aria-label={`Remove ${product.name} from cart`}
          >
            <Trash2 size={18} aria-hidden="true" />
          </button>
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
          <QuantitySelector
            value={quantity}
            min={1}
            max={product.stock}
            onChange={(nextQuantity) =>
              nextQuantity > quantity
                ? increaseQuantity(product.id)
                : decreaseQuantity(product.id)
            }
          />

          <p className="font-bold text-brand-primary">
            {formatPrice(product.price * quantity)}
          </p>
        </div>
      </div>
    </article>
  )
}

export default CartItem
