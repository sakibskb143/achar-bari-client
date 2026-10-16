import { Search } from 'lucide-react'

function ProductToolbar({
  searchTerm,
  onSearchChange,
  sortBy,
  onSortChange,
  resultCount,
}) {
  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-brand-secondary/15 bg-brand-surface p-4 md:flex-row md:items-center md:justify-between">
      <label className="relative block flex-1">
        <span className="sr-only">
          Search products
        </span>

        <Search
          size={19}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-muted"
          aria-hidden="true"
        />

        <input
          type="search"
          value={searchTerm}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Search pickles..."
          className="input input-bordered w-full border-brand-secondary/25 bg-brand-surface pl-10 text-brand-text focus:border-brand-primary"
        />
      </label>

      <div className="flex items-center gap-3">
        <span className="whitespace-nowrap text-sm text-brand-muted">
          {resultCount} products
        </span>

        <label>
          <span className="sr-only">
            Sort products
          </span>

          <select
            value={sortBy}
            onChange={(event) => onSortChange(event.target.value)}
            className="select select-bordered border-brand-secondary/25 bg-brand-surface text-sm text-brand-text focus:border-brand-primary"
          >
            <option value="featured">Featured</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Top Rated</option>
            <option value="popular">Most Popular</option>
            <option value="name">Name: A to Z</option>
          </select>
        </label>
      </div>
    </div>
  )
}

export default ProductToolbar
