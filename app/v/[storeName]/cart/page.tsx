"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"

// SVG Icons
const ArrowLeft = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <line strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} x1="19" y1="12" x2="5" y2="12" />
    <polyline strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} points="12,19 5,12 12,5" />
  </svg>
)

const ShoppingBag = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
  </svg>
)

const Trash2 = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <polyline strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} points="3,6 5,6 21,6" />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="m19,6v14a2,2 0 0,1-2,2H7a2,2 0 0,1-2-2V6m3,0V4a2,2 0 0,1,2-2h4a2,2 0 0,1,2,2v2"
    />
    <line strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} x1="10" y1="11" x2="10" y2="17" />
    <line strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} x1="14" y1="11" x2="14" y2="17" />
  </svg>
)

const Plus = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <line strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} x1="12" y1="5" x2="12" y2="19" />
    <line strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} x1="5" y1="12" x2="19" y2="12" />
  </svg>
)

const Minus = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <line strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} x1="5" y1="12" x2="19" y2="12" />
  </svg>
)

interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
  image: string
  variants?: Record<string, string>
}

interface CustomerInfo {
  name: string
  phone: string
  email: string
  address: string
}

export default function CartPage() {
  const params = useParams()
  const router = useRouter()
  const storeName = params.storeName as string

  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [customerInfo, setCustomerInfo] = useState<CustomerInfo>({
    name: "",
    phone: "",
    email: "",
    address: "",
  })
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Load cart from localStorage
    const savedCart = localStorage.getItem(`cart_${storeName}`)
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart)
        setCartItems(parsedCart)
      } catch (error) {
        console.error("Error parsing cart data:", error)
      }
    }
    setIsLoading(false)
  }, [storeName])

  useEffect(() => {
    // Save cart to localStorage whenever it changes
    if (!isLoading) {
      localStorage.setItem(`cart_${storeName}`, JSON.stringify(cartItems))
    }
  }, [cartItems, storeName, isLoading])

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("fa-IR").format(price) + " تومان"
  }

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeItem(id)
      return
    }
    setCartItems((prev) => prev.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item)))
  }

  const removeItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id))
  }

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shipping = subtotal >= 1000000 ? 0 : 30000 // Free shipping over 1M
  const total = subtotal + shipping

  const handleSubmitOrder = async () => {
    if (!customerInfo.name || !customerInfo.phone || !customerInfo.address) {
      alert("لطفاً تمام فیلدهای الزامی را تکمیل کنید")
      return
    }

    try {
      // Create order
      const orderData = {
        items: cartItems,
        customer: customerInfo,
        total: total,
        storeName: storeName,
      }

      // Simulate order submission
      console.log("Order submitted:", orderData)

      // Clear cart
      setCartItems([])
      localStorage.removeItem(`cart_${storeName}`)

      alert("سفارش شما با موفقیت ثبت شد! به زودی با شما تماس خواهیم گرفت.")
      router.push(`/v/${storeName}`)
    } catch (error) {
      console.error("Error submitting order:", error)
      alert("خطا در ثبت سفارش. لطفاً دوباره تلاش کنید.")
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">در حال بارگذاری...</p>
        </div>
      </div>
    )
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50" dir="rtl">
        <header className="bg-white shadow-sm border-b">
          <div className="container mx-auto px-4">
            <div className="flex items-center h-16">
              <Button variant="ghost" size="sm" onClick={() => router.back()}>
                <ArrowLeft className="w-4 h-4 ml-2" />
                بازگشت
              </Button>
            </div>
          </div>
        </header>

        <div className="container mx-auto px-4 py-16 text-center">
          <ShoppingBag className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-2">سبد خرید شما خالی است</h1>
          <p className="text-gray-600 mb-6">محصولاتی به سبد خرید خود اضافه کنید</p>
          <Button asChild>
            <Link href={`/v/${storeName}`}>ادامه خرید</Link>
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
              <Button variant="ghost" size="sm" onClick={() => router.back()}>
                <ArrowLeft className="w-4 h-4 ml-2" />
                بازگشت
              </Button>
              <h1 className="text-xl font-bold">سبد خرید</h1>
            </div>
            <span className="text-gray-600">{cartItems.length} محصول</span>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            <h2 className="text-xl font-bold mb-4">محصولات سبد خرید</h2>
            {cartItems.map((item) => (
              <Card key={item.id}>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-4 space-x-reverse">
                    <img
                      src={item.image || `/placeholder.svg?height=80&width=80&query=${item.name}`}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold mb-1">{item.name}</h3>
                      {item.variants && (
                        <div className="text-sm text-gray-600 mb-2">
                          {Object.entries(item.variants).map(([key, value]) => (
                            <span key={key} className="ml-2">
                              {key}: {value}
                            </span>
                          ))}
                        </div>
                      )}
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-blue-600">{formatPrice(item.price)}</span>
                        <div className="flex items-center space-x-2 space-x-reverse">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          >
                            <Minus className="w-4 h-4" />
                          </Button>
                          <span className="px-3 py-1 border rounded min-w-[50px] text-center">{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >
                            <Plus className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm" onClick={() => removeItem(item.id)}>
                            <Trash2 className="w-4 h-4 text-red-500" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Order Summary & Customer Info */}
          <div className="space-y-6">
            {/* Customer Information */}
            <Card>
              <CardHeader>
                <CardTitle>اطلاعات مشتری</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="name">نام و نام خانوادگی *</Label>
                  <Input
                    id="name"
                    value={customerInfo.name}
                    onChange={(e) => setCustomerInfo({ ...customerInfo, name: e.target.value })}
                    placeholder="نام خود را وارد کنید"
                  />
                </div>
                <div>
                  <Label htmlFor="phone">شماره تماس *</Label>
                  <Input
                    id="phone"
                    value={customerInfo.phone}
                    onChange={(e) => setCustomerInfo({ ...customerInfo, phone: e.target.value })}
                    placeholder="09123456789"
                  />
                </div>
                <div>
                  <Label htmlFor="email">ایمیل</Label>
                  <Input
                    id="email"
                    type="email"
                    value={customerInfo.email}
                    onChange={(e) => setCustomerInfo({ ...customerInfo, email: e.target.value })}
                    placeholder="example@email.com"
                  />
                </div>
                <div>
                  <Label htmlFor="address">آدرس *</Label>
                  <Input
                    id="address"
                    value={customerInfo.address}
                    onChange={(e) => setCustomerInfo({ ...customerInfo, address: e.target.value })}
                    placeholder="آدرس کامل خود را وارد کنید"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Order Summary */}
            <Card>
              <CardHeader>
                <CardTitle>خلاصه سفارش</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span>جمع محصولات:</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span>هزینه ارسال:</span>
                  <span>{shipping === 0 ? "رایگان" : formatPrice(shipping)}</span>
                </div>
                {shipping === 0 && subtotal >= 1000000 && (
                  <p className="text-sm text-green-600">ارسال رایگان برای خرید بالای ۱,۰۰۰,۰۰۰ تومان</p>
                )}
                <div className="border-t pt-4">
                  <div className="flex justify-between font-bold text-lg">
                    <span>مجموع:</span>
                    <span className="text-blue-600">{formatPrice(total)}</span>
                  </div>
                </div>
                <Button
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                  onClick={handleSubmitOrder}
                >
                  ثبت سفارش
                </Button>
                <Button variant="outline" className="w-full bg-transparent" asChild>
                  <Link href={`/v/${storeName}`}>ادامه خرید</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
