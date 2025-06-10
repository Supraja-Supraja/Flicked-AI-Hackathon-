"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Heart, ShoppingCart, Star, Search, Eye } from "lucide-react"
import { products, styleVibes } from "../data/products"
import { useCart } from "../hooks/useCart"
import { useWishlist } from "../hooks/useWishlist"
import { ProductDetailModal } from "./ProductDetailModal"
import { CheckoutModal } from "./CheckoutModal"
import { WishlistModal } from "./WishlistModal"
import type { Product } from "../types/product"
import Image from "next/image"

export function WomenSection() {
  const [selectedVibe, setSelectedVibe] = useState("all")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [priceRange, setPriceRange] = useState("all")
  const [sortBy, setSortBy] = useState("featured")
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [isProductModalOpen, setIsProductModalOpen] = useState(false)
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false)
  const [isWishlistOpen, setIsWishlistOpen] = useState(false)

  const { addToCart, cartItems, clearCart } = useCart()
  const { wishlistItems, addToWishlist, removeFromWishlist, isInWishlist } = useWishlist()

  const filteredProducts = products.filter((product) => {
    const matchesVibe = selectedVibe === "all" || product.vibe === selectedVibe
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase())

    let matchesPrice = true
    if (priceRange === "under-50") matchesPrice = product.price < 50
    else if (priceRange === "50-100") matchesPrice = product.price >= 50 && product.price <= 100
    else if (priceRange === "100-200") matchesPrice = product.price >= 100 && product.price <= 200
    else if (priceRange === "200+") matchesPrice = product.price > 200

    return matchesVibe && matchesCategory && matchesSearch && matchesPrice
  })

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price
      case "price-high":
        return b.price - a.price
      case "rating":
        return b.rating - a.rating
      case "newest":
        return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0)
      default:
        return 0
    }
  })

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product)
    setIsProductModalOpen(true)
  }

  const handleAddToCart = (product: Product, size: string, color: string) => {
    addToCart(product, size, color)
  }

  const handleWishlistToggle = (product: Product) => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id)
    } else {
      addToWishlist(product)
    }
  }

  const handleOrderComplete = () => {
    clearCart()
  }

  return (
    <div className="min-h-screen bg-[#141414] text-white">
      {/* Hero Section */}
      <div className="relative h-96 bg-gradient-to-r from-purple-900/50 to-pink-900/50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-5xl font-bold mb-4">AI Powered Smart Shopping</h1>
          <p className="text-xl text-white/80 mb-6">{filteredProducts.length} Items</p>
          <div className="space-y-2">
            <h2 className="text-3xl font-light italic">Smart Fashion</h2>
            <p className="text-white/70 max-w-2xl mx-auto">
              Discover your perfect style with AI-powered recommendations. Shop {filteredProducts.length} curated
              fashion pieces tailored to your unique vibe.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Header Actions */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-4">
            <Button onClick={() => setIsCheckoutOpen(true)} disabled={cartItems.length === 0}>
              Checkout ({cartItems.length})
            </Button>
          </div>
          <WishlistModal
            wishlistItems={wishlistItems}
            isOpen={isWishlistOpen}
            onOpenChange={setIsWishlistOpen}
            onRemoveItem={removeFromWishlist}
            onAddToCart={(productId) => {
              const product = products.find((p) => p.id === productId)
              if (product) {
                addToCart(product, product.sizes[0], product.colors[0])
              }
            }}
          />
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/50"
              />
            </div>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-48 bg-white/10 border-white/20 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="featured">Featured</SelectItem>
                <SelectItem value="newest">Newest</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="rating">Highest Rated</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Style Vibes */}
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-white/70">Shop by Vibe</h3>
            <div className="flex flex-wrap gap-2">
              {styleVibes.map((vibe) => (
                <Button
                  key={vibe.id}
                  variant={selectedVibe === vibe.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedVibe(vibe.id)}
                  className="text-xs"
                >
                  {vibe.name}
                </Button>
              ))}
            </div>
          </div>

          {/* Category and Price Filters */}
          <div className="flex flex-wrap gap-4">
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-48 bg-white/10 border-white/20 text-white">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="dresses">Dresses</SelectItem>
                <SelectItem value="tops">Tops</SelectItem>
                <SelectItem value="bottoms">Bottoms</SelectItem>
                <SelectItem value="outerwear">Outerwear</SelectItem>
              </SelectContent>
            </Select>

            <Select value={priceRange} onValueChange={setPriceRange}>
              <SelectTrigger className="w-48 bg-white/10 border-white/20 text-white">
                <SelectValue placeholder="Price Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Prices</SelectItem>
                <SelectItem value="under-50">Under $50</SelectItem>
                <SelectItem value="50-100">$50 - $100</SelectItem>
                <SelectItem value="100-200">$100 - $200</SelectItem>
                <SelectItem value="200+">$200+</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {sortedProducts.map((product) => (
            <Card
              key={product.id}
              className="bg-white/5 border-white/10 overflow-hidden group hover:bg-white/10 transition-all"
            >
              <div className="relative aspect-square">
                <Image
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform cursor-pointer"
                  onClick={() => handleProductClick(product)}
                />

                {/* Badges */}
                <div className="absolute top-2 left-2 flex flex-col gap-1">
                  {product.isNew && <Badge className="bg-green-500 text-xs">New</Badge>}
                  {product.isBestseller && <Badge className="bg-blue-500 text-xs">Bestseller</Badge>}
                  {product.isSale && <Badge className="bg-red-500 text-xs">Sale</Badge>}
                </div>

                {/* Vibe Badge */}
                <div className="absolute top-2 right-2">
                  <Badge variant="secondary" className="text-xs capitalize">
                    {product.vibe.replace("-", " ")}
                  </Badge>
                </div>

                {/* Quick Actions */}
                <div className="absolute bottom-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button
                    size="sm"
                    variant="secondary"
                    className="h-8 w-8 p-0"
                    onClick={(e) => {
                      e.stopPropagation()
                      handleWishlistToggle(product)
                    }}
                  >
                    <Heart className={`w-4 h-4 ${isInWishlist(product.id) ? "fill-red-500 text-red-500" : ""}`} />
                  </Button>
                  <Button
                    size="sm"
                    variant="secondary"
                    className="h-8 w-8 p-0"
                    onClick={(e) => {
                      e.stopPropagation()
                      handleProductClick(product)
                    }}
                  >
                    <Eye className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <CardContent className="p-4">
                <div className="flex items-center gap-1 mb-2">
                  <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                  <span className="text-xs text-white/60">
                    {product.rating} ({product.reviews})
                  </span>
                </div>

                <h3 className="font-medium text-white mb-1 cursor-pointer" onClick={() => handleProductClick(product)}>
                  {product.name}
                </h3>
                <p className="text-xs text-white/60 mb-2">{product.brand}</p>
                <p className="text-xs text-white/50 mb-3">{product.material}</p>

                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white">${product.price}</span>
                    {product.originalPrice && (
                      <span className="text-sm text-white/50 line-through">${product.originalPrice}</span>
                    )}
                  </div>
                </div>

                {/* Size Selection */}
                <div className="mb-3">
                  <div className="flex flex-wrap gap-1">
                    {product.sizes.slice(0, 4).map((size) => (
                      <Button
                        key={size}
                        variant="outline"
                        size="sm"
                        className="h-6 w-8 p-0 text-xs border-white/20 text-white/70"
                      >
                        {size}
                      </Button>
                    ))}
                    {product.sizes.length > 4 && (
                      <span className="text-xs text-white/50 self-center">+{product.sizes.length - 4}</span>
                    )}
                  </div>
                </div>

                <Button
                  onClick={() => handleAddToCart(product, product.sizes[0], product.colors[0])}
                  className="w-full"
                  size="sm"
                >
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Add to Cart
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* AI Style Intelligence Section */}
        <div className="mt-16 text-center">
          <h2 className="text-3xl font-bold mb-8">AI Style Intelligence</h2>
          <p className="text-white/70 mb-12 max-w-2xl mx-auto">
            Our advanced AI analyzes millions of fashion combinations to suggest personalized styles that match your
            unique vibe
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {styleVibes.slice(1, 4).map((vibe) => (
              <Card key={vibe.id} className="bg-white/5 border-white/10 p-6">
                <div className={`w-12 h-12 rounded-full ${vibe.color} mx-auto mb-4`}></div>
                <h3 className="text-xl font-semibold text-white mb-2">{vibe.name}</h3>
                <p className="text-white/60 mb-4">{vibe.description}</p>
                <Button variant="outline" size="sm">
                  Explore Style
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Modals */}
      <ProductDetailModal
        product={selectedProduct}
        isOpen={isProductModalOpen}
        onClose={() => setIsProductModalOpen(false)}
        onAddToCart={handleAddToCart}
        onAddToWishlist={handleWishlistToggle}
        isInWishlist={selectedProduct ? isInWishlist(selectedProduct.id) : false}
      />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cartItems={cartItems}
        onOrderComplete={handleOrderComplete}
      />
    </div>
  )
}
