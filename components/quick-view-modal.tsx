"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, ShoppingCart, Heart, Minus, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useCart } from "@/hooks/use-cart"
import { Product } from "@/components/product-card"

interface QuickViewModalProps {
  product: Product | null
  isOpen: boolean
  onClose: () => void
  onBuyNow?: (product: Product, size: string, color: string, quantity: number) => void
}

export function QuickViewModal({ product, isOpen, onClose, onBuyNow }: QuickViewModalProps) {
  const [selectedSize, setSelectedSize] = useState<string>("")
  const [selectedColor, setSelectedColor] = useState<string>("")
  const [quantity, setQuantity] = useState(1)
  const { addItem } = useCart()


  if (!product) return null

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert("Please select a size")
      return
    }
    if (!selectedColor) {
      alert("Please select a color")
      return
    }

    for (let i = 0; i < quantity; i++) {
      addItem({
        id: `${product.id}-${selectedSize}-${selectedColor}`,
        name: product.name,
        price: product.price,
        image: product.image,
        size: selectedSize,
        category: product.category,
      })
    }
    
    onClose()
  }

  const handleBuyNow = () => {
    if (!selectedSize) {
      alert("Please select a size")
      return
    }
    if (!selectedColor) {
      alert("Please select a color")
      return
    }

    if (onBuyNow) {
      onBuyNow(product, selectedSize, selectedColor, quantity)
    }
  }

  const incrementQuantity = () => setQuantity(prev => prev + 1)
  const decrementQuantity = () => setQuantity(prev => Math.max(1, prev - 1))

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Quick View - {product.name}</DialogTitle>
        </DialogHeader>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Product Image */}
          <div className="relative">
            <div className="aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-muted to-accent/20">
              <img
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Badges */}
            <div className="absolute top-4 left-4 flex flex-col gap-2">
              {product.isNew && <Badge className="bg-primary text-primary-foreground">New</Badge>}
              {product.isBestseller && <Badge className="bg-accent text-accent-foreground">Bestseller</Badge>}
              {discount > 0 && <Badge variant="destructive">{discount}% OFF</Badge>}
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-2">{product.name}</h2>
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl font-bold text-foreground">${product.price}</span>
                {product.originalPrice && (
                  <>
                    <span className="text-lg text-muted-foreground line-through">${product.originalPrice}</span>
                    <Badge variant="destructive" className="ml-2">Save ${product.originalPrice - product.price}</Badge>
                  </>
                )}
              </div>
            </div>

            {/* Color Selection */}
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">Color</label>
              <div className="flex flex-wrap gap-2">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`px-4 py-2 rounded-full border-2 transition-all duration-200 ${
                      selectedColor === color
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border hover:border-primary/50"
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>

            {/* Size Selection */}
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">Size</label>
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

            {/* Quantity Selection */}
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">Quantity</label>
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={decrementQuantity}
                  disabled={quantity <= 1}
                  className="rounded-full w-10 h-10 p-0"
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="text-lg font-medium w-8 text-center">{quantity}</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={incrementQuantity}
                  className="rounded-full w-10 h-10 p-0"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Button
                onClick={handleAddToCart}
                className="w-full rounded-full bg-primary hover:bg-primary/90 transition-all duration-300 h-12 text-lg"
              >
                <ShoppingCart className="h-5 w-5 mr-2" />
                Add to Cart
              </Button>
              
              <Button
                onClick={handleBuyNow}
                variant="outline"
                className="w-full rounded-full border-2 hover:bg-accent transition-all duration-300 h-12 text-lg bg-transparent"
              >
                Buy Now
              </Button>
              
              <Button
                variant="ghost"
                className="w-full rounded-full hover:bg-accent transition-all duration-300"
              >
                <Heart className="h-4 w-4 mr-2" />
                Add to Wishlist
              </Button>
            </div>

            {/* Product Description */}
            <div className="pt-4 border-t">
              <h3 className="font-medium text-foreground mb-2">Product Details</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Premium quality {product.category.toLowerCase()} designed for comfort and style. 
                Made with the finest materials and attention to detail.
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}