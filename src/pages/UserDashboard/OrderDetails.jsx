import { ArrowLeft } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import {
  Badge,
  Button,
  ErrorMessage,
  SectionHeading,
} from '../../components/common'
import { useAuth } from '../../context/AuthContext'
import { getOrderById } from '../../services/orderService'
import { formatPrice } from '../../utils/formatPrice'

function OrderDetails() {
  const { orderId } = useParams()
  const { currentUser } = useAuth()
  const order = getOrderById(orderId)

  if (
    !order ||
    order.customer.email.toLowerCase() !==
      currentUser?.email?.toLowerCase()
  ) {
    return (
      <div>
        <ErrorMessage
          title="Order not found"
          message="This order does not exist or does not belong to your account."
        />

        <Link
          to="/dashboard/orders"
          className="mt-6 inline-block"
        >
          <Button variant="outline">
            <ArrowLeft size={17} aria-hidden="true" />
            Back to Orders
          </Button>
        </Link>
      </div>
    )
  }

  return (
    <div>
      <Link
        to="/dashboard/orders"
        className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-brand-secondary hover:text-brand-primary"
      >
        <ArrowLeft size={17} aria-hidden="true" />
        Back to Orders
      </Link>

      <SectionHeading
        align="left"
        eyebrow="Order Details"
        title={order.id}
        description={`Placed on ${new Date(order.createdAt).toLocaleDateString()}`}
      />

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-brand-secondary/15 bg-brand-surface p-6 shadow-sm">
          <h2 className="text-xl font-bold text-brand-primary">
            Order Status
          </h2>

          <div className="mt-5 flex flex-wrap gap-2">
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

          <h2 className="mt-8 text-xl font-bold text-brand-primary">
            Delivery Address
          </h2>

          <p className="mt-3 leading-7 text-brand-muted">
            {order.customer.name}
              

            {order.customer.phone}
              

            {order.shippingAddress.address}
              

            {order.shippingAddress.location}
          </p>
        </div>

        <div className="rounded-2xl border border-brand-secondary/15 bg-brand-surface p-6 shadow-sm">
          <h2 className="text-xl font-bold text-brand-primary">
            Payment Information
          </h2>

          <p className="mt-4 leading-7 text-brand-muted">
            Payment method:{' '}
            <strong className="text-brand-text">
              {order.paymentMethod === 'bkash'
                ? 'Manual bKash'
                : 'Cash on Delivery'}
            </strong>
              

            Payment status:{' '}
            <strong className="text-brand-text">
              {order.paymentStatus}
            </strong>
          </p>
        </div>
      </div>

      <div className="mt-6 rounded-2xl border border-brand-secondary/15 bg-brand-surface p-6 shadow-sm">
        <h2 className="text-xl font-bold text-brand-primary">
          Items
        </h2>

        <div className="mt-5 space-y-4">
          {order.items.map((item) => (
            <div
              key={item.product.id}
              className="flex items-center justify-between gap-4 border-b border-brand-secondary/15 pb-4 last:border-0 last:pb-0"
            >
              <div className="flex items-center gap-3">
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="h-16 w-16 rounded-xl object-cover"
                />

                <div>
                  <p className="font-semibold text-brand-text">
                    {item.product.name}
                  </p>

                  <p className="mt-1 text-sm text-brand-muted">
                    Quantity: {item.quantity}
                  </p>
                </div>
              </div>

              <p className="font-semibold text-brand-primary">
                {formatPrice(
                  item.product.price * item.quantity,
                )}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-6 border-t border-brand-secondary/15 pt-5">
          <div className="ml-auto max-w-sm space-y-3 text-sm">
            <div className="flex justify-between gap-4">
              <span className="text-brand-muted">
                Subtotal
              </span>

              <span>{formatPrice(order.subtotal)}</span>
            </div>

            <div className="flex justify-between gap-4">
              <span className="text-brand-muted">
                Delivery
              </span>

              <span>{formatPrice(order.shipping)}</span>
            </div>

            {order.discount > 0 && (
              <div className="flex justify-between gap-4 text-green-700">
                <span>Discount</span>
                <span>-{formatPrice(order.discount)}</span>
              </div>
            )}

            <div className="flex justify-between gap-4 border-t border-brand-secondary/15 pt-3 text-lg font-bold text-brand-primary">
              <span>Total</span>
              <span>{formatPrice(order.total)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrderDetails
