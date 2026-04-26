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
const Calendar = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <rect
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      x="3"
      y="4"
      width="18"
      height="18"
      rx="2"
      ry="2"
    />
    <line strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} x1="16" y1="2" x2="16" y2="6" />
    <line strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} x1="8" y1="2" x2="8" y2="6" />
    <line strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} x1="3" y1="10" x2="21" y2="10" />
  </svg>
)

const User = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
    <circle strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} cx="12" cy="7" r="4" />
  </svg>
)

const Search = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <circle strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} cx="11" cy="11" r="8" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m21 21-4.35-4.35" />
  </svg>
)

const ArrowRight = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <line strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} x1="5" y1="12" x2="19" y2="12" />
    <polyline strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} points="12,5 19,12 12,19" />
  </svg>
)

const Clock = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <circle strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} cx="12" cy="12" r="10" />
    <polyline strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} points="12,6 12,12 16,14" />
  </svg>
)

export default function BlogModernTemplate({ store, products, settings }: TemplateProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")

  // Convert products to blog posts format
  const blogPosts =
    products?.map((product, index) => ({
      id: product.id,
      title: product.name,
      excerpt: product.description || "خلاصه‌ای از این مقاله در اینجا قرار می‌گیرد...",
      content: product.description || "محتوای کامل مقاله در اینجا قرار می‌گیرد...",
      author: "نویسنده",
      date: "۱۴۰۳/۰۸/۱۵",
      category: product.category || "عمومی",
      image: product.images[0] || "",
      readTime: `${Math.floor(Math.random() * 10) + 3} دقیقه`,
    })) || []

  const filteredPosts = blogPosts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "all" || post.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const categories = blogPosts ? Array.from(new Set(blogPosts.map((p) => p.category))).filter(Boolean) : []

  return (
    <div className="min-h-screen bg-white" dir="rtl">
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
                <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center text-white font-bold">
                  {store.name.charAt(0)}
                </div>
              )}
              <div>
                <h1 className="text-xl font-bold">{store.name}</h1>
                <p className="text-sm text-gray-600">وبلاگ و مقالات</p>
              </div>
            </div>

            <div className="flex items-center space-x-4 space-x-reverse">
              <div className="relative hidden md:block">
                <Input
                  placeholder="جستجو در مقالات..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 w-64"
                />
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
              <Button variant="outline" size="sm">
                عضویت در خبرنامه
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">{store.name}</h2>
          <p className="text-xl mb-8">{store.description || "مقالات و محتوای آموزشی"}</p>

          {/* Search */}
          <div className="max-w-md mx-auto relative md:hidden">
            <Input
              placeholder="جستجو در مقالات..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-white text-gray-900"
            />
            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        {/* Categories */}
        {categories.length > 0 && (
          <div className="mb-8">
            <div className="flex flex-wrap gap-2 justify-center">
              <Button
                variant={selectedCategory === "all" ? "default" : "outline"}
                onClick={() => setSelectedCategory("all")}
              >
                همه مقالات
              </Button>
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        )}

        {/* Blog Posts */}
        {filteredPosts && filteredPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <div className="relative">
                    <img
                      src={post.image || `/placeholder.svg?height=200&width=400&query=${post.title}`}
                      alt={post.title}
                      className="w-full h-48 object-cover rounded-t-lg"
                    />
                    <Badge className="absolute top-4 right-4 bg-indigo-600">{post.category}</Badge>
                  </div>

                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-3 line-clamp-2">{post.title}</h3>
                    <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>

                    <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                      <div className="flex items-center space-x-2 space-x-reverse">
                        <User className="w-4 h-4" />
                        <span>{post.author}</span>
                      </div>
                      <div className="flex items-center space-x-2 space-x-reverse">
                        <Calendar className="w-4 h-4" />
                        <span>{post.date}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2 space-x-reverse text-sm text-gray-500">
                        <Clock className="w-4 h-4" />
                        <span>{post.readTime} مطالعه</span>
                      </div>
                      <Button variant="ghost" size="sm">
                        ادامه مطالعه
                        <ArrowRight className="w-4 h-4 mr-2" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <h3 className="text-lg font-semibold mb-2">مقاله‌ای یافت نشد</h3>
            <p className="text-gray-600">لطفاً جستجوی خود را تغییر دهید</p>
          </div>
        )}
      </div>

      {/* Newsletter Section */}
      <section className="bg-gray-100 py-16">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-3xl font-bold mb-4">عضویت در خبرنامه</h3>
          <p className="text-xl mb-8 text-gray-600">از جدیدترین مقالات و محتوا باخبر شوید</p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <Input placeholder="ایمیل خود را وارد کنید..." className="flex-1" />
            <Button className="bg-indigo-600 hover:bg-indigo-700">عضویت</Button>
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
              <h4 className="font-semibold mb-4">دسته‌بندی‌ها</h4>
              <ul className="space-y-2 text-gray-400">
                {categories.slice(0, 5).map((category) => (
                  <li key={category}>
                    <a href="#" className="hover:text-white">
                      {category}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">تماس با ما</h4>
              <ul className="space-y-2 text-gray-400">
                <li>ایمیل: info@example.com</li>
                <li>تلفن: ۰۲۱-۱۲۳۴۵۶۷۸</li>
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
