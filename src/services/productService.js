import { products } from '../data/products'

export function getProducts( ) {
  return products
}

export function getProductById(id) {
  return products.find((product) => product.id === id)
}

export function getFeaturedProducts() {
  return products.filter((product) => product.featured)
}

export function getRelatedProducts(productId, category) {
  return products
    .filter(
      (product) =>
        product.id !== productId &&
        product.category === category,
    )
    .slice(0, 4)
}
