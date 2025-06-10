"use client"

import { useState, useCallback } from "react"
import type { PaymentMethod, ShippingAddress, Order } from "../types/payment"
import type { CartItem } from "../types/product"

export function usePayment() {
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([
    {
      id: "1",
      type: "card",
      last4: "4242",
      brand: "visa",
      expiryMonth: 12,
      expiryYear: 2025,
      isDefault: true,
    },
  ])

  const [shippingAddresses, setShippingAddresses] = useState<ShippingAddress[]>([
    {
      id: "1",
      name: "Sarah Johnson",
      street: "123 Fashion Ave",
      city: "New York",
      state: "NY",
      zipCode: "10001",
      country: "US",
      isDefault: true,
    },
  ])

  const [orders, setOrders] = useState<Order[]>([])

  const processPayment = useCallback(
    async (
      cartItems: CartItem[],
      paymentMethodId: string,
      shippingAddressId: string,
    ): Promise<{ success: boolean; orderId?: string; error?: string }> => {
      try {
        // Simulate payment processing
        await new Promise((resolve) => setTimeout(resolve, 2000))

        const paymentMethod = paymentMethods.find((pm) => pm.id === paymentMethodId)
        const shippingAddress = shippingAddresses.find((sa) => sa.id === shippingAddressId)

        if (!paymentMethod || !shippingAddress) {
          throw new Error("Invalid payment method or shipping address")
        }

        const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
        const tax = subtotal * 0.08 // 8% tax
        const shipping = subtotal > 100 ? 0 : 9.99
        const total = subtotal + tax + shipping

        const newOrder: Order = {
          id: `order-${Date.now()}`,
          items: cartItems,
          subtotal,
          tax,
          shipping,
          total,
          status: "confirmed",
          createdAt: new Date(),
          shippingAddress,
          paymentMethod,
        }

        setOrders((prev) => [newOrder, ...prev])

        return { success: true, orderId: newOrder.id }
      } catch (error) {
        return { success: false, error: error instanceof Error ? error.message : "Payment failed" }
      }
    },
    [paymentMethods, shippingAddresses],
  )

  const addPaymentMethod = useCallback((paymentMethod: Omit<PaymentMethod, "id">) => {
    const newPaymentMethod: PaymentMethod = {
      ...paymentMethod,
      id: `pm-${Date.now()}`,
    }
    setPaymentMethods((prev) => [...prev, newPaymentMethod])
  }, [])

  const addShippingAddress = useCallback((address: Omit<ShippingAddress, "id">) => {
    const newAddress: ShippingAddress = {
      ...address,
      id: `addr-${Date.now()}`,
    }
    setShippingAddresses((prev) => [...prev, newAddress])
  }, [])

  return {
    paymentMethods,
    shippingAddresses,
    orders,
    processPayment,
    addPaymentMethod,
    addShippingAddress,
  }
}
