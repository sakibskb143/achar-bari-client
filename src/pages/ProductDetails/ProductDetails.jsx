import {
  ArrowLeft,
  ExternalLink,
  Phone,
  ShoppingBag,
  Star,
} from 'lucide-react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useState } from 'react'
import {
  Badge,
  Button,
  ErrorMessage,
  QuantitySelector,
  SectionHeading,
} from '../../components/common'
import {
  ProductGallery,
  ProductRating,
  ProductReviews,
  RelatedProducts,
} from '../../components/products'
import {
  getProductById,
  getRelatedProducts,
} from '../../services/productService'
import { formatPrice } from '../../utils/formatPrice'

function ProductDetails() {
  const { productId } = useParams()
  const navigate = useNavigate()
  const [quantity, setQuantity] = useState(1)
  const [notice, setNotice] = useState('')

  const product = getProductById(productId)

  if (!product) {
    return (
      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <ErrorMessage
            title="Product not found"
            message="The product you are looking for does not exist."
          />

          <Link
            to="/shop"
            className="mt-6 inline-block"
          >
            <Button variant="outline">
              <ArrowLeft size={18} aria-hidden="true" />
              Back to Shop
            </Button>
          </Link>
        </div>
      </section>
    )
  }

  const isInStock = product.stock > 0
  const relatedProducts = getRelatedProducts(
    product.id,
    product.category,
  )

  const handleAddToCart = () => {
    if (!isInStock) {
      return
    }

    setNotice(
      `${quantity} × ${product.name} is ready to be added to your cart.`,
    )
  }

  const handleBuyNow = () => {
    if (!isInStock) {
      return
    }

    navigate('/checkout', {
      state: {
        productId: product.id,
        quantity,
      },
    })
  }

  const whatsappMessage = encodeURIComponent(
    `Hello, I would like to order ${product.name} (${product.weight}).`,
  )

  return (
    <section className="px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <Link
          to="/shop"
          className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-brand-secondary transition hover:text-brand-primary"
        >
          <ArrowLeft size={17} aria-hidden="true" />
          Back to Shop
        </Link>

        <div className="grid gap-10 lg:grid-cols-2">
          <ProductGallery product={product} />

          <div>
            <div className="flex flex-wrap gap-2">
              <Badge variant={isInStock ? 'success' : 'danger'}>
                {isInStock ? 'In Stock' : 'Out of Stock'}
              </Badge>

              <Badge variant="accent">
                {product.spiceLevel} Spice
              </Badge>

              <Badge variant="secondary">
                {product.taste}
              </Badge>
            </div>

            <p className="mt-5 font-bengali text-base text-brand-secondary">
              {product.bengaliName}
            </p>

            <h1 className="mt-1 text-3xl font-bold text-brand-primary sm:text-4xl">
              {product.name}
            </h1>

            <div className="mt-5">
              <ProductRating
                rating={product.rating}
                reviewCount={product.reviewCount}
              />
            </div>

            <div className="mt-6 flex items-end gap-3">
              <p className="text-3xl font-bold text-brand-primary">
                {formatPrice(product.price)}
              </p>

              {product.compareAtPrice && (
                <p className="text-lg text-brand-muted line-through">
                  {formatPrice(product.compareAtPrice)}
                </p>
              )}

              <span className="mb-1 text-sm text-brand-muted">
                / {product.weight}
              </span>
            </div>

            <p className="mt-6 leading-8 text-brand-muted">
              {product.shortDescription}
            </p>

            {notice && (
              <div
                className="mt-5 rounded-xl border border-brand-accent/50 bg-brand-accent/20 px-4 py-3 text-sm font-medium text-brand-text"
                role="status"
              >
                {notice}
              </div>
            )}

            <div className="mt-7 flex flex-wrap items-center gap-4">
              <QuantitySelector
                value={quantity}
                onChange={setQuantity}
                min={1}
                max={Math.max(product.stock, 1)}
                disabled={!isInStock}
              />

              <Button
                disabled={!isInStock}
                onClick={handleAddToCart}
              >
                <ShoppingBag size={18} aria-hidden="true" />
                Add to Cart
              </Button>

              <Button
                variant="accent"
                disabled={!isInStock}
                onClick={handleBuyNow}
              >
                Buy Now
              </Button>
            </div>

            <div className="mt-6 flex flex-wrap gap-4">
              <a
                href={`https://wa.me/8801000000000?text=${whatsappMessage}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-sm font-semibold text-green-700 transition hover:text-green-800"
              >
                <ExternalLink size={16} aria-hidden="true" />
                Order through WhatsApp
              </a>

              <a
                href="tel:+8801000000000"
                className="inline-flex items-center gap-2 text-sm font-semibold text-brand-secondary transition hover:text-brand-primary"
              >
                <Phone size={16} aria-hidden="true" />
                Call to order
              </a>
            </div>

            <div className="mt-8 grid gap-4 border-t border-brand-secondary/15 pt-7 sm:grid-cols-3">
              <div>
                <p className="text-xs uppercase tracking-wide text-brand-muted">
                  Taste
                </p>

                <p className="mt-1 font-semibold text-brand-text">
                  {product.taste}
                </p>
              </div>

              <div>
                <p className="text-xs uppercase tracking-wide text-brand-muted">
                  Spice
                </p>

                <p className="mt-1 font-semibold text-brand-text">
                  {product.spiceLevel}
                </p>
              </div>

              <div>
                <p className="text-xs uppercase tracking-wide text-brand-muted">
                  Pairs with
                </p>

                <p className="mt-1 font-semibold text-brand-text">
                  {product.pairing[0]}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 grid gap-8 lg:grid-cols-2">
          <div className="rounded-2xl bg-brand-surface p-6 shadow-sm">
            <SectionHeading
              align="left"
              title="About This Pickle"
              description={product.description}
              className="mb-6"
            />

            <h2 className="text-lg font-semibold text-brand-primary">
              Ingredients
            </h2>

            <p className="mt-3 leading-7 text-brand-muted">
              {product.ingredients}
            </p>
          </div>

          <div className="rounded-2xl bg-brand-surface p-6 shadow-sm">
            <div className="mb-6 flex items-center justify-between gap-4">
              <h2 className="text-2xl font-bold text-brand-primary">
                Customer Reviews
              </h2>

              <div className="flex items-center gap-1 text-brand-accent">
                <Star
                  size={18}
                  fill="currentColor"
                  aria-hidden="true"
                />

                <span className="font-semibold text-brand-text">
                  {product.rating}
                </span>
              </div>
            </div>

            <ProductReviews productId={product.id} />
          </div>
        </div>

        <RelatedProducts
          products={relatedProducts}
          onAddToCart={(relatedProduct ) =>
            setNotice(
              `${relatedProduct.name} is ready to be added to your cart.`,
            )
          }
        />
      </div>
    </section>
  )
}

export default ProductDetails
