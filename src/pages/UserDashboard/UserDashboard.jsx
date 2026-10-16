import { RoutePlaceholder } from '../../components/common'

function UserDashboard() {
  return (
    <RoutePlaceholder
      eyebrow="My Account"
      title="Customer Dashboard"
      description="Profile information, order history, wishlist, and saved addresses will be implemented in Phase 10."
      actionLabel="Continue Shopping"
      actionPath="/shop"
    />
  )
}

export default UserDashboard
