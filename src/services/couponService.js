import { coupons } from '../data/coupons'

export function validateCoupon(code, subtotal) {
  const normalizedCode = code.trim().toUpperCase()

  if (!normalizedCode) {
    return {
      valid: false,
      message: 'Please enter a coupon code.',
    }
  }

  const coupon = coupons.find(
    (item) =>
      item.code.toUpperCase() === normalizedCode &&
      item.active,
  )

  if (!coupon) {
    return {
      valid: false,
      message: 'This coupon code is invalid or expired.',
    }
  }

  if (subtotal < coupon.minimumOrder) {
    return {
      valid: false,
      message: `This coupon requires a minimum order of ৳${coupon.minimumOrder}.`,
    }
  }

  return {
    valid: true,
    coupon,
    message: `${coupon.code} applied successfully.`,
  }
}

export function calculateCouponDiscount(coupon, subtotal) {
  if (!coupon) {
    return 0
  }

  if (coupon.type === 'percentage') {
    return Math.round(subtotal * (coupon.value / 100))
  }

  if (coupon.type === 'fixed') {
    return Math.min(coupon.value, subtotal)
  }

  return 0
}
