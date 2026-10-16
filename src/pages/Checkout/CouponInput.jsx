import { CheckCircle2, Ticket } from 'lucide-react'
import { useState } from 'react'
import { Button } from '../../components/common'
import {
  calculateCouponDiscount,
  validateCoupon,
} from '../../services/couponService'
import { formatPrice } from '../../utils/formatPrice'

function CouponInput({
  subtotal,
  appliedCoupon,
  onApply,
  onRemove,
}) {
  const [code, setCode] = useState('')
  const [message, setMessage] = useState('')
  const [isValid, setIsValid] = useState(false)

  const handleSubmit = (event) => {
    event.preventDefault()

    const result = validateCoupon(code, subtotal)

    setMessage(result.message)
    setIsValid(result.valid)

    if (result.valid) {
      onApply({
        ...result.coupon,
        discountAmount: calculateCouponDiscount(
          result.coupon,
          subtotal,
        ),
      })
    }
  }

  const handleRemove = () => {
    setCode('')
    setMessage('')
    setIsValid(false)
    onRemove()
  }

  if (appliedCoupon) {
    return (
      <div className="rounded-xl border border-green-200 bg-green-50 p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3">
            <CheckCircle2
              size={20}
              className="mt-0.5 shrink-0 text-green-700"
              aria-hidden="true"
            />

            <div>
              <p className="font-semibold text-green-700">
                {appliedCoupon.code} applied
              </p>

              <p className="mt-1 text-sm text-green-700/80">
                You saved{' '}
                {formatPrice(appliedCoupon.discountAmount)}.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleRemove}
            className="text-sm font-semibold text-green-700 underline"
          >
            Remove
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="mt-8">
      <h2 className="mb-3 text-xl font-bold text-brand-primary">
        Apply Coupon
      </h2>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-3 sm:flex-row"
      >
        <label className="relative flex-1">
          <span className="sr-only">
            Coupon code
          </span>

          <Ticket
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-muted"
            aria-hidden="true"
          />

          <input
            type="text"
            value={code}
            onChange={(event) => {
              setCode(event.target.value)
              setMessage('')
              setIsValid(false)
            }}
            placeholder="Enter coupon code"
            className="input input-bordered w-full border-brand-secondary/25 bg-brand-surface pl-10 uppercase focus:border-brand-primary"
          />
        </label>

        <Button
          type="submit"
          variant="outline"
        >
          Apply
        </Button>
      </form>

      {message && (
        <p
          className={[
            'mt-2 text-sm',
            isValid ? 'text-green-700' : 'text-red-600',
          ].join(' ')}
          role="status"
        >
          {message}
        </p>
      )}

      <p className="mt-3 text-xs text-brand-muted">
        Demo codes: WELCOME10 and PICKLE50
      </p>
    </div>
  )
}

export default CouponInput
