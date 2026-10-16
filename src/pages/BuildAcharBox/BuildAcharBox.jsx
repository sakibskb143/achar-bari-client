import { useState } from 'react'
import {
  Button,
  SectionHeading,
} from '../../components/common'
import { useCart } from '../../context/CartContext'
import { getProducts } from '../../services/productService'
import BoxProductSelector from './BoxProductSelector'
import BoxSizeSelector from './BoxSizeSelector'
import BoxSummary from './BoxSummary'

const BOX_DISCOUNT_PERCENTAGE = 10

function BuildAcharBox() {
  const { addCustomBoxToCart } = useCart()
  const products = getProducts()

  const [boxSize, setBoxSize] = useState(2)
  const [selectedProducts, setSelectedProducts] = useState([])
  const [notice, setNotice] = useState('')

  const handleBoxSizeChange = (newSize) => {
    setBoxSize(newSize)

    setSelectedProducts((currentProducts) =>
      currentProducts.slice(0, newSize),
    )
  }

  const toggleProduct = (product) => {
    setSelectedProducts((currentProducts) => {
      const alreadySelected = currentProducts.some(
        (selectedProduct) => selectedProduct.id === product.id,
      )

      if (alreadySelected) {
        return currentProducts.filter(
          (selectedProduct) =>
            selectedProduct.id !== product.id,
        )
      }

      if (currentProducts.length >= boxSize) {
        return currentProducts
      }

      return [...currentProducts, product]
    })
  }

  const handleAddToCart = () => {
    if (selectedProducts.length !== boxSize) {
      return
    }

    addCustomBoxToCart({
      boxSize,
      selectedProducts,
      discountPercentage: BOX_DISCOUNT_PERCENTAGE,
    })

    setNotice('Your custom achar box was added to the cart.')
  }

  return (
    <section className="px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Create Something Special"
          title="Build Your Own Achar Box"
          description="Choose your favorite pickle flavors and create a personalized box with a special discount."
        />

        {notice && (
          <div
            className="mx-auto mb-8 max-w-3xl rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-center text-sm font-semibold text-green-700"
            role="status"
          >
            {notice}
          </div>
        )}

        <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
          <div className="rounded-3xl bg-brand-surface p-6 shadow-sm sm:p-8">
            <BoxSizeSelector
              value={boxSize}
              onChange={handleBoxSizeChange}
            />

            <BoxProductSelector
              products={products}
              selectedProducts={selectedProducts}
              capacity={boxSize}
              onToggle={toggleProduct}
            />
          </div>

          <BoxSummary
            boxSize={boxSize}
            selectedProducts={selectedProducts}
            discountPercentage={BOX_DISCOUNT_PERCENTAGE}
            onAddToCart={handleAddToCart}
          />
        </div>

        <div className="mt-8 text-center">
          <Button
            variant="ghost"
            onClick={() => {
              setBoxSize(2)
              setSelectedProducts([])
              setNotice('')
            }}
          >
            Reset Box
          </Button>
        </div>
      </div>
    </section>
  )
}

export default BuildAcharBox
