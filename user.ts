export interface User {
  id: string
  name: string
  email: string
  avatar?: string
  preferences: {
    style: string[]
    sizes: string[]
    priceRange: [number, number]
  }
}

export interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
}
