import { Star } from 'lucide-react'
import { reviews } from '../../data/reviews'

function ProductReviews({ productId }) {
  const productReviews = reviews.filter(
    (review) => review.productId === productId,
  )

  if (productReviews.length === 0) {
    return (
      <p className="text-sm text-brand-muted">
        No reviews are available for this product yet.
      </p>
    )
  }

  return (
    <div className="space-y-5">
      {productReviews.map((review) => (
        <article
          key={review.id}
          className="border-b border-brand-secondary/15 pb-5 last:border-0 last:pb-0"
        >
          <div className="flex items-center justify-between gap-4">
            <p className="font-semibold text-brand-primary">
              {review.customerName}
            </p>

            <time
              dateTime={review.date}
              className="text-xs text-brand-muted"
            >
              {review.date}
            </time>
          </div>

          <div className="mt-2 flex gap-1 text-brand-accent">
            {Array.from({ length: review.rating }).map(
              (_, index) => (
                <Star
                  key={index}
                  size={15}
                  fill="currentColor"
                  aria-hidden="true"
                />
              ),
            )}
          </div>

          <p className="mt-3 text-sm leading-7 text-brand-muted">
            {review.comment}
          </p>
        </article>
      ))}
    </div>
  )
}

export default ProductReviews
