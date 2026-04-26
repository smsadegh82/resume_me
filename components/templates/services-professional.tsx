"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-animation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

interface TemplateProps {
  store: any
  products: any[]
  settings: any
}

// SVG Icons
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

const Phone = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"
    />
  </svg>
)

const Mail = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"
    />
    <polyline strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} points="22,6 12,13 2,6" />
  </svg>
)

const Clock = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <circle strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} cx="12" cy="12" r="10" />
    <polyline strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} points="12,6 12,12 16,14" />
  </svg>
)

export default function ServicesProfessionalTemplate({ store, products, settings }: TemplateProps) {
  const [selectedService, setSelectedService] = useState<string | null>(null)
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  })

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("fa-IR").format(price) + " تومان"
  }

  // Convert products to services
  const services =
    products?.map((product) => ({
      id: product.id,
      title: product.name,
      description: product.description || "توضیحات خدمات در اینجا قرار می‌گیرد",
      price: product.price,
      originalPrice: product.original_price,
      features: ["مشاوره رایگان", "پشتیبانی ۲۴/۷", "گارانتی کیفیت", "تحویل به موقع"],
      category: product.category || "خدمات",
      image: product.images[0] || "",
      duration: "۱-۲ هفته",
      rating: 4.8,
      reviews: 25,
    })) || []

  const categories = services ? Array.from(new Set(services.map((s) => s.category))).filter(Boolean) : []

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Contact form submitted:", contactForm)
    alert("درخواست شما ارسال شد! به زودی با شما تماس خواهیم گرفت.")
    setContactForm({ name: "", email: "", phone: "", service: "", message: "" })
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
                <p className="text-sm text-gray-600">ارائه‌دهنده خدمات حرفه‌ای</p>
              </div>
            </div>

            <nav className="hidden md:flex items-center space-x-6 space-x-reverse">
              <a href="#services" className="text-gray-600 hover:text-gray-900">
                خدمات
              </a>
              <a href="#about" className="text-gray-600 hover:text-gray-900">
                درباره ما
              </a>
              <a href="#contact" className="text-gray-600 hover:text-gray-900">
                تماس
              </a>
              <Button size="sm">
                <Phone className="w-4 h-4 ml-2" />
                تماس فوری
              </Button>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">{store.name}</h2>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              {store.description || "ارائه‌دهنده خدمات حرفه‌ای و با کیفیت"}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                مشاهده خدمات
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-blue-600 bg-transparent"
              >
                درخواست مشاوره
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-4">خدمات ما</h3>
            <p className="text-lg text-gray-600">بهترین خدمات را با کیفیت بالا ارائه می‌دهیم</p>
          </div>

          {services && services.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="h-full hover:shadow-lg transition-shadow">
                    <div className="relative">
                      <img
                        src={service.image || `/placeholder.svg?height=200&width=400&query=${service.title}`}
                        alt={service.title}
                        className="w-full h-48 object-cover rounded-t-lg"
                      />
                      <Badge className="absolute top-4 right-4 bg-blue-600">{service.category}</Badge>
                    </div>

                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        <span>{service.title}</span>
                        <div className="flex items-center space-x-1 space-x-reverse">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span className="text-sm text-gray-600">{service.rating}</span>
                        </div>
                      </CardTitle>
                      <CardDescription>{service.description}</CardDescription>
                    </CardHeader>

                    <CardContent>
                      <div className="mb-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-2xl font-bold text-blue-600">{formatPrice(service.price)}</span>
                          {service.originalPrice && service.originalPrice > service.price && (
                            <span className="text-sm line-through text-gray-500">
                              {formatPrice(service.originalPrice)}
                            </span>
                          )}
                        </div>
                        <div className="flex items-center text-sm text-gray-600 mb-4">
                          <Clock className="w-4 h-4 ml-2" />
                          <span>مدت زمان: {service.duration}</span>
                        </div>
                      </div>

                      <div className="mb-6">
                        <h4 className="font-semibold mb-2">ویژگی‌ها:</h4>
                        <ul className="space-y-1">
                          {service.features.map((feature, idx) => (
                            <li key={idx} className="flex items-center text-sm">
                              <CheckCircle className="w-4 h-4 text-green-500 ml-2" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <Button className="w-full" onClick={() => setSelectedService(service.id)}>
                        درخواست خدمات
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-lg font-semibold mb-2">خدماتی یافت نشد</h3>
              <p className="text-gray-600">به زودی خدمات جدید اضافه خواهد شد</p>
            </div>
          )}
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-3xl font-bold mb-8">درباره ما</h3>
            <p className="text-lg text-gray-700 leading-relaxed mb-8">
              ما با بیش از ۱۰ سال تجربه در ارائه خدمات حرفه‌ای، همواره تلاش کرده‌ایم تا بهترین کیفیت را به مشتریان خود
              ارائه دهیم. تیم ما متشکل از متخصصان مجرب و با تجربه است که آماده خدمت‌رسانی به شما هستند.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">۱۰+</div>
                <div className="text-gray-600">سال تجربه</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">۵۰۰+</div>
                <div className="text-gray-600">پروژه موفق</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">۹۸%</div>
                <div className="text-gray-600">رضایت مشتریان</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold mb-4">تماس با ما</h3>
              <p className="text-lg text-gray-600">برای دریافت مشاوره رایگان با ما تماس بگیرید</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <Card>
                <CardHeader>
                  <CardTitle>درخواست خدمات</CardTitle>
                  <CardDescription>فرم زیر را تکمیل کنید تا با شما تماس بگیریم</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleContactSubmit} className="space-y-4">
                    <div>
                      <Input
                        placeholder="نام و نام خانوادگی"
                        value={contactForm.name}
                        onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                        required
                      />
                    </div>
                    <div>
                      <Input
                        type="email"
                        placeholder="ایمیل"
                        value={contactForm.email}
                        onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                        required
                      />
                    </div>
                    <div>
                      <Input
                        placeholder="شماره تماس"
                        value={contactForm.phone}
                        onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                        required
                      />
                    </div>
                    <div>
                      <select
                        className="w-full p-2 border rounded-md"
                        value={contactForm.service}
                        onChange={(e) => setContactForm({ ...contactForm, service: e.target.value })}
                        required
                      >
                        <option value="">انتخاب خدمات</option>
                        {services.map((service) => (
                          <option key={service.id} value={service.title}>
                            {service.title}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <Textarea
                        placeholder="توضیحات پروژه..."
                        value={contactForm.message}
                        onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                        rows={4}
                      />
                    </div>
                    <Button type="submit" className="w-full">
                      ارسال درخواست
                    </Button>
                  </form>
                </CardContent>
              </Card>

              {/* Contact Info */}
              <div className="space-y-6">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4 space-x-reverse">
                      <Phone className="w-8 h-8 text-blue-600" />
                      <div>
                        <h4 className="font-semibold">تماس تلفنی</h4>
                        <p className="text-gray-600">۰۲۱-۱۲۳۴۵۶۷۸</p>
                        <p className="text-sm text-gray-500">شنبه تا پنج‌شنبه، ۹ تا ۱۸</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4 space-x-reverse">
                      <Mail className="w-8 h-8 text-blue-600" />
                      <div>
                        <h4 className="font-semibold">ایمیل</h4>
                        <p className="text-gray-600">info@example.com</p>
                        <p className="text-sm text-gray-500">پاسخ در کمتر از ۲۴ ساعت</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <h4 className="font-semibold mb-4">چرا ما را انتخاب کنید؟</h4>
                    <ul className="space-y-2">
                      <li className="flex items-center">
                        <CheckCircle className="w-5 h-5 text-green-500 ml-2" />
                        <span className="text-sm">مشاوره رایگان</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-5 h-5 text-green-500 ml-2" />
                        <span className="text-sm">گارانتی کیفیت</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-5 h-5 text-green-500 ml-2" />
                        <span className="text-sm">پشتیبانی ۲۴/۷</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-5 h-5 text-green-500 ml-2" />
                        <span className="text-sm">قیمت مناسب</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-bold text-lg mb-4">{store.name}</h3>
              <p className="text-gray-400 mb-4">{store.description}</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">خدمات</h4>
              <ul className="space-y-2 text-gray-400">
                {services.slice(0, 5).map((service) => (
                  <li key={service.id}>
                    <a href="#" className="hover:text-white">
                      {service.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">تماس</h4>
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
