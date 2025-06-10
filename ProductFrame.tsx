"use client"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { useEffect, useRef, useState } from "react"
import { ShoppingCart, Heart } from "lucide-react"

interface ProductFrameProps {
  media: string
  mediaType: "image" | "video"
  width: number | string
  height: number | string
  className?: string
  corner: string
  edgeHorizontal: string
  edgeVertical: string
  mediaSize: number
  borderThickness: number
  borderSize: number
  onMediaSizeChange: (value: number) => void
  onBorderThicknessChange: (value: number) => void
  onBorderSizeChange: (value: number) => void
  showControls: boolean
  label: string
  showFrame: boolean
  autoplayMode: "all" | "hover"
  isHovered: boolean
  productName: string
  price: string
  category: string
}

export function ProductFrame({
  media,
  mediaType,
  width,
  height,
  className = "",
  corner,
  edgeHorizontal,
  edgeVertical,
  mediaSize,
  borderThickness,
  borderSize,
  onMediaSizeChange,
  onBorderThicknessChange,
  onBorderSizeChange,
  showControls,
  label,
  showFrame,
  autoplayMode,
  isHovered,
  productName,
  price,
  category,
}: ProductFrameProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isLiked, setIsLiked] = useState(false)

  useEffect(() => {
    if (mediaType === "video") {
      if (autoplayMode === "all") {
        videoRef.current?.play()
      } else if (autoplayMode === "hover") {
        if (isHovered) {
          videoRef.current?.play()
        } else {
          videoRef.current?.pause()
        }
      }
    }
  }, [isHovered, autoplayMode, mediaType])

  return (
    <div
      className={`relative group ${className}`}
      style={{
        width,
        height,
        transition: "width 0.3s ease-in-out, height 0.3s ease-in-out",
      }}
    >
      <div className="relative w-full h-full overflow-hidden">
        {/* Media with Border */}
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{
            zIndex: 1,
            transition: "all 0.3s ease-in-out",
            padding: showFrame ? `${borderThickness}px` : "0",
            width: showFrame ? `${borderSize}%` : "100%",
            height: showFrame ? `${borderSize}%` : "100%",
            left: showFrame ? `${(100 - borderSize) / 2}%` : "0",
            top: showFrame ? `${(100 - borderSize) / 2}%` : "0",
          }}
        >
          <div
            className="w-full h-full overflow-hidden"
            style={{
              transform: `scale(${mediaSize})`,
              transformOrigin: "center",
              transition: "transform 0.3s ease-in-out",
            }}
          >
            {mediaType === "video" ? (
              <video
                className="w-full h-full object-cover"
                src={media}
                loop
                muted
                playsInline
                autoPlay={autoplayMode === "all" || (autoplayMode === "hover" && isHovered)}
                ref={videoRef}
                onMouseEnter={(e) => {
                  if (autoplayMode === "hover") {
                    e.currentTarget.play()
                  }
                }}
                onMouseLeave={(e) => {
                  if (autoplayMode === "hover") {
                    e.currentTarget.pause()
                  }
                }}
              />
            ) : (
              <img className="w-full h-full object-cover" src={media || "/placeholder.svg"} alt={productName} />
            )}
          </div>
        </div>

        {/* Frame Elements (Higher z-index) */}
        {showFrame && (
          <div className="absolute inset-0" style={{ zIndex: 2 }}>
            {/* Corners */}
            <div
              className="absolute top-0 left-0 w-16 h-16 bg-contain bg-no-repeat"
              style={{ backgroundImage: `url(${corner})` }}
            />
            <div
              className="absolute top-0 right-0 w-16 h-16 bg-contain bg-no-repeat"
              style={{ backgroundImage: `url(${corner})`, transform: "scaleX(-1)" }}
            />
            <div
              className="absolute bottom-0 left-0 w-16 h-16 bg-contain bg-no-repeat"
              style={{ backgroundImage: `url(${corner})`, transform: "scaleY(-1)" }}
            />
            <div
              className="absolute bottom-0 right-0 w-16 h-16 bg-contain bg-no-repeat"
              style={{ backgroundImage: `url(${corner})`, transform: "scale(-1, -1)" }}
            />

            {/* Edges */}
            <div
              className="absolute top-0 left-16 right-16 h-16"
              style={{
                backgroundImage: `url(${edgeHorizontal})`,
                backgroundSize: "auto 64px",
                backgroundRepeat: "repeat-x",
              }}
            />
            <div
              className="absolute bottom-0 left-16 right-16 h-16"
              style={{
                backgroundImage: `url(${edgeHorizontal})`,
                backgroundSize: "auto 64px",
                backgroundRepeat: "repeat-x",
                transform: "rotate(180deg)",
              }}
            />
            <div
              className="absolute left-0 top-16 bottom-16 w-16"
              style={{
                backgroundImage: `url(${edgeVertical})`,
                backgroundSize: "64px auto",
                backgroundRepeat: "repeat-y",
              }}
            />
            <div
              className="absolute right-0 top-16 bottom-16 w-16"
              style={{
                backgroundImage: `url(${edgeVertical})`,
                backgroundSize: "64px auto",
                backgroundRepeat: "repeat-y",
                transform: "scaleX(-1)",
              }}
            />
          </div>
        )}

        {/* Product Info Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-end justify-between p-4 z-10">
          {productName === "VIRGIO" ? (
            // Special Virgio brand overlay
            <div className="w-full h-full flex items-center justify-center">
              <div className="text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="flex justify-center gap-2 mb-4">
                  <div className="w-4 h-4 rounded-full bg-orange-500"></div>
                  <div className="w-4 h-4 rounded-full bg-cyan-400"></div>
                  <div className="w-4 h-4 rounded-full bg-green-500"></div>
                </div>
                <div className="text-white text-2xl font-bold tracking-wider">VIRGIO</div>
                <div className="text-white/80 text-sm mt-2">Sunkissed Summer</div>
                <div className="text-white/60 text-xs mt-1">Explore Collection</div>
              </div>
            </div>
          ) : (
            // Regular product overlay
            <>
              <div className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="text-xs uppercase tracking-wider text-white/70">{category}</div>
                <div className="font-semibold text-lg">{productName}</div>
                <div className="text-xl font-bold">{price}</div>
              </div>
              <div className="flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Button
                  size="sm"
                  variant="secondary"
                  className="bg-white/20 backdrop-blur-sm hover:bg-white/30"
                  onClick={() => setIsLiked(!isLiked)}
                >
                  <Heart className={`w-4 h-4 ${isLiked ? "fill-red-500 text-red-500" : "text-white"}`} />
                </Button>
                <Button
                  size="sm"
                  variant="secondary"
                  className="bg-white/20 backdrop-blur-sm hover:bg-white/30"
                  onClick={(e) => {
                    e.stopPropagation()
                    // Add to cart with default size and color
                    if (typeof window !== "undefined") {
                      const event = new CustomEvent("addToCart", {
                        detail: {
                          productName,
                          price,
                          category,
                          image: media,
                          id: Math.random(), // Generate a unique ID
                        },
                      })
                      window.dispatchEvent(event)
                    }
                  }}
                >
                  <ShoppingCart className="w-4 h-4 text-white" />
                </Button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Controls */}
      {showControls && (
        <div className="absolute bottom-0 left-0 right-0 p-2 bg-black bg-opacity-50 z-10">
          <div className="text-white font-bold mb-2">{label}</div>
          <div className="space-y-2">
            <div>
              <label htmlFor={`media-size-${label}`} className="block text-sm font-medium text-white">
                Media Size: {mediaSize.toFixed(2)}
              </label>
              <Slider
                id={`media-size-${label}`}
                min={0.5}
                max={3}
                step={0.01}
                value={[mediaSize]}
                onValueChange={(value) => onMediaSizeChange(value[0])}
              />
            </div>
            <div>
              <label htmlFor={`border-thickness-${label}`} className="block text-sm font-medium text-white">
                Border Thickness: {borderThickness}px
              </label>
              <Slider
                id={`border-thickness-${label}`}
                min={0}
                max={20}
                step={1}
                value={[borderThickness]}
                onValueChange={(value) => onBorderThicknessChange(value[0])}
              />
            </div>
            <div>
              <label htmlFor={`border-size-${label}`} className="block text-sm font-medium text-white">
                Border Size: {borderSize}%
              </label>
              <Slider
                id={`border-size-${label}`}
                min={50}
                max={100}
                step={1}
                value={[borderSize]}
                onValueChange={(value) => onBorderSizeChange(value[0])}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
