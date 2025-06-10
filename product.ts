export interface Product {
  id: number
  name: string
  price: number
  originalPrice?: number
  image: string
  category: string
  subcategory: string
  description: string
  inStock: boolean
  rating: number
  reviews: number
  brand: string
  material: string
  sizes: string[]
  colors: string[]
  vibe: string
  isNew?: boolean
  isBestseller?: boolean
  isSale?: boolean
}

export interface CartItem extends Product {
  quantity: number
  selectedSize: string
  selectedColor: string
}

export interface StyleVibe {
  id: string
  name: string
  description: string
  color: string
}
