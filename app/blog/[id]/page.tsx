"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { useParams } from "next/navigation"

// SVG Icons
const ArrowLeft = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <line strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} x1="19" y1="12" x2="5" y2="12" />
    <polyline strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} points="12,19 5,12 12,5" />
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

const Clock = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <circle strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} cx="12" cy="12" r="10" />
    <polyline strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} points="12,6 12,12 16,14" />
  </svg>
)

const blogPosts = {
  "1": {
    id: "1",
    title: "راهنمای کامل راه‌اندازی فروشگاه آنلاین",
    excerpt: "در این مقاله به طور کامل نحوه راه‌اندازی یک فروشگاه آنلاین موفق را بررسی می‌کنیم...",
    content: `
      <h2>مقدمه</h2>
      <p>راه‌اندازی یک فروشگاه آنلاین موفق نیازمند برنامه‌ریزی دقیق و اجرای صحیح است. در این مقاله، تمام مراحل لازم برای ایجاد یک فروشگاه آنلاین حرفه‌ای را بررسی خواهیم کرد.</p>
      
      <h2>گام اول: انتخاب محصولات</h2>
      <p>اولین و مهم‌ترین قدم در راه‌اندازی فروشگاه آنلاین، انتخاب محصولات مناسب است. باید محصولاتی را انتخاب کنید که:</p>
      <ul>
        <li>تقاضای بازار برای آن‌ها وجود داشته باشد</li>
        <li>سود مناسبی داشته باشند</li>
        <li>امکان ارسال آسان داشته باشند</li>
      </ul>
      
      <h2>گام دوم: انتخاب پلتفرم</h2>
      <p>انتخاب پلتفرم مناسب برای ساخت فروشگاه بسیار مهم است. Vitrin.AI یکی از بهترین گزینه‌ها برای این منظور محسوب می‌شود.</p>
      
      <h2>گام سوم: طراحی و محتوا</h2>
      <p>طراحی جذاب و محتوای با کیفیت از عوامل کلیدی موفقیت فروشگاه آنلاین هستند.</p>
      
      <h2>نتیجه‌گیری</h2>
      <p>با دنبال کردن این مراحل، می‌توانید فروشگاه آنلاین موفقی راه‌اندازی کنید.</p>
    `,
    author: "تیم Vitrin.AI",
    date: "۱۴۰۳/۰۸/۱۵",
    category: "آموزش",
    image: "/blog-1.jpg",
    readTime: "۵ دقیقه",
  },
  "2": {
    id: "2",
    title: "بهترین استراتژی‌های بازاریابی دیجیتال",
    excerpt: "کسب‌وکارهای آنلاین برای موفقیت نیاز به استراتژی‌های بازاریابی مؤثر دارند...",
    content: `
      <h2>اهمیت بازاریابی دیجیتال</h2>
      <p>در عصر دیجیتال، بازاریابی آنلاین یکی از مهم‌ترین عوامل موفقیت کسب‌وکارها محسوب می‌شود.</p>
      
      <h2>استراتژی‌های کلیدی</h2>
      <ul>
        <li>بازاریابی محتوایی</li>
        <li>تبلیغات در شبکه‌های اجتماعی</li>
        <li>ایمیل مارکتینگ</li>
        <li>سئو و بهینه‌سازی</li>
      </ul>
    `,
    author: "علی احمدی",
    date: "۱۴۰۳/۰۸/۱۰",
    category: "بازاریابی",
    image: "/blog-2.jpg",
    readTime: "۷ دقیقه",
  },
}

export default function BlogPostPage() {
  const params = useParams()
  const postId = params.id as string
  const [post, setPost] = useState<any>(null)

  useEffect(() => {
    const foundPost = blogPosts[postId as keyof typeof blogPosts]
    setPost(foundPost || null)
  }, [postId])

  if (!post) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">مقاله یافت نشد</h1>
          <Button asChild>
            <Link href="/blog">بازگشت به بلاگ</Link>
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
            <Link href="/" className="flex items-center space-x-2 space-x-reverse">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">V</span>
              </div>
              <span className="text-xl font-bold">Vitrin.AI</span>
            </Link>

            <Button asChild variant="outline">
              <Link href="/blog">
                <ArrowLeft className="w-4 h-4 ml-2" />
                بازگشت به بلاگ
              </Link>
            </Button>
          </div>
        </div>
      </header>

      <article className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Article Header */}
        <div className="mb-8">
          <Badge className="mb-4">{post.category}</Badge>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">{post.title}</h1>

          <div className="flex flex-wrap items-center gap-4 text-gray-600 mb-6">
            <div className="flex items-center space-x-2 space-x-reverse">
              <User className="w-4 h-4" />
              <span>{post.author}</span>
            </div>
            <div className="flex items-center space-x-2 space-x-reverse">
              <Calendar className="w-4 h-4" />
              <span>{post.date}</span>
            </div>
            <div className="flex items-center space-x-2 space-x-reverse">
              <Clock className="w-4 h-4" />
              <span>{post.readTime} مطالعه</span>
            </div>
          </div>

          <img
            src={post.image || `/placeholder.svg?height=400&width=800&query=${post.title}`}
            alt={post.title}
            className="w-full h-64 md:h-96 object-cover rounded-lg"
          />
        </div>

        {/* Article Content */}
        <div className="prose prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: post.content }} />

        {/* Article Footer */}
        <div className="mt-12 pt-8 border-t">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4 space-x-reverse">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                {post.author.charAt(0)}
              </div>
              <div>
                <h4 className="font-semibold">{post.author}</h4>
                <p className="text-gray-600 text-sm">نویسنده مقاله</p>
              </div>
            </div>

            <Button asChild>
              <Link href="/blog">مقالات بیشتر</Link>
            </Button>
          </div>
        </div>
      </article>
    </div>
  )
}
