"use client"

import type React from "react"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAuth } from "@/hooks/use-auth"

interface AuthModalProps {
  isOpen: boolean
  onClose: () => void
  defaultMode?: "login" | "register" | "forgot"
}

export function AuthModal({ isOpen, onClose, defaultMode = "login" }: AuthModalProps) {
  const [mode, setMode] = useState<"login" | "register" | "forgot">(defaultMode)
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    rememberMe: false,
  })
  const { login, register, isLoading } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (mode === "login") {
      const success = await login(formData.email, formData.password)
      if (success) {
        onClose()
      }
    } else if (mode === "register") {
      const success = await register(formData.email, formData.password, formData.name)
      if (success) {
        onClose()
      }
    } else if (mode === "forgot") {
      // Handle password reset
      console.log("Password reset for:", formData.email)
      setMode("login")
    }
  }

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="relative bg-card rounded-2xl shadow-2xl max-w-md w-full p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <Button variant="ghost" size="icon" className="absolute top-4 right-4" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>

            <div className="mb-8">
              <h2 className="text-2xl font-bold text-foreground mb-2">
                {mode === "login" && "Sign In"}
                {mode === "register" && "Create Account"}
                {mode === "forgot" && "Password Recovery"}
              </h2>
              <p className="text-muted-foreground">
                {mode === "login" && "Welcome back to HuskThread"}
                {mode === "register" && "Join the HuskThread community"}
                {mode === "forgot" && "Reset your password"}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {mode === "register" && (
                <div>
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    required
                    className="mt-1"
                  />
                </div>
              )}

              <div>
                <Label htmlFor="email">{mode === "forgot" ? "Username or email" : "Email address *"}</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  required
                  className="mt-1"
                />
              </div>

              {mode !== "forgot" && (
                <div>
                  <Label htmlFor="password">Password *</Label>
                  <div className="relative mt-1">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={formData.password}
                      onChange={(e) => handleInputChange("password", e.target.value)}
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 top-0 h-full px-3"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>
              )}

              {mode === "login" && (
                <div className="flex items-center justify-between">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.rememberMe}
                      onChange={(e) => handleInputChange("rememberMe", e.target.checked)}
                      className="mr-2"
                    />
                    <span className="text-sm text-muted-foreground">Remember me</span>
                  </label>
                </div>
              )}

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  "Loading..."
                ) : (
                  <>
                    {mode === "login" && "SIGN IN"}
                    {mode === "register" && "CREATE ACCOUNT"}
                    {mode === "forgot" && "Reset password"}
                  </>
                )}
              </Button>

              {mode === "register" && (
                <p className="text-xs text-muted-foreground">
                  Your personal data will be used to support your experience throughout this website, to manage access
                  to your account, and for other purposes described in our privacy policy.
                </p>
              )}
            </form>

            <div className="mt-6 text-center space-y-2">
              {mode === "login" && (
                <>
                  <Button variant="link" onClick={() => setMode("register")} className="text-sm">
                    Create Account
                  </Button>
                  <Button variant="link" onClick={() => setMode("forgot")} className="text-sm">
                    Forgot password
                  </Button>
                </>
              )}

              {mode === "register" && (
                <>
                  <Button variant="link" onClick={() => setMode("login")} className="text-sm">
                    Login
                  </Button>
                  <Button variant="link" onClick={() => setMode("forgot")} className="text-sm">
                    Forgot password
                  </Button>
                </>
              )}

              {mode === "forgot" && (
                <>
                  <Button variant="link" onClick={() => setMode("register")} className="text-sm">
                    Create Account
                  </Button>
                  <Button variant="link" onClick={() => setMode("login")} className="text-sm">
                    Login
                  </Button>
                </>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
