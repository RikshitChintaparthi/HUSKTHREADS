"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { CreditCard, Smartphone, Wallet, Banknote, QrCode, Shield, Clock, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
interface CheckoutItem {
  id: string
  name: string
  price: number
  quantity: number
  image?: string
  size: string
}

declare global {
  interface Window {
    Razorpay?: any
  }
}

interface PaymentGatewayProps {
  items: CheckoutItem[]
  total: number
  onPaymentSuccess: (paymentMethod: string, transactionId: string) => void
  onPaymentError: (error: string) => void
}

export function PaymentGateway({ items, total, onPaymentSuccess, onPaymentError }: PaymentGatewayProps) {
  const [selectedMethod, setSelectedMethod] = useState<string>("card")
  const [isProcessing, setIsProcessing] = useState(false)
  const [cardDetails, setCardDetails] = useState({
    number: "",
    expiry: "",
    cvv: "",
    name: ""
  })
  const [upiId, setUpiId] = useState("")
  const [deliveryAddress, setDeliveryAddress] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    pincode: ""
  })

  const paymentMethods = [
    {
      id: "razorpay",
      name: "Razorpay",
      description: "Pay via UPI, Card, NetBanking, Wallets",
      icon: <CreditCard className="h-5 w-5" />,
      popular: true
    },
    {
      id: "card",
      name: "Credit/Debit Card",
      description: "Visa, Mastercard, American Express",
      icon: <CreditCard className="h-5 w-5" />,
      popular: true
    },
    {
      id: "upi",
      name: "UPI Payment",
      description: "PhonePe, Google Pay, Paytm, BHIM",
      icon: <Smartphone className="h-5 w-5" />,
      popular: true
    },
    {
      id: "wallet",
      name: "Digital Wallet",
      description: "Paytm, PhonePe, Amazon Pay",
      icon: <Wallet className="h-5 w-5" />
    },
    {
      id: "cod",
      name: "Cash on Delivery",
      description: "Pay when your order arrives",
      icon: <Banknote className="h-5 w-5" />
    }
  ]

  const validateCardDetails = () => {
    if (!cardDetails.number || cardDetails.number.replace(/\s/g, '').length < 16) {
      onPaymentError("Please enter a valid card number")
      return false
    }
    if (!cardDetails.expiry || cardDetails.expiry.length < 5) {
      onPaymentError("Please enter a valid expiry date")
      return false
    }
    if (!cardDetails.cvv || cardDetails.cvv.length < 3) {
      onPaymentError("Please enter a valid CVV")
      return false
    }
    if (!cardDetails.name.trim()) {
      onPaymentError("Please enter cardholder name")
      return false
    }
    return true
  }

  const validateUpiId = () => {
    const upiRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+$/
    if (!upiId || !upiRegex.test(upiId)) {
      onPaymentError("Please enter a valid UPI ID (e.g., user@paytm)")
      return false
    }
    return true
  }

  const validateDeliveryAddress = () => {
    const required = ['name', 'phone', 'address', 'city', 'pincode']
    for (const field of required) {
      if (!deliveryAddress[field as keyof typeof deliveryAddress].trim()) {
        onPaymentError(`Please fill in ${field}`)
        return false
      }
    }
    if (deliveryAddress.phone.length < 10) {
      onPaymentError("Please enter a valid phone number")
      return false
    }
    return true
  }

  const loadRazorpay = () => {
    return new Promise<boolean>((resolve) => {
      if (typeof window !== "undefined" && window.Razorpay) return resolve(true)
      const script = document.createElement("script")
      script.src = "https://checkout.razorpay.com/v1/checkout.js"
      script.onload = () => resolve(true)
      script.onerror = () => resolve(false)
      document.body.appendChild(script)
    })
  }

  const handlePayment = async () => {
    setIsProcessing(true)
    
    try {
      if (selectedMethod === "razorpay") {
        const ok = await loadRazorpay()
        if (!ok || !window.Razorpay) {
          onPaymentError("Unable to load Razorpay. Please try again.")
          setIsProcessing(false)
          return
        }

        // In a real app, fetch an order from your backend here
        const orderId = `order_${Date.now()}`
        const options = {
          key: "", // replace with your Razorpay key in production
          amount: Math.round(total * 100),
          currency: "INR",
          name: "HuskThread",
          description: "Order Payment",
          order_id: orderId,
          handler: function (response: any) {
            const txn = response.razorpay_payment_id || `RAZOR_${Date.now()}`
            onPaymentSuccess("razorpay", txn)
          },
          prefill: {},
          notes: { platform: "HuskThread" },
          theme: { color: "#111827" },
        }
        const rzp = new window.Razorpay(options)
        rzp.on("payment.failed", function () {
          onPaymentError("Payment failed. Please try again.")
        })
        rzp.open()
        setIsProcessing(false)
        return
      }

      // Validate based on selected method
      let isValid = true
      if (selectedMethod === "card") {
        isValid = validateCardDetails()
      } else if (selectedMethod === "upi") {
        isValid = validateUpiId()
      } else if (selectedMethod === "cod") {
        isValid = validateDeliveryAddress()
      }

      if (!isValid) {
        setIsProcessing(false)
        return
      }

      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Generate a mock transaction ID
      const transactionId = `TXN_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
      
      onPaymentSuccess(selectedMethod, transactionId)
    } catch (error) {
      onPaymentError("Payment failed. Please try again.")
    } finally {
      setIsProcessing(false)
    }
  }

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
    const matches = v.match(/\d{4,16}/g)
    const match = matches && matches[0] || ''
    const parts = []
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4))
    }
    if (parts.length) {
      return parts.join(' ')
    } else {
      return v
    }
  }

  const formatExpiry = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4)
    }
    return v
  }

  const getCardType = (number: string) => {
    const cleanNumber = number.replace(/\s/g, '')
    if (cleanNumber.startsWith('4')) return 'Visa'
    if (cleanNumber.startsWith('5') || cleanNumber.startsWith('2')) return 'Mastercard'
    if (cleanNumber.startsWith('3')) return 'American Express'
    return 'Card'
  }

  const getPaymentButtonText = () => {
    if (isProcessing) return "Processing Payment..."
    switch (selectedMethod) {
      case "card":
        return `Pay $${total.toFixed(2)} with Card`
      case "upi":
        return `Pay $${total.toFixed(2)} via UPI`
      case "wallet":
        return `Pay $${total.toFixed(2)} with Wallet`
      case "cod":
        return `Place Order (Cash on Delivery)`
      default:
        return `Pay $${total.toFixed(2)}`
    }
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Order Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Order Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {items.map((item, index) => (
              <div key={index} className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <img 
                    src={item.image || "/placeholder.svg"} 
                    alt={item.name}
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-muted-foreground">Size: {item.size}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium">${item.price}</p>
                  <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                </div>
              </div>
            ))}
            <div className="border-t pt-3">
              <div className="flex justify-between text-lg font-bold">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Payment Methods */}
      <Card>
        <CardHeader>
          <CardTitle>Choose Payment Method</CardTitle>
        </CardHeader>
        <CardContent>
          <RadioGroup value={selectedMethod} onValueChange={setSelectedMethod}>
            <div className="space-y-4">
              {paymentMethods.map((method) => (
                <div key={method.id} className="flex items-center space-x-3">
                  <RadioGroupItem value={method.id} id={method.id} />
                  <Label 
                    htmlFor={method.id} 
                    className="flex-1 cursor-pointer"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        {method.icon}
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{method.name}</span>
                            {method.popular && (
                              <span className="text-xs bg-primary text-primary-foreground px-2 py-1 rounded-full">
                                Popular
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground">{method.description}</p>
                        </div>
                      </div>
                    </div>
                  </Label>
                </div>
              ))}
            </div>
          </RadioGroup>

          {/* Card Details Form */}
          {selectedMethod === "card" && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-6 space-y-4 p-4 border rounded-lg bg-muted/50"
            >
              <div className="flex items-center gap-2">
                <CreditCard className="h-5 w-5 text-primary" />
                <h4 className="font-medium">Card Details</h4>
                {cardDetails.number && (
                  <span className="text-sm text-muted-foreground">
                    ({getCardType(cardDetails.number)})
                  </span>
                )}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <Label htmlFor="cardNumber">Card Number</Label>
                  <Input
                    id="cardNumber"
                    placeholder="1234 5678 9012 3456"
                    value={cardDetails.number}
                    onChange={(e) => setCardDetails(prev => ({
                      ...prev,
                      number: formatCardNumber(e.target.value)
                    }))}
                    maxLength={19}
                  />
                </div>
                <div>
                  <Label htmlFor="expiry">Expiry Date</Label>
                  <Input
                    id="expiry"
                    placeholder="MM/YY"
                    value={cardDetails.expiry}
                    onChange={(e) => setCardDetails(prev => ({
                      ...prev,
                      expiry: formatExpiry(e.target.value)
                    }))}
                    maxLength={5}
                  />
                </div>
                <div>
                  <Label htmlFor="cvv">CVV</Label>
                  <Input
                    id="cvv"
                    placeholder="123"
                    value={cardDetails.cvv}
                    onChange={(e) => setCardDetails(prev => ({
                      ...prev,
                      cvv: e.target.value.replace(/\D/g, '').slice(0, 4)
                    }))}
                    maxLength={4}
                  />
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="cardName">Cardholder Name</Label>
                  <Input
                    id="cardName"
                    placeholder="John Doe"
                    value={cardDetails.name}
                    onChange={(e) => setCardDetails(prev => ({
                      ...prev,
                      name: e.target.value
                    }))}
                  />
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Shield className="h-4 w-4" />
                <span>Your card details are encrypted and secure</span>
              </div>
            </motion.div>
          )}

          {/* UPI Payment Form */}
          {selectedMethod === "upi" && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-6 space-y-4 p-4 border rounded-lg bg-muted/50"
            >
              <div className="flex items-center gap-2">
                <Smartphone className="h-5 w-5 text-primary" />
                <h4 className="font-medium">UPI Payment</h4>
              </div>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="upiId">UPI ID</Label>
                  <Input
                    id="upiId"
                    placeholder="yourname@paytm"
                    value={upiId}
                    onChange={(e) => setUpiId(e.target.value)}
                  />
                  <p className="text-sm text-muted-foreground mt-1">
                    Enter your UPI ID (e.g., yourname@paytm, yourname@googlepay)
                  </p>
                </div>
                <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <QrCode className="h-4 w-4 text-primary" />
                    <span className="text-sm font-medium">QR Code Payment</span>
                  </div>
                  <div className="bg-white p-4 rounded border-2 border-dashed border-primary/30 text-center">
                    <div className="w-32 h-32 bg-muted mx-auto rounded flex items-center justify-center">
                      <QrCode className="h-16 w-16 text-muted-foreground" />
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">
                      Scan with your UPI app
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CheckCircle className="h-4 w-4" />
                  <span>Supports PhonePe, Google Pay, Paytm, BHIM, and more</span>
                </div>
              </div>
            </motion.div>
          )}

          {/* Cash on Delivery Form */}
          {selectedMethod === "cod" && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-6 space-y-4 p-4 border rounded-lg bg-muted/50"
            >
              <div className="flex items-center gap-2">
                <Banknote className="h-5 w-5 text-primary" />
                <h4 className="font-medium">Delivery Information</h4>
              </div>
              <div className="space-y-4">
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-amber-600" />
                    <span className="text-sm font-medium text-amber-800">
                      Cash on Delivery Available
                    </span>
                  </div>
                  <p className="text-sm text-amber-700 mt-1">
                    Pay ${total.toFixed(2)} when your order arrives. Additional ₹50 COD charge applies.
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="deliveryName">Full Name *</Label>
                    <Input
                      id="deliveryName"
                      placeholder="John Doe"
                      value={deliveryAddress.name}
                      onChange={(e) => setDeliveryAddress(prev => ({
                        ...prev,
                        name: e.target.value
                      }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="deliveryPhone">Phone Number *</Label>
                    <Input
                      id="deliveryPhone"
                      placeholder="+91 98765 43210"
                      value={deliveryAddress.phone}
                      onChange={(e) => setDeliveryAddress(prev => ({
                        ...prev,
                        phone: e.target.value.replace(/\D/g, '').slice(0, 10)
                      }))}
                    />
                  </div>
                  <div className="md:col-span-2">
                    <Label htmlFor="deliveryAddress">Address *</Label>
                    <Input
                      id="deliveryAddress"
                      placeholder="123 Main Street, Apartment 4B"
                      value={deliveryAddress.address}
                      onChange={(e) => setDeliveryAddress(prev => ({
                        ...prev,
                        address: e.target.value
                      }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="deliveryCity">City *</Label>
                    <Input
                      id="deliveryCity"
                      placeholder="Mumbai"
                      value={deliveryAddress.city}
                      onChange={(e) => setDeliveryAddress(prev => ({
                        ...prev,
                        city: e.target.value
                      }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="deliveryPincode">Pincode *</Label>
                    <Input
                      id="deliveryPincode"
                      placeholder="400001"
                      value={deliveryAddress.pincode}
                      onChange={(e) => setDeliveryAddress(prev => ({
                        ...prev,
                        pincode: e.target.value.replace(/\D/g, '').slice(0, 6)
                      }))}
                    />
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CheckCircle className="h-4 w-4" />
                  <span>Delivery within 3-5 business days</span>
                </div>
              </div>
            </motion.div>
          )}
        </CardContent>
      </Card>

      {/* Payment Button */}
      <Button
        onClick={handlePayment}
        disabled={isProcessing}
        className="w-full h-12 text-lg rounded-full"
      >
        {isProcessing ? (
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"
          />
        ) : null}
        {getPaymentButtonText()}
      </Button>

      {/* Security Notice */}
      <div className="text-center text-sm text-muted-foreground space-y-2">
        <div className="flex items-center justify-center gap-4">
          <div className="flex items-center gap-1">
            <Shield className="h-4 w-4" />
            <span>256-bit SSL Encryption</span>
          </div>
          <div className="flex items-center gap-1">
            <CheckCircle className="h-4 w-4" />
            <span>PCI DSS Compliant</span>
          </div>
        </div>
        <p>Your payment information is secure and never stored on our servers</p>
        {selectedMethod === "cod" && (
          <p className="text-amber-600 font-medium">
            Cash on Delivery orders require verification before dispatch
          </p>
        )}
      </div>
    </div>
  )
}