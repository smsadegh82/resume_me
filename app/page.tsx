"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

// SVG Icons as components
const ShoppingBag = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
  </svg>
)

const Sparkles = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M5 3l1.5 1.5L5 6l1.5 1.5L5 9l1.5 1.5L5 12l1.5 1.5L5 15l1.5 1.5L5 18l1.5 1.5L5 21M19 3l-1.5 1.5L19 6l-1.5 1.5L19 9l-1.5 1.5L19 12l-1.5 1.5L19 15l-1.5 1.5L19 18l-1.5 1.5L19 21"
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

const Zap = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <polygon
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      points="13,2 3,14 12,14 11,22 21,10 12,10 13,2"
    />
  </svg>
)

const TrendingUp = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <polyline strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} points="23,6 13.5,15.5 8.5,10.5 1,18" />
    <polyline strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} points="17,6 23,6 23,12" />
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

const ArrowRight = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <line strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} x1="5" y1="12" x2="19" y2="12" />
    <polyline strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} points="12,5 19,12 12,19" />
  </svg>
)

const Check = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <polyline strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} points="20,6 9,17 4,12" />
  </svg>
)

const Play = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <polygon strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} points="5,3 19,12 5,21 5,3" />
  </svg>
)

const Menu = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <line strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} x1="3" y1="6" x2="21" y2="6" />
    <line strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} x1="3" y1="12" x2="21" y2="12" />
    <line strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} x1="3" y1="18" x2="21" y2="18" />
  </svg>
)

const X = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <line strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} x1="18" y1="6" x2="6" y2="18" />
    <line strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} x1="6" y1="6" x2="18" y2="18" />
  </svg>
)

export default function HomePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeFeature, setActiveFeature] = useState(0)

  const features = [
    {
      icon: <Sparkles className="w-8 h-8" />,
      title: "طراحی خودکار با هوش مصنوعی",
      description: "فروشگاه شما با استفاده از هوش مصنوعی طراحی و بهینه‌سازی می‌شود",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: <MessageCircle className="w-8 h-8" />,
      title: "افزودن محصولات از تلگرام و اینستاگرام",
      description: "محصولات خود را مستقیماً از تلگرام و اینستاگرام به فروشگاه اضافه کنید",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "راه‌اندازی در کمتر از ۵ دقیقه",
      description: "فروشگاه آنلاین خود را در کمترین زمان ممکن راه‌اندازی کنید",
      color: "from-yellow-500 to-orange-500",
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "آنالیز فروش پیشرفته",
      description: "گزارش‌های تفصیلی از فروش و رفتار مشتریان دریافت کنید",
      color: "from-green-500 to-emerald-500",
    },
  ]

  const testimonials = [
    {
      name: "مریم احمدی",
      business: "فروشگاه پوشاک مریم",
      content: "با Vitrin.AI فروش من ۳ برابر شده! خیلی راحت و سریع فروشگاهم رو راه‌اندازی کردم.",
      rating: 5,
      avatar: "/placeholder.svg?height=60&width=60",
    },
    {
      name: "علی رضایی",
      business: "فروشگاه الکترونیک علی",
      content: "بهترین پلتفرم برای شروع کسب‌وکار آنلاین. پشتیبانی عالی و امکانات کامل.",
      rating: 5,
      avatar: "/placeholder.svg?height=60&width=60",
    },
    {
      name: "فاطمه کریمی",
      business: "صنایع دستی فاطمه",
      content: "قابلیت افزودن محصولات از اینستاگرام واقعاً کار من رو راحت کرده.",
      rating: 5,
      avatar: "/placeholder.svg?height=60&width=60",
    },
  ]

  const stats = [
    { number: "+۱۰,۰۰۰", label: "فروشگاه فعال" },
    { number: "+۵۰,۰۰۰", label: "محصول فروخته شده" },
    { number: "۹۸٪", label: "رضایت مشتریان" },
    { number: "۲۴/۷", label: "پشتیبانی" },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % features.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen bg-white" dir="rtl">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm border-b border-gray-100 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center space-x-2 space-x-reverse">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <ShoppingBag className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Vitrin.AI
              </span>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8 space-x-reverse">
              <Link href="#features" className="text-gray-600 hover:text-gray-900 transition-colors">
                ویژگی‌ها
              </Link>
              <Link href="#pricing" className="text-gray-600 hover:text-gray-900 transition-colors">
                قیمت‌گذاری
              </Link>
              <Link href="#testimonials" className="text-gray-600 hover:text-gray-900 transition-colors">
                نظرات
              </Link>
              <Link href="/login" className="text-gray-600 hover:text-gray-900 transition-colors">
                ورود
              </Link>
              <Button
                asChild
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                <Link href="/signup">شروع رایگان</Link>
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden p-2">
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="md:hidden border-t border-gray-100 py-4"
              >
                <div className="flex flex-col space-y-4">
                  <Link href="#features" className="text-gray-600 hover:text-gray-900 transition-colors">
                    ویژگی‌ها
                  </Link>
                  <Link href="#pricing" className="text-gray-600 hover:text-gray-900 transition-colors">
                    قیمت‌گذاری
                  </Link>
                  <Link href="#testimonials" className="text-gray-600 hover:text-gray-900 transition-colors">
                    نظرات
                  </Link>
                  <Link href="/login" className="text-gray-600 hover:text-gray-900 transition-colors">
                    ورود
                  </Link>
                  <Button
                    asChild
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                  >
                    <Link href="/signup">شروع رایگان</Link>
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
              <Badge className="mb-6 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 border-0">
                <Sparkles className="w-4 h-4 ml-2" />
                هوش مصنوعی پیشرفته
              </Badge>

              <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                فروشگاه آنلاین خودت رو
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent block">
                  با هوش مصنوعی بساز
                </span>
              </h1>

              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                ساده‌ترین راه برای ساخت فروشگاه آنلاین حرفه‌ای. بدون نیاز به دانش فنی، در کمتر از ۵ دقیقه شروع کن!
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Button
                  size="lg"
                  asChild
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 h-14 px-8 text-lg"
                >
                  <Link href="/signup">
                    شروع رایگان
                    <ArrowRight className="w-5 h-5 mr-2" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="h-14 px-8 text-lg border-2 bg-transparent">
                  <Play className="w-5 h-5 ml-2" />
                  مشاهده دمو
                </Button>
              </div>

              <div className="flex items-center space-x-6 space-x-reverse text-sm text-gray-600">
                <div className="flex items-center">
                  <Check className="w-4 h-4 text-green-500 ml-1" />
                  رایگان برای همیشه
                </div>
                <div className="flex items-center">
                  <Check className="w-4 h-4 text-green-500 ml-1" />
                  بدون کارمزد
                </div>
                <div className="flex items-center">
                  <Check className="w-4 h-4 text-green-500 ml-1" />
                  پشتیبانی ۲۴/۷
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative z-10">
                <img
                  src="/placeholder.svg?height=600&width=500"
                  alt="داشبورد Vitrin.AI"
                  className="w-full rounded-2xl shadow-2xl"
                />
              </div>

              {/* Floating Elements */}
              <motion.div
                animate={{ y: [-10, 10, -10] }}
                transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
                className="absolute -top-4 -right-4 bg-white rounded-xl shadow-lg p-4 z-20"
              >
                <div className="flex items-center space-x-2 space-x-reverse">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-sm font-medium">فروش جدید!</span>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [10, -10, 10] }}
                transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, delay: 1 }}
                className="absolute -bottom-4 -left-4 bg-white rounded-xl shadow-lg p-4 z-20"
              >
                <div className="flex items-center space-x-2 space-x-reverse">
                  <TrendingUp className="w-4 h-4 text-blue-500" />
                  <span className="text-sm font-medium">+۲۳٪ فروش</span>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} className="text-center mb-16">
            <Badge className="mb-4 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 border-0">
              ویژگی‌های منحصر به فرد
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">چرا Vitrin.AI انتخاب بهتری است؟</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              با استفاده از جدیدترین تکنولوژی‌های هوش مصنوعی، فروشگاه آنلاین حرفه‌ای بسازید که واقعاً فروش می‌کند
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`p-6 rounded-2xl cursor-pointer transition-all duration-300 ${
                    activeFeature === index
                      ? "bg-white shadow-xl border-2 border-blue-200"
                      : "bg-gray-50 hover:bg-white hover:shadow-lg"
                  }`}
                  onClick={() => setActiveFeature(index)}
                >
                  <div className="flex items-start space-x-4 space-x-reverse">
                    <div className={`p-3 rounded-xl bg-gradient-to-r ${feature.color} text-white flex-shrink-0`}>
                      {feature.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                      <p className="text-gray-600">{feature.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              key={activeFeature}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              <div
                className={`absolute inset-0 bg-gradient-to-r ${features[activeFeature].color} rounded-3xl blur-3xl opacity-20`}
              ></div>
              <img
                src="/abstract-geometric-feature.png"
                alt={features[activeFeature].title}
                className="relative z-10 w-full rounded-2xl shadow-2xl"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} className="text-center mb-16">
            <Badge className="mb-4 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 border-0">
              نظرات مشتریان
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">مشتریان ما چه می‌گویند؟</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <p className="text-gray-600 mb-6 leading-relaxed">"{testimonial.content}"</p>
                    <div className="flex items-center">
                      <img
                        src={testimonial.avatar || "/placeholder.svg"}
                        alt={testimonial.name}
                        className="w-12 h-12 rounded-full ml-4"
                      />
                      <div>
                        <div className="font-bold">{testimonial.name}</div>
                        <div className="text-sm text-gray-500">{testimonial.business}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="container mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">آماده‌ای فروشگاه آنلاین خودت رو بسازی؟</h2>
            <p className="text-xl text-blue-100 mb-8">همین الان شروع کن و ببین چطور می‌تونی فروشت رو چند برابر کنی</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild className="bg-white text-blue-600 hover:bg-gray-100 h-14 px-8 text-lg">
                <Link href="/signup">
                  شروع رایگان
                  <ArrowRight className="w-5 h-5 mr-2" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="h-14 px-8 text-lg border-2 border-white text-white hover:bg-white hover:text-blue-600 bg-transparent"
              >
                مشاوره رایگان
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <Link href="/" className="flex items-center space-x-2 space-x-reverse mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                  <ShoppingBag className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-bold">Vitrin.AI</span>
              </Link>
              <p className="text-gray-400 mb-4">ساده‌ترین راه برای ساخت فروشگاه آنلاین حرفه‌ای با هوش مصنوعی</p>
              <div className="flex space-x-4 space-x-reverse">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Instagram className="w-5 h-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <MessageCircle className="w-5 h-5" />
                </a>
              </div>
            </div>

            <div>
              <h3 className="font-bold mb-4">محصول</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    ویژگی‌ها
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    قیمت‌گذاری
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    قالب‌ها
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    API
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold mb-4">پشتیبانی</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    مرکز راهنمایی
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    تماس با ما
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    وضعیت سرویس
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    گزارش باگ
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold mb-4">شرکت</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    درباره ما
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    بلاگ
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    کریر
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    مطبوعات
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">© ۲۰۲۴ Vitrin.AI. تمام حقوق محفوظ است.</p>
            <div className="flex space-x-6 space-x-reverse mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
                حریم خصوصی
              </a>
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
                شرایط استفاده
              </a>
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
                کوکی‌ها
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
