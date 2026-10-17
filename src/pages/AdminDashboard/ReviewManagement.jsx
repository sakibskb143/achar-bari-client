import { Check, Star, X } from 'lucide-react'
import { useState } from 'react'
import {
  Badge,
  SectionHeading,
} from '../../components/common'
import { adminReviews as initialReviews } from '../../data/adminData'

function ReviewManagement() {
  const [reviews, setReviews] = useState(initialReviews)

  const updateReviewStatus = (reviewId, status) => {
    setReviews((currentReviews) =>
      currentReviews.map((review) =>
        review.id === reviewId
          ? {
              ...review,
              status,
            }
          : review,
      ),
    )
  }

  const deleteReview = (reviewId) => {
    setReviews((currentReviews) =>
      currentReviews.filter(
        (review) => review.id !== reviewId,
      ),
    )
  }

  return (
    <div>
      <SectionHeading
        align="left"
        eyebrow="Customer Feedback"
        title="Review Management"
        description="Approve, reject, or remove customer reviews."
      />

      <div className="space-y-5">
        {reviews.map((review) => (
          <article
            key={review.id}
            className="rounded-2xl border border-brand-secondary/15 bg-brand-surface p-5 shadow-sm"
          >
            <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
              <div>
                <p className="font-semibold text-brand-primary">
                  {review.customerName}
                </p>

                <p className="mt-1 text-sm text-brand-secondary">
                  {review.productName}
                </p>
              </div>

              <Badge
                variant={
                  review.status === 'Published'
                    ? 'success'
                    : 'warning'
                }
              >
                {review.status}
              </Badge>
            </div>

            <div className="mt-4 flex gap-1 text-brand-accent">
              {Array.from({ length: review.rating }).map(
                (_, index) => (
                  <Star
                    key={index}
                    size={16}
                    fill="currentColor"
                    aria-hidden="true"
                  />
                ),
              )}
            </div>

            <p className="mt-3 leading-7 text-brand-muted">
              {review.comment}
            </p>

            <div className="mt-5 flex flex-wrap gap-3 border-t border-brand-secondary/15 pt-4">
              <button
                type="button"
                onClick={() =>
                  updateReviewStatus(
                    review.id,
                    'Published',
                  )
                }
                className="inline-flex items-center gap-2 text-sm font-semibold text-green-700"
              >
                <Check size={16} aria-hidden="true" />
                Approve
              </button>

              <button
                type="button"
                onClick={() =>
                  updateReviewStatus(
                    review.id,
                    'Rejected',
                  )
                }
                className="inline-flex items-center gap-2 text-sm font-semibold text-yellow-700"
              >
                <X size={16} aria-hidden="true" />
                Reject
              </button>

              <button
                type="button"
                onClick={() => deleteReview(review.id)}
                className="text-sm font-semibold text-red-600"
              >
                Delete
              </button>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}

export default ReviewManagement
