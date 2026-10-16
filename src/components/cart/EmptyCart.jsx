import { ShoppingBag } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { EmptyState } from '../common'

function EmptyCart() {
  const navigate = useNavigate()

  return (
    <EmptyState
      icon={ShoppingBag}
      title="Your cart is empty"
      description="Add your favorite AcharBari pickles to your cart before checkout."
      actionLabel="Continue Shopping"
      onAction={() => navigate('/shop')}
    />
  )
}

export default EmptyCart
