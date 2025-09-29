"use client"

import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { ProductCard, type Product } from "@/components/product-card"
import { useCart } from "@/hooks/use-cart"

const womensTshirts: Product[] = [
  {
    id: "wt1",
    name: "Soft Cotton V-Neck",
    price: 32.99,
    originalPrice: 42.99,
    image: "/womens-vneck-tshirt-soft-cotton.jpg",
    category: "T-Shirts",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Blush", "White", "Navy", "Black"],
    isNew: true,
  },
  {
    id: "wt2",
    name: "Relaxed Fit Tee",
    price: 28.99,
    image: "/womens-relaxed-fit-tshirt-casual.jpg",
    category: "T-Shirts",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Sage", "Cream", "Dusty Rose"],
    isBestseller: true,
  },
  {
    id: "wt3",
    name: "Cropped Essential Tee",
    price: 26.99,
    image: "/womens-cropped-tshirt-essential.jpg",
    category: "T-Shirts",
    sizes: ["XS", "S", "M", "L"],
    colors: ["White", "Black", "Lavender", "Mint"],
  },
  {
    id: "wt4",
    name: "Oversized Graphic Tee",
    price: 35.99,
    originalPrice: 45.99,
    image: "/womens-oversized-graphic-tshirt.jpg",
    category: "T-Shirts",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Vintage White", "Charcoal"],
  },
  {
    id: "wt5",
    name: "Fitted Crew Neck",
    price: 30.99,
    image: "/womens-fitted-crew-neck-tshirt.jpg",
    category: "T-Shirts",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Black", "White", "Navy", "Burgundy"],
  },
  {
    id: "wt6",
    name: "Tie-Front Tee",
    price: 33.99,
    image: "/womens-tie-front-tshirt-stylish.jpg",
    category: "T-Shirts",
    sizes: ["XS", "S", "M", "L"],
    colors: ["Coral", "Sky Blue", "Sage Green"],
  },
]

export default function WomensTshirtsPage() {
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
              Women's T-Shirts
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-balance">
              Elegant and comfortable t-shirts designed for the modern woman
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
            {womensTshirts.map((product, index) => (
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
