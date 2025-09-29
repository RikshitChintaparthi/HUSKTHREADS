"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowRight, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ScrollReveal } from "@/components/scroll-reveal"
import { MagneticButton } from "@/components/magnetic-button"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-background to-secondary/20">
        <div className="absolute inset-0 bg-[url('/abstract-minimal-texture.png')] opacity-5"></div>

        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.h1
              className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-tight text-foreground mb-8 text-balance"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
            >
              SaReva
            </motion.h1>

            <motion.p
              className="text-xl sm:text-2xl md:text-3xl text-muted-foreground mb-12 max-w-2xl mx-auto text-balance leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            >
              Premium clothing meets exquisite design. Transform your wardrobe with our curated collection.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
            >
              <MagneticButton>
                <Button
                  asChild
                  size="lg"
                  className="text-lg px-8 py-6 rounded-full bg-primary hover:bg-primary/90 transition-all duration-300 hover:scale-105 hover-lift"
                >
                  <Link href="/tshirts/men" className="flex items-center gap-2">
                    Explore Collection
                    <ArrowRight className="h-5 w-5" />
                  </Link>
                </Button>
              </MagneticButton>

              <MagneticButton>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="text-lg px-8 py-6 rounded-full border-2 hover:bg-accent transition-all duration-300 hover:scale-105 hover-lift bg-transparent"
                >
                  <Link href="/contact">Get in Touch</Link>
                </Button>
              </MagneticButton>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <motion.div
            className="w-6 h-10 border-2 border-muted-foreground rounded-full flex justify-center"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          >
            <motion.div
              className="w-1 h-3 bg-muted-foreground rounded-full mt-2"
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
            />
          </motion.div>
        </motion.div>
      </section>

      {/* Featured Categories */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-secondary/30">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-6 text-balance">
              Discover Our Collections
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-balance">
              Carefully curated pieces that blend comfort with contemporary style
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: "Men's T-Shirts", href: "/tshirts/men", image: "/premium-mens-cotton-tshirt-black.jpg" },
              { title: "Women's T-Shirts", href: "/tshirts/women", image: "/womens-fitted-crew-neck-tshirt.jpg" },
              { title: "Men's Hoodies", href: "/hoodies/men", image: "/mens-pullover-hoodie-classic-gray.jpg" },
              { title: "Women's Hoodies", href: "/hoodies/women", image: "/mens-oversized-hoodie-streetwear.jpg" },
            ].map((category, index) => (
              <ScrollReveal key={category.title} delay={index * 0.1} className="group">
                <MagneticButton strength={0.2}>
                  <Link href={category.href}>
                    <div className="relative overflow-hidden rounded-2xl bg-card shadow-lg hover:shadow-xl transition-all duration-500 hover-lift">
                      <div className="aspect-[4/5] bg-gradient-to-br from-muted to-accent/20 relative overflow-hidden">
                        <img
                          src={category.image || "/placeholder.svg"}
                          alt={category.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement
                            target.src = "/abstract-geometric-shapes.png"
                          }}
                        />
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300" />
                      </div>
                      <div className="p-6">
                        <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
                          {category.title}
                        </h3>
                        <div className="flex items-center text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                          <span className="text-sm">Explore Collection</span>
                          <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                        </div>
                      </div>
                    </div>
                  </Link>
                </MagneticButton>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-background">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-6 text-balance">
              Our Services
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-balance">
              Comprehensive solutions to meet all your clothing needs
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Premium Quality",
                description: "We source only the finest materials and employ skilled artisans to create garments that stand the test of time.",
                icon: "✨",
                features: ["Premium Materials", "Expert Craftsmanship", "Quality Assurance"]
              },
              {
                title: "Fast Shipping",
                description: "Get your orders delivered quickly and safely with our reliable shipping partners worldwide.",
                icon: "🚚",
                features: ["Worldwide Delivery", "Express Options", "Tracking Included"]
              },
              {
                title: "Easy Returns",
                description: "Not satisfied? No problem. We offer hassle-free returns and exchanges within 30 days.",
                icon: "🔄",
                features: ["30-Day Returns", "Free Exchanges", "Easy Process"]
              },
              {
                title: "Size Guide",
                description: "Find your perfect fit with our detailed size charts and measurement guides.",
                icon: "📏",
                features: ["Detailed Charts", "Fit Guarantee", "Size Recommendations"]
              },
              {
                title: "Customer Support",
                description: "Our dedicated team is here to help you with any questions or concerns.",
                icon: "💬",
                features: ["24/7 Support", "Live Chat", "Expert Advice"]
              },
              {
                title: "Sustainable Fashion",
                description: "We're committed to eco-friendly practices and sustainable fashion choices.",
                icon: "🌱",
                features: ["Eco Materials", "Ethical Production", "Carbon Neutral"]
              }
            ].map((service, index) => (
              <ScrollReveal key={service.title} delay={index * 0.1} className="group">
                <div className="relative overflow-hidden rounded-2xl bg-card shadow-lg hover:shadow-xl transition-all duration-500 hover-lift p-8 h-full">
                  <div className="text-center">
                    <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                      {service.icon}
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-4 group-hover:text-primary transition-colors duration-300">
                      {service.title}
                    </h3>
                    <p className="text-muted-foreground mb-6 leading-relaxed">
                      {service.description}
                    </p>
                    <ul className="space-y-2">
                      {service.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center text-sm text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                          <div className="w-1.5 h-1.5 bg-primary rounded-full mr-3 group-hover:scale-125 transition-transform duration-300"></div>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Brand Story */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <ScrollReveal direction="left">
              <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-8 text-balance">
                Crafted for the Modern Individual
              </h2>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                At SaReva, we believe that exceptional clothing should be both beautiful and functional. Our designs
                merge contemporary aesthetics with premium materials to create pieces that elevate your everyday
                wardrobe.
              </p>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Each garment is thoughtfully designed and carefully crafted to ensure the perfect balance of style,
                comfort, and durability.
              </p>
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-primary text-primary" />
                  ))}
                </div>
                <span className="text-muted-foreground">Trusted by 10,000+ customers</span>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="right" className="relative">
              <div className="aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-accent to-secondary hover-lift">
                <img
                  src="/premium-clothing-brand-lifestyle-photo.jpg"
                  alt="SaReva Brand Story"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement
                    target.src = "/abstract-minimal-texture.png"
                  }}
                />
              </div>
              <motion.div
                className="absolute -bottom-6 -right-6 w-32 h-32 bg-primary rounded-2xl flex items-center justify-center animate-float"
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <span className="text-primary-foreground font-bold text-lg">Since 2024</span>
              </motion.div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto text-center">
          <ScrollReveal>
            <h2 className="text-4xl sm:text-5xl font-bold mb-6 text-balance">Ready to Elevate Your Style?</h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto text-balance">
              Join thousands of satisfied customers who have discovered the perfect blend of comfort and style.
            </p>
            <MagneticButton>
              <Button
                asChild
                size="lg"
                variant="secondary"
                className="text-lg px-8 py-6 rounded-full hover:scale-105 transition-all duration-300 hover-lift"
              >
                <Link href="/tshirts/men" className="flex items-center gap-2">
                  Shop Now
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
            </MagneticButton>
          </ScrollReveal>
        </div>
      </section>
    </div>
  )
}
