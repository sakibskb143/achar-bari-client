import { RotateCcw } from 'lucide-react'
import { Button } from '../common'
import { categories } from '../../data/categories'

function ProductFilters({
  filters,
  onChange,
  onReset,
}) {
  const updateFilter = (key, value) => {
    onChange({
      ...filters,
      [key]: value,
    })
  }

  return (
    <aside className="rounded-2xl border border-brand-secondary/15 bg-brand-surface p-5">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-lg font-semibold text-brand-primary">
          Filters
        </h2>

        <button
          type="button"
          onClick={onReset}
          className="inline-flex items-center gap-1 text-xs font-semibold text-brand-secondary transition hover:text-brand-primary"
        >
          <RotateCcw size={14} aria-hidden="true" />
          Reset
        </button>
      </div>

      <div className="mt-6 space-y-6">
        <label className="block">
          <span className="mb-2 block text-sm font-semibold text-brand-text">
            Category
          </span>

          <select
            value={filters.category}
            onChange={(event) =>
              updateFilter('category', event.target.value)
            }
            className="select select-bordered w-full border-brand-secondary/25 bg-brand-surface text-brand-text focus:border-brand-primary"
          >
            <option value="all">All categories</option>

            {categories.map((category) => (
              <option
                key={category.id}
                value={category.id}
              >
                {category.name}
              </option>
            ))}
          </select>
        </label>

        <label className="block">
          <span className="mb-2 block text-sm font-semibold text-brand-text">
            Taste
          </span>

          <select
            value={filters.taste}
            onChange={(event) =>
              updateFilter('taste', event.target.value)
            }
            className="select select-bordered w-full border-brand-secondary/25 bg-brand-surface text-brand-text focus:border-brand-primary"
          >
            <option value="all">All tastes</option>
            <option value="Tangy">Tangy</option>
            <option value="Spicy">Spicy</option>
            <option value="Sour">Sour</option>
            <option value="Sweet">Sweet</option>
          </select>
        </label>

        <label className="block">
          <span className="mb-2 block text-sm font-semibold text-brand-text">
            Spice level
          </span>

          <select
            value={filters.spiceLevel}
            onChange={(event) =>
              updateFilter('spiceLevel', event.target.value)
            }
            className="select select-bordered w-full border-brand-secondary/25 bg-brand-surface text-brand-text focus:border-brand-primary"
          >
            <option value="all">All spice levels</option>
            <option value="Mild">Mild</option>
            <option value="Medium">Medium</option>
            <option value="Hot">Hot</option>
          </select>
        </label>

        <div>
          <p className="mb-2 text-sm font-semibold text-brand-text">
            Price range
          </p>

          <div className="grid grid-cols-2 gap-3">
            <label>
              <span className="sr-only">
                Minimum price
              </span>

              <input
                type="number"
                min="0"
                value={filters.minPrice}
                onChange={(event) =>
                  updateFilter('minPrice', event.target.value)
                }
                placeholder="Min"
                className="input input-bordered w-full border-brand-secondary/25 bg-brand-surface text-brand-text focus:border-brand-primary"
              />
            </label>

            <label>
              <span className="sr-only">
                Maximum price
              </span>

              <input
                type="number"
                min="0"
                value={filters.maxPrice}
                onChange={(event) =>
                  updateFilter('maxPrice', event.target.value)
                }
                placeholder="Max"
                className="input input-bordered w-full border-brand-secondary/25 bg-brand-surface text-brand-text focus:border-brand-primary"
              />
            </label>
          </div>
        </div>

        <label className="flex cursor-pointer items-center gap-3">
          <input
            type="checkbox"
            checked={filters.inStockOnly}
            onChange={(event) =>
              updateFilter('inStockOnly', event.target.checked)
            }
            className="checkbox border-brand-primary checked:border-brand-primary checked:bg-brand-primary"
          />

          <span className="text-sm font-medium text-brand-text">
            Show in-stock products only
          </span>
        </label>

        <Button
          fullWidth
          variant="outline"
          onClick={onReset}
        >
          Clear Filters
        </Button>
      </div>
    </aside>
  )
}

export default ProductFilters
