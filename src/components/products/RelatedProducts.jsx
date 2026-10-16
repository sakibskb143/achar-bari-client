import ProductCard from './ProductCard'

function RelatedProducts({ products }) {
  if (products.length === 0) {
    return null
  }

  return (
    <section className="mt-16">
      <h2 className="mb-6 text-2xl font-bold text-brand-primary">
        You May Also Like
      </h2>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
          />
        ))}
      </div>
    </section>
  )
}

export default RelatedProducts
