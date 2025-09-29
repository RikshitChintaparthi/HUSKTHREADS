"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ShoppingCart, Heart, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useCart } from "@/hooks/use-cart"
import { QuickViewModal } from "@/components/quick-view-modal"

export interface Product {
  id: string
  name: string
  price: number
  originalPrice?: number
  image: string
  category: string
  sizes: string[]
  colors: string[]
  isNew?: boolean
  isBestseller?: boolean
}

interface ProductCardProps {
  product: Product
  onBuyNow?: (product: Product, size: string) => void
}

export function ProductCard({ product, onBuyNow }: ProductCardProps) {
  const [selectedSize, setSelectedSize] = useState<string>("")
  const [isHovered, setIsHovered] = useState(false)
  const [showQuickView, setShowQuickView] = useState(false)
  const { addItem } = useCart()

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert("Please select a size")
      return
    }

    addItem({
      id: `${product.id}-${selectedSize}`,
      name: product.name,
      price: product.price,
      image: product.image,
      size: selectedSize,
      category: product.category,
    })
  }

  const handleBuyNow = () => {
    if (!selectedSize) {
      alert("Please select a size")
      return
    }

    if (onBuyNow) {
      onBuyNow(product, selectedSize)
    }
  }

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0

  return (
    <motion.div
      className="group relative bg-card rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ y: -8 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Product Image */}
      <div className="relative aspect-[4/5] overflow-hidden bg-gradient-to-br from-muted to-accent/20">
        <img
          src={product.image || "/placeholder.svg"}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />

        {/* Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          {product.isNew && <Badge className="bg-primary text-primary-foreground">New</Badge>}
          {product.isBestseller && <Badge className="bg-accent text-accent-foreground">Bestseller</Badge>}
          {discount > 0 && <Badge variant="destructive">{discount}% OFF</Badge>}
        </div>

        {/* Quick Actions */}
        <motion.div
          className="absolute top-4 right-4 flex flex-col gap-2"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: isHovered ? 1 : 0, x: isHovered ? 0 : 20 }}
          transition={{ duration: 0.3 }}
        >
          <Button size="sm" variant="secondary" className="rounded-full p-2">
            <Heart className="h-4 w-4" />
          </Button>
          <Button 
            size="sm" 
            variant="secondary" 
            className="rounded-full p-2"
            onClick={() => setShowQuickView(true)}
          >
            <Eye className="h-4 w-4" />
          </Button>
        </motion.div>

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
      </div>

      {/* Product Info */}
      <div className="p-6">
        <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
          {product.name}
        </h3>

        <div className="flex items-center gap-2 mb-4">
          <span className="text-xl font-bold text-foreground">${product.price}</span>
          {product.originalPrice && (
            <span className="text-sm text-muted-foreground line-through">${product.originalPrice}</span>
          )}
        </div>

        {/* Size Selection */}
        <div className="mb-4">
          <Select value={selectedSize} onValueChange={setSelectedSize}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select size" />
            </SelectTrigger>
            <SelectContent>
              {product.sizes.map((size) => (
                <SelectItem key={size} value={size}>
                  {size}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <Button
            onClick={handleAddToCart}
            variant="outline"
            className="flex-1 rounded-full hover:bg-accent transition-all duration-300 bg-transparent"
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            Add to Cart
          </Button>
          <Button
            onClick={handleBuyNow}
            className="flex-1 rounded-full bg-primary hover:bg-primary/90 transition-all duration-300"
          >
            Buy Now
          </Button>
        </div>
      </div>

      {/* Quick View Modal */}
      <QuickViewModal
        product={product}
        isOpen={showQuickView}
        onClose={() => setShowQuickView(false)}
        onBuyNow={onBuyNow}
      />
    </motion.div>
  )
}
