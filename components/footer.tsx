"use client"

import { useState } from "react"
import Link from "next/link"
import { Instagram, Youtube, Heart, ShoppingBag, ArrowUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { AuthModal } from "@/components/auth-modal"
import { useAuth } from "@/hooks/use-auth"
import { useWishlist } from "@/hooks/use-wishlist"
import { useCart } from "@/hooks/use-cart"

export function Footer() {
  const [authModalOpen, setAuthModalOpen] = useState(false)
  const [authMode, setAuthMode] = useState<"login" | "register" | "forgot">("login")
  const { user, logout } = useAuth()
  const { wishlistItems } = useWishlist()
  const { items } = useCart()

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const openAuthModal = (mode: "login" | "register" | "forgot") => {
    setAuthMode(mode)
    setAuthModalOpen(true)
  }

  return (
    <>
      <footer className="bg-card border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Brand */}
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-foreground">HuskThread</h3>
              <p className="text-muted-foreground">
                Premium clothing meets exquisite design. Transform your wardrobe with our curated collection.
              </p>
              <div className="flex space-x-4">
                <Link
                  href="https://instagram.com/huskthread"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  target="_blank"
                >
                  <Instagram className="h-5 w-5" />
                </Link>
                <Link
                  href="https://youtube.com/@huskthread"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  target="_blank"
                >
                  <Youtube className="h-5 w-5" />
                </Link>
              </div>
            </div>

            {/* Quick Links */}
            <div className="space-y-4">
              <h4 className="font-semibold text-foreground">Collections</h4>
              <div className="space-y-2">
                <Link
                  href="/tshirts/men"
                  className="block text-muted-foreground hover:text-foreground transition-colors"
                >
                  Men's T-Shirts
                </Link>
                <Link
                  href="/tshirts/women"
                  className="block text-muted-foreground hover:text-foreground transition-colors"
                >
                  Women's T-Shirts
                </Link>
                <Link
                  href="/hoodies/men"
                  className="block text-muted-foreground hover:text-foreground transition-colors"
                >
                  Men's Hoodies
                </Link>
                <Link
                  href="/hoodies/women"
                  className="block text-muted-foreground hover:text-foreground transition-colors"
                >
                  Women's Hoodies
                </Link>
              </div>
            </div>

            {/* Account */}
            <div className="space-y-4">
              <h4 className="font-semibold text-foreground">Account</h4>
              <div className="space-y-2">
                <Button
                  variant="link"
                  className="p-0 h-auto text-muted-foreground hover:text-foreground justify-start"
                  onClick={() => openAuthModal("login")}
                >
                  <Heart className="h-4 w-4 mr-2" />
                  Wishlist ({wishlistItems.length})
                </Button>

                {user ? (
                  <div className="space-y-2">
                    <div className="text-muted-foreground">Welcome, {user.name}</div>
                    <Button
                      variant="link"
                      className="p-0 h-auto text-muted-foreground hover:text-foreground justify-start"
                      onClick={logout}
                    >
                      Logout
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Button
                      variant="link"
                      className="p-0 h-auto text-muted-foreground hover:text-foreground justify-start"
                      onClick={() => openAuthModal("login")}
                    >
                      Login
                    </Button>
                    <Button
                      variant="link"
                      className="p-0 h-auto text-muted-foreground hover:text-foreground justify-start"
                      onClick={() => openAuthModal("register")}
                    >
                      Create Account
                    </Button>
                  </div>
                )}
              </div>
            </div>

            {/* Shopping Info */}
            <div className="space-y-4">
              <h4 className="font-semibold text-foreground">Shopping</h4>
              <div className="space-y-2">
                <Link
                  href="/cart"
                  className="flex items-center text-muted-foreground hover:text-foreground transition-colors"
                >
                  <ShoppingBag className="h-4 w-4 mr-2" />
                  Shopping Bag ({items.length})
                </Link>
                <div className="text-muted-foreground text-sm">Recently Viewed (0)</div>
                <div className="text-muted-foreground text-sm">Ships in 5 – 7 days</div>
              </div>
            </div>
          </div>

          <div className="border-t border-border mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center">
            <div className="text-muted-foreground text-sm">© 2024 HuskThread. All rights reserved.</div>

            <Button variant="ghost" size="sm" onClick={scrollToTop} className="mt-4 sm:mt-0">
              <ArrowUp className="h-4 w-4 mr-2" />
              TOP
            </Button>
          </div>
        </div>
      </footer>

      <AuthModal isOpen={authModalOpen} onClose={() => setAuthModalOpen(false)} defaultMode={authMode} />
    </>
  )
}
