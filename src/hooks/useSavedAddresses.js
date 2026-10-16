import { useEffect, useState } from 'react'

function getStorageKey(userEmail) {
  return `acharbari-addresses-${userEmail || 'guest'}`
}

function getInitialAddresses(userEmail) {
  try {
    const savedAddresses = localStorage.getItem(
      getStorageKey(userEmail),
    )

    if (!savedAddresses) {
      return []
    }

    const parsedAddresses = JSON.parse(savedAddresses)

    return Array.isArray(parsedAddresses)
      ? parsedAddresses
      : []
  } catch {
    return []
  }
}

export function useSavedAddresses(userEmail) {
  const [addresses, setAddresses] = useState(() =>
    getInitialAddresses(userEmail),
  )

  useEffect(() => {
    setAddresses(getInitialAddresses(userEmail))
  }, [userEmail])

  useEffect(() => {
    if (!userEmail) {
      return
    }

    localStorage.setItem(
      getStorageKey(userEmail),
      JSON.stringify(addresses),
    )
  }, [addresses, userEmail])

  const addAddress = (address) => {
    const newAddress = {
      ...address,
      id: `address-${Date.now()}`,
    }

    setAddresses((currentAddresses) => [
      newAddress,
      ...currentAddresses,
    ])
  }

  const removeAddress = (addressId) => {
    setAddresses((currentAddresses) =>
      currentAddresses.filter(
        (address) => address.id !== addressId,
      ),
    )
  }

  return {
    addresses,
    addAddress,
    removeAddress,
  }
}
