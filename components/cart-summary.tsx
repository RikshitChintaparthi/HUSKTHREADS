"use client"

import { motion } from "framer-motion"
import { ShoppingCart, Package, Truck, Shield } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useCart } from "@/hooks/use-cart"

interface CartSummaryProps {
  onCheckout?: () => void
  className?: string
}

export function CartSummary({ onCheckout, className = "" }: CartSummaryProps) {
  const { items, total } = useCart()
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0)

  const shipping = total > 75 ? 0 : 9.99
  const tax = total * 0.08 // 8% tax
  const finalTotal = total + shipping + tax

  if (items.length === 0) {
    return (
      <Card className={`${className}`}>
        <CardContent className="flex flex-col items-center justify-center py-12 text-center">
          <ShoppingCart className="h-16 w-16 text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">Your cart is empty</h3>
          <p className="text-muted-foreground">Add some items to see your order summary</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className={`${className}`}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Package className="h-5 w-5" />
          Order Summary
          <Badge variant="secondary" className="ml-auto">
            {itemCount} {itemCount === 1 ? "item" : "items"}
          </Badge>
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Order Items */}
        <div className="space-y-3">
          {items.map((item) => (
            <motion.div key={item.id} layout className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
              <div className="w-12 h-12 bg-background rounded-md overflow-hidden flex-shrink-0">
                <img src={item.image || "/placeholder.svg"} alt={item.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-sm text-foreground truncate">{item.name}</h4>
                <p className="text-xs text-muted-foreground">
                  Size: {item.size} • Qty: {item.quantity}
                </p>
              </div>
              <div className="text-sm font-medium text-foreground">${(item.price * item.quantity).toFixed(2)}</div>
            </motion.div>
          ))}
        </div>

        {/* Price Breakdown */}
        <div className="space-y-3 pt-4 border-t border-border">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Subtotal</span>
            <span className="text-foreground">${total.toFixed(2)}</span>
          </div>

          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Shipping</span>
            <span className="text-foreground">
              {shipping === 0 ? <span className="text-green-600 font-medium">Free</span> : `$${shipping.toFixed(2)}`}
            </span>
          </div>

          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Tax</span>
            <span className="text-foreground">${tax.toFixed(2)}</span>
          </div>

          <div className="flex justify-between text-lg font-semibold pt-2 border-t border-border">
            <span className="text-foreground">Total</span>
            <span className="text-foreground">${finalTotal.toFixed(2)}</span>
          </div>
        </div>

        {/* Free Shipping Notice */}
        {total < 75 && (
          <div className="p-3 bg-accent/50 rounded-lg">
            <p className="text-sm text-accent-foreground">Add ${(75 - total).toFixed(2)} more for free shipping!</p>
          </div>
        )}

        <Button
          onClick={onCheckout}
          className="w-full h-12 text-lg rounded-full bg-primary hover:bg-primary/90 transition-all duration-300"
          size="lg"
        >
          Proceed to Checkout
        </Button>

        {/* Trust Badges */}
        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Truck className="h-4 w-4" />
            <span>Free shipping over $75</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Shield className="h-4 w-4" />
            <span>Secure checkout</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
