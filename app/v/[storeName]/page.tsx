"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { useParams } from "next/navigation"

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

const MessageCircle = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
    />
  </svg>
)

const Instagram = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
  </svg>
)

const Phone = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
    />
  </svg>
)

const Loader2 = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-6.219-8.56" />
  </svg>
)

interface Store {
  id: string
  name: string
  slug: string
  description: string
  logo_url: string | null
  banner_url: string | null
  category: string
  contact_info: any
  products: Product[]
}

interface Product {
  id: string
  name: string
  description: string
  price: number
  original_price: number | null
  images: string[]
  category: string
  tags: string[]
  variants: any
  inventory_count: number
  averageRating: number
  reviewCount: number
}

export default function StorefrontPage() {
  const params = useParams()
  const storeName = params.storeName as string

  const [store, setStore] = useState<Store | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [cart, setCart] = useState<any[]>([])

  useEffect(() => {
    fetchStore()
  }, [storeName])

  const fetchStore = async () => {
    try {
      setIsLoading(true)
      const response = await fetch(`/api/stores/${storeName}`)

      if (!response.ok) {
        if (response.status === 404) {
          setError("فروشگاه یافت نشد")
        } else {
          setError("خطا در بارگذاری فروشگاه")
        }
        return
      }

      const data = await response.json()
      setStore(data.store)
    } catch (error) {
      setError("خطا در اتصال به سرور")
    } finally {
      setIsLoading(false)
    }
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("fa-IR").format(price) + " تومان"
  }

  const addToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id)
      if (existing) {
        return prev.map((item) => (item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item))
      }
      return [...prev, { ...product, quantity: 1 }]
    })
  }

  const filteredProducts = store?.products?.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const categories = store?.products ? Array.from(new Set(store.products.map((p) => p.category))).filter(Boolean) : []

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center" dir="rtl">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-blue-600" />
          <p className="text-gray-600">در حال بارگذاری فروشگاه...</p>
        </div>
      </div>
    )
  }

  if (error || !store) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center" dir="rtl">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">{error || "فروشگاه یافت نشد"}</h1>
          <p className="text-gray-600 mb-4">لطفاً آدرس را بررسی کنید</p>
          <Button asChild>
            <Link href="/">بازگشت به صفحه اصلی</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
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
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                  {store.name.charAt(0)}
                </div>
              )}
              <div>
                <h1 className="text-xl font-bold">{store.name}</h1>
                <p className="text-sm text-gray-600">{store.description}</p>
              </div>
            </div>

            <div className="flex items-center space-x-4 space-x-reverse">
              <Button variant="outline" size="sm" onClick={() => alert("سبد خرید: " + cart.length + " محصول")}>
                <ShoppingBag className="w-4 h-4 ml-2" />
                سبد خرید ({cart.length})
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Banner */}
      {store.banner_url && (
        <div className="relative h-64 bg-gradient-to-r from-blue-500 to-purple-500">
          <img src={store.banner_url || "/placeholder.svg"} alt={store.name} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
            <div className="text-center text-white">
              <h2 className="text-3xl font-bold mb-2">خوش آمدید به {store.name}</h2>
              <p className="text-lg">{store.description}</p>
            </div>
          </div>
        </div>
      )}

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="mb-6">
              <CardContent className="p-4">
                <h3 className="font-bold mb-4">جستجو</h3>
                <div className="relative">
                  <Input
                    placeholder="جستجو در محصولات..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                  <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </div>
              </CardContent>
            </Card>

            <Card className="mb-6">
              <CardContent className="p-4">
                <h3 className="font-bold mb-4">دسته‌بندی</h3>
                <div className="space-y-2">
                  <button
                    onClick={() => setSelectedCategory("all")}
                    className={`w-full text-right p-2 rounded transition-colors ${
                      selectedCategory === "all" ? "bg-blue-100 text-blue-700" : "hover:bg-gray-100"
                    }`}
                  >
                    همه محصولات
                  </button>
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`w-full text-right p-2 rounded transition-colors ${
                        selectedCategory === category ? "bg-blue-100 text-blue-700" : "hover:bg-gray-100"
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Contact Info */}
            <Card>
              <CardContent className="p-4">
                <h3 className="font-bold mb-4">تماس با ما</h3>
                <div className="space-y-3">
                  {store.contact_info?.phone && (
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <Phone className="w-4 h-4 text-gray-500" />
                      <span className="text-sm">{store.contact_info.phone}</span>
                    </div>
                  )}
                  {store.contact_info?.telegram && (
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <MessageCircle className="w-4 h-4 text-gray-500" />
                      <span className="text-sm">{store.contact_info.telegram}</span>
                    </div>
                  )}
                  {store.contact_info?.instagram && (
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <Instagram className="w-4 h-4 text-gray-500" />
                      <span className="text-sm">{store.contact_info.instagram}</span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Products Grid */}
          <div className="lg:col-span-3">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">محصولات</h2>
              <p className="text-gray-600">{filteredProducts?.length || 0} محصول</p>
            </div>

            {filteredProducts && filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product, index) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="h-full hover:shadow-lg transition-shadow">
                      <CardContent className="p-0">
                        <div className="relative">
                          <img
                            src={product.images[0] || `/placeholder.svg?height=200&width=300&query=${product.name}`}
                            alt={product.name}
                            className="w-full h-48 object-cover rounded-t-lg"
                          />
                          {product.original_price && product.original_price > product.price && (
                            <Badge className="absolute top-2 right-2 bg-red-500">
                              {Math.round(((product.original_price - product.price) / product.original_price) * 100)}%
                              تخفیف
                            </Badge>
                          )}
                        </div>

                        <div className="p-4">
                          <h3 className="font-bold mb-2 line-clamp-2">{product.name}</h3>
                          <p className="text-sm text-gray-600 mb-3 line-clamp-2">{product.description}</p>

                          {product.averageRating > 0 && (
                            <div className="flex items-center mb-3">
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
                              <span className="text-sm text-gray-600 mr-2">({product.reviewCount} نظر)</span>
                            </div>
                          )}

                          <div className="flex items-center justify-between mb-4">
                            <div>
                              <span className="text-lg font-bold text-blue-600">{formatPrice(product.price)}</span>
                              {product.original_price && product.original_price > product.price && (
                                <span className="text-sm text-gray-500 line-through mr-2">
                                  {formatPrice(product.original_price)}
                                </span>
                              )}
                            </div>
                            <Badge variant="secondary">موجود: {product.inventory_count}</Badge>
                          </div>

                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              className="flex-1"
                              onClick={() => addToCart(product)}
                              disabled={product.inventory_count === 0}
                            >
                              افزودن به سبد
                            </Button>
                            <Button size="sm" variant="outline" asChild>
                              <Link href={`/v/${store.slug}/product/${product.id}`}>مشاهده</Link>
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <ShoppingBag className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">محصولی یافت نشد</h3>
                <p className="text-gray-600">لطفاً جستجوی خود را تغییر دهید</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h3 className="font-bold mb-2">{store.name}</h3>
            <p className="text-gray-600 mb-4">{store.description}</p>
            <div className="flex justify-center space-x-4 space-x-reverse">
              {store.contact_info?.telegram && (
                <a href="#" className="text-gray-400 hover:text-gray-600">
                  <MessageCircle className="w-5 h-5" />
                </a>
              )}
              {store.contact_info?.instagram && (
                <a href="#" className="text-gray-400 hover:text-gray-600">
                  <Instagram className="w-5 h-5" />
                </a>
              )}
            </div>
            <div className="mt-4 pt-4 border-t text-sm text-gray-500">
              ساخته شده با ❤️ توسط{" "}
              <Link href="/" className="text-blue-600 hover:underline">
                Vitrin.AI
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
