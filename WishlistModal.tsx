"use client"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Heart, ShoppingCart, Trash2 } from "lucide-react"
import type { WishlistItem } from "../types/wishlist"
import Image from "next/image"

interface WishlistModalProps {
  wishlistItems: WishlistItem[]
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  onRemoveItem: (productId: number) => void
  onAddToCart: (productId: number) => void
}

export function WishlistModal({ wishlistItems, isOpen, onOpenChange, onRemoveItem, onAddToCart }: WishlistModalProps) {
  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetTrigger asChild>
        <Button variant="ghost" className="relative text-white/70 hover:text-white">
          <Heart className="w-5 h-5" />
          {wishlistItems.length > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
              {wishlistItems.length}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-lg">
        <SheetHeader>
          <SheetTitle>Wishlist ({wishlistItems.length} items)</SheetTitle>
        </SheetHeader>

        <div className="flex flex-col h-full">
          <div className="flex-1 overflow-y-auto py-4">
            {wishlistItems.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-gray-500">
                <Heart className="w-12 h-12 mb-4" />
                <p>Your wishlist is empty</p>
                <p className="text-sm">Save items you love for later</p>
              </div>
            ) : (
              <div className="space-y-4">
                {wishlistItems.map((item) => (
                  <div key={item.id} className="flex gap-4 p-4 border rounded-lg">
                    <div className="relative w-16 h-16 flex-shrink-0">
                      <Image
                        src={item.product.image || "/placeholder.svg"}
                        alt={item.product.name}
                        fill
                        className="object-cover rounded"
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-sm truncate">{item.product.name}</h4>
                      <p className="text-sm text-gray-500">${item.product.price}</p>
                      <p className="text-xs text-gray-400">{item.product.brand}</p>

                      <div className="flex items-center gap-2 mt-2">
                        <Button size="sm" onClick={() => onAddToCart(item.product.id)} className="h-8 text-xs">
                          <ShoppingCart className="w-3 h-3 mr-1" />
                          Add to Cart
                        </Button>

                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => onRemoveItem(item.product.id)}
                          className="h-8 w-8 p-0 text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>

                    <div className="text-right">
                      {item.product.originalPrice && (
                        <p className="text-xs text-gray-500 line-through">${item.product.originalPrice}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
