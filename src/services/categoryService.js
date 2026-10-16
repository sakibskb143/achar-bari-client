import { categories } from '../data/categories'

export function getCategories() {
  return categories
}

export function getCategoryById(id) {
  return categories.find((category) => category.id === id)
}
