"use client"

import { useState, useEffect } from "react"
import FlickdFashionLayout from "../components/FlickdFashionLayout"
import { WomenSection } from "../components/WomenSection"
import { AuthModal } from "../components/AuthModal"
import { ShoppingCart } from "../components/ShoppingCart"
import { ExitIntentPopup } from "../components/ExitIntentPopup"
import { ppEditorialNewUltralightItalic, inter } from "./fonts"
import { Search, User, Menu, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useCart } from "../hooks/useCart"
import { useAuthProvider, AuthContext, useAuth } from "../hooks/useAuth"

function AppContent() {
  const [currentView, setCurrentView] = useState<"home" | "women">("home")
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
  const { authState, logout } = useAuth()

  const {
    cartItems,
    isCartOpen,
    setIsCartOpen,
    addToCart,
    removeFromCart,
    updateQuantity,
    getTotalPrice,
    getTotalItems,
  } = useCart()

  // Add this useEffect in the AppContent component after the existing state:
  useEffect(() => {
    const handleCartUpdate = (event: CustomEvent) => {
      const { action, product } = event.detail
      if (action === "add") {
        // Convert the product data to match our cart format
        const cartProduct = {
          id: product.id || Math.random(),
          name: product.productName,
          price: Number.parseFloat(product.price.replace("$", "")) || 0,
          image: product.image,
          category: product.category,
          brand: "Flickd",
          material: "Premium",
          sizes: ["S", "M", "L"],
          colors: ["Default"],
          // Add other required fields with defaults
          originalPrice: undefined,
          subcategory: "general",
          description: "Premium fashion item",
          inStock: true,
          rating: 4.5,
          reviews: 10,
          vibe: "modern",
          isNew: false,
          isBestseller: false,
          isSale: false,
        }

        addToCart(cartProduct, "M", "Default")

        // Show success notification
        console.log(`Added ${product.productName} to cart!`)
      }
    }

    if (typeof window !== "undefined") {
      window.addEventListener("cartUpdated", handleCartUpdate as EventListener)
      return () => {
        window.removeEventListener("cartUpdated", handleCartUpdate as EventListener)
      }
    }
  }, [addToCart])

  return (
    <div
      className={`min-h-screen bg-[#141414] flex flex-col p-8 ${ppEditorialNewUltralightItalic.variable} ${inter.variable}`}
    >
      {/* Header */}
      <header className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-8">
          <Button variant="ghost" size="sm" className="text-white/70 hover:text-white">
            <Menu className="w-5 h-5" />
          </Button>
          <nav className="hidden md:flex items-center gap-6">
            <Button
              variant="ghost"
              onClick={() => setCurrentView("home")}
              className="text-white/70 hover:text-white text-sm font-light"
            >
              <Sparkles className="w-4 h-4 mr-2" />
              AI
            </Button>
            <a href="#" className="text-white/70 hover:text-white text-sm font-light">
              New Arrivals
            </a>
            <Button
              variant="ghost"
              onClick={() => setCurrentView("women")}
              className="text-white/70 hover:text-white text-sm font-light"
            >
              Women
            </Button>
            <a href="#" className="text-white/70 hover:text-white text-sm font-light">
              Men
            </a>
            <a href="#" className="text-white/70 hover:text-white text-sm font-light">
              Collections
            </a>
            <a href="#" className="text-white/70 hover:text-white text-sm font-light">
              Vibes
            </a>
          </nav>
        </div>

        {/* Center Logo */}
        <div className="absolute left-1/2 transform -translate-x-1/2">
          <h1
            className={`${ppEditorialNewUltralightItalic.className} text-3xl md:text-4xl font-light italic text-white/90 tracking-tighter cursor-pointer`}
            onClick={() => setCurrentView("home")}
          >
            FLICKD
          </h1>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-2">
            <Search className="w-4 h-4 text-white/70" />
            <Input
              placeholder="Search products..."
              className="w-48 bg-transparent border-white/20 text-white placeholder:text-white/50"
            />
          </div>

          {authState.isAuthenticated ? (
            <div className="flex items-center gap-2">
              <span className="text-white/70 text-sm">Hi, {authState.user?.name}</span>
              <Button variant="ghost" size="sm" onClick={logout} className="text-white/70 hover:text-white">
                <User className="w-5 h-5" />
              </Button>
            </div>
          ) : (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsAuthModalOpen(true)}
              className="text-white/70 hover:text-white"
            >
              <User className="w-5 h-5" />
            </Button>
          )}

          <ShoppingCart
            cartItems={cartItems}
            isOpen={isCartOpen}
            onOpenChange={setIsCartOpen}
            onUpdateQuantity={updateQuantity}
            onRemoveItem={removeFromCart}
            totalPrice={getTotalPrice()}
            totalItems={getTotalItems()}
          />
        </div>
      </header>

      {/* Main Content */}
      {currentView === "women" ? (
        <WomenSection />
      ) : (
        <div className="flex-1 flex flex-col md:flex-row items-start gap-8 md:gap-8">
          {/* Left Content */}
          <div className="w-full md:w-[260px] flex-shrink-0 flex flex-col justify-between h-full">
            <div className="flex flex-col gap-16">
              <h2
                className={`${ppEditorialNewUltralightItalic.className} text-4xl md:text-6xl font-light italic text-white/80 tracking-tighter leading-[130%]`}
              >
                Flickd
                <br />
                Fashion
                <br />
                Collection
              </h2>
              <div className={`${inter.className} flex flex-col gap-12 text-white/50 text-sm font-light max-w-[300px]`}>
                <div className="space-y-6">
                  <div className="h-px bg-white/10 w-full" />
                  <p>
                    Discover our carefully curated collection of premium fashion pieces. From timeless classics to
                    contemporary statements, each item is selected for its exceptional quality and distinctive style.
                  </p>
                  <p>
                    Experience fashion that speaks to your individuality. Our collection features emerging designers
                    alongside established luxury brands, offering you exclusive pieces that define modern elegance.
                  </p>
                  <p>Explore our latest seasonal favorites and signature pieces.</p>
                  <div className="h-px bg-white/10 w-full" />
                </div>
              </div>

              {/* Categories */}
              <div className="space-y-4">
                <h3 className="text-white/70 text-sm uppercase tracking-wider">Categories</h3>
                <div className="space-y-2">
                  {["Dresses", "Outerwear", "Accessories", "Footwear", "Jewelry"].map((category) => (
                    <button
                      key={category}
                      className="block text-left text-white/50 hover:text-white/80 text-sm transition-colors"
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-4 mt-16">
              <Button
                onClick={() => setCurrentView("women")}
                className="w-full max-w-[260px] bg-white/10 hover:bg-white/20 text-white border-white/20"
                variant="outline"
              >
                Explore Collection
              </Button>
              <Button
                className="w-full max-w-[260px] bg-white/10 hover:bg-white/20 text-white border-white/20"
                variant="outline"
              >
                AI Styling
              </Button>
            </div>
          </div>

          {/* Right Content - Product Grid */}
          <div className="w-full md:flex-grow h-[60vh] md:h-[80vh]">
            <FlickdFashionLayout />
          </div>
        </div>
      )}

      {/* Enhanced Footer */}
      <footer className="mt-16 pt-12 border-t border-white/10 bg-[#0a0a0a]">
        <div className="container mx-auto px-4">
          {/* Newsletter Signup */}
          <div className="text-center mb-12">
            <h3 className="text-2xl font-bold mb-2">Join the Flickd Fashion Collections</h3>
            <p className="text-white/70 mb-6">Get early access to new collections and Virgio style recommendations</p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <Input
                placeholder="Your email address"
                className="flex-1 bg-white/10 border-white/20 text-white placeholder:text-white/50"
              />
              <Button className="bg-white text-black hover:bg-white/90">Subscribe</Button>
            </div>
          </div>

          {/* Main Footer Content */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            {/* Brand Section */}
            <div className="md:col-span-1">
              <h2 className={`${ppEditorialNewUltralightItalic.className} text-2xl font-light italic text-white mb-4`}>
                FLICKD
              </h2>
              <p className="text-white/60 text-sm mb-6">
                Smart fashion shopping with Virgio recommendations and personalized style curation.
              </p>
              {/* Social Media Links */}
              <div className="flex gap-4">
                <a href="#" className="text-white/60 hover:text-white transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
                <a href="#" className="text-white/60 hover:text-white transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                  </svg>
                </a>
                <a href="#" className="text-white/60 hover:text-white transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Shop Links */}
            <div>
              <h4 className="text-white font-medium mb-4">Shop</h4>
              <div className="space-y-2">
                <a href="#" className="block text-white/60 hover:text-white text-sm transition-colors">
                  New Arrivals
                </a>
                <a href="#" className="block text-white/60 hover:text-white text-sm transition-colors">
                  Women
                </a>
                <a href="#" className="block text-white/60 hover:text-white text-sm transition-colors">
                  Men
                </a>
                <a href="#" className="block text-white/60 hover:text-white text-sm transition-colors">
                  Collections
                </a>
                <a href="#" className="block text-white/60 hover:text-white text-sm transition-colors">
                  Sale
                </a>
              </div>
            </div>

            {/* Technology Links */}
            <div>
              <h4 className="text-white font-medium mb-4">Technology</h4>
              <div className="space-y-2">
                <a href="#" className="block text-white/60 hover:text-white text-sm transition-colors">
                  AI Styling
                </a>
                <a href="#" className="block text-white/60 hover:text-white text-sm transition-colors">
                  Smart Recommendations
                </a>
                <a href="#" className="block text-white/60 hover:text-white text-sm transition-colors">
                  Style Matching
                </a>
                <a href="#" className="block text-white/60 hover:text-white text-sm transition-colors">
                  API
                </a>
              </div>
            </div>

            {/* Support Links */}
            <div>
              <h4 className="text-white font-medium mb-4">Support</h4>
              <div className="space-y-2">
                <a href="#" className="block text-white/60 hover:text-white text-sm transition-colors">
                  Help Center
                </a>
                <a href="#" className="block text-white/60 hover:text-white text-sm transition-colors">
                  Size Guide
                </a>
                <a href="#" className="block text-white/60 hover:text-white text-sm transition-colors">
                  Returns
                </a>
                <a href="#" className="block text-white/60 hover:text-white text-sm transition-colors">
                  Contact
                </a>
              </div>
            </div>
          </div>

          {/* Bottom Footer */}
          <div className="border-t border-white/10 pt-6 pb-8">
            <div className="text-center">
              <p className="text-white/50 text-sm">© 2025 FLICKD. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>

      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
      <ExitIntentPopup />
    </div>
  )
}

export default function Home() {
  const authProvider = useAuthProvider()

  return (
    <AuthContext.Provider value={authProvider}>
      <AppContent />
    </AuthContext.Provider>
  )
}
