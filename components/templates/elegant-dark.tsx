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

// SVG Icons (same as before)
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

export default function ElegantDarkTemplate({ store, products, settings }: TemplateProps) {
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
      className="min-h-screen"
      dir="rtl"
      style={{
        backgroundColor: settings?.colors?.background || "#111827",
        color: settings?.colors?.text?.primary || "#F9FAFB",
      }}
    >
      {/* Header */}
      <header
        className="border-b sticky top-0 z-50 backdrop-blur-sm"
        style={{
          backgroundColor: `${settings?.colors?.surface || "#1F2937"}CC`,
          borderColor: settings?.colors?.border || "#374151",
        }}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center space-x-6 space-x-reverse">
              {store.logo_url ? (
                <img
                  src={store.logo_url || "/placeholder.svg"}
                  alt={store.name}
                  className="w-12 h-12 rounded-full object-cover ring-2 ring-opacity-50"
                  style={{ ringColor: settings?.colors?.primary }}
                />
              ) : (
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-xl ring-2 ring-opacity-50"
                  style={{
                    backgroundColor: settings?.colors?.primary || "#F59E0B",
                    ringColor: settings?.colors?.primary,
                  }}
                >
                  {store.name.charAt(0)}
                </div>
              )}
              <div>
                <h1 className="text-2xl font-bold tracking-wide">{store.name}</h1>
                <p className="text-sm opacity-80" style={{ color: settings?.colors?.text?.secondary }}>
                  {store.description}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-6 space-x-reverse">
              <div className="relative hidden md:block">
                <Input
                  placeholder="جستجو در کلکسیون..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 w-72 bg-opacity-20 border-opacity-30 text-white placeholder-gray-400"
                  style={{
                    backgroundColor: settings?.colors?.surface,
                    borderColor: settings?.colors?.border,
                  }}
                />
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
              <Button
                variant="outline"
                className="border-opacity-50 hover:bg-opacity-20 bg-transparent"
                style={{
                  borderColor: settings?.colors?.primary,
                  color: settings?.colors?.primary,
                }}
              >
                <ShoppingBag className="w-4 h-4 ml-2" />
                سبد خرید
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      {store.banner_url && (
        <div className="relative h-96 md:h-[500px] overflow-hidden">
          <img src={store.banner_url || "/placeholder.svg"} alt={store.name} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent flex items-end">
            <div className="container mx-auto px-4 pb-16">
              <div className="max-w-2xl">
                <h2 className="text-4xl md:text-6xl font-bold mb-4 text-white leading-tight">کلکسیون منحصر به فرد</h2>
                <p className="text-xl md:text-2xl text-gray-200 mb-8">تجربه خرید لوکس و بی‌نظیر</p>
                <Button size="lg" className="text-lg px-8 py-4" style={{ backgroundColor: settings?.colors?.primary }}>
                  کاوش کلکسیون
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="container mx-auto px-4 py-12">
        {/* Categories */}
        {categories.length > 0 && (
          <div className="mb-12">
            <h3 className="text-2xl font-bold mb-6 text-center">دسته‌بندی‌ها</h3>
            <div className="flex flex-wrap gap-3 justify-center">
              <Button
                variant={selectedCategory === "all" ? "default" : "outline"}
                className="px-6 py-3 rounded-full border-opacity-50"
                onClick={() => setSelectedCategory("all")}
                style={{
                  backgroundColor: selectedCategory === "all" ? settings?.colors?.primary : "transparent",
                  borderColor: settings?.colors?.primary,
                  color: selectedCategory === "all" ? "black" : settings?.colors?.primary,
                }}
              >
                همه محصولات
              </Button>
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  className="px-6 py-3 rounded-full border-opacity-50"
                  onClick={() => setSelectedCategory(category)}
                  style={{
                    backgroundColor: selectedCategory === category ? settings?.colors?.primary : "transparent",
                    borderColor: settings?.colors?.primary,
                    color: selectedCategory === category ? "black" : settings?.colors?.primary,
                  }}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        )}

        {/* Products Masonry Grid */}
        {filteredProducts && filteredProducts.length > 0 ? (
          <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="break-inside-avoid group"
              >
                <Card
                  className="overflow-hidden hover:shadow-2xl transition-all duration-500 border-opacity-20"
                  style={{
                    backgroundColor: settings?.colors?.surface || "#1F2937",
                    borderColor: settings?.colors?.border || "#374151",
                  }}
                >
                  <CardContent className="p-0">
                    <div className="relative overflow-hidden">
                      <img
                        src={product.images[0] || `/placeholder.svg?height=400&width=300&query=${product.name}`}
                        alt={product.name}
                        className="w-full object-cover group-hover:scale-110 transition-transform duration-700"
                        style={{ height: `${Math.floor(Math.random() * 200) + 300}px` }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                      {product.original_price && product.original_price > product.price && (
                        <Badge
                          className="absolute top-4 right-4 text-black font-bold"
                          style={{ backgroundColor: settings?.colors?.accent || "#8B5CF6" }}
                        >
                          {Math.round(((product.original_price - product.price) / product.original_price) * 100)}% تخفیف
                        </Badge>
                      )}

                      <div className="absolute bottom-4 left-4 right-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                        <Button
                          className="w-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                          style={{ backgroundColor: settings?.colors?.primary }}
                          disabled={product.inventory_count === 0}
                        >
                          {product.inventory_count === 0 ? "ناموجود" : "افزودن به سبد"}
                        </Button>
                      </div>
                    </div>

                    <div className="p-6">
                      <h3 className="font-bold text-lg mb-2 line-clamp-2">{product.name}</h3>

                      {product.averageRating > 0 && (
                        <div className="flex items-center mb-3">
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-4 h-4 ${
                                  i < Math.floor(product.averageRating) ? "fill-current" : "text-gray-600"
                                }`}
                                style={{ color: settings?.colors?.accent }}
                              />
                            ))}
                          </div>
                          <span className="text-sm mr-2 opacity-70">({product.reviewCount})</span>
                        </div>
                      )}

                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-xl font-bold" style={{ color: settings?.colors?.primary || "#F59E0B" }}>
                            {formatPrice(product.price)}
                          </span>
                          {product.original_price && product.original_price > product.price && (
                            <span className="text-sm line-through mr-2 opacity-60">
                              {formatPrice(product.original_price)}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <ShoppingBag className="w-20 h-20 mx-auto mb-6 opacity-50" />
            <h3 className="text-2xl font-bold mb-4">محصولی یافت نشد</h3>
            <p className="opacity-70 text-lg">لطفاً جستجوی خود را تغییر دهید</p>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer
        className="border-t mt-20"
        style={{
          backgroundColor: settings?.colors?.surface || "#1F2937",
          borderColor: settings?.colors?.border || "#374151",
        }}
      >
        <div className="container mx-auto px-4 py-12">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4">{store.name}</h3>
            <p className="text-lg opacity-80 mb-8 max-w-2xl mx-auto">{store.description}</p>
            <div className="mt-8 pt-8 border-t opacity-60" style={{ borderColor: settings?.colors?.border }}>
              ساخته شده با ❤️ توسط Vitrin.AI
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
