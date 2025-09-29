"use client"

import { useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown, ShoppingCart, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useCart } from "@/hooks/use-cart"
import { CartDrawer } from "@/components/cart-drawer"

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [isCartOpen, setIsCartOpen] = useState(false) // Added cart drawer state
  const { items } = useCart()
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0)

  const handleCheckout = () => {
    // Checkout handled on the dedicated checkout page with Razorpay/other methods
    console.log("Proceeding to checkout with items:", items)
  }

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center">
              <motion.span whileHover={{ scale: 1.05 }} className="text-2xl font-bold tracking-tight text-foreground">
                HuskThread
              </motion.span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/" className="text-foreground hover:text-muted-foreground transition-colors duration-200">
                Home
              </Link>

              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center space-x-1 text-foreground hover:text-muted-foreground transition-colors duration-200">
                  <span>Services</span>
                  <ChevronDown className="h-4 w-4" />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-48">
                  <DropdownMenuItem asChild>
                    <Link href="/tshirts/men" className="w-full">
                      T-Shirts - Men
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/tshirts/women" className="w-full">
                      T-Shirts - Women
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/hoodies/men" className="w-full">
                      Hoodies - Men
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/hoodies/women" className="w-full">
                      Hoodies - Women
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <Link
                href="/contact"
                className="text-foreground hover:text-muted-foreground transition-colors duration-200"
              >
                Contact
              </Link>
            </div>

            {/* Cart and Mobile Menu */}
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" className="relative" onClick={() => setIsCartOpen(true)}>
                <ShoppingCart className="h-5 w-5" />
                {itemCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center"
                  >
                    {itemCount}
                  </motion.span>
                )}
              </Button>

              {/* Mobile menu button */}
              <Button variant="ghost" size="sm" className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
                {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="md:hidden border-t border-border"
              >
                <div className="py-4 space-y-4">
                  <Link
                    href="/"
                    className="block text-foreground hover:text-muted-foreground transition-colors duration-200"
                    onClick={() => setIsOpen(false)}
                  >
                    Home
                  </Link>
                  <div className="space-y-2">
                    <span className="text-muted-foreground text-sm font-medium">Services</span>
                    <div className="pl-4 space-y-2">
                      <Link
                        href="/tshirts/men"
                        className="block text-foreground hover:text-muted-foreground transition-colors duration-200"
                        onClick={() => setIsOpen(false)}
                      >
                        T-Shirts - Men
                      </Link>
                      <Link
                        href="/tshirts/women"
                        className="block text-foreground hover:text-muted-foreground transition-colors duration-200"
                        onClick={() => setIsOpen(false)}
                      >
                        T-Shirts - Women
                      </Link>
                      <Link
                        href="/hoodies/men"
                        className="block text-foreground hover:text-muted-foreground transition-colors duration-200"
                        onClick={() => setIsOpen(false)}
                      >
                        Hoodies - Men
                      </Link>
                      <Link
                        href="/hoodies/women"
                        className="block text-foreground hover:text-muted-foreground transition-colors duration-200"
                        onClick={() => setIsOpen(false)}
                      >
                        Hoodies - Women
                      </Link>
                    </div>
                  </div>
                  <Link
                    href="/contact"
                    className="block text-foreground hover:text-muted-foreground transition-colors duration-200"
                    onClick={() => setIsOpen(false)}
                  >
                    Contact
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.nav>

      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} onCheckout={handleCheckout} />
    </>
  )
}
