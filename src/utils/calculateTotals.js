export function calculateOrderTotals({
  subtotal = 0,
  shipping = 0,
  discount = 0,
}) {
  const safeSubtotal = Math.max(0, subtotal)
  const safeShipping = Math.max(0, shipping)
  const safeDiscount = Math.min(
    Math.max(0, discount),
    safeSubtotal,
  )

  return {
    subtotal: safeSubtotal,
    shipping: safeShipping,
    discount: safeDiscount,
    total: safeSubtotal + safeShipping - safeDiscount,
  }
}
