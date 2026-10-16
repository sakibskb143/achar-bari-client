export const SHIPPING_RATES = {
  insideChattogram: 60,
  outsideChattogram: 120,
}

export function calculateShipping(location = '') {
  const normalizedLocation = location.trim().toLowerCase()

  if (!normalizedLocation) {
    return 0
  }

  return normalizedLocation.includes('chattogram') ||
    normalizedLocation.includes('chittagong')
    ? SHIPPING_RATES.insideChattogram
    : SHIPPING_RATES.outsideChattogram
}
