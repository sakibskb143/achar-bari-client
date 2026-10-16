import { createContext, useContext, useEffect, useMemo, useState } from 'react'

const CART_STORAGE_KEY = 'acharbari-cart'

const CartContext = createContext(null)

function getInitialCart() {
  try {
    const savedCart = localStorage.getItem(CART_STORAGE_KEY)

    if (!savedCart) {
      return []
    }

    const parsedCart = JSON.parse(savedCart)

    return Array.isArray(parsedCart) ? parsedCart : []
  } catch {
    return []
  }
}

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(getInitialCart)

  useEffect(() => {
    localStorage.setItem(
      CART_STORAGE_KEY,
      JSON.stringify(cartItems),
    )
  }, [cartItems])

  const addToCart = (product, quantity = 1) => {
    if (!product || product.stock <= 0) {
      return
    }

    setCartItems((currentItems) => {
      const existingItem = currentItems.find(
        (item) => item.product.id === product.id,
      )

      if (existingItem) {
        const updatedQuantity = Math.min(
          existingItem.quantity + quantity,
          product.stock,
        )

        return currentItems.map((item) =>
          item.product.id === product.id
            ? {
                ...item,
                quantity: updatedQuantity,
              }
            : item,
        )
      }

      return [
        ...currentItems,
        {
          product,
          quantity: Math.min(quantity, product.stock),
        },
      ]
    })
  }

  const updateQuantity = (productId, quantity) => {
    setCartItems((currentItems) =>
      currentItems
        .map((item) => {
          if (item.product.id !== productId) {
            return item
          }

          const safeQuantity = Math.max(
            1,
            Math.min(quantity, item.product.stock),
          )

          return {
            ...item,
            quantity: safeQuantity,
          }
        })
        .filter((item) => item.quantity > 0),
    )
  }

  const increaseQuantity = (productId) => {
    const item = cartItems.find(
      (cartItem) => cartItem.product.id === productId,
    )

    if (item) {
      updateQuantity(productId, item.quantity + 1)
    }
  }

  const decreaseQuantity = (productId) => {
    const item = cartItems.find(
      (cartItem) => cartItem.product.id === productId,
    )

    if (!item) {
      return
    }

    if (item.quantity <= 1) {
      removeFromCart(productId)
      return
    }

    updateQuantity(productId, item.quantity - 1)
  }

  const removeFromCart = (productId) => {
    setCartItems((currentItems) =>
      currentItems.filter(
        (item) => item.product.id !== productId,
      ),
    )
  }

  const clearCart = () => {
    setCartItems([])
  }

  const cartItemCount = useMemo(
    () =>
      cartItems.reduce(
        (total, item) => total + item.quantity,
        0,
      ),
    [cartItems],
  )

  const subtotal = useMemo(
    () =>
      cartItems.reduce(
        (total, item) =>
          total + item.product.price * item.quantity,
        0,
      ),
    [cartItems],
  )

  const value = {
    cartItems,
    cartItemCount,
    subtotal,
    addToCart,
    updateQuantity,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    clearCart,
  }

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)

  if (!context) {
    throw new Error(
      'useCart must be used inside a CartProvider',
    )
  }

  return context
}
