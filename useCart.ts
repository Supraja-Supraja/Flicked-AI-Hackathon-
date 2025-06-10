"use client"

import { useState, useCallback } from "react"
import type { CartItem, Product } from "../types/product"

export function useCart() {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [isCartOpen, setIsCartOpen] = useState(false)

  const addToCart = useCallback((product: Product, selectedSize: string, selectedColor: string, quantity = 1) => {
    setCartItems((prev) => {
      const existingItem = prev.find(
        (item) => item.id === product.id && item.selectedSize === selectedSize && item.selectedColor === selectedColor,
      )

      if (existingItem) {
        return prev.map((item) =>
          item.id === product.id && item.selectedSize === selectedSize && item.selectedColor === selectedColor
            ? { ...item, quantity: item.quantity + quantity }
            : item,
        )
      }

      return [...prev, { ...product, quantity, selectedSize, selectedColor }]
    })
  }, [])

  const removeFromCart = useCallback((productId: number, selectedSize: string, selectedColor: string) => {
    setCartItems((prev) =>
      prev.filter(
        (item) =>
          !(item.id === productId && item.selectedSize === selectedSize && item.selectedColor === selectedColor),
      ),
    )
  }, [])

  const updateQuantity = useCallback(
    (productId: number, selectedSize: string, selectedColor: string, quantity: number) => {
      if (quantity <= 0) {
        removeFromCart(productId, selectedSize, selectedColor)
        return
      }
      setCartItems((prev) =>
        prev.map((item) =>
          item.id === productId && item.selectedSize === selectedSize && item.selectedColor === selectedColor
            ? { ...item, quantity }
            : item,
        ),
      )
    },
    [removeFromCart],
  )

  const getTotalPrice = useCallback(() => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
  }, [cartItems])

  const getTotalItems = useCallback(() => {
    return cartItems.reduce((total, item) => total + item.quantity, 0)
  }, [cartItems])

  const clearCart = useCallback(() => {
    setCartItems([])
  }, [])

  return {
    cartItems,
    isCartOpen,
    setIsCartOpen,
    addToCart,
    removeFromCart,
    updateQuantity,
    getTotalPrice,
    getTotalItems,
    clearCart,
  }
}
