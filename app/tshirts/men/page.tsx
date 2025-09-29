"use client"

import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { ProductCard, type Product } from "@/components/product-card"
import { useCart } from "@/hooks/use-cart"

const mensTshirts: Product[] = [
  {
    id: "mt1",
    name: "Classic Cotton Tee",
    price: 29.99,
    originalPrice: 39.99,
    image: "/premium-mens-cotton-tshirt-black.jpg",
    category: "T-Shirts",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Black", "White", "Navy"],
    isNew: true,
  },
  {
    id: "mt2",
    name: "Vintage Wash Tee",
    price: 34.99,
    image: "/vintage-mens-tshirt-gray-washed.jpg",
    category: "T-Shirts",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Gray", "Olive", "Rust"],
    isBestseller: true,
  },
  {
    id: "mt3",
    name: "Premium Organic Tee",
    price: 39.99,
    image: "/organic-mens-tshirt-white-premium.jpg",
    category: "T-Shirts",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["White", "Black", "Navy", "Forest"],
  },
  {
    id: "mt4",
    name: "Striped Long Sleeve",
    price: 44.99,
    originalPrice: 54.99,
    image: "/striped-mens-long-sleeve-tshirt.jpg",
    category: "T-Shirts",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Navy/White", "Black/Gray"],
  },
  {
    id: "mt5",
    name: "Henley Neck Tee",
    price: 37.99,
    image: "/mens-henley-tshirt-buttons.jpg",
    category: "T-Shirts",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Charcoal", "Burgundy", "Navy"],
  },
  {
    id: "mt6",
    name: "Pocket Tee Essential",
    price: 32.99,
    image: "/mens-pocket-tshirt-casual.jpg",
    category: "T-Shirts",
    sizes: ["S", "M", "L", "XL"],
    colors: ["White", "Gray", "Black", "Navy"],
  },
]

export default function MensTshirtsPage() {
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
              Men's T-Shirts
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-balance">
              Discover our premium collection of men's t-shirts, crafted for comfort and style
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
            {mensTshirts.map((product, index) => (
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
