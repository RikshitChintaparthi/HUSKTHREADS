"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { CreditCard, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/hooks/use-cart"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"

interface CheckoutButtonProps {
  className?: string
  size?: "sm" | "default" | "lg"
  variant?: "default" | "outline" | "secondary"
}

export function CheckoutButton({ className = "", size = "default", variant = "default" }: CheckoutButtonProps) {
  const [isLoading, setIsLoading] = useState(false)
  const { items } = useCart()
  const { toast } = useToast()
  const router = useRouter()

  const handleCheckout = async () => {
    if (items.length === 0) {
      toast({
        title: "Cart is empty",
        description: "Please add some items to your cart before checking out.",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    try {
      // Redirect to cart page
      router.push("/cart")
    } catch (error) {
      console.error("Checkout error:", error)
      toast({
        title: "Checkout failed",
        description: "There was an error processing your checkout. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button
      onClick={handleCheckout}
      disabled={isLoading || items.length === 0}
      className={`rounded-full transition-all duration-300 ${className}`}
      size={size}
      variant={variant}
    >
      {isLoading ? (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2">
          <Loader2 className="h-4 w-4 animate-spin" />
          Processing...
        </motion.div>
      ) : (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2">
          <CreditCard className="h-4 w-4" />
          Proceed to Checkout
        </motion.div>
      )}
    </Button>
  )
}
