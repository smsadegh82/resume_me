"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import Link from "next/link"

// SVG Icons
const Search = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <circle strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} cx="11" cy="11" r="8" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m21 21-4.35-4.35" />
  </svg>
)

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

const ArrowRight = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <line strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} x1="5" y1="12" x2="19" y2="12" />
    <polyline strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} points="12,5 19,12 12,19" />
  </svg>
)

const blogPosts = [
  {
    id: "1",
    title: "راهنمای کامل راه‌اندازی فروشگاه آنلاین",
    excerpt: "در این مقاله به طور کامل نحوه راه‌اندازی یک فروشگاه آنلاین موفق را بررسی می‌کنیم...",
    content: "محتوای کامل مقاله در اینجا قرار می‌گیرد...",
    author: "تیم Vitrin.AI",
    date: "۱۴۰۳/۰۸/۱۵",
    category: "آموزش",
    image: "/blog-1.jpg",
    readTime: "۵ دقیقه",
  },
  {
    id: "2",
    title: "بهترین استراتژی‌های بازاریابی دیجیتال",
    excerpt: "کسب‌وکارهای آنلاین برای موفقیت نیاز به استراتژی‌های بازاریابی مؤثر دارند...",
    content: "محتوای کامل مقاله در اینجا قرار می‌گیرد...",
    author: "علی احمدی",
    date: "۱۴۰۳/۰۸/۱۰",
    category: "بازاریابی",
    image: "/blog-2.jpg",
    readTime: "۷ دقیقه",
  },
  {
    id: "3",
    title: "طراحی UI/UX برای فروشگاه‌های آنلاین",
    excerpt: "طراحی رابط کاربری مناسب یکی از مهم‌ترین عوامل موفقیت فروشگاه‌های آنلاین است...",
    content: "محتوای کامل مقاله در اینجا قرار می‌گیرد...",
    author: "سارا محمدی",
    date: "۱۴۰۳/۰۸/۰۵",
    category: "طراحی",
    image: "/blog-3.jpg",
    readTime: "۶ دقیقه",
  },
  {
    id: "4",
    title: "تحلیل داده‌ها و بهبود فروش",
    excerpt: "استفاده از داده‌ها برای بهبود عملکرد فروشگاه و افزایش فروش...",
    content: "محتوای کامل مقاله در اینجا قرار می‌گیرد...",
    author: "محمد رضایی",
    date: "۱۴۰۳/۰۷/۲۸",
    category: "تحلیل",
    image: "/blog-4.jpg",
    readTime: "۸ دقیقه",
  },
]

export default function BlogPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")

  const categories = Array.from(new Set(blogPosts.map((post) => post.category)))

  const filteredPosts = blogPosts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "all" || post.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center space-x-2 space-x-reverse">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">V</span>
              </div>
              <span className="text-xl font-bold">Vitrin.AI</span>
            </Link>

            <nav className="hidden md:flex items-center space-x-6 space-x-reverse">
              <Link href="/" className="text-gray-600 hover:text-gray-900">
                خانه
              </Link>
              <Link href="/blog" className="text-blue-600 font-semibold">
                بلاگ
              </Link>
              <Link href="/about" className="text-gray-600 hover:text-gray-900">
                درباره ما
              </Link>
              <Link href="/contact" className="text-gray-600 hover:text-gray-900">
                تماس
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">بلاگ Vitrin.AI</h1>
          <p className="text-xl mb-8">آخرین مقالات و راهنماهای فروشگاه‌سازی آنلاین</p>

          {/* Search */}
          <div className="max-w-md mx-auto relative">
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

        {/* Blog Posts */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post) => (
            <Card key={post.id} className="hover:shadow-lg transition-shadow">
              <div className="relative">
                <img
                  src={post.image || `/placeholder.svg?height=200&width=400&query=${post.title}`}
                  alt={post.title}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                <Badge className="absolute top-4 right-4 bg-blue-600">{post.category}</Badge>
              </div>

              <CardHeader>
                <CardTitle className="line-clamp-2">{post.title}</CardTitle>
                <CardDescription className="line-clamp-3">{post.excerpt}</CardDescription>
              </CardHeader>

              <CardContent>
                <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
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
                  <span className="text-sm text-gray-500">{post.readTime} مطالعه</span>
                  <Button asChild variant="ghost" size="sm">
                    <Link href={`/blog/${post.id}`}>
                      ادامه مطالعه
                      <ArrowRight className="w-4 h-4 mr-2" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-lg font-semibold mb-2">مقاله‌ای یافت نشد</h3>
            <p className="text-gray-600">لطفاً جستجوی خود را تغییر دهید</p>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold text-lg mb-4">Vitrin.AI</h3>
              <p className="text-gray-400">پلتفرم هوشمند ساخت فروشگاه آنلاین</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">لینک‌های مفید</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/blog" className="hover:text-white">
                    بلاگ
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="hover:text-white">
                    درباره ما
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-white">
                    تماس با ما
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="hover:text-white">
                    شرایط و قوانین
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">خدمات</h4>
              <ul className="space-y-2 text-gray-400">
                <li>ساخت فروشگاه</li>
                <li>طراحی قالب</li>
                <li>پشتیبانی</li>
                <li>آموزش</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">تماس</h4>
              <ul className="space-y-2 text-gray-400">
                <li>info@vitrin.ai</li>
                <li>۰۲۱-۱۲۳۴۵۶۷۸</li>
                <li>تهران، ایران</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; ۱۴۰۳ Vitrin.AI. تمام حقوق محفوظ است.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
