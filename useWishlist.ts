"use client"

import { useState, useCallback } from "react"
import type { WishlistItem, Product } from "../types"

export function useWishlist() {
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([])

  const addToWishlist = useCallback((product: Product) => {
    setWishlistItems((prev) => {
      const exists = prev.find((item) => item.product.id === product.id)
      if (exists) return prev

      return [
        ...prev,
        {
          id: `wishlist-${product.id}-${Date.now()}`,
          product,
          addedAt: new Date(),
        },
      ]
    })
  }, [])

  const removeFromWishlist = useCallback((productId: number) => {
    setWishlistItems((prev) => prev.filter((item) => item.product.id !== productId))
  }, [])

  const isInWishlist = useCallback(
    (productId: number) => {
      return wishlistItems.some((item) => item.product.id === productId)
    },
    [wishlistItems],
  )

  const clearWishlist = useCallback(() => {
    setWishlistItems([])
  }, [])

  return {
    wishlistItems,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
    clearWishlist,
  }
}
