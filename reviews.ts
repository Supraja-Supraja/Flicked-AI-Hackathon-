import type { Review, ReviewSummary } from "../types/review"

export const reviews: Review[] = [
  {
    id: "1",
    userId: "user1",
    productId: 1,
    userName: "Emma S.",
    userAvatar:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/2025-05-27_13-46-16_UTC.jpg-njXxWKLgV3G4CTB2xgYHqjAgK96I9R.jpeg",
    rating: 5,
    title: "Perfect summer dress!",
    comment:
      "This dress is absolutely gorgeous! The fabric is so soft and the fit is perfect. I got so many compliments wearing it to a wedding.",
    images: [
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/2025-05-28_13-42-32_UTC.jpg-UQNTI0hu7rOjDaJqOupHS5cIr9gcGB.jpeg",
    ],
    verified: true,
    helpful: 12,
    createdAt: new Date("2024-05-15"),
    size: "M",
    color: "Pink",
  },
  {
    id: "2",
    userId: "user2",
    productId: 1,
    userName: "Jessica M.",
    rating: 4,
    title: "Beautiful but runs small",
    comment:
      "Love the design and quality, but I had to size up. The medium felt more like a small. Other than that, it's a beautiful dress!",
    verified: true,
    helpful: 8,
    createdAt: new Date("2024-05-10"),
    size: "L",
    color: "Pink",
  },
  {
    id: "3",
    userId: "user3",
    productId: 2,
    userName: "Sarah K.",
    rating: 5,
    title: "Best basic tee ever",
    comment:
      "This is my third one! The quality is amazing and it holds up so well after washing. Perfect for layering or wearing alone.",
    verified: true,
    helpful: 15,
    createdAt: new Date("2024-05-12"),
    size: "S",
    color: "White",
  },
]

export const reviewSummaries: Record<number, ReviewSummary> = {
  1: {
    averageRating: 4.8,
    totalReviews: 124,
    ratingDistribution: {
      5: 89,
      4: 25,
      3: 7,
      2: 2,
      1: 1,
    },
  },
  2: {
    averageRating: 4.9,
    totalReviews: 89,
    ratingDistribution: {
      5: 78,
      4: 9,
      3: 2,
      2: 0,
      1: 0,
    },
  },
}
