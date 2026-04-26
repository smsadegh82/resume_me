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

export default function EcommerceClassicTemplate({ store, products, settings }: TemplateProps) {
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

  const addToCart = (product: any) => {
    // Add to cart functionality
    const cartItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      image: product.images[0] || "",
    }

    const existingCart = JSON.parse(localStorage.getItem(`cart_${store.slug}`) || "[]")
    const existingItemIndex = existingCart.findIndex((item: any) => item.id === product.id)

    if (existingItemIndex > -1) {
      existingCart[existingItemIndex].quantity += 1
    } else {
      existingCart.push(cartItem)
    }

    localStorage.setItem(`cart_${store.slug}`, JSON.stringify(existingCart))
    alert("محصول به سبد خرید اضافه شد!")
  }

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
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
                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                  {store.name.charAt(0)}
                </div>
              )}
              <div>
                <h1 className="text-xl font-bold">{store.name}</h1>
                <p className="text-sm text-gray-600">{store.description}</p>
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
              <Button variant="outline" size="sm" asChild>
                <a href={`/v/${store.slug}/cart`}>
                  <ShoppingBag className="w-4 h-4 ml-2" />
                  سبد خرید
                </a>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Banner */}
      {store.banner_url && (
        <div className="relative h-64 md:h-80 bg-gradient-to-r from-blue-600 to-purple-600">
          <img
            src={store.banner_url || "/placeholder.svg"}
            alt={store.name}
            className="w-full h-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
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
            <h3 className="text-2xl font-bold mb-4">دسته‌بندی‌ها</h3>
            <div className="flex flex-wrap gap-2">
              <Button
                variant={selectedCategory === "all" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory("all")}
              >
                همه محصولات
              </Button>
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        )}

        {/* Products Grid */}
        {filteredProducts && filteredProducts.length > 0 ? (
          <div>
            <h3 className="text-2xl font-bold mb-6">محصولات</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="group"
                >
                  <Card className="h-full hover:shadow-lg transition-all duration-300">
                    <CardContent className="p-0">
                      <div className="relative overflow-hidden">
                        <img
                          src={product.images[0] || `/placeholder.svg?height=300&width=300&query=${product.name}`}
                          alt={product.name}
                          className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                        />

                        {/* Discount Badge */}
                        {product.original_price && product.original_price > product.price && (
                          <Badge className="absolute top-2 right-2 bg-red-500">
                            {Math.round(((product.original_price - product.price) / product.original_price) * 100)}%
                            تخفیف
                          </Badge>
                        )}

                        {/* Wishlist Button */}
                        <Button
                          size="sm"
                          variant="ghost"
                          className="absolute top-2 left-2 w-10 h-10 rounded-full bg-white bg-opacity-80 hover:bg-opacity-100 opacity-0 group-hover:opacity-100 transition-all duration-300"
                        >
                          <Heart className="w-4 h-4 text-red-500" />
                        </Button>
                      </div>

                      <div className="p-4">
                        <h3 className="font-semibold mb-2 line-clamp-2">{product.name}</h3>

                        {/* Rating */}
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
                            <span className="text-sm text-gray-600 mr-2">({product.reviewCount})</span>
                          </div>
                        )}

                        {/* Price */}
                        <div className="flex items-center justify-between mb-4">
                          <div>
                            <span className="text-lg font-bold text-blue-600">{formatPrice(product.price)}</span>
                            {product.original_price && product.original_price > product.price && (
                              <span className="text-sm line-through text-gray-500 mr-2">
                                {formatPrice(product.original_price)}
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Add to Cart Button */}
                        <Button
                          className="w-full"
                          onClick={() => addToCart(product)}
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
          </div>
        ) : (
          <div className="text-center py-12">
            <ShoppingBag className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">محصولی یافت نشد</h3>
            <p className="text-gray-600">لطفاً جستجوی خود را تغییر دهید</p>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 mt-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-bold text-lg mb-4">{store.name}</h3>
              <p className="text-gray-400 mb-4">{store.description}</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">لینک‌های مفید</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white">
                    درباره ما
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    تماس با ما
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    شرایط و قوانین
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">تماس با ما</h4>
              <ul className="space-y-2 text-gray-400">
                <li>تلفن: ۰۲۱-۱۲۳۴۵۶۷۸</li>
                <li>ایمیل: info@example.com</li>
                <li>آدرس: تهران، ایران</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; ۱۴۰۳ {store.name}. ساخته شده با ❤️ توسط Vitrin.AI</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
