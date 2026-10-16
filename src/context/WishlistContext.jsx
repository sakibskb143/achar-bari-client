import { createContext, useContext, useEffect, useState } from 'react'

const WISHLIST_STORAGE_KEY = 'acharbari-wishlist'

const WishlistContext = createContext(null)

function getInitialWishlist() {
  try {
    const savedWishlist = localStorage.getItem(
      WISHLIST_STORAGE_KEY,
    )

    if (!savedWishlist) {
      return []
    }

    const parsedWishlist = JSON.parse(savedWishlist)

    return Array.isArray(parsedWishlist) ? parsedWishlist : []
  } catch {
    return []
  }
}

export function WishlistProvider({ children }) {
  const [wishlistItems, setWishlistItems] = useState(
    getInitialWishlist,
  )

  useEffect(() => {
    localStorage.setItem(
      WISHLIST_STORAGE_KEY,
      JSON.stringify(wishlistItems),
    )
  }, [wishlistItems])

  const isWishlisted = (productId) =>
    wishlistItems.some((product) => product.id === productId)

  const toggleWishlist = (product) => {
    setWishlistItems((currentItems) => {
      const alreadyExists = currentItems.some(
        (item) => item.id === product.id,
      )

      if (alreadyExists) {
        return currentItems.filter(
          (item) => item.id !== product.id,
        )
      }

      return [...currentItems, product]
    })
  }

  const removeFromWishlist = (productId) => {
    setWishlistItems((currentItems) =>
      currentItems.filter((item) => item.id !== productId),
    )
  }

  const clearWishlist = () => {
    setWishlistItems([])
  }

  return (
    <WishlistContext.Provider
      value={{
        wishlistItems,
        isWishlisted,
        toggleWishlist,
        removeFromWishlist,
        clearWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  )
}

export function useWishlist() {
  const context = useContext(WishlistContext)

  if (!context) {
    throw new Error(
      'useWishlist must be used inside a WishlistProvider',
    )
  }

  return context
}
