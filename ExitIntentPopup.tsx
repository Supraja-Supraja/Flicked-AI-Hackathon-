"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { X } from "lucide-react"
import { ppEditorialNewUltralightItalic } from "../app/fonts"

export function ExitIntentPopup() {
  const [isOpen, setIsOpen] = useState(false)
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  useEffect(() => {
    // Check if we've shown the popup recently (in the last 24 hours)
    const lastShown = localStorage.getItem("exitIntentShown")
    const hasSubscribed = localStorage.getItem("hasSubscribed")

    if (hasSubscribed === "true") {
      return // Don't show if they've already subscribed
    }

    if (lastShown) {
      const lastShownDate = new Date(Number.parseInt(lastShown))
      const now = new Date()
      const hoursSinceLastShown = (now.getTime() - lastShownDate.getTime()) / (1000 * 60 * 60)

      if (hoursSinceLastShown < 24) {
        return // Don't show if we've shown it in the last 24 hours
      }
    }

    // Function to detect exit intent
    const detectExitIntent = (e: MouseEvent) => {
      // If the mouse is near the top of the page and moving upward
      if (e.clientY < 50 && e.clientY > 0) {
        setIsOpen(true)
        document.removeEventListener("mouseleave", detectExitIntent)
        localStorage.setItem("exitIntentShown", Date.now().toString())
      }
    }

    // Add a small delay before adding the event listener
    // This prevents the popup from showing immediately when the page loads
    const timer = setTimeout(() => {
      document.addEventListener("mouseleave", detectExitIntent)
    }, 3000)

    return () => {
      clearTimeout(timer)
      document.removeEventListener("mouseleave", detectExitIntent)
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Store that they've subscribed
    localStorage.setItem("hasSubscribed", "true")
    setIsSubmitted(true)
    setIsSubmitting(false)

    // Close after showing success message
    setTimeout(() => {
      setIsOpen(false)
    }, 3000)
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-md">
        <div className="absolute right-4 top-4">
          <Button variant="ghost" className="h-6 w-6 p-0 rounded-full" onClick={() => setIsOpen(false)}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        <DialogHeader>
          <DialogTitle
            className={`${ppEditorialNewUltralightItalic.className} text-2xl md:text-3xl font-light italic text-center`}
          >
            Wait! Don't miss out
          </DialogTitle>
          <DialogDescription className="text-center">
            Join our exclusive list for early access to new collections and 10% off your first order.
          </DialogDescription>
        </DialogHeader>

        {!isSubmitted ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Input
                  id="email"
                  placeholder="Enter your email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoFocus
                  className="border-gray-300"
                />
              </div>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Subscribing..." : "Get 10% Off"}
              </Button>
            </div>
            <div className="text-center text-xs text-gray-500">
              By subscribing, you agree to our Privacy Policy and consent to receive updates from our company.
            </div>
          </form>
        ) : (
          <div className="py-6 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
              <svg
                className="w-8 h-8 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-xl font-medium text-gray-900 mb-1">Thank you for subscribing!</h3>
            <p className="text-gray-600">Your discount code has been sent to your email.</p>
          </div>
        )}

        <div className="flex justify-center">
          <img
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/2025-05-28_13-42-32_UTC.jpg-UQNTI0hu7rOjDaJqOupHS5cIr9gcGB.jpeg"
            alt="Fashion collection"
            className="h-32 w-auto object-cover rounded-md opacity-80"
          />
        </div>
      </DialogContent>
    </Dialog>
  )
}
