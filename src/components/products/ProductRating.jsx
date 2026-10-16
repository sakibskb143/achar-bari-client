import { Star } from 'lucide-react'

function ProductRating({
  rating,
  reviewCount,
  showReviewCount = true,
}) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-1 text-brand-accent">
        <Star
          size={16}
          fill="currentColor"
          aria-hidden="true"
        />

        <span className="text-sm font-semibold text-brand-text">
          {rating.toFixed(1)}
        </span>
      </div>

      {showReviewCount && (
        <span className="text-sm text-brand-muted">
          ({reviewCount} reviews)
        </span>
      )}
    </div>
  )
}

export default ProductRating
