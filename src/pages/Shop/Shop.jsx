import { SlidersHorizontal } from 'lucide-react'
import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import {
  Button,
  Modal,
  SectionHeading,
} from '../../components/common'
import {
  ProductFilters,
  ProductGrid,
  ProductToolbar,
} from '../../components/products'
import { getProducts } from '../../services/productService'

const defaultFilters = {
  category: 'all',
  taste: 'all',
  spiceLevel: 'all',
  minPrice: '',
  maxPrice: '',
  inStockOnly: false,
}

function Shop() {
  const [searchParams] = useSearchParams()
  const initialCategory = searchParams.get('category') || 'all'

  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState('featured')
  const [filters, setFilters] = useState({
    ...defaultFilters,
    category: initialCategory,
  })
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false)

  const allProducts = getProducts()

  const filteredProducts = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase()

    const result = allProducts.filter((product) => {
      const matchesSearch =
        !normalizedSearch ||
        product.name.toLowerCase().includes(normalizedSearch) ||
        product.bengaliName.toLowerCase().includes(normalizedSearch) ||
        product.categoryName.toLowerCase().includes(normalizedSearch)

      const matchesCategory =
        filters.category === 'all' ||
        product.category === filters.category

      const matchesTaste =
        filters.taste === 'all' ||
        product.taste === filters.taste

      const matchesSpice =
        filters.spiceLevel === 'all' ||
        product.spiceLevel === filters.spiceLevel

      const minimumPrice =
        filters.minPrice === ''
          ? 0
          : Number(filters.minPrice)

      const maximumPrice =
        filters.maxPrice === ''
          ? Number.POSITIVE_INFINITY
          : Number(filters.maxPrice)

      const matchesPrice =
        product.price >= minimumPrice &&
        product.price <= maximumPrice

      const matchesStock =
        !filters.inStockOnly || product.stock > 0

      return (
        matchesSearch &&
        matchesCategory &&
        matchesTaste &&
        matchesSpice &&
        matchesPrice &&
        matchesStock
      )
    })

    return [...result].sort((firstProduct, secondProduct) => {
      switch (sortBy) {
        case 'price-low':
          return firstProduct.price - secondProduct.price

        case 'price-high':
          return secondProduct.price - firstProduct.price

        case 'rating':
          return secondProduct.rating - firstProduct.rating

        case 'popular':
          return secondProduct.popularity - firstProduct.popularity

        case 'name':
          return firstProduct.name.localeCompare(secondProduct.name)

        case 'featured':
        default:
          return (
            Number(secondProduct.featured) -
            Number(firstProduct.featured)
          )
      }
    })
  }, [
    allProducts,
    filters,
    searchTerm,
    sortBy,
  ])

  const resetFilters = () => {
    setFilters(defaultFilters)
    setSearchTerm('')
    setSortBy('featured')
  }

  return (
    <section className="px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Our Collection"
          title="Explore AcharBari Pickles"
          description="Choose from carefully prepared flavors made for everyday meals, celebrations, and gifts."
        />

        <div className="mb-5 lg:hidden">
          <Button
            fullWidth
            variant="outline"
            onClick={() => setIsFilterModalOpen(true)}
          >
            <SlidersHorizontal size={18} aria-hidden="true" />
            Open Filters
          </Button>
        </div>

        <div className="grid gap-8 lg:grid-cols-[260px_1fr]">
          <div className="hidden lg:block">
            <ProductFilters
              filters={filters}
              onChange={setFilters}
              onReset={resetFilters}
            />
          </div>

          <div className="min-w-0">
            <ProductToolbar
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              sortBy={sortBy}
              onSortChange={setSortBy}
              resultCount={filteredProducts.length}
            />

            <div className="mt-6">
              <ProductGrid products={filteredProducts} />
            </div>
          </div>
        </div>
      </div>

      <Modal
        isOpen={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
        title="Filter Products"
        size="sm"
      >
        <ProductFilters
          filters={filters}
          onChange={setFilters}
          onReset={resetFilters}
        />

        <Button
          fullWidth
          className="mt-5"
          onClick={() => setIsFilterModalOpen(false)}
        >
          Show Products
        </Button>
      </Modal>
    </section>
  )
}

export default Shop
