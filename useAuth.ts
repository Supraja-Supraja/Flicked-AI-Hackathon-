"use client"

import { useState, useCallback, createContext, useContext } from "react"
import type { User, AuthState } from "../types/user"

const AuthContext = createContext<{
  authState: AuthState
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  register: (name: string, email: string, password: string) => Promise<void>
} | null>(null)

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider")
  }
  return context
}

export function useAuthProvider() {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: false,
  })

  const login = useCallback(async (email: string, password: string) => {
    setAuthState((prev) => ({ ...prev, isLoading: true }))

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const mockUser: User = {
      id: "1",
      name: "Sarah Johnson",
      email,
      avatar:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/2025-05-27_13-46-16_UTC.jpg-njXxWKLgV3G4CTB2xgYHqjAgK96I9R.jpeg",
      preferences: {
        style: ["clean-girl", "coquette"],
        sizes: ["S", "M"],
        priceRange: [50, 200],
      },
    }

    setAuthState({
      user: mockUser,
      isAuthenticated: true,
      isLoading: false,
    })
  }, [])

  const logout = useCallback(() => {
    setAuthState({
      user: null,
      isAuthenticated: false,
      isLoading: false,
    })
  }, [])

  const register = useCallback(async (name: string, email: string, password: string) => {
    setAuthState((prev) => ({ ...prev, isLoading: true }))

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const mockUser: User = {
      id: "1",
      name,
      email,
      preferences: {
        style: [],
        sizes: [],
        priceRange: [0, 500],
      },
    }

    setAuthState({
      user: mockUser,
      isAuthenticated: true,
      isLoading: false,
    })
  }, [])

  return { authState, login, logout, register }
}

export { AuthContext }
