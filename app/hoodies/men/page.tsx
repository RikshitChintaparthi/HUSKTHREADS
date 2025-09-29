"use client"

import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { ProductCard, type Product } from "@/components/product-card"
import { useCart } from "@/hooks/use-cart"

const mensHoodies: Product[] = [
  {
    id: "mh1",
    name: "Classic Pullover Hoodie",
    price: 59.99,
    originalPrice: 79.99,
    image: "/mens-pullover-hoodie-classic-gray.jpg",
    category: "Hoodies",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Gray", "Black", "Navy", "Burgundy"],
    isNew: true,
  },
  {
    id: "mh2",
    name: "Zip-Up Hoodie",
    price: 64.99,
    image: "/mens-zip-up-hoodie-black.jpg",
    category: "Hoodies",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Black", "Charcoal", "Navy"],
    isBestseller: true,
  },
  {
    id: "mh3",
    name: "Oversized Hoodie",
    price: 69.99,
    image: "/mens-oversized-hoodie-streetwear.jpg",
    category: "Hoodies",
    sizes: ["M", "L", "XL", "XXL"],
    colors: ["Cream", "Sage", "Rust"],
  },
  {
    id: "mh4",
    name: "Tech Fleece Hoodie",
    price: 89.99,
    originalPrice: 109.99,
    image: "/placeholder.svg?key=mh4&height=500&width=400",
    category: "Hoodies",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Black", "Dark Gray"],
  },
  {
    id: "mh5",
    name: "Vintage Wash Hoodie",
    price: 72.99,
    image: "/placeholder.svg?key=mh5&height=500&width=400",
    category: "Hoodies",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Faded Black", "Vintage Gray", "Washed Navy"],
  },
  {
    id: "mh6",
    name: "Minimalist Hoodie",
    price: 67.99,
    image: "/placeholder.svg?key=mh6&height=500&width=400",
    category: "Hoodies",
    sizes: ["S", "M", "L", "XL"],
    colors: ["White", "Black", "Oatmeal"],
  },
]

export default function MensHoodiesPage() {
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
              Men's Hoodies
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-balance">
              Premium hoodies that combine comfort with contemporary style
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
            {mensHoodies.map((product, index) => (
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
