"use client"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { ShoppingCartIcon, PlusIcon, MinusIcon, TrashIcon } from "lucide-react"
import type { CartItem } from "../types/product"
import Image from "next/image"

interface ShoppingCartProps {
  cartItems: CartItem[]
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  onUpdateQuantity: (productId: number, selectedSize: string, selectedColor: string, quantity: number) => void
  onRemoveItem: (productId: number, selectedSize: string, selectedColor: string) => void
  totalPrice: number
  totalItems: number
}

export function ShoppingCart({
  cartItems,
  isOpen,
  onOpenChange,
  onUpdateQuantity,
  onRemoveItem,
  totalPrice,
  totalItems,
}: ShoppingCartProps) {
  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetTrigger asChild>
        <Button variant="ghost" className="relative text-white/70 hover:text-white">
          <ShoppingCartIcon className="w-5 h-5" />
          {totalItems > 0 && (
            <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold animate-pulse">
              {totalItems}
            </div>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-lg">
        <SheetHeader>
          <SheetTitle>Shopping Cart ({totalItems} items)</SheetTitle>
        </SheetHeader>

        <div className="flex flex-col h-full">
          <div className="flex-1 overflow-y-auto py-4">
            {cartItems.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-gray-500">
                <ShoppingCartIcon className="w-12 h-12 mb-4" />
                <p>Your cart is empty</p>
              </div>
            ) : (
              <div className="space-y-4">
                {cartItems.map((item, index) => (
                  <div
                    key={`${item.id}-${item.selectedSize}-${item.selectedColor}-${index}`}
                    className="flex gap-4 p-4 border rounded-lg"
                  >
                    <div className="relative w-16 h-16 flex-shrink-0">
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        fill
                        className="object-cover rounded"
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-sm truncate">{item.name}</h4>
                      <p className="text-sm text-gray-500">${item.price}</p>
                      <div className="text-xs text-gray-400">
                        Size: {item.selectedSize} | Color: {item.selectedColor}
                      </div>

                      <div className="flex items-center gap-2 mt-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() =>
                            onUpdateQuantity(item.id, item.selectedSize, item.selectedColor, item.quantity - 1)
                          }
                          className="h-6 w-6 p-0"
                        >
                          <MinusIcon className="w-3 h-3" />
                        </Button>

                        <span className="text-sm font-medium w-8 text-center">{item.quantity}</span>

                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() =>
                            onUpdateQuantity(item.id, item.selectedSize, item.selectedColor, item.quantity + 1)
                          }
                          className="h-6 w-6 p-0"
                        >
                          <PlusIcon className="w-3 h-3" />
                        </Button>

                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => onRemoveItem(item.id, item.selectedSize, item.selectedColor)}
                          className="h-6 w-6 p-0 ml-2 text-red-500 hover:text-red-700"
                        >
                          <TrashIcon className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>

                    <div className="text-right">
                      <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {cartItems.length > 0 && (
            <div className="border-t pt-4 space-y-4">
              <div className="flex justify-between items-center text-lg font-bold">
                <span>Total:</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>

              <Button className="w-full" size="lg">
                Checkout
              </Button>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  )
}
