"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface TemplateProps {
  store: any
  products: any[]
  settings: any
}

// SVG Icons
const ExternalLink = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"
    />
    <polyline strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} points="15,3 21,3 21,9" />
    <line strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} x1="10" y1="14" x2="21" y2="3" />
  </svg>
)

const Eye = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"
    />
    <circle strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} cx="12" cy="12" r="3" />
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

const Download = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
    <polyline strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} points="7,10 12,15 17,10" />
    <line strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} x1="12" y1="15" x2="12" y2="3" />
  </svg>
)

export default function PortfolioCreativeTemplate({ store, products, settings }: TemplateProps) {
  const [selectedCategory, setSelectedCategory] = useState("all")

  // Convert products to portfolio items
  const portfolioItems =
    products?.map((product, index) => ({
      id: product.id,
      title: product.name,
      description: product.description || "توضیحات پروژه در اینجا قرار می‌گیرد",
      category: product.category || "طراحی",
      image: product.images[0] || "",
      technologies: ["React", "Next.js", "Tailwind CSS"],
      demoUrl: "#",
      codeUrl: "#",
    })) || []

  const filteredItems = portfolioItems.filter((item) => {
    return selectedCategory === "all" || item.category === selectedCategory
  })

  const categories = portfolioItems ? Array.from(new Set(portfolioItems.map((p) => p.category))).filter(Boolean) : []

  return (
    <div className="min-h-screen bg-gray-900 text-white" dir="rtl">
      {/* Header */}
      <header className="bg-gray-800 shadow-lg sticky top-0 z-50">
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
                <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold">
                  {store.name.charAt(0)}
                </div>
              )}
              <div>
                <h1 className="text-xl font-bold">{store.name}</h1>
                <p className="text-sm text-gray-400">طراح و توسعه‌دهنده</p>
              </div>
            </div>

            <nav className="hidden md:flex items-center space-x-6 space-x-reverse">
              <a href="#about" className="text-gray-300 hover:text-white transition-colors">
                درباره من
              </a>
              <a href="#portfolio" className="text-gray-300 hover:text-white transition-colors">
                نمونه کارها
              </a>
              <a href="#contact" className="text-gray-300 hover:text-white transition-colors">
                تماس
              </a>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-purple-600 to-pink-600">
        <div className="container mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <h2 className="text-5xl md:text-6xl font-bold mb-6">سلام، من {store.name} هستم</h2>
            <p className="text-xl md:text-2xl mb-8 text-gray-200">{store.description || "طراح و توسعه‌دهنده خلاق"}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100">
                <Eye className="w-5 h-5 ml-2" />
                مشاهده نمونه کارها
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-purple-600 bg-transparent"
              >
                <Mail className="w-5 h-5 ml-2" />
                تماس با من
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-3xl font-bold mb-8">درباره من</h3>
            <p className="text-lg text-gray-300 leading-relaxed">
              من یک طراح و توسعه‌دهنده با بیش از ۵ سال تجربه در حوزه طراحی وب و اپلیکیشن هستم. علاقه‌مند به خلق تجربه‌های
              کاربری منحصر به فرد و جذاب. تخصص من در زمینه‌های طراحی UI/UX، توسعه فرانت‌اند و برندینگ است.
            </p>
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="py-16">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold text-center mb-12">نمونه کارها</h3>

          {/* Categories */}
          {categories.length > 0 && (
            <div className="flex flex-wrap gap-2 justify-center mb-12">
              <Button
                variant={selectedCategory === "all" ? "default" : "outline"}
                onClick={() => setSelectedCategory("all")}
                className="bg-purple-600 hover:bg-purple-700"
              >
                همه پروژه‌ها
              </Button>
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  onClick={() => setSelectedCategory(category)}
                  className="bg-purple-600 hover:bg-purple-700"
                >
                  {category}
                </Button>
              ))}
            </div>
          )}

          {/* Portfolio Grid */}
          {filteredItems && filteredItems.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="group"
                >
                  <Card className="bg-gray-800 border-gray-700 hover:border-purple-500 transition-all duration-300 overflow-hidden">
                    <div className="relative">
                      <img
                        src={item.image || `/placeholder.svg?height=300&width=400&query=${item.title}`}
                        alt={item.title}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <div className="flex space-x-2 space-x-reverse">
                          <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-white text-white hover:bg-white hover:text-gray-900 bg-transparent"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>

                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-xl font-bold text-white">{item.title}</h4>
                        <Badge variant="secondary" className="bg-purple-600 text-white">
                          {item.category}
                        </Badge>
                      </div>
                      <p className="text-gray-400 mb-4">{item.description}</p>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {item.technologies.map((tech) => (
                          <Badge key={tech} variant="outline" className="border-gray-600 text-gray-300">
                            {tech}
                          </Badge>
                        ))}
                      </div>

                      <div className="flex space-x-2 space-x-reverse">
                        <Button size="sm" className="flex-1 bg-purple-600 hover:bg-purple-700">
                          <Eye className="w-4 h-4 ml-2" />
                          مشاهده
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-gray-600 text-gray-300 hover:bg-gray-700 bg-transparent"
                        >
                          <Download className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-lg font-semibold mb-2">پروژه‌ای یافت نشد</h3>
              <p className="text-gray-400">به زودی پروژه‌های جدید اضافه خواهد شد</p>
            </div>
          )}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="text-3xl font-bold mb-8">تماس با من</h3>
            <p className="text-lg text-gray-300 mb-8">آیا پروژه‌ای در ذهن دارید؟ بیایید در مورد آن صحبت کنیم!</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-purple-600 hover:bg-purple-700">
                <Mail className="w-5 h-5 ml-2" />
                ارسال ایمیل
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-gray-600 text-gray-300 hover:bg-gray-700 bg-transparent"
              >
                دانلود رزومه
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 py-8">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <p className="text-gray-400">&copy; ۱۴۰۳ {store.name}. ساخته شده با ❤️ توسط Vitrin.AI</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
