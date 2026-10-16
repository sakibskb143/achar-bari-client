import {
  Heart,
  ShoppingBag,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import {
  Badge,
  Button,
} from '../common'
import ProductRating from './ProductRating'
import { formatPrice } from '../../utils/formatPrice'

function ProductCard({
  product,
  onAddToCart,
}) {
  const [isWishlisted, setIsWishlisted] = useState(false)
  const isInStock = product.stock > 0

  const handleAddToCart = () => {
    if (!isInStock) {
      return
    }

    onAddToCart?.(product)
  }

  return (
    <article className="group overflow-hidden rounded-2xl border border-brand-secondary/15 bg-brand-surface shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
      <div className="relative overflow-hidden">
        <Link to={`/products/${product.id}`}>
          <img
            src={product.image}
            alt={product.name}
            className="h-64 w-full object-cover transition duration-500 group-hover:scale-105"
          />
        </Link>

        <button
          type="button"
          onClick={() => setIsWishlisted((current) => !current)}
          className={[
            'absolute right-4 top-4 rounded-full bg-white/90 p-2 shadow-sm transition',
            isWishlisted
              ? 'text-red-600'
              : 'text-brand-primary hover:bg-brand-primary hover:text-white',
          ].join(' ')}
          aria-label={
            isWishlisted
              ? `Remove ${product.name} from wishlist`
              : `Add ${product.name} to wishlist`
          }
        >
          <Heart
            size={19}
            fill={isWishlisted ? 'currentColor' : 'none'}
            aria-hidden="true"
          />
        </button>

        <div className="absolute bottom-4 left-4 flex flex-wrap gap-2">
          <Badge variant={isInStock ? 'success' : 'danger'}>
            {isInStock ? 'In Stock' : 'Out of Stock'}
          </Badge>

          <Badge variant="accent">
            {product.spiceLevel}
          </Badge>
        </div>
      </div>

      <div className="p-5">
        <p className="font-bengali text-sm text-brand-secondary">
          {product.bengaliName}
        </p>

        <Link to={`/products/${product.id}`}>
          <h2 className="mt-1 line-clamp-2 min-h-14 text-lg font-semibold text-brand-primary transition hover:text-brand-secondary">
            {product.name}
          </h2>
        </Link>

        <div className="mt-3">
          <ProductRating
            rating={product.rating}
            reviewCount={product.reviewCount}
          />
        </div>

        <div className="mt-5 flex items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <p className="text-xl font-bold text-brand-primary">
                {formatPrice(product.price)}
              </p>

              {product.compareAtPrice && (
                <p className="text-sm text-brand-muted line-through">
                  {formatPrice(product.compareAtPrice)}
                </p>
              )}
            </div>

            <p className="mt-1 text-xs text-brand-muted">
              {product.weight}
            </p>
          </div>

          <Button
            size="sm"
            disabled={!isInStock}
            onClick={handleAddToCart}
          >
            <ShoppingBag
              size={16}
              aria-hidden="true"
            />

            {isInStock ? 'Add' : 'Unavailable'}
          </Button>
        </div>
      </div>
    </article>
  )
}

export default ProductCard
