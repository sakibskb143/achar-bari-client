import {
  CheckCircle2,
  Clock3,
  ShoppingBag,
} from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import {
  Button,
  ErrorMessage,
  SectionHeading,
} from '../../components/common'
import { getOrderById } from '../../services/orderService'
import { formatPrice } from '../../utils/formatPrice'

function OrderConfirmation() {
  const { orderId } = useParams()
  const order = getOrderById(orderId)

  if (!order) {
    return (
      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <ErrorMessage
            title="Order not found"
            message="This order could not be found in the current browser."
          />

          <Link
            to="/shop"
            className="mt-6 inline-block"
          >
            <Button>
              Continue Shopping
            </Button>
          </Link>
        </div>
      </section>
    )
  }

  const isPendingPayment =
    order.paymentStatus === 'Pending verification'

  return (
    <section className="px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <div className="text-center">
          {isPendingPayment ? (
            <Clock3
              size={64}
              className="mx-auto text-brand-accent"
              aria-hidden="true"
            />
          ) : (
            <CheckCircle2
              size={64}
              className="mx-auto text-green-600"
              aria-hidden="true"
            />
          )}
        </div>

        <SectionHeading
          eyebrow="Order Received"
          title="Thank You for Your Order"
          description={
            isPendingPayment
              ? 'Your order was created successfully. Your bKash payment is waiting for manual verification.'
              : 'Your order was created successfully. We will contact you before delivery.'
          }
        />

        <div className="rounded-3xl bg-brand-surface p-6 shadow-sm sm:p-8">
          <div className="flex flex-col justify-between gap-4 border-b border-brand-secondary/15 pb-5 sm:flex-row sm:items-center">
            <div>
              <p className="text-sm text-brand-muted">
                Order number
              </p>

              <p className="mt-1 text-xl font-bold text-brand-primary">
                {order.id}
              </p>
            </div>

            <div className="text-left sm:text-right">
              <p className="text-sm text-brand-muted">
                Order status
              </p>

              <p className="mt-1 font-semibold text-brand-secondary">
                {order.orderStatus}
              </p>
            </div>
          </div>

          <div className="grid gap-6 border-b border-brand-secondary/15 py-6 sm:grid-cols-2">
            <div>
              <h2 className="font-semibold text-brand-primary">
                Delivery details
              </h2>

              <p className="mt-3 text-sm leading-7 text-brand-muted">
                {order.customer.name}
                  

                {order.customer.phone}
                  

                {order.shippingAddress.address}
                  

                {order.shippingAddress.location}
              </p>
            </div>

            <div>
              <h2 className="font-semibold text-brand-primary">
                Payment details
              </h2>

              <p className="mt-3 text-sm leading-7 text-brand-muted">
                Method:{' '}
                <strong className="text-brand-text">
                  {order.paymentMethod === 'bkash'
                    ? 'Manual bKash'
                    : 'Cash on Delivery'}
                </strong>
                  

                Status:{' '}
                <strong className="text-brand-text">
                  {order.paymentStatus}
                </strong>
              </p>
            </div>
          </div>

          <div className="py-6">
            <h2 className="font-semibold text-brand-primary">
              Ordered items
            </h2>

            <div className="mt-4 space-y-4">
              {order.items.map((item) => (
                <div
                  key={item.product.id}
                  className="flex items-center justify-between gap-4 text-sm"
                >
                  <div>
                    <p className="font-semibold text-brand-text">
                      {item.product.name}
                    </p>

                    <p className="mt-1 text-brand-muted">
                      Quantity: {item.quantity}
                    </p>
                  </div>

                  <p className="font-semibold text-brand-text">
                    {formatPrice(
                      item.product.price * item.quantity,
                    )}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="border-t border-brand-secondary/15 pt-5">
            <div className="ml-auto max-w-sm space-y-3 text-sm">
              <div className="flex justify-between gap-4">
                <span className="text-brand-muted">
                  Subtotal
                </span>

                <span>
                  {formatPrice(order.subtotal)}
                </span>
              </div>

              <div className="flex justify-between gap-4">
                <span className="text-brand-muted">
                  Delivery
                </span>

                <span>
                  {formatPrice(order.shipping)}
                </span>
              </div>

              {order.discount > 0 && (
                <div className="flex justify-between gap-4 text-green-700">
                  <span>
                    Discount
                  </span>

                  <span>
                    -{formatPrice(order.discount)}
                  </span>
                </div>
              )}

              <div className="flex justify-between gap-4 border-t border-brand-secondary/15 pt-3 text-lg font-bold text-brand-primary">
                <span>
                  Total
                </span>

                <span>
                  {formatPrice(order.total)}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link to="/shop">
            <Button>
              <ShoppingBag size={18} aria-hidden="true" />
              Continue Shopping
            </Button>
          </Link>

          <Link to="/dashboard">
            <Button variant="outline">
              View My Account
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}

export default OrderConfirmation
