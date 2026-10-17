import { useState } from 'react'
import {
  Badge,
  SectionHeading,
} from '../../components/common'
import { getOrders } from '../../services/orderService'
import { formatPrice } from '../../utils/formatPrice'

function OrderManagement() {
  const [orders, setOrders] = useState(getOrders())

  const updateOrderStatus = (orderId, status) => {
    setOrders((currentOrders) =>
      currentOrders.map((order) =>
        order.id === orderId
          ? {
              ...order,
              orderStatus: status,
            }
          : order,
      ),
    )
  }

  return (
    <div>
      <SectionHeading
        align="left"
        eyebrow="Order Operations"
        title="Order Management"
        description="Review customer orders and update their demonstration status."
      />

      {orders.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-brand-secondary/30 bg-brand-surface p-10 text-center text-brand-muted">
          No demo orders have been created yet.
        </div>
      ) : (
        <div className="space-y-5">
          {orders.map((order) => (
            <article
              key={order.id}
              className="rounded-2xl border border-brand-secondary/15 bg-brand-surface p-5 shadow-sm"
            >
              <div className="flex flex-col justify-between gap-4 border-b border-brand-secondary/15 pb-4 lg:flex-row lg:items-center">
                <div>
                  <p className="font-bold text-brand-primary">
                    {order.id}
                  </p>

                  <p className="mt-1 text-sm text-brand-muted">
                    {order.customer.name} · {order.customer.email}
                  </p>

                  <p className="mt-1 text-xs text-brand-muted">
                    {new Date(order.createdAt).toLocaleString()}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">
                    {order.paymentMethod === 'bkash'
                      ? 'Manual bKash'
                      : 'Cash on Delivery'}
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

              <div className="mt-5 grid gap-5 sm:grid-cols-3">
                <div>
                  <p className="text-xs uppercase tracking-wide text-brand-muted">
                    Items
                  </p>

                  <p className="mt-1 font-semibold text-brand-text">
                    {order.items.length}
                  </p>
                </div>

                <div>
                  <p className="text-xs uppercase tracking-wide text-brand-muted">
                    Total
                  </p>

                  <p className="mt-1 font-semibold text-brand-primary">
                    {formatPrice(order.total)}
                  </p>
                </div>

                <label>
                  <span className="text-xs uppercase tracking-wide text-brand-muted">
                    Order status
                  </span>

                  <select
                    value={order.orderStatus}
                    onChange={(event) =>
                      updateOrderStatus(
                        order.id,
                        event.target.value,
                      )
                    }
                    className="select select-bordered mt-1 w-full"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Confirmed">Confirmed</option>
                    <option value="Processing">Processing</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </label>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  )
}

export default OrderManagement
