const ORDERS_STORAGE_KEY = 'acharbari-orders'

function getStoredOrders() {
  try {
    const savedOrders = localStorage.getItem(
      ORDERS_STORAGE_KEY,
    )

    if (!savedOrders) {
      return []
    }

    const parsedOrders = JSON.parse(savedOrders)

    return Array.isArray(parsedOrders) ? parsedOrders : []
  } catch {
    return []
  }
}

function saveOrders(orders) {
  localStorage.setItem(
    ORDERS_STORAGE_KEY,
    JSON.stringify(orders),
  )
}

export function createOrder(orderData) {
  const orders = getStoredOrders()

  const order = {
    id: `AB-${Date.now()}`,
    createdAt: new Date().toISOString(),
    orderStatus: 'Pending',
    paymentStatus:
      orderData.paymentMethod === 'bkash'
        ? 'Pending verification'
        : 'Unpaid - Cash on Delivery',
    ...orderData,
  }

  saveOrders([order, ...orders])

  return order
}

export function getOrders() {
  return getStoredOrders()
}

export function getOrderById(orderId) {
  return getStoredOrders().find(
    (order) => order.id === orderId,
  )
}

export function getOrdersByEmail(email) {
  if (!email) {
    return []
  }

  return getStoredOrders().filter(
    (order) =>
      order.customer.email.toLowerCase() ===
      email.toLowerCase(),
  )
}
