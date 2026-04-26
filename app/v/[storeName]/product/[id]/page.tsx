"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"

// SVG Icons
const ArrowLeft = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <line strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} x1="19" y1="12" x2="5" y2="12" />
    <polyline strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} points="12,19 5,12 12,5" />
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

const ShoppingBag = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
  </svg>
)

const Loader2 = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-6.219-8.56" />
  </svg>
)

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
  store: {
    id: string
    name: string
    slug: string
    logo_url: string | null
    contact_info: any
  }
}

export default function ProductPage() {
  const params = useParams()
  const router = useRouter()
  const productId = params.id as string
  const storeName = params.storeName as string

  const [product, setProduct] = useState<Product | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")
  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedVariants, setSelectedVariants] = useState<{ [key: string]: string }>({})
  const [quantity, setQuantity] = useState(1)

  useEffect(() => {
    fetchProduct()
  }, [productId])

  const fetchProduct = async () => {
    try {
      setIsLoading(true)
      const response = await fetch(`/api/products/${productId}`)

      if (!response.ok) {
        if (response.status === 404) {
          setError("محصول یافت نشد")
        } else {
          setError("خطا در بارگذاری محصول")
        }
        return
      }

      const data = await response.json()
      setProduct(data.product)
    } catch (error) {
      setError("خطا در اتصال به سرور")
    } finally {
      setIsLoading(false)
    }
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("fa-IR").format(price) + " تومان"
  }

  const handleAddToCart = () => {
    // Mock add to cart functionality
    alert(`${product?.name} به سبد خرید اضافه شد!`)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center" dir="rtl">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-blue-600" />
          <p className="text-gray-600">در حال بارگذاری محصول...</p>
        </div>
      </div>
    )
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center" dir="rtl">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">{error || "محصول یافت نشد"}</h1>
          <Button onClick={() => router.back()}>بازگشت</Button>
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
              <Button variant="ghost" size="sm" onClick={() => router.back()}>
                <ArrowLeft className="w-4 h-4 ml-2" />
                بازگشت
              </Button>
              <Separator orientation="vertical" className="h-6" />
              <Link href={`/v/${storeName}`} className="flex items-center space-x-2 space-x-reverse">
                {product.store.logo_url ? (
                  <img
                    src={product.store.logo_url || "/placeholder.svg"}
                    alt={product.store.name}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                    {product.store.name.charAt(0)}
                  </div>
                )}
                <span className="font-semibold">{product.store.name}</span>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <motion.div
              key={selectedImage}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="aspect-square bg-white rounded-lg overflow-hidden shadow-lg"
            >
              <img
                src={
                  product.images[selectedImage] ||
                  `/placeholder.svg?height=500&width=500&query=${product.name || "/placeholder.svg"}`
                }
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </motion.div>

            {product.images.length > 1 && (
              <div className="flex space-x-2 space-x-reverse overflow-x-auto">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                      selectedImage === index ? "border-blue-500" : "border-gray-200"
                    }`}
                  >
                    <img
                      src={image || `/placeholder.svg?height=80&width=80&query=${product.name}-${index}`}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
              <div className="flex items-center space-x-4 space-x-reverse mb-4">
                <Badge variant="secondary">{product.category}</Badge>
                {product.averageRating > 0 && (
                  <div className="flex items-center">
                    <div className="flex items-center ml-2">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.floor(product.averageRating) ? "text-yellow-400 fill-current" : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-600">({product.reviewCount} نظر)</span>
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center space-x-4 space-x-reverse">
                <span className="text-3xl font-bold text-blue-600">{formatPrice(product.price)}</span>
                {product.original_price && product.original_price > product.price && (
                  <span className="text-xl text-gray-500 line-through">{formatPrice(product.original_price)}</span>
                )}
              </div>
              {product.original_price && product.original_price > product.price && (
                <Badge className="bg-red-500">
                  {Math.round(((product.original_price - product.price) / product.original_price) * 100)}% تخفیف
                </Badge>
              )}
            </div>

            <div>
              <h3 className="font-semibold mb-2">توضیحات محصول</h3>
              <p className="text-gray-600 leading-relaxed whitespace-pre-line">{product.description}</p>
            </div>

            {/* Variants */}
            {product.variants && Object.keys(product.variants).length > 0 && (
              <div className="space-y-4">
                {Object.entries(product.variants).map(([key, values]) => (
                  <div key={key}>
                    <h4 className="font-semibold mb-2">{key}</h4>
                    <div className="flex flex-wrap gap-2">
                      {(values as string[]).map((value) => (
                        <button
                          key={value}
                          onClick={() => setSelectedVariants({ ...selectedVariants, [key]: value })}
                          className={`px-3 py-1 rounded-lg border transition-colors ${
                            selectedVariants[key] === value
                              ? "border-blue-500 bg-blue-50 text-blue-700"
                              : "border-gray-300 hover:border-gray-400"
                          }`}
                        >
                          {value}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Quantity and Add to Cart */}
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">تعداد</h4>
                <div className="flex items-center space-x-2 space-x-reverse">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                  >
                    -
                  </Button>
                  <span className="px-4 py-2 border rounded-lg min-w-[60px] text-center">{quantity}</span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setQuantity(Math.min(product.inventory_count, quantity + 1))}
                    disabled={quantity >= product.inventory_count}
                  >
                    +
                  </Button>
                  <span className="text-sm text-gray-600 mr-4">موجود: {product.inventory_count}</span>
                </div>
              </div>

              <div className="flex gap-4">
                <Button
                  size="lg"
                  className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                  onClick={handleAddToCart}
                  disabled={product.inventory_count === 0}
                >
                  <ShoppingBag className="w-5 h-5 ml-2" />
                  {product.inventory_count === 0 ? "ناموجود" : "افزودن به سبد خرید"}
                </Button>
              </div>
            </div>

            {/* Tags */}
            {product.tags && product.tags.length > 0 && (
              <div>
                <h4 className="font-semibold mb-2">برچسب‌ها</h4>
                <div className="flex flex-wrap gap-2">
                  {product.tags.map((tag) => (
                    <Badge key={tag} variant="outline">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
