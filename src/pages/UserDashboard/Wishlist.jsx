import { HeartOff } from 'lucide-react'
import { EmptyState, SectionHeading } from '../../components/common'
import ProductGrid from '../../components/products/ProductGrid'
import { useWishlist } from '../../context/WishlistContext'

function Wishlist() {
  const { wishlistItems } = useWishlist()

  return (
    <div>
      <SectionHeading
        align="left"
        eyebrow="Saved Products"
        title="Your Wishlist"
        description="Keep the pickle flavors you want to try close at hand."
      />

      {wishlistItems.length === 0 ? (
        <EmptyState
          icon={HeartOff}
          title="Your wishlist is empty"
          description="Tap the heart icon on a product to save it here."
          actionLabel="Explore Products"
          onAction={() => {
            window.location.href = '/shop'
          }}
        />
      ) : (
        <ProductGrid products={wishlistItems} />
      )}
    </div>
  )
}

export default Wishlist
