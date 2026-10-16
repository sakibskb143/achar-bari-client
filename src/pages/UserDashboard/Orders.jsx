import { PackageOpen } from 'lucide-react'
import { Link } from 'react-router-dom'
import {
  Badge,
  EmptyState,
  SectionHeading,
} from '../../components/common'
import { useAuth } from '../../context/AuthContext'
import { getOrdersByEmail } from '../../services/orderService'
import { formatPrice } from '../../utils/formatPrice'

function Orders() {
  const { currentUser } = useAuth()
  const orders = getOrdersByEmail(currentUser?.email)

  return (
    <div>
      <SectionHeading
        align="left"
        eyebrow="Order History"
        title="Your Orders"
        description="Review the demo orders placed through your AcharBari account."
      />

      {orders.length === 0 ? (
        <EmptyState
          icon={PackageOpen}
          title="No orders yet"
          description="Your completed orders will appear here."
          actionLabel="Start Shopping"
          onAction={() => {
            window.location.href = '/shop'
          }}
        />
      ) : (
        <div className="space-y-5">
          {orders.map((order) => (
            <article
              key={order.id}
              className="rounded-2xl border border-brand-secondary/15 bg-brand-surface p-5 shadow-sm"
            >
              <div className="flex flex-col justify-between gap-4 border-b border-brand-secondary/15 pb-4 sm:flex-row sm:items-center">
                <div>
                  <p className="text-sm text-brand-muted">
                    Order number
                  </p>

                  <p className="mt-1 font-bold text-brand-primary">
                    {order.id}
                  </p>

                  <p className="mt-1 text-xs text-brand-muted">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">
                    {order.orderStatus}
                  </Badge>

                  <Badge
                    variant={
                      order.paymentStatus === 'Pending verification'
                        ? 'warning'
                        : 'success'
                    }
                  >
                    {order.paymentStatus}
                  </Badge>
                </div>
              </div>

              <div className="flex flex-col justify-between gap-4 pt-4 sm:flex-row sm:items-center">
                <div>
                  <p className="text-sm text-brand-muted">
                    {order.items.length} product type
                    {order.items.length === 1 ? '' : 's'}
                  </p>

                  <p className="mt-1 text-xl font-bold text-brand-primary">
                    {formatPrice(order.total)}
                  </p>
                </div>

                <Link
                  to={`/dashboard/orders/${order.id}`}
                  className="text-sm font-semibold text-brand-secondary hover:text-brand-primary"
                >
                  View Order Details →
                </Link>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  )
}

export default Orders
