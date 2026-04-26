"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"

// SVG Icons
const ArrowLeft = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <line strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} x1="19" y1="12" x2="5" y2="12" />
    <polyline strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} points="12,19 5,12 12,5" />
  </svg>
)

const CreditCard = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <rect
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      x="1"
      y="4"
      width="22"
      height="16"
      rx="2"
      ry="2"
    />
    <line strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} x1="1" y1="10" x2="23" y2="10" />
  </svg>
)

const Truck = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <rect strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} x="1" y="3" width="15" height="13" />
    <polygon strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} points="16,8 20,8 23,11 23,16 16,16 16,8" />
    <circle strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} cx="5.5" cy="18.5" r="2.5" />
    <circle strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} cx="18.5" cy="18.5" r="2.5" />
  </svg>
)

const CheckCircle = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
)

const Loader2 = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-6.219-8.56" />
  </svg>
)

interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
  image: string
}

export default function CheckoutPage() {
  const params = useParams()
  const router = useRouter()
  const storeName = params.storeName as string

  const [currentStep, setCurrentStep] = useState(1)
  const [isProcessing, setIsProcessing] = useState(false)
  const [isCompleted, setIsCompleted] = useState(false)

  // Mock cart items
  const [cartItems] = useState<CartItem[]>([
    {
      id: "1",
      name: "کت ساتن الگانت",
      price: 2500000,
      quantity: 1,
      image: "/elegant-satin-coat.png",
    },
    {
      id: "2",
      name: "کیف چرمی شیک",
      price: 1800000,
      quantity: 2,
      image: "/stylish-leather-handbag.png",
    },
  ])

  const [customerInfo, setCustomerInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
    notes: "",
  })

  const [shippingMethod, setShippingMethod] = useState("standard")
  const [paymentMethod, setPaymentMethod] = useState("card")

  const shippingOptions = [
    { id: "standard", name: "ارسال عادی", price: 50000, duration: "۳-۵ روز کاری" },
    { id: "express", name: "ارسال سریع", price: 100000, duration: "۱-۲ روز کاری" },
    { id: "overnight", name: "ارسال فوری", price: 200000, duration: "۲۴ ساعت" },
  ]

  const paymentOptions = [
    { id: "card", name: "کارت بانکی", icon: <CreditCard className="w-5 h-5" /> },
    { id: "wallet", name: "کیف پول الکترونیک", icon: <CreditCard className="w-5 h-5" /> },
    { id: "cod", name: "پرداخت در محل", icon: <Truck className="w-5 h-5" /> },
  ]

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const selectedShipping = shippingOptions.find((option) => option.id === shippingMethod)
  const shippingCost = selectedShipping?.price || 0
  const tax = Math.round(subtotal * 0.09) // 9% tax
  const total = subtotal + shippingCost + tax

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("fa-IR").format(price) + " تومان"
  }

  const handleCustomerInfoChange = (field: string, value: string) => {
    setCustomerInfo((prev) => ({ ...prev, [field]: value }))
  }

  const handleNextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleCompleteOrder = async () => {
    setIsProcessing(true)

    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 3000))

    setIsProcessing(false)
    setIsCompleted(true)
  }

  if (isCompleted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center" dir="rtl">
        <Card className="max-w-md w-full mx-4">
          <CardContent className="p-8 text-center">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-4">سفارش شما با موفقیت ثبت شد!</h2>
            <p className="text-gray-600 mb-6">
              شماره سفارش: <strong>#۱۲۳۴۵۶</strong>
            </p>
            <p className="text-gray-600 mb-8">
              ایمیل تأیید برای شما ارسال شد. می‌توانید وضعیت سفارش خود را پیگیری کنید.
            </p>
            <div className="space-y-3">
              <Button className="w-full" asChild>
                <Link href={`/v/${storeName}`}>بازگشت به فروشگاه</Link>
              </Button>
              <Button variant="outline" className="w-full bg-transparent">
                پیگیری سفارش
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button variant="ghost" asChild>
              <Link href={`/v/${storeName}`}>
                <ArrowLeft className="w-4 h-4 ml-2" />
                بازگشت به فروشگاه
              </Link>
            </Button>
            <h1 className="text-xl font-bold">تسویه حساب</h1>
            <div className="w-24"></div>
          </div>
        </div>
      </header>

      {/* Progress Steps */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-center space-x-8 space-x-reverse">
            {[
              { step: 1, title: "اطلاعات مشتری" },
              { step: 2, title: "ارسال و پرداخت" },
              { step: 3, title: "بررسی نهایی" },
            ].map((item) => (
              <div key={item.step} className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                    currentStep >= item.step ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-600"
                  }`}
                >
                  {item.step}
                </div>
                <span
                  className={`mr-2 text-sm ${
                    currentStep >= item.step ? "text-blue-600 font-semibold" : "text-gray-600"
                  }`}
                >
                  {item.title}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Step 1: Customer Information */}
            {currentStep === 1 && (
              <Card>
                <CardHeader>
                  <CardTitle>اطلاعات مشتری</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">نام</Label>
                      <Input
                        id="firstName"
                        value={customerInfo.firstName}
                        onChange={(e) => handleCustomerInfoChange("firstName", e.target.value)}
                        placeholder="نام خود را وارد کنید"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName">نام خانوادگی</Label>
                      <Input
                        id="lastName"
                        value={customerInfo.lastName}
                        onChange={(e) => handleCustomerInfoChange("lastName", e.target.value)}
                        placeholder="نام خانوادگی خود را وارد کنید"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="email">ایمیل</Label>
                      <Input
                        id="email"
                        type="email"
                        value={customerInfo.email}
                        onChange={(e) => handleCustomerInfoChange("email", e.target.value)}
                        placeholder="ایمیل خود را وارد کنید"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">شماره تلفن</Label>
                      <Input
                        id="phone"
                        value={customerInfo.phone}
                        onChange={(e) => handleCustomerInfoChange("phone", e.target.value)}
                        placeholder="شماره تلفن خود را وارد کنید"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="address">آدرس</Label>
                    <Textarea
                      id="address"
                      value={customerInfo.address}
                      onChange={(e) => handleCustomerInfoChange("address", e.target.value)}
                      placeholder="آدرس کامل خود را وارد کنید"
                      rows={3}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="city">شهر</Label>
                      <Input
                        id="city"
                        value={customerInfo.city}
                        onChange={(e) => handleCustomerInfoChange("city", e.target.value)}
                        placeholder="شهر"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="postalCode">کد پستی</Label>
                      <Input
                        id="postalCode"
                        value={customerInfo.postalCode}
                        onChange={(e) => handleCustomerInfoChange("postalCode", e.target.value)}
                        placeholder="کد پستی"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="notes">یادداشت (اختیاری)</Label>
                    <Textarea
                      id="notes"
                      value={customerInfo.notes}
                      onChange={(e) => handleCustomerInfoChange("notes", e.target.value)}
                      placeholder="یادداشت یا درخواست خاص"
                      rows={2}
                    />
                  </div>

                  <div className="flex justify-end">
                    <Button onClick={handleNextStep}>ادامه</Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Step 2: Shipping & Payment */}
            {currentStep === 2 && (
              <div className="space-y-6">
                {/* Shipping Method */}
                <Card>
                  <CardHeader>
                    <CardTitle>روش ارسال</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <RadioGroup value={shippingMethod} onValueChange={setShippingMethod}>
                      {shippingOptions.map((option) => (
                        <div
                          key={option.id}
                          className="flex items-center space-x-3 space-x-reverse p-4 border rounded-lg"
                        >
                          <RadioGroupItem value={option.id} id={option.id} />
                          <div className="flex-1">
                            <Label htmlFor={option.id} className="font-semibold cursor-pointer">
                              {option.name}
                            </Label>
                            <p className="text-sm text-gray-600">{option.duration}</p>
                          </div>
                          <div className="text-left">
                            <span className="font-semibold">{formatPrice(option.price)}</span>
                          </div>
                        </div>
                      ))}
                    </RadioGroup>
                  </CardContent>
                </Card>

                {/* Payment Method */}
                <Card>
                  <CardHeader>
                    <CardTitle>روش پرداخت</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                      {paymentOptions.map((option) => (
                        <div
                          key={option.id}
                          className="flex items-center space-x-3 space-x-reverse p-4 border rounded-lg"
                        >
                          <RadioGroupItem value={option.id} id={option.id} />
                          <div className="flex items-center space-x-3 space-x-reverse">
                            {option.icon}
                            <Label htmlFor={option.id} className="font-semibold cursor-pointer">
                              {option.name}
                            </Label>
                          </div>
                        </div>
                      ))}
                    </RadioGroup>

                    {paymentMethod === "card" && (
                      <div className="mt-6 space-y-4">
                        <div>
                          <Label htmlFor="cardNumber">شماره کارت</Label>
                          <Input id="cardNumber" placeholder="۱۲۳۴ ۵۶۷۸ ۹۰۱۲ ۳۴۵۶" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="expiry">تاریخ انقضا</Label>
                            <Input id="expiry" placeholder="MM/YY" />
                          </div>
                          <div>
                            <Label htmlFor="cvv">CVV</Label>
                            <Input id="cvv" placeholder="۱۲۳" />
                          </div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>

                <div className="flex justify-between">
                  <Button variant="outline" onClick={handlePrevStep}>
                    مرحله قبل
                  </Button>
                  <Button onClick={handleNextStep}>ادامه</Button>
                </div>
              </div>
            )}

            {/* Step 3: Review */}
            {currentStep === 3 && (
              <div className="space-y-6">
                {/* Customer Info Review */}
                <Card>
                  <CardHeader>
                    <CardTitle>اطلاعات مشتری</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <p>
                        <strong>نام:</strong> {customerInfo.firstName} {customerInfo.lastName}
                      </p>
                      <p>
                        <strong>ایمیل:</strong> {customerInfo.email}
                      </p>
                      <p>
                        <strong>تلفن:</strong> {customerInfo.phone}
                      </p>
                      <p>
                        <strong>آدرس:</strong> {customerInfo.address}, {customerInfo.city}, {customerInfo.postalCode}
                      </p>
                      {customerInfo.notes && (
                        <p>
                          <strong>یادداشت:</strong> {customerInfo.notes}
                        </p>
                      )}
                    </div>
                  </CardContent>
                </Card>

                {/* Shipping & Payment Review */}
                <Card>
                  <CardHeader>
                    <CardTitle>ارسال و پرداخت</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <p>
                        <strong>روش ارسال:</strong> {selectedShipping?.name} ({selectedShipping?.duration})
                      </p>
                      <p>
                        <strong>روش پرداخت:</strong> {paymentOptions.find((p) => p.id === paymentMethod)?.name}
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <div className="flex justify-between">
                  <Button variant="outline" onClick={handlePrevStep}>
                    مرحله قبل
                  </Button>
                  <Button
                    onClick={handleCompleteOrder}
                    disabled={isProcessing}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    {isProcessing ? (
                      <>
                        <Loader2 className="w-4 h-4 ml-2 animate-spin" />
                        در حال پردازش...
                      </>
                    ) : (
                      "تکمیل سفارش"
                    )}
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle>خلاصه سفارش</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Cart Items */}
                <div className="space-y-3">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex items-center space-x-3 space-x-reverse">
                      <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-sm truncate">{item.name}</h4>
                        <p className="text-sm text-gray-600">تعداد: {item.quantity}</p>
                      </div>
                      <div className="text-left">
                        <span className="font-semibold text-sm">{formatPrice(item.price * item.quantity)}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <Separator />

                {/* Price Breakdown */}
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>جمع کل محصولات:</span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>هزینه ارسال:</span>
                    <span>{formatPrice(shippingCost)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>مالیات:</span>
                    <span>{formatPrice(tax)}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-bold text-lg">
                    <span>مجموع نهایی:</span>
                    <span className="text-blue-600">{formatPrice(total)}</span>
                  </div>
                </div>

                {/* Discount Code */}
                {currentStep < 3 && (
                  <div className="pt-4">
                    <Label htmlFor="discount">کد تخفیف</Label>
                    <div className="flex space-x-2 space-x-reverse mt-1">
                      <Input id="discount" placeholder="کد تخفیف خود را وارد کنید" className="flex-1" />
                      <Button variant="outline" size="sm">
                        اعمال
                      </Button>
                    </div>
                  </div>
                )}

                {/* Security Badge */}
                <div className="pt-4 text-center">
                  <div className="flex items-center justify-center space-x-2 space-x-reverse text-sm text-gray-600">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>پرداخت امن و محافظت شده</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
