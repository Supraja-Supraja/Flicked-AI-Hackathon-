import type { CartItem } from "./cart" // Assuming CartItem is declared in another file, e.g., cart.ts

export interface PaymentMethod {
  id: string
  type: "card" | "paypal" | "apple_pay" | "google_pay"
  last4?: string
  brand?: string
  expiryMonth?: number
  expiryYear?: number
  isDefault: boolean
}

export interface ShippingAddress {
  id: string
  name: string
  street: string
  city: string
  state: string
  zipCode: string
  country: string
  isDefault: boolean
}

export interface Order {
  id: string
  items: CartItem[]
  total: number
  subtotal: number
  tax: number
  shipping: number
  status: "pending" | "confirmed" | "shipped" | "delivered"
  createdAt: Date
  shippingAddress: ShippingAddress
  paymentMethod: PaymentMethod
}
