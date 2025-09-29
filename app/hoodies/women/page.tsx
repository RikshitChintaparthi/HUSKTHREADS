"use client"

import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { ProductCard, type Product } from "@/components/product-card"
import { useCart } from "@/hooks/use-cart"

const womensHoodies: Product[] = [
  {
    id: "wh1",
    name: "Cozy Crop Hoodie",
    price: 54.99,
    originalPrice: 69.99,
    image: "/placeholder.svg?key=wh1&height=500&width=400",
    category: "Hoodies",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Blush", "Sage", "Cream", "Lavender"],
    isNew: true,
  },
  {
    id: "wh2",
    name: "Oversized Comfort Hoodie",
    price: 62.99,
    image: "/placeholder.svg?key=wh2&height=500&width=400",
    category: "Hoodies",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Oatmeal", "Dusty Rose", "Sage Green"],
    isBestseller: true,
  },
  {
    id: "wh3",
    name: "Fitted Zip Hoodie",
    price: 58.99,
    image: "/placeholder.svg?key=wh3&height=500&width=400",
    category: "Hoodies",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Black", "Navy", "Charcoal", "White"],
  },
  {
    id: "wh4",
    name: "Sherpa Lined Hoodie",
    price: 74.99,
    originalPrice: 94.99,
    image: "/placeholder.svg?key=wh4&height=500&width=400",
    category: "Hoodies",
    sizes: ["XS", "S", "M", "L"],
    colors: ["Camel", "Cream", "Forest Green"],
  },
  {
    id: "wh5",
    name: "Tie-Dye Hoodie",
    price: 67.99,
    image: "/placeholder.svg?key=wh5&height=500&width=400",
    category: "Hoodies",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Sunset", "Ocean", "Earth Tones"],
  },
  {
    id: "wh6",
    name: "Minimalist Hoodie",
    price: 59.99,
    image: "/placeholder.svg?key=wh6&height=500&width=400",
    category: "Hoodies",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["White", "Black", "Gray", "Beige"],
  },
]

export default function WomensHoodiesPage() {
  const router = useRouter()
  const { addItem } = useCart()

  const handleBuyNow = (product: Product, size: string) => {
    // Add item to cart and redirect to cart page
    addItem({
      id: `${product.id}-${size}`,
      name: product.name,
      price: product.price,
      image: product.image,
      size: size,
      category: product.category,
    })
    
    // Redirect to cart page
    router.push("/cart")
  }

  return (
    <div className="min-h-screen py-12">
      {/* Hero Section */}
      <section className="px-4 sm:px-6 lg:px-8 mb-16">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-foreground mb-6 text-balance">
              Women's Hoodies
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-balance">
              Stylish and comfortable hoodies designed for every occasion
            </p>
          </motion.div>
        </div>
      </section>


      {/* Grid View */}
      <section className="px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            className="text-2xl font-bold text-foreground mb-8"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            All Products
          </motion.h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {womensHoodies.map((product, index) => (
              <motion.div
                key={`grid-${product.id}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <ProductCard product={product} onBuyNow={handleBuyNow} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
