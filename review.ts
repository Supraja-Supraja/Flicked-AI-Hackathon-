export interface Review {
  id: string
  userId: string
  productId: number
  userName: string
  userAvatar?: string
  rating: number
  title: string
  comment: string
  images?: string[]
  verified: boolean
  helpful: number
  createdAt: Date
  size?: string
  color?: string
}

export interface ReviewSummary {
  averageRating: number
  totalReviews: number
  ratingDistribution: {
    5: number
    4: number
    3: number
    2: number
    1: number
  }
}
