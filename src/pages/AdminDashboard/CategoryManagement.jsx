import { Edit3, Plus, Trash2 } from 'lucide-react'
import { useState } from 'react'
import {
  Badge,
  Button,
  Modal,
  SectionHeading,
} from '../../components/common'
import { categories as initialCategories } from '../../data/categories'

function CategoryManagement() {
  const [categories, setCategories] = useState(
    initialCategories,
  )
  const [categoryName, setCategoryName] = useState('')
  const [editingId, setEditingId] = useState(null)
  const [deletingCategory, setDeletingCategory] = useState(null)

  const handleSubmit = (event) => {
    event.preventDefault()

    if (!categoryName.trim()) {
      return
    }

    if (editingId) {
      setCategories((currentCategories) =>
        currentCategories.map((category) =>
          category.id === editingId
            ? {
                ...category,
                name: categoryName.trim(),
              }
            : category,
        ),
      )
    } else {
      setCategories((currentCategories) => [
        ...currentCategories,
        {
          id: categoryName.trim().toLowerCase().replaceAll(' ', '-'),
          name: categoryName.trim(),
          bengaliName: categoryName.trim(),
        },
      ])
    }

    setCategoryName('')
    setEditingId(null)
  }

  const startEditing = (category) => {
    setCategoryName(category.name)
    setEditingId(category.id)
  }

  const deleteCategory = () => {
    setCategories((currentCategories) =>
      currentCategories.filter(
        (category) =>
          category.id !== deletingCategory.id,
      ),
    )

    setDeletingCategory(null)
  }

  return (
    <div>
      <SectionHeading
        align="left"
        eyebrow="Catalog Structure"
        title="Category Management"
        description="Organize products into clear shopping categories."
      />

      <div className="grid gap-8 lg:grid-cols-[360px_1fr]">
        <form
          onSubmit={handleSubmit}
          className="h-fit rounded-2xl border border-brand-secondary/15 bg-brand-surface p-6 shadow-sm"
        >
          <h2 className="text-xl font-bold text-brand-primary">
            {editingId ? 'Edit Category' : 'Add Category'}
          </h2>

          <label className="mt-5 block">
            <span className="mb-2 block text-sm font-semibold text-brand-text">
              Category name
            </span>

            <input
              type="text"
              value={categoryName}
              onChange={(event) =>
                setCategoryName(event.target.value)
              }
              placeholder="e.g. Garlic Pickles"
              required
              className="input input-bordered w-full"
            />
          </label>

          <div className="mt-5 flex gap-3">
            <Button type="submit">
              <Plus size={17} aria-hidden="true" />
              {editingId ? 'Save' : 'Add'}
            </Button>

            {editingId && (
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setEditingId(null)
                  setCategoryName('')
                }}
              >
                Cancel
              </Button>
            )}
          </div>
        </form>

        <div className="space-y-4">
          {categories.map((category) => (
            <div
              key={category.id}
              className="flex items-center justify-between gap-4 rounded-2xl border border-brand-secondary/15 bg-brand-surface p-5 shadow-sm"
            >
              <div>
                <p className="font-semibold text-brand-primary">
                  {category.name}
                </p>

                <p className="mt-1 font-bengali text-sm text-brand-secondary">
                  {category.bengaliName}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <Badge variant="neutral">
                  Active
                </Badge>

                <button
                  type="button"
                  onClick={() => startEditing(category)}
                  className="rounded-lg p-2 text-brand-primary hover:bg-brand-primary/10"
                  aria-label={`Edit ${category.name}`}
                >
                  <Edit3 size={17} aria-hidden="true" />
                </button>

                <button
                  type="button"
                  onClick={() => setDeletingCategory(category)}
                  className="rounded-lg p-2 text-red-600 hover:bg-red-50"
                  aria-label={`Delete ${category.name}`}
                >
                  <Trash2 size={17} aria-hidden="true" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Modal
        isOpen={Boolean(deletingCategory)}
        onClose={() => setDeletingCategory(null)}
        title="Delete Category"
        size="sm"
      >
        <p className="leading-7 text-brand-muted">
          Delete{' '}
          <strong className="text-brand-text">
            {deletingCategory?.name}
          </strong>
          ?
        </p>

        <div className="mt-6 flex justify-end gap-3">
          <Button
            variant="outline"
            onClick={() => setDeletingCategory(null)}
          >
            Cancel
          </Button>

          <Button
            variant="danger"
            onClick={deleteCategory}
          >
            Delete
          </Button>
        </div>
      </Modal>
    </div>
  )
}

export default CategoryManagement
