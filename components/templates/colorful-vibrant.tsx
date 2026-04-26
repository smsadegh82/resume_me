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

const Heart = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
    />
  </svg>
)

export default function ColorfulVibrantTemplate({ store, products, settings }: TemplateProps) {
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

  const vibrantColors = [
    settings?.colors?.primary || "#EC4899",
    settings?.colors?.secondary || "#F59E0B",
    settings?.colors?.accent || "#10B981",
    "#8B5CF6",
    "#EF4444",
    "#06B6D4",
  ]

  return (
    <div
      className="min-h-screen"
      dir="rtl"
      style={{
        backgroundColor: settings?.colors?.background || "#FEF3F2",
        color: settings?.colors?.text?.primary || "#1F2937",
      }}
    >
      {/* Header */}
      <header
        className="shadow-lg sticky top-0 z-50"
        style={{
          background: `linear-gradient(135deg, ${settings?.colors?.primary || "#EC4899"}, ${settings?.colors?.secondary || "#F59E0B"})`,
        }}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-18">
            <div className="flex items-center space-x-4 space-x-reverse">
              {store.logo_url ? (
                <img
                  src={store.logo_url || "/placeholder.svg"}
                  alt={store.name}
                  className="w-12 h-12 rounded-full object-cover ring-4 ring-white ring-opacity-50"
                />
              ) : (
                <div
                  className="w-12 h-12 bg-white rounded-full flex items-center justify-center font-bold text-xl ring-4 ring-white ring-opacity-50"
                  style={{ color: settings?.colors?.primary }}
                >
                  {store.name.charAt(0)}
                </div>
              )}
              <div>
                <h1 className="text-2xl font-bold text-white drop-shadow-lg">{store.name}</h1>
                <p className="text-white text-opacity-90 text-sm">{store.description}</p>
              </div>
            </div>

            <div className="flex items-center space-x-4 space-x-reverse">
              <div className="relative hidden md:block">
                <Input
                  placeholder="جستجو کن..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 w-64 bg-white bg-opacity-20 border-white border-opacity-30 text-white placeholder-white placeholder-opacity-70 backdrop-blur-sm"
                />
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-white text-opacity-70" />
              </div>
              <Button className="bg-white text-pink-600 hover:bg-gray-100 font-bold shadow-lg">
                <ShoppingBag className="w-4 h-4 ml-2" />
                سبد خرید
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div
        className="relative overflow-hidden"
        style={{
          background: `linear-gradient(135deg, ${settings?.colors?.primary || "#EC4899"}22, ${settings?.colors?.secondary || "#F59E0B"}22)`,
        }}
      >
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-pink-600 to-orange-500 bg-clip-text text-transparent"
            >
              🌈 کلکسیون رنگارنگ ما! 🎉
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl md:text-2xl mb-8 text-gray-700"
            >
              محصولات شاد و پرانرژی برای زندگی رنگی‌تر! ✨
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
              <Button
                size="lg"
                className="text-lg px-8 py-4 rounded-full shadow-xl transform hover:scale-105 transition-all"
                style={{
                  background: `linear-gradient(135deg, ${settings?.colors?.primary}, ${settings?.colors?.secondary})`,
                  color: "white",
                }}
              >
                🛍️ شروع خرید کن!
              </Button>
            </motion.div>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-yellow-400 rounded-full opacity-20 animate-bounce"></div>
        <div className="absolute top-32 right-20 w-16 h-16 bg-pink-400 rounded-full opacity-20 animate-pulse"></div>
        <div
          className="absolute bottom-20 left-32 w-12 h-12 bg-green-400 rounded-full opacity-20 animate-bounce"
          style={{ animationDelay: "1s" }}
        ></div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Categories */}
        {categories.length > 0 && (
          <div className="mb-12">
            <h3 className="text-3xl font-bold mb-8 text-center">🎯 دسته‌بندی‌ها</h3>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button
                variant={selectedCategory === "all" ? "default" : "outline"}
                className="px-6 py-3 rounded-full font-bold text-lg shadow-lg transform hover:scale-105 transition-all"
                onClick={() => setSelectedCategory("all")}
                style={{
                  backgroundColor: selectedCategory === "all" ? vibrantColors[0] : "white",
                  borderColor: vibrantColors[0],
                  color: selectedCategory === "all" ? "white" : vibrantColors[0],
                }}
              >
                🌟 همه محصولات
              </Button>
              {categories.map((category, index) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  className="px-6 py-3 rounded-full font-bold text-lg shadow-lg transform hover:scale-105 transition-all"
                  onClick={() => setSelectedCategory(category)}
                  style={{
                    backgroundColor:
                      selectedCategory === category ? vibrantColors[index % vibrantColors.length] : "white",
                    borderColor: vibrantColors[index % vibrantColors.length],
                    color: selectedCategory === category ? "white" : vibrantColors[index % vibrantColors.length],
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="group"
              >
                <Card
                  className="h-full hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-0 overflow-hidden"
                  style={{
                    backgroundColor: settings?.colors?.surface || "#FFFFFF",
                    boxShadow: `0 10px 30px ${vibrantColors[index % vibrantColors.length]}20`,
                  }}
                >
                  <CardContent className="p-0">
                    <div className="relative overflow-hidden">
                      <img
                        src={product.images[0] || `/placeholder.svg?height=250&width=300&query=${product.name}`}
                        alt={product.name}
                        className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                      />

                      {/* Gradient Overlay */}
                      <div
                        className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300"
                        style={{
                          background: `linear-gradient(135deg, ${vibrantColors[index % vibrantColors.length]}, transparent)`,
                        }}
                      />

                      {/* Discount Badge */}
                      {product.original_price && product.original_price > product.price && (
                        <Badge
                          className="absolute top-3 right-3 text-white font-bold text-sm px-3 py-1 rounded-full animate-pulse"
                          style={{ backgroundColor: vibrantColors[(index + 1) % vibrantColors.length] }}
                        >
                          🔥 {Math.round(((product.original_price - product.price) / product.original_price) * 100)}%
                          تخفیف
                        </Badge>
                      )}

                      {/* Wishlist Button */}
                      <Button
                        size="sm"
                        variant="ghost"
                        className="absolute top-3 left-3 w-10 h-10 rounded-full bg-white bg-opacity-80 hover:bg-opacity-100 opacity-0 group-hover:opacity-100 transition-all duration-300"
                      >
                        <Heart className="w-4 h-4 text-red-500" />
                      </Button>
                    </div>

                    <div className="p-6">
                      <h3 className="font-bold text-lg mb-3 line-clamp-2 group-hover:text-pink-600 transition-colors">
                        {product.name}
                      </h3>

                      {product.averageRating > 0 && (
                        <div className="flex items-center mb-4">
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
                          <span className="text-sm mr-2 text-gray-600">({product.reviewCount}) نظر</span>
                        </div>
                      )}

                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <span
                            className="text-2xl font-bold"
                            style={{ color: vibrantColors[index % vibrantColors.length] }}
                          >
                            {formatPrice(product.price)}
                          </span>
                          {product.original_price && product.original_price > product.price && (
                            <span className="text-sm line-through mr-2 text-gray-500">
                              {formatPrice(product.original_price)}
                            </span>
                          )}
                        </div>
                      </div>

                      <Button
                        className="w-full rounded-full font-bold text-lg py-3 shadow-lg transform hover:scale-105 transition-all duration-300"
                        style={{
                          backgroundColor: vibrantColors[index % vibrantColors.length],
                          color: "white",
                        }}
                        disabled={product.inventory_count === 0}
                      >
                        {product.inventory_count === 0 ? "😢 ناموجود" : "🛒 افزودن به سبد"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="text-8xl mb-6">😔</div>
            <h3 className="text-3xl font-bold mb-4">هیچ محصولی پیدا نشد!</h3>
            <p className="text-xl text-gray-600">شاید بخوای چیز دیگه‌ای جستجو کنی؟ 🤔</p>
          </div>
        )}
      </div>

      {/* Newsletter Section */}
      <div
        className="py-16"
        style={{
          background: `linear-gradient(135deg, ${settings?.colors?.primary || "#EC4899"}15, ${settings?.colors?.secondary || "#F59E0B"}15)`,
        }}
      >
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-3xl font-bold mb-4">📧 عضو خانواده ما بشو!</h3>
          <p className="text-xl mb-8 text-gray-700">از جدیدترین محصولات و تخفیف‌های ویژه باخبر شو! 🎁</p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <Input
              placeholder="ایمیلت رو وارد کن..."
              className="flex-1 rounded-full px-6 py-3 text-lg border-2"
              style={{ borderColor: settings?.colors?.primary }}
            />
            <Button
              className="rounded-full px-8 py-3 text-lg font-bold shadow-lg"
              style={{
                background: `linear-gradient(135deg, ${settings?.colors?.primary}, ${settings?.colors?.secondary})`,
                color: "white",
              }}
            >
              🚀 عضو شو!
            </Button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t-4" style={{ borderColor: settings?.colors?.primary }}>
        <div className="container mx-auto px-4 py-12">
          <div className="text-center">
            <h3 className="text-3xl font-bold mb-4" style={{ color: settings?.colors?.primary }}>
              {store.name} 🌈
            </h3>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">{store.description} ✨</p>
            <div className="flex justify-center space-x-6 space-x-reverse mb-8">
              {vibrantColors.slice(0, 4).map((color, index) => (
                <div
                  key={index}
                  className="w-12 h-12 rounded-full animate-pulse"
                  style={{ backgroundColor: color, animationDelay: `${index * 0.2}s` }}
                />
              ))}
            </div>
            <div className="text-gray-500">ساخته شده با ❤️ و رنگ‌های زیبا توسط Vitrin.AI 🎨</div>
          </div>
        </div>
      </footer>
    </div>
  )
}
