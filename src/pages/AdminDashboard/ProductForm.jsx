import { useEffect, useState } from 'react'
import {
  Button,
  Modal,
} from '../../components/common'
import { FormField } from '../../components/forms'

const emptyProduct = {
  name: '',
  bengaliName: '',
  category: 'mango',
  price: '',
  weight: '',
  spiceLevel: 'Medium',
  taste: 'Tangy',
  stock: '',
  image: '',
}

function ProductForm({
  isOpen,
  product,
  onClose,
  onSave,
}) {
  const [formData, setFormData] = useState(emptyProduct)

  useEffect(() => {
    if (product) {
      setFormData({
        ...emptyProduct,
        ...product,
      })
    } else {
      setFormData(emptyProduct)
    }
  }, [product, isOpen])

  const handleChange = (event) => {
    const { name, value } = event.target

    setFormData((current) => ({
      ...current,
      [name]: value,
    }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    onSave({
      ...formData,
      price: Number(formData.price),
      stock: Number(formData.stock),
      id: product?.id || `product-${Date.now()}`,
      rating: product?.rating || 0,
      reviewCount: product?.reviewCount || 0,
      popularity: product?.popularity || 0,
      pairing: product?.pairing || ['Rice'],
      gallery: product?.gallery || [formData.image],
      categoryName: product?.categoryName || formData.category,
      shortDescription:
        product?.shortDescription ||
        'A delicious AcharBari pickle prepared with traditional flavors.',
      description:
        product?.description ||
        'A carefully prepared pickle made for everyday meals.',
      ingredients:
        product?.ingredients ||
        'Selected ingredients and traditional spices.',
      featured: product?.featured || false,
    })

    onClose()
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={product ? 'Edit Product' : 'Add Product'}
      size="lg"
    >
      <form
        onSubmit={handleSubmit}
        className="space-y-5"
      >
        <div className="grid gap-5 sm:grid-cols-2">
          <FormField
            label="Product name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <FormField
            label="Bengali name"
            name="bengaliName"
            value={formData.bengaliName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <label className="block">
            <span className="mb-2 block text-sm font-semibold text-brand-text">
              Category
            </span>

            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="select select-bordered w-full"
            >
              <option value="mango">Mango Pickles</option>
              <option value="chili">Chili Pickles</option>
              <option value="mixed">Mixed Pickles</option>
              <option value="sweet">Sweet Pickles</option>
              <option value="olive">Olive Pickles</option>
            </select>
          </label>

          <FormField
            label="Weight"
            name="weight"
            value={formData.weight}
            onChange={handleChange}
            placeholder="500g"
            required
          />
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <FormField
            label="Price"
            name="price"
            type="number"
            value={formData.price}
            onChange={handleChange}
            required
          />

          <FormField
            label="Stock quantity"
            name="stock"
            type="number"
            value={formData.stock}
            onChange={handleChange}
            required
          />
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <label className="block">
            <span className="mb-2 block text-sm font-semibold text-brand-text">
              Spice level
            </span>

            <select
              name="spiceLevel"
              value={formData.spiceLevel}
              onChange={handleChange}
              className="select select-bordered w-full"
            >
              <option value="Mild">Mild</option>
              <option value="Medium">Medium</option>
              <option value="Hot">Hot</option>
            </select>
          </label>

          <label className="block">
            <span className="mb-2 block text-sm font-semibold text-brand-text">
              Taste
            </span>

            <select
              name="taste"
              value={formData.taste}
              onChange={handleChange}
              className="select select-bordered w-full"
            >
              <option value="Tangy">Tangy</option>
              <option value="Sour">Sour</option>
              <option value="Sweet">Sweet</option>
              <option value="Spicy">Spicy</option>
            </select>
          </label>
        </div>

        <FormField
          label="Image URL"
          name="image"
          value={formData.image}
          onChange={handleChange}
          placeholder="https://example.com/product-image.jpg"
          required
        />

        <div className="flex justify-end gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
          >
            Cancel
          </Button>

          <Button type="submit">
            {product ? 'Save Changes' : 'Add Product'}
          </Button>
        </div>
      </form>
    </Modal>
   )
}

export default ProductForm
