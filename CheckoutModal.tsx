"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CreditCard, Truck, Shield, CheckCircle } from "lucide-react"
import type { CartItem } from "../types/product"
import { usePayment } from "../hooks/usePayment"
import Image from "next/image"

interface CheckoutModalProps {
  isOpen: boolean
  onClose: () => void
  cartItems: CartItem[]
  onOrderComplete: () => void
}

export function CheckoutModal({ isOpen, onClose, cartItems, onOrderComplete }: CheckoutModalProps) {
  const { paymentMethods, shippingAddresses, processPayment } = usePayment()
  const [currentStep, setCurrentStep] = useState(1)
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(paymentMethods[0]?.id || "")
  const [selectedShippingAddress, setSelectedShippingAddress] = useState(shippingAddresses[0]?.id || "")
  const [isProcessing, setIsProcessing] = useState(false)
  const [orderComplete, setOrderComplete] = useState(false)

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const tax = subtotal * 0.08
  const shipping = subtotal > 100 ? 0 : 9.99
  const total = subtotal + tax + shipping

  const handlePayment = async () => {
    setIsProcessing(true)
    const result = await processPayment(cartItems, selectedPaymentMethod, selectedShippingAddress)

    if (result.success) {
      setOrderComplete(true)
      setCurrentStep(4)
      setTimeout(() => {
        onOrderComplete()
        onClose()
        setOrderComplete(false)
        setCurrentStep(1)
      }, 3000)
    }
    setIsProcessing(false)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Checkout</DialogTitle>
        </DialogHeader>

        {orderComplete ? (
          <div className="text-center py-8">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-2">Order Confirmed!</h3>
            <p className="text-gray-600">Thank you for your purchase. You'll receive a confirmation email shortly.</p>
          </div>
        ) : (
          <Tabs value={currentStep.toString()} className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="1">Cart Review</TabsTrigger>
              <TabsTrigger value="2">Shipping</TabsTrigger>
              <TabsTrigger value="3">Payment</TabsTrigger>
            </TabsList>

            <TabsContent value="1" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {cartItems.map((item, index) => (
                      <div key={`${item.id}-${index}`} className="flex gap-4 p-4 border rounded">
                        <Image
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          width={64}
                          height={64}
                          className="object-cover rounded"
                        />
                        <div className="flex-1">
                          <h4 className="font-medium">{item.name}</h4>
                          <p className="text-sm text-gray-500">
                            Size: {item.selectedSize} | Color: {item.selectedColor}
                          </p>
                          <p className="text-sm">Qty: {item.quantity}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                        </div>
                      </div>
                    ))}

                    <div className="border-t pt-4 space-y-2">
                      <div className="flex justify-between">
                        <span>Subtotal:</span>
                        <span>${subtotal.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Tax:</span>
                        <span>${tax.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Shipping:</span>
                        <span>{shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}</span>
                      </div>
                      <div className="flex justify-between font-bold text-lg border-t pt-2">
                        <span>Total:</span>
                        <span>${total.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Button onClick={() => setCurrentStep(2)} className="w-full">
                Continue to Shipping
              </Button>
            </TabsContent>

            <TabsContent value="2" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Truck className="w-5 h-5" />
                    Shipping Address
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Select value={selectedShippingAddress} onValueChange={setSelectedShippingAddress}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {shippingAddresses.map((address) => (
                        <SelectItem key={address.id} value={address.id}>
                          {address.name} - {address.street}, {address.city}, {address.state} {address.zipCode}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                    <div className="flex items-center gap-2 text-blue-700">
                      <Shield className="w-4 h-4" />
                      <span className="font-medium">Estimated Delivery: 3-5 business days</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <div className="flex gap-4">
                <Button variant="outline" onClick={() => setCurrentStep(1)} className="flex-1">
                  Back
                </Button>
                <Button onClick={() => setCurrentStep(3)} className="flex-1">
                  Continue to Payment
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="3" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="w-5 h-5" />
                    Payment Method
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Select value={selectedPaymentMethod} onValueChange={setSelectedPaymentMethod}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {paymentMethods.map((method) => (
                        <SelectItem key={method.id} value={method.id}>
                          {method.type === "card"
                            ? `${method.brand?.toUpperCase()} ending in ${method.last4}`
                            : method.type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <div className="mt-4 p-4 border rounded-lg">
                    <h4 className="font-medium mb-2">Order Total: ${total.toFixed(2)}</h4>
                    <p className="text-sm text-gray-600">
                      Your payment will be processed securely. All transactions are encrypted and protected.
                    </p>
                  </div>
                </CardContent>
              </Card>
              <div className="flex gap-4">
                <Button variant="outline" onClick={() => setCurrentStep(2)} className="flex-1">
                  Back
                </Button>
                <Button onClick={handlePayment} disabled={isProcessing} className="flex-1">
                  {isProcessing ? "Processing..." : `Pay $${total.toFixed(2)}`}
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        )}
      </DialogContent>
    </Dialog>
  )
}
