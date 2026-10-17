import { Edit3, Plus, Trash2 } from 'lucide-react'
import { useState } from 'react'
import {
  Badge,
  Button,
  Modal,
  SectionHeading,
} from '../../components/common'
import { getProducts } from '../../services/productService'
import { formatPrice } from '../../utils/formatPrice'
import ProductForm from './ProductForm'

function ProductManagement() {
  const [products, setProducts] = useState(getProducts())
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState(null)
  const [deletingProduct, setDeletingProduct] = useState(null)

  const handleAdd = () => {
    setEditingProduct(null)
    setIsFormOpen(true)
  }

  const handleEdit = (product) => {
    setEditingProduct(product)
    setIsFormOpen(true)
  }

  const handleSave = (product) => {
    setProducts((currentProducts) => {
      const alreadyExists = currentProducts.some(
        (item) => item.id === product.id,
      )

      if (alreadyExists) {
        return currentProducts.map((item) =>
          item.id === product.id ? product : item,
        )
      }

      return [product, ...currentProducts]
    })
  }

  const handleDelete = () => {
    setProducts((currentProducts) =>
      currentProducts.filter(
        (product) => product.id !== deletingProduct.id,
      ),
    )

    setDeletingProduct(null)
  }

  return (
    <div>
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <SectionHeading
          align="left"
          eyebrow="Catalog"
          title="Product Management"
          description="Add, edit, and remove products from the local admin catalog."
          className="mb-0"
        />

        <Button onClick={handleAdd}>
          <Plus size={18} aria-hidden="true" />
          Add Product
        </Button>
      </div>

      <div className="mt-8 overflow-x-auto rounded-2xl border border-brand-secondary/15 bg-brand-surface shadow-sm">
        <table className="w-full min-w-[760px] text-left text-sm">
          <thead className="bg-brand-background text-brand-muted">
            <tr>
              <th className="px-5 py-4 font-semibold">
                Product
              </th>
              <th className="px-5 py-4 font-semibold">
                Category
              </th>
              <th className="px-5 py-4 font-semibold">
                Price
              </th>
              <th className="px-5 py-4 font-semibold">
                Stock
              </th>
              <th className="px-5 py-4 font-semibold">
                Status
              </th>
              <th className="px-5 py-4 text-right font-semibold">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {products.map((product) => (
              <tr
                key={product.id}
                className="border-t border-brand-secondary/10"
              >
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-12 w-12 rounded-lg object-cover"
                    />

                    <div>
                      <p className="font-semibold text-brand-primary">
                        {product.name}
                      </p>

                      <p className="mt-1 text-xs text-brand-muted">
                        {product.weight}
                      </p>
                    </div>
                  </div>
                </td>

                <td className="px-5 py-4 text-brand-muted">
                  {product.categoryName}
                </td>

                <td className="px-5 py-4 font-semibold text-brand-text">
                  {formatPrice(product.price)}
                </td>

                <td className="px-5 py-4 text-brand-text">
                  {product.stock}
                </td>

                <td className="px-5 py-4">
                  <Badge
                    variant={
                      product.stock > 0 ? 'success' : 'danger'
                    }
                  >
                    {product.stock > 0
                      ? 'In Stock'
                      : 'Out of Stock'}
                  </Badge>
                </td>

                <td className="px-5 py-4">
                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => handleEdit(product)}
                      className="rounded-lg p-2 text-brand-primary transition hover:bg-brand-primary/10"
                      aria-label={`Edit ${product.name}`}
                    >
                      <Edit3 size={17} aria-hidden="true" />
                    </button>

                    <button
                      type="button"
                      onClick={() => setDeletingProduct(product)}
                      className="rounded-lg p-2 text-red-600 transition hover:bg-red-50"
                      aria-label={`Delete ${product.name}`}
                    >
                      <Trash2 size={17} aria-hidden="true" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ProductForm
        isOpen={isFormOpen}
        product={editingProduct}
        onClose={() => setIsFormOpen(false)}
        onSave={handleSave}
      />

      <Modal
        isOpen={Boolean(deletingProduct)}
        onClose={() => setDeletingProduct(null)}
        title="Delete Product"
        size="sm"
      >
        <p className="leading-7 text-brand-muted">
          Are you sure you want to delete{' '}
          <strong className="text-brand-text">
            {deletingProduct?.name}
          </strong>
          ?
        </p>

        <div className="mt-6 flex justify-end gap-3">
          <Button
            variant="outline"
            onClick={() => setDeletingProduct(null)}
          >
            Cancel
          </Button>

          <Button
            variant="danger"
            onClick={handleDelete}
          >
            Delete
          </Button>
        </div>
      </Modal>
    </div>
  )
}

export default ProductManagement
