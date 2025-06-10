"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Heart, ShoppingCart, Star, Truck, RotateCcw, Shield } from "lucide-react"
import { ProductReviews } from "./ProductReviews"
import { SizeGuide } from "./SizeGuide"
import type { Product } from "../types/product"
import Image from "next/image"

interface ProductDetailModalProps {
  product: Product | null
  isOpen: boolean
  onClose: () => void
  onAddToCart: (product: Product, size: string, color: string) => void
  onAddToWishlist: (product: Product) => void
  isInWishlist: boolean
}

export function ProductDetailModal({
  product,
  isOpen,
  onClose,
  onAddToCart,
  onAddToWishlist,
  isInWishlist,
}: ProductDetailModalProps) {
  const [selectedSize, setSelectedSize] = useState("")
  const [selectedColor, setSelectedColor] = useState("")
  const [quantity, setQuantity] = useState(1)

  if (!product) return null

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) return
    onAddToCart(product, selectedSize, selectedColor)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="sr-only">{product.name}</DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="relative aspect-square">
              <Image
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                fill
                className="object-cover rounded-lg"
              />
              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                {product.isNew && <Badge className="bg-green-500">New</Badge>}
                {product.isBestseller && <Badge className="bg-blue-500">Bestseller</Badge>}
                {product.isSale && <Badge className="bg-red-500">Sale</Badge>}
              </div>
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm">{product.rating}</span>
                  <span className="text-sm text-gray-500">({product.reviews} reviews)</span>
                </div>
                <Badge variant="secondary" className="capitalize">
                  {product.vibe.replace("-", " ")}
                </Badge>
              </div>

              <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
              <p className="text-gray-600 mb-4">{product.brand}</p>

              <div className="flex items-center gap-4 mb-4">
                <span className="text-3xl font-bold">${product.price}</span>
                {product.originalPrice && (
                  <span className="text-xl text-gray-500 line-through">${product.originalPrice}</span>
                )}
                {product.originalPrice && (
                  <Badge variant="destructive">
                    {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                  </Badge>
                )}
              </div>

              <p className="text-gray-700 mb-6">{product.description}</p>
            </div>

            {/* Size Selection */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="font-medium">Size</label>
                <SizeGuide category={product.category} />
              </div>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <Button
                    key={size}
                    variant={selectedSize === size ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedSize(size)}
                    className="min-w-[3rem]"
                  >
                    {size}
                  </Button>
                ))}
              </div>
            </div>

            {/* Color Selection */}
            <div>
              <label className="font-medium mb-3 block">Color</label>
              <div className="flex flex-wrap gap-2">
                {product.colors.map((color) => (
                  <Button
                    key={color}
                    variant={selectedColor === color ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedColor(color)}
                  >
                    {color}
                  </Button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div>
              <label className="font-medium mb-3 block">Quantity</label>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={() => setQuantity(Math.max(1, quantity - 1))}>
                  -
                </Button>
                <span className="w-12 text-center">{quantity}</span>
                <Button variant="outline" size="sm" onClick={() => setQuantity(quantity + 1)}>
                  +
                </Button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Button onClick={handleAddToCart} disabled={!selectedSize || !selectedColor} className="w-full" size="lg">
                <ShoppingCart className="w-5 h-5 mr-2" />
                Add to Cart - ${(product.price * quantity).toFixed(2)}
              </Button>

              <Button variant="outline" onClick={() => onAddToWishlist(product)} className="w-full" size="lg">
                <Heart className={`w-5 h-5 mr-2 ${isInWishlist ? "fill-red-500 text-red-500" : ""}`} />
                {isInWishlist ? "Remove from Wishlist" : "Add to Wishlist"}
              </Button>
            </div>

            {/* Product Features */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t">
              <div className="text-center">
                <Truck className="w-6 h-6 mx-auto mb-2 text-green-600" />
                <p className="text-sm font-medium">Free Shipping</p>
                <p className="text-xs text-gray-500">On orders over $100</p>
              </div>
              <div className="text-center">
                <RotateCcw className="w-6 h-6 mx-auto mb-2 text-blue-600" />
                <p className="text-sm font-medium">Easy Returns</p>
                <p className="text-xs text-gray-500">30-day return policy</p>
              </div>
              <div className="text-center">
                <Shield className="w-6 h-6 mx-auto mb-2 text-purple-600" />
                <p className="text-sm font-medium">Secure Payment</p>
                <p className="text-xs text-gray-500">SSL encrypted</p>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mt-8">
          <Tabs defaultValue="details" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
              <TabsTrigger value="shipping">Shipping & Returns</TabsTrigger>
            </TabsList>

            <TabsContent value="details" className="mt-6">
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium mb-2">Product Details</h3>
                  <ul className="space-y-1 text-sm text-gray-600">
                    <li>Material: {product.material}</li>
                    <li>Category: {product.category}</li>
                    <li>Brand: {product.brand}</li>
                    <li>Style: {product.vibe.replace("-", " ")}</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-medium mb-2">Care Instructions</h3>
                  <ul className="space-y-1 text-sm text-gray-600">
                    <li>• Machine wash cold with like colors</li>
                    <li>• Do not bleach</li>
                    <li>• Tumble dry low</li>
                    <li>• Iron on low heat if needed</li>
                  </ul>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="reviews" className="mt-6">
              <ProductReviews productId={product.id} />
            </TabsContent>

            <TabsContent value="shipping" className="mt-6">
              <div className="space-y-6">
                <div>
                  <h3 className="font-medium mb-2">Shipping Information</h3>
                  <ul className="space-y-1 text-sm text-gray-600">
                    <li>• Free standard shipping on orders over $100</li>
                    <li>• Standard shipping (5-7 business days): $9.99</li>
                    <li>• Express shipping (2-3 business days): $19.99</li>
                    <li>• Next day delivery available in select areas</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-medium mb-2">Returns & Exchanges</h3>
                  <ul className="space-y-1 text-sm text-gray-600">
                    <li>• 30-day return policy</li>
                    <li>• Items must be unworn with tags attached</li>
                    <li>• Free returns for defective items</li>
                    <li>• Exchange for different size or color available</li>
                  </ul>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  )
}
