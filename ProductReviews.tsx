"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Star, ThumbsUp, Camera, CheckCircle } from "lucide-react"
import { reviews, reviewSummaries } from "../data/reviews"
import Image from "next/image"

interface ProductReviewsProps {
  productId: number
}

export function ProductReviews({ productId }: ProductReviewsProps) {
  const [newReview, setNewReview] = useState({
    rating: 5,
    title: "",
    comment: "",
    size: "",
    color: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const productReviews = reviews.filter((review) => review.productId === productId)
  const summary = reviewSummaries[productId]

  const handleSubmitReview = async () => {
    setIsSubmitting(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsSubmitting(false)
    setNewReview({ rating: 5, title: "", comment: "", size: "", color: "" })
  }

  const renderStars = (rating: number, interactive = false, onRatingChange?: (rating: number) => void) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-4 h-4 ${
              star <= rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
            } ${interactive ? "cursor-pointer hover:text-yellow-400" : ""}`}
            onClick={() => interactive && onRatingChange?.(star)}
          />
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Review Summary */}
      {summary && (
        <Card>
          <CardHeader>
            <CardTitle>Customer Reviews</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4 mb-4">
              <div className="text-3xl font-bold">{summary.averageRating}</div>
              <div>
                {renderStars(Math.round(summary.averageRating))}
                <p className="text-sm text-gray-600">{summary.totalReviews} reviews</p>
              </div>
            </div>

            <div className="space-y-2">
              {Object.entries(summary.ratingDistribution)
                .reverse()
                .map(([rating, count]) => (
                  <div key={rating} className="flex items-center gap-2">
                    <span className="text-sm w-8">{rating}★</span>
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-yellow-400 h-2 rounded-full"
                        style={{ width: `${(count / summary.totalReviews) * 100}%` }}
                      />
                    </div>
                    <span className="text-sm text-gray-600 w-8">{count}</span>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Write Review */}
      <Dialog>
        <DialogTrigger asChild>
          <Button className="w-full">Write a Review</Button>
        </DialogTrigger>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Write a Review</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Rating</Label>
              {renderStars(newReview.rating, true, (rating) => setNewReview({ ...newReview, rating }))}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="size">Size Purchased</Label>
                <Input
                  id="size"
                  value={newReview.size}
                  onChange={(e) => setNewReview({ ...newReview, size: e.target.value })}
                  placeholder="e.g., M"
                />
              </div>
              <div>
                <Label htmlFor="color">Color Purchased</Label>
                <Input
                  id="color"
                  value={newReview.color}
                  onChange={(e) => setNewReview({ ...newReview, color: e.target.value })}
                  placeholder="e.g., Black"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="title">Review Title</Label>
              <Input
                id="title"
                value={newReview.title}
                onChange={(e) => setNewReview({ ...newReview, title: e.target.value })}
                placeholder="Summarize your experience"
              />
            </div>

            <div>
              <Label htmlFor="comment">Your Review</Label>
              <Textarea
                id="comment"
                value={newReview.comment}
                onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                placeholder="Tell others about your experience with this product"
                rows={4}
              />
            </div>

            <div className="flex items-center gap-2 p-4 bg-gray-50 rounded-lg">
              <Camera className="w-5 h-5 text-gray-500" />
              <span className="text-sm text-gray-600">Add photos to help others see how it looks</span>
              <Button variant="outline" size="sm">
                Upload Photos
              </Button>
            </div>

            <Button onClick={handleSubmitReview} disabled={isSubmitting} className="w-full">
              {isSubmitting ? "Submitting..." : "Submit Review"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Reviews List */}
      <div className="space-y-4">
        {productReviews.map((review) => (
          <Card key={review.id}>
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                  {review.userAvatar ? (
                    <Image
                      src={review.userAvatar || "/placeholder.svg"}
                      alt={review.userName}
                      width={40}
                      height={40}
                      className="rounded-full object-cover"
                    />
                  ) : (
                    <span className="text-sm font-medium">{review.userName[0]}</span>
                  )}
                </div>

                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-medium">{review.userName}</span>
                    {review.verified && (
                      <div className="flex items-center gap-1 text-green-600">
                        <CheckCircle className="w-3 h-3" />
                        <span className="text-xs">Verified Purchase</span>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-2 mb-2">
                    {renderStars(review.rating)}
                    <span className="text-sm text-gray-600">{review.createdAt.toLocaleDateString()}</span>
                  </div>

                  {review.size && review.color && (
                    <p className="text-sm text-gray-600 mb-2">
                      Size: {review.size} | Color: {review.color}
                    </p>
                  )}

                  <h4 className="font-medium mb-2">{review.title}</h4>
                  <p className="text-gray-700 mb-3">{review.comment}</p>

                  {review.images && review.images.length > 0 && (
                    <div className="flex gap-2 mb-3">
                      {review.images.map((image, index) => (
                        <Image
                          key={index}
                          src={image || "/placeholder.svg"}
                          alt="Review image"
                          width={80}
                          height={80}
                          className="rounded object-cover"
                        />
                      ))}
                    </div>
                  )}

                  <div className="flex items-center gap-4">
                    <Button variant="ghost" size="sm" className="text-gray-600">
                      <ThumbsUp className="w-4 h-4 mr-1" />
                      Helpful ({review.helpful})
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
