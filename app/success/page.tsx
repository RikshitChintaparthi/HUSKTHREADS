"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { motion } from "framer-motion"
import { CheckCircle, Package, ArrowRight, Home } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface OrderDetails {
  status: string
  customer_email: string
  amount_total: number
  currency: string
  metadata: any
}

export default function SuccessPage() {
  const searchParams = useSearchParams()
  const sessionId = searchParams?.get("session_id") || null
  const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Get transaction details from URL parameters
    const urlParams = new URLSearchParams(window.location.search)
    const transactionId = urlParams.get("transaction_id")
    const paymentMethod = urlParams.get("payment_method")
    
    // For demo purposes, simulate order details
    const mockOrderDetails: OrderDetails = {
      status: "paid",
      customer_email: "demo@example.com",
      amount_total: 5000, // $50.00 in cents
      currency: "usd",
      metadata: { 
        items: "Demo order",
        transaction_id: transactionId || "demo-transaction",
        payment_method: paymentMethod || "demo-payment"
      }
    }
    
    setOrderDetails(mockOrderDetails)
    setLoading(false)
  }, [sessionId])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Verifying your order...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Error</h1>
          <p className="text-muted-foreground mb-8">{error}</p>
          <Button asChild>
            <Link href="/">Return Home</Link>
          </Button>
        </div>
      </div>
    )
  }

  if (!orderDetails || orderDetails.status !== "paid") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Order Not Found</h1>
          <p className="text-muted-foreground mb-8">We couldn't find your order details.</p>
          <Button asChild>
            <Link href="/">Return Home</Link>
          </Button>
        </div>
      </div>
    )
  }

  let orderTotal = "0.00"
  try {
    orderTotal = (orderDetails.amount_total / 100).toFixed(2)
  } catch (err) {
    console.error("[v0] Error calculating order total:", err)
    orderTotal = "0.00"
  }

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <CheckCircle className="h-10 w-10 text-green-600" />
          </motion.div>

          <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">Order Confirmed!</h1>
          <p className="text-xl text-muted-foreground">
            Thank you for your purchase. Your order has been successfully processed.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Order Summary */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="h-5 w-5" />
                  Order Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Order Total</span>
                  <span className="font-semibold text-foreground">
                    ${orderTotal} {orderDetails.currency?.toUpperCase() || "USD"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Payment Status</span>
                  <span className="font-semibold text-green-600 capitalize">{orderDetails.status}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Email</span>
                  <span className="font-semibold text-foreground">{orderDetails.customer_email || "N/A"}</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Next Steps */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>What's Next?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-primary-foreground text-xs font-bold">1</span>
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground">Order Confirmation</h4>
                      <p className="text-sm text-muted-foreground">You'll receive an email confirmation shortly</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-primary-foreground text-xs font-bold">2</span>
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground">Processing</h4>
                      <p className="text-sm text-muted-foreground">We'll prepare your order within 1-2 business days</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-primary-foreground text-xs font-bold">3</span>
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground">Shipping</h4>
                      <p className="text-sm text-muted-foreground">
                        Your order will be shipped within 3-5 business days
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mt-12"
        >
          <Button asChild size="lg" className="rounded-full">
            <Link href="/" className="flex items-center gap-2">
              <Home className="h-4 w-4" />
              Return Home
            </Link>
          </Button>

          <Button asChild variant="outline" size="lg" className="rounded-full bg-transparent">
            <Link href="/tshirts/men" className="flex items-center gap-2">
              Continue Shopping
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </div>
  )
}
