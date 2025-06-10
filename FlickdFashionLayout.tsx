"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { ProductFrame } from "./ProductFrame"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"

const GRID_SIZE = 12
const CELL_SIZE = 60

interface Product {
  id: number
  media: string
  mediaType: "image" | "video"
  defaultPos: { x: number; y: number; w: number; h: number }
  corner: string
  edgeHorizontal: string
  edgeVertical: string
  mediaSize: number
  borderThickness: number
  borderSize: number
  autoplayMode: "all" | "hover"
  isHovered: boolean
  productName: string
  price: string
  category: string
}

const initialProducts: Product[] = [
  {
    id: 1,
    media:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/2025-05-27_13-46-16_UTC.jpg-njXxWKLgV3G4CTB2xgYHqjAgK96I9R.jpeg",
    mediaType: "image",
    defaultPos: { x: 0, y: 0, w: 4, h: 4 },
    corner: "https://static.cdn-luma.com/files/bcf576df9c38b05f/1_corner_update.png",
    edgeHorizontal: "https://static.cdn-luma.com/files/bcf576df9c38b05f/1_vert_update.png",
    edgeVertical: "https://static.cdn-luma.com/files/bcf576df9c38b05f/1_hori_update.png",
    mediaSize: 1,
    borderThickness: 0,
    borderSize: 80,
    autoplayMode: "all",
    isHovered: false,
    productName: "Summer Essentials",
    price: "$299",
    category: "Casual",
  },
  {
    id: 2,
    media:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/2025-05-28_13-40-09_UTC.jpg-GVtdKP12Azx0MX5M3HBJwfuE4xlumD.jpeg",
    mediaType: "image",
    defaultPos: { x: 4, y: 0, w: 4, h: 4 },
    corner: "https://static.cdn-luma.com/files/bcf576df9c38b05f/2_corner_update.png",
    edgeHorizontal: "https://static.cdn-luma.com/files/bcf576df9c38b05f/2_vert_update.png",
    edgeVertical: "https://static.cdn-luma.com/files/bcf576df9c38b05f/2_hori_update.png",
    mediaSize: 1,
    borderThickness: 0,
    borderSize: 80,
    autoplayMode: "all",
    isHovered: false,
    productName: "White Elegance",
    price: "$189",
    category: "Dresses",
  },
  {
    id: 3,
    media:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/2025-05-28_13-42-32_UTC.jpg-UQNTI0hu7rOjDaJqOupHS5cIr9gcGB.jpeg",
    mediaType: "image",
    defaultPos: { x: 8, y: 0, w: 4, h: 4 },
    corner: "https://static.cdn-luma.com/files/3d36d1e0dba2476c/3_Corner_update.png",
    edgeHorizontal: "https://static.cdn-luma.com/files/3d36d1e0dba2476c/3_hori_update.png",
    edgeVertical: "https://static.cdn-luma.com/files/3d36d1e0dba2476c/3_Vert_update.png",
    mediaSize: 1,
    borderThickness: 0,
    borderSize: 80,
    autoplayMode: "all",
    isHovered: false,
    productName: "Floral Dreams",
    price: "$249",
    category: "Summer",
  },
  {
    id: 4,
    media:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/2025-05-31_14-01-37_UTC.jpg-UMTfUudxR4PF3EYUQdTjZyHoui43gM.jpeg",
    mediaType: "image",
    defaultPos: { x: 0, y: 4, w: 4, h: 4 },
    corner: "https://static.cdn-luma.com/files/9e67e05f37e52522/4_corner_update.png",
    edgeHorizontal: "https://static.cdn-luma.com/files/9e67e05f37e52522/4_hori_update.png",
    edgeVertical: "https://static.cdn-luma.com/files/9e67e05f37e52522/4_vert_update.png",
    mediaSize: 1,
    borderThickness: 0,
    borderSize: 80,
    autoplayMode: "all",
    isHovered: false,
    productName: "Urban Chic",
    price: "$159",
    category: "Accessories",
  },
  {
    id: 5,
    media: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-l3r2FMv8ZZZeOvN1HeMEKabE61otE8.png",
    mediaType: "image",
    defaultPos: { x: 4, y: 4, w: 4, h: 4 },
    corner: "https://static.cdn-luma.com/files/9e67e05f37e52522/5_corner_update.png",
    edgeHorizontal: "https://static.cdn-luma.com/files/9e67e05f37e52522/5_hori_update.png",
    edgeVertical: "https://static.cdn-luma.com/files/9e67e05f37e52522/5_verti_update.png",
    mediaSize: 1,
    borderThickness: 0,
    borderSize: 80,
    autoplayMode: "all",
    isHovered: false,
    productName: "VIRGIO",
    price: "Collection",
    category: "Brand",
  },
  {
    id: 6,
    media:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/2025-06-02_11-31-19_UTC.jpg-pBzI1KYKDu9WYZE5Q57tUjZs9Uwupt.jpeg",
    mediaType: "image",
    defaultPos: { x: 8, y: 4, w: 4, h: 4 },
    corner: "https://static.cdn-luma.com/files/1199340587e8da1d/6_corner.png",
    edgeHorizontal: "https://static.cdn-luma.com/files/1199340587e8da1d/6_corner-1.png",
    edgeVertical: "https://static.cdn-luma.com/files/1199340587e8da1d/6_vert.png",
    mediaSize: 1,
    borderThickness: 0,
    borderSize: 80,
    autoplayMode: "all",
    isHovered: false,
    productName: "#SoShaya",
    price: "Advocacy",
    category: "Campaign",
  },
  {
    id: 7,
    media:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/2025-05-27_13-46-16_UTC.jpg-njXxWKLgV3G4CTB2xgYHqjAgK96I9R.jpeg",
    mediaType: "image",
    defaultPos: { x: 0, y: 8, w: 4, h: 4 },
    corner: "https://static.cdn-luma.com/files/b80b5aa00ccc33bd/7_corner.png",
    edgeHorizontal: "https://static.cdn-luma.com/files/b80b5aa00ccc33bd/7_hori.png",
    edgeVertical: "https://static.cdn-luma.com/files/b80b5aa00ccc33bd/7_vert.png",
    mediaSize: 1,
    borderThickness: 0,
    borderSize: 80,
    autoplayMode: "all",
    isHovered: false,
    productName: "Tropical Vibes",
    price: "$199",
    category: "Resort",
  },
  {
    id: 8,
    media:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/2025-05-28_13-40-09_UTC.jpg-GVtdKP12Azx0MX5M3HBJwfuE4xlumD.jpeg",
    mediaType: "image",
    defaultPos: { x: 4, y: 8, w: 4, h: 4 },
    corner: "https://static.cdn-luma.com/files/981e483f71aa764b/8_corner.png",
    edgeHorizontal: "https://static.cdn-luma.com/files/981e483f71aa764b/8_hori.png",
    edgeVertical: "https://static.cdn-luma.com/files/981e483f71aa764b/8_verticle.png",
    mediaSize: 1,
    borderThickness: 0,
    borderSize: 80,
    autoplayMode: "all",
    isHovered: false,
    productName: "Minimalist",
    price: "$229",
    category: "Modern",
  },
  {
    id: 9,
    media:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/2025-05-28_13-42-32_UTC.jpg-UQNTI0hu7rOjDaJqOupHS5cIr9gcGB.jpeg",
    mediaType: "image",
    defaultPos: { x: 8, y: 8, w: 4, h: 4 },
    corner: "https://static.cdn-luma.com/files/981e483f71aa764b/9_corner.png",
    edgeHorizontal: "https://static.cdn-luma.com/files/981e483f71aa764b/9_hori.png",
    edgeVertical: "https://static.cdn-luma.com/files/981e483f71aa764b/9_vert.png",
    mediaSize: 1,
    borderThickness: 0,
    borderSize: 80,
    autoplayMode: "all",
    isHovered: false,
    productName: "Garden Party",
    price: "$279",
    category: "Occasion",
  },
]

export default function FlickdFashionLayout() {
  const [products, setProducts] = useState<Product[]>(initialProducts)
  const [hovered, setHovered] = useState<{ row: number; col: number } | null>(null)
  const [hoverSize, setHoverSize] = useState(6)
  const [gapSize, setGapSize] = useState(4)
  const [showControls, setShowControls] = useState(false)
  const [cleanInterface, setCleanInterface] = useState(true)
  const [showFrames, setShowFrames] = useState(false)
  const [autoplayMode, setAutoplayMode] = useState<"all" | "hover">("all")

  useEffect(() => {
    const handleAddToCart = (event: CustomEvent) => {
      const productData = event.detail
      console.log("Added to cart:", productData)

      // Show a toast notification or update cart state
      if (typeof window !== "undefined") {
        const cartEvent = new CustomEvent("cartUpdated", {
          detail: { action: "add", product: productData },
        })
        window.dispatchEvent(cartEvent)
      }
    }

    if (typeof window !== "undefined") {
      window.addEventListener("addToCart", handleAddToCart as EventListener)
      return () => {
        window.removeEventListener("addToCart", handleAddToCart as EventListener)
      }
    }
  }, [])

  const getRowSizes = () => {
    if (hovered === null) {
      return "4fr 4fr 4fr"
    }
    const { row } = hovered
    const nonHoveredSize = (12 - hoverSize) / 2
    return [0, 1, 2].map((r) => (r === row ? `${hoverSize}fr` : `${nonHoveredSize}fr`)).join(" ")
  }

  const getColSizes = () => {
    if (hovered === null) {
      return "4fr 4fr 4fr"
    }
    const { col } = hovered
    const nonHoveredSize = (12 - hoverSize) / 2
    return [0, 1, 2].map((c) => (c === col ? `${hoverSize}fr` : `${nonHoveredSize}fr`)).join(" ")
  }

  const getTransformOrigin = (x: number, y: number) => {
    const vertical = y === 0 ? "top" : y === 4 ? "center" : "bottom"
    const horizontal = x === 0 ? "left" : x === 4 ? "center" : "right"
    return `${vertical} ${horizontal}`
  }

  const updateProductProperty = (id: number, property: keyof Product, value: number) => {
    setProducts(products.map((product) => (product.id === id ? { ...product, [property]: value } : product)))
  }

  const toggleControls = () => {
    setShowControls(!showControls)
  }

  const toggleCleanInterface = () => {
    setCleanInterface(!cleanInterface)
    if (!cleanInterface) {
      setShowControls(false)
    }
  }

  return (
    <div className="space-y-4 w-full h-full">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Switch id="frame-toggle" checked={showFrames} onCheckedChange={setShowFrames} />
            <label htmlFor="frame-toggle" className="text-sm text-white/70">
              {showFrames ? "Hide Frames" : "Show Frames"}
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <Switch
              id="autoplay-toggle"
              checked={autoplayMode === "all"}
              onCheckedChange={(checked) => setAutoplayMode(checked ? "all" : "hover")}
            />
            <label htmlFor="autoplay-toggle" className="text-sm text-white/70">
              {autoplayMode === "all" ? "Show All" : "Hover Preview"}
            </label>
          </div>
        </div>
      </div>
      {!cleanInterface && (
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-white">Flickd Fashion Collection</h2>
          <div className="space-x-2">
            <Button onClick={toggleControls}>{showControls ? "Hide Controls" : "Show Controls"}</Button>
            <Button onClick={toggleCleanInterface}>{cleanInterface ? "Show UI" : "Hide UI"}</Button>
          </div>
        </div>
      )}
      {!cleanInterface && showControls && (
        <>
          <div className="space-y-2">
            <label htmlFor="hover-size" className="block text-sm font-medium text-gray-200">
              Hover Size: {hoverSize}
            </label>
            <Slider
              id="hover-size"
              min={4}
              max={8}
              step={0.1}
              value={[hoverSize]}
              onValueChange={(value) => setHoverSize(value[0])}
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="gap-size" className="block text-sm font-medium text-gray-200">
              Gap Size: {gapSize}px
            </label>
            <Slider
              id="gap-size"
              min={0}
              max={20}
              step={1}
              value={[gapSize]}
              onValueChange={(value) => setGapSize(value[0])}
            />
          </div>
        </>
      )}
      <div
        className="relative w-full h-full"
        style={{
          display: "grid",
          gridTemplateRows: getRowSizes(),
          gridTemplateColumns: getColSizes(),
          gap: `${gapSize}px`,
          transition: "grid-template-rows 0.4s ease, grid-template-columns 0.4s ease",
        }}
      >
        {products.map((product) => {
          const row = Math.floor(product.defaultPos.y / 4)
          const col = Math.floor(product.defaultPos.x / 4)
          const transformOrigin = getTransformOrigin(product.defaultPos.x, product.defaultPos.y)

          return (
            <motion.div
              key={product.id}
              className="relative"
              style={{
                transformOrigin,
                transition: "transform 0.4s ease",
              }}
              onMouseEnter={() => setHovered({ row, col })}
              onMouseLeave={() => setHovered(null)}
            >
              <ProductFrame
                media={product.media}
                mediaType={product.mediaType}
                width="100%"
                height="100%"
                className="absolute inset-0"
                corner={product.corner}
                edgeHorizontal={product.edgeHorizontal}
                edgeVertical={product.edgeVertical}
                mediaSize={product.mediaSize}
                borderThickness={product.borderThickness}
                borderSize={product.borderSize}
                onMediaSizeChange={(value) => updateProductProperty(product.id, "mediaSize", value)}
                onBorderThicknessChange={(value) => updateProductProperty(product.id, "borderThickness", value)}
                onBorderSizeChange={(value) => updateProductProperty(product.id, "borderSize", value)}
                showControls={showControls && !cleanInterface}
                label={`Product ${product.id}`}
                showFrame={showFrames}
                autoplayMode={autoplayMode}
                isHovered={
                  hovered?.row === Math.floor(product.defaultPos.y / 4) &&
                  hovered?.col === Math.floor(product.defaultPos.x / 4)
                }
                productName={product.productName}
                price={product.price}
                category={product.category}
              />
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
