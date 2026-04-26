"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

// SVG Icons
const Target = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <circle strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} cx="12" cy="12" r="10" />
    <circle strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} cx="12" cy="12" r="6" />
    <circle strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} cx="12" cy="12" r="2" />
  </svg>
)

const Heart = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
    />
  </svg>
)

const Users = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
    <circle strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} cx="9" cy="7" r="4" />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"
    />
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

const Shield = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"
    />
  </svg>
)

const Award = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <circle strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} cx="12" cy="8" r="7" />
    <polyline
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      points="8.21,13.89 7,23 12,20 17,23 15.79,13.88"
    />
  </svg>
)

export default function AboutPage() {
  const features = [
    {
      icon: <Zap className="w-8 h-8" />,
      title: "سرعت بالا",
      description: "فروشگاه شما در کمتر از ۵ دقیقه آماده می‌شود",
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "امنیت کامل",
      description: "بالاترین استانداردهای امنیتی برای حفاظت از داده‌ها",
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "پشتیبانی ۲۴/۷",
      description: "تیم پشتیبانی ما همیشه در کنار شما هستند",
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: "کیفیت برتر",
      description: "بهترین کیفیت در طراحی و عملکرد",
    },
  ]

  const team = [
    {
      name: "علی احمدی",
      role: "مدیر عامل",
      image: "/team-1.jpg",
      description: "بیش از ۱۰ سال تجربه در حوزه فناوری",
    },
    {
      name: "سارا محمدی",
      role: "مدیر فنی",
      image: "/team-2.jpg",
      description: "متخصص طراحی UI/UX و توسعه فرانت‌اند",
    },
    {
      name: "محمد رضایی",
      role: "مدیر بازاریابی",
      image: "/team-3.jpg",
      description: "کارشناس بازاریابی دیجیتال و رشد کسب‌وکار",
    },
  ]

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
              <Link href="/blog" className="text-gray-600 hover:text-gray-900">
                بلاگ
              </Link>
              <Link href="/about" className="text-blue-600 font-semibold">
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
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">درباره Vitrin.AI</h1>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            ما با هدف ساده‌سازی فرآیند ساخت فروشگاه آنلاین و کمک به کسب‌وکارها برای ورود به دنیای دیجیتال تأسیس شدیم
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16">
        {/* Mission & Vision */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
          <Card className="text-center">
            <CardHeader>
              <Target className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <CardTitle>ماموریت ما</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                ماموریت ما این است که هر کسب‌وکاری، صرف‌نظر از اندازه و نوع آن، بتواند به راحتی و با کمترین هزینه، فروشگاه
                آنلاین حرفه‌ای خود را راه‌اندازی کند و در فضای دیجیتال موفق باشد.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <Heart className="w-12 h-12 text-purple-600 mx-auto mb-4" />
              <CardTitle>چشم‌انداز ما</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                چشم‌انداز ما تبدیل شدن به پیشرو در حوزه ساخت فروشگاه‌های آنلاین هوشمند در منطقه و کمک به دیجیتالی شدن
                هزاران کسب‌وکار است.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Features */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-12">چرا Vitrin.AI؟</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="text-blue-600 mx-auto mb-4">{feature.icon}</div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-sm">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Team */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-12">تیم ما</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="text-center">
                <CardHeader>
                  <img
                    src={member.image || `/placeholder.svg?height=150&width=150&query=${member.name}`}
                    alt={member.name}
                    className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                  />
                  <CardTitle>{member.name}</CardTitle>
                  <CardDescription className="text-blue-600 font-semibold">{member.role}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-sm">{member.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Stats */}
        <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl p-12 text-center">
          <h2 className="text-3xl font-bold mb-8">آمار ما</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="text-4xl font-bold mb-2">۱۰۰۰+</div>
              <div className="text-lg">فروشگاه فعال</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">۵۰۰۰+</div>
              <div className="text-lg">مشتری راضی</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">۹۹.۹%</div>
              <div className="text-lg">آپتایم سرور</div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="text-center mt-20">
          <h2 className="text-3xl font-bold mb-6">آماده شروع هستید؟</h2>
          <p className="text-xl text-gray-600 mb-8">همین امروز فروشگاه آنلاین خود را راه‌اندازی کنید</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600">
              <Link href="/register">شروع رایگان</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/contact">تماس با ما</Link>
            </Button>
          </div>
        </section>
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
