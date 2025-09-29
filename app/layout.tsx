import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { Navigation } from "@/components/navigation"
import { CartProvider } from "@/hooks/use-cart"
import { Suspense } from "react"
import "./globals.css"

export const metadata: Metadata = {
  title: "HuskThread - Premium Clothing Brand",
  description: "Discover premium quality clothing with HuskThread. Modern designs, exceptional comfort.",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable} antialiased`}>
        <Suspense fallback={null}>
          <CartProvider>
            <Navigation />
            <main className="pt-16">{children}</main>
          </CartProvider>
        </Suspense>
        <Analytics />
      </body>
    </html>
  )
}
