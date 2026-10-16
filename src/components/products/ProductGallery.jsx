import { useState } from 'react'

function ProductGallery({ product }) {
  const [activeImage, setActiveImage] = useState(product.image)

  const galleryImages = product.gallery?.length
    ? product.gallery
    : [product.image]

  return (
    <div>
      <div className="overflow-hidden rounded-2xl bg-brand-surface">
        <img
          src={activeImage}
          alt={product.name}
          className="h-[360px] w-full object-cover sm:h-[480px]"
        />
      </div>

      <div className="mt-4 grid grid-cols-4 gap-3">
        {galleryImages.map((image, index) => (
          <button
            key={image}
            type="button"
            onClick={() => setActiveImage(image)}
            className={[
              'overflow-hidden rounded-xl border-2',
              activeImage === image
                ? 'border-brand-primary'
                : 'border-transparent',
            ].join(' ')}
            aria-label={`Show product image ${index + 1}`}
          >
            <img
              src={image}
              alt=""
              className="h-20 w-full object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  )
}

export default ProductGallery
