"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"

interface TemplateProps {
  store: any
  products: any[]
  settings: any
}

// SVG Icons
const ShoppingBag = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
  </svg>
)

const Search = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <circle strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} cx="11" cy="11" r="8" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m21 21-4.35-4.35" />
  </svg>
)

const Star = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <polygon
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26 12,2"
    />
  </svg>
)

export default function ModernMinimalTemplate({ store, products, settings }: TemplateProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("fa-IR").format(price) + " تومان"
  }

  const filteredProducts = products?.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const categories = products ? Array.from(new Set(products.map((p) => p.category))).filter(Boolean) : []

  return (
    <div
      className="min-h-screen bg-white"
      dir="rtl"
      style={{
        backgroundColor: settings?.colors?.background || "#FFFFFF",
        color: settings?.colors?.text?.primary || "#111827",
      }}
    >
      {/* Header */}
      <header
        className="bg-white shadow-sm border-b sticky top-0 z-50"
        style={{
          backgroundColor: settings?.colors?.surface || "#F9FAFB",
          borderColor: settings?.colors?.border || "#E5E7EB",
        }}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4 space-x-reverse">
              {store.logo_url ? (
                <img
                  src={store.logo_url || "/placeholder.svg"}
                  alt={store.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
              ) : (
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold"
                  style={{ backgroundColor: settings?.colors?.primary || "#3B82F6" }}
                >
                  {store.name.charAt(0)}
                </div>
              )}
              <div>
                <h1 className="text-xl font-bold">{store.name}</h1>
                <p className="text-sm" style={{ color: settings?.colors?.text?.secondary || "#6B7280" }}>
                  {store.description}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-4 space-x-reverse">
              <div className="relative hidden md:block">
                <Input
                  placeholder="جستجو در محصولات..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 w-64"
                />
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
              <Button variant="outline" size="sm">
                <ShoppingBag className="w-4 h-4 ml-2" />
                سبد خرید
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      {store.banner_url && (
        <div className="relative h-64 md:h-80">
          <img src={store.banner_url || "/placeholder.svg"} alt={store.name} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
            <div className="text-center text-white">
              <h2 className="text-3xl md:text-4xl font-bold mb-2">{store.name}</h2>
              <p className="text-lg md:text-xl">{store.description}</p>
            </div>
          </div>
        </div>
      )}

      <div className="container mx-auto px-4 py-8">
        {/* Categories */}
        {categories.length > 0 && (
          <div className="mb-8">
            <div className="flex flex-wrap gap-2 justify-center">
              <Button
                variant={selectedCategory === "all" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory("all")}
                style={{
                  backgroundColor: selectedCategory === "all" ? settings?.colors?.primary : "transparent",
                  borderColor: settings?.colors?.primary,
                  color: selectedCategory === "all" ? "white" : settings?.colors?.primary,
                }}
              >
                همه محصولات
              </Button>
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  style={{
                    backgroundColor: selectedCategory === category ? settings?.colors?.primary : "transparent",
                    borderColor: settings?.colors?.primary,
                    color: selectedCategory === category ? "white" : settings?.colors?.primary,
                  }}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        )}

        {/* Products Grid */}
        {filteredProducts && filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group"
              >
                <Card
                  className="h-full hover:shadow-lg transition-all duration-300 border-0"
                  style={{
                    backgroundColor: settings?.colors?.surface || "#F9FAFB",
                    borderColor: settings?.colors?.border || "#E5E7EB",
                  }}
                >
                  <CardContent className="p-0">
                    <div className="relative overflow-hidden">
                      <img
                        src={product.images[0] || `/placeholder.svg?height=300&width=300&query=${product.name}`}
                        alt={product.name}
                        className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      {product.original_price && product.original_price > product.price && (
                        <Badge
                          className="absolute top-2 right-2"
                          style={{ backgroundColor: settings?.colors?.accent || "#10B981" }}
                        >
                          {Math.round(((product.original_price - product.price) / product.original_price) * 100)}% تخفیف
                        </Badge>
                      )}
                    </div>

                    <div className="p-4">
                      <h3 className="font-semibold mb-2 line-clamp-2">{product.name}</h3>

                      {product.averageRating > 0 && (
                        <div className="flex items-center mb-2">
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-4 h-4 ${
                                  i < Math.floor(product.averageRating)
                                    ? "text-yellow-400 fill-current"
                                    : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-sm mr-2" style={{ color: settings?.colors?.text?.secondary }}>
                            ({product.reviewCount})
                          </span>
                        </div>
                      )}

                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <span className="text-lg font-bold" style={{ color: settings?.colors?.primary || "#3B82F6" }}>
                            {formatPrice(product.price)}
                          </span>
                          {product.original_price && product.original_price > product.price && (
                            <span
                              className="text-sm line-through mr-2"
                              style={{ color: settings?.colors?.text?.muted || "#9CA3AF" }}
                            >
                              {formatPrice(product.original_price)}
                            </span>
                          )}
                        </div>
                      </div>

                      <Button
                        className="w-full"
                        style={{
                          backgroundColor: settings?.colors?.primary || "#3B82F6",
                          borderColor: settings?.colors?.primary || "#3B82F6",
                        }}
                        disabled={product.inventory_count === 0}
                      >
                        {product.inventory_count === 0 ? "ناموجود" : "افزودن به سبد"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <ShoppingBag className="w-16 h-16 mx-auto mb-4" style={{ color: settings?.colors?.text?.muted }} />
            <h3 className="text-lg font-semibold mb-2">محصولی یافت نشد</h3>
            <p style={{ color: settings?.colors?.text?.secondary }}>لطفاً جستجوی خود را تغییر دهید</p>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer
        className="border-t mt-16"
        style={{
          backgroundColor: settings?.colors?.surface || "#F9FAFB",
          borderColor: settings?.colors?.border || "#E5E7EB",
        }}
      >
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h3 className="font-bold mb-2">{store.name}</h3>
            <p style={{ color: settings?.colors?.text?.secondary }} className="mb-4">
              {store.description}
            </p>
            <div
              className="mt-4 pt-4 border-t text-sm"
              style={{
                borderColor: settings?.colors?.border,
                color: settings?.colors?.text?.muted,
              }}
            >
              ساخته شده با ❤️ توسط Vitrin.AI
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
