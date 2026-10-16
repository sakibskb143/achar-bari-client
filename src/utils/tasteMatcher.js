function matchesPreference(product, preference) {
  return preference === 'all' || product === preference
}

export function getTasteMatchScore(product, answers) {
  let score = 0

  if (matchesPreference(product.spiceLevel, answers.spiceLevel)) {
    score += 25
  }

  if (matchesPreference(product.taste, answers.taste)) {
    score += 25
  }

  if (matchesPreference(product.category, answers.category)) {
    score += 20
  }

  if (
    answers.pairing === 'all' ||
    product.pairing.includes(answers.pairing)
  ) {
    score += 15
  }

  if (answers.budget === 'all') {
    score += 15
  } else if (
    answers.budget === 'under-250' &&
    product.price < 250
  ) {
    score += 15
  } else if (
    answers.budget === '250-350' &&
    product.price >= 250 &&
    product.price <= 350
  ) {
    score += 15
  } else if (
    answers.budget === 'above-350' &&
    product.price > 350
  ) {
    score += 15
  }

  return score
}

export function getTasteMatchReason(product, answers) {
  const reasons = []

  if (
    answers.spiceLevel !== 'all' &&
    product.spiceLevel === answers.spiceLevel
  ) {
    reasons.push(`${product.spiceLevel.toLowerCase()} spice level`)
  }

  if (
    answers.taste !== 'all' &&
    product.taste === answers.taste
  ) {
    reasons.push(`${product.taste.toLowerCase()} taste`)
  }

  if (
    answers.category !== 'all' &&
    product.category === answers.category
  ) {
    reasons.push('your selected pickle category')
  }

  if (
    answers.pairing !== 'all' &&
    product.pairing.includes(answers.pairing)
  ) {
    reasons.push(`pairs well with ${answers.pairing.toLowerCase()}`)
  }

  if (
    answers.budget === 'under-250' &&
    product.price < 250
  ) {
    reasons.push('fits your budget')
  }

  if (
    answers.budget === '250-350' &&
    product.price >= 250 &&
    product.price <= 350
  ) {
    reasons.push('fits your budget')
  }

  if (
    answers.budget === 'above-350' &&
    product.price > 350
  ) {
    reasons.push('fits your budget')
  }

  if (reasons.length === 0) {
    return 'This product is a popular AcharBari choice with a balanced flavor profile.'
  }

  return `This matches because it has ${reasons.join(', ')}.`
}

export function getTasteRecommendations(products, answers) {
  return products
    .map((product) => ({
      product,
      score: getTasteMatchScore(product, answers),
      reason: getTasteMatchReason(product, answers),
    }))
    .sort((first, second) => {
      if (second.score !== first.score) {
        return second.score - first.score
      }

      return second.product.rating - first.product.rating
    })
    .slice(0, 4)
}
