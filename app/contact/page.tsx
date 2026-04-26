"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import Link from "next/link"

// SVG Icons
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

const MapPin = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"
    />
    <circle strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} cx="12" cy="10" r="3" />
  </svg>
)

const Clock = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <circle strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} cx="12" cy="12" r="10" />
    <polyline strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} points="12,6 12,12 16,14" />
  </svg>
)

const Send = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <line strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} x1="22" y1="2" x2="11" y2="13" />
    <polygon strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} points="22,2 15,22 11,13 2,9 22,2" />
  </svg>
)

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setSubmitted(true)
    setIsSubmitting(false)
    setFormData({ name: "", email: "", subject: "", message: "" })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const contactInfo = [
    {
      icon: <Mail className="w-6 h-6" />,
      title: "ایمیل",
      content: "info@vitrin.ai",
      description: "پاسخ در کمتر از ۲۴ ساعت",
    },
    {
      icon: <Phone className="w-6 h-6" />,
      title: "تلفن",
      content: "۰۲۱-۱۲۳۴۵۶۷۸",
      description: "شنبه تا پنج‌شنبه، ۹ تا ۱۸",
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: "آدرس",
      content: "تهران، خیابان ولیعصر",
      description: "ساختمان تجاری پارس، طبقه ۱۰",
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "ساعات کاری",
      content: "شنبه تا پنج‌شنبه",
      description: "۹:۰۰ تا ۱۸:۰۰",
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
              <Link href="/about" className="text-gray-600 hover:text-gray-900">
                درباره ما
              </Link>
              <Link href="/contact" className="text-blue-600 font-semibold">
                تماس
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">تماس با ما</h1>
          <p className="text-xl mb-8">ما همیشه آماده پاسخگویی به سوالات شما هستیم</p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <Card>
            <CardHeader>
              <CardTitle>پیام خود را ارسال کنید</CardTitle>
              <CardDescription>فرم زیر را تکمیل کنید تا در اسرع وقت با شما تماس بگیریم</CardDescription>
            </CardHeader>
            <CardContent>
              {submitted ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold mb-2">پیام شما ارسال شد!</h3>
                  <p className="text-gray-600">به زودی با شما تماس خواهیم گرفت.</p>
                  <Button className="mt-4" onClick={() => setSubmitted(false)}>
                    ارسال پیام جدید
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">نام و نام خانوادگی</Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="نام خود را وارد کنید"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">ایمیل</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="example@email.com"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="subject">موضوع</Label>
                    <Input
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="موضوع پیام خود را وارد کنید"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="message">پیام</Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="پیام خود را اینجا بنویسید..."
                      rows={5}
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin ml-2" />
                        در حال ارسال...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 ml-2" />
                        ارسال پیام
                      </>
                    )}
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>

          {/* Contact Information */}
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-6">اطلاعات تماس</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {contactInfo.map((info, index) => (
                  <Card key={index} className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4 space-x-reverse">
                        <div className="text-blue-600 mt-1">{info.icon}</div>
                        <div>
                          <h3 className="font-semibold mb-1">{info.title}</h3>
                          <p className="text-gray-900 mb-1">{info.content}</p>
                          <p className="text-gray-600 text-sm">{info.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* FAQ */}
            <Card>
              <CardHeader>
                <CardTitle>سوالات متداول</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">چقدر طول می‌کشد تا فروشگاه من آماده شود؟</h4>
                  <p className="text-gray-600 text-sm">فروشگاه شما در کمتر از ۵ دقیقه آماده خواهد بود.</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">آیا پشتیبانی فنی ارائه می‌دهید؟</h4>
                  <p className="text-gray-600 text-sm">بله، تیم پشتیبانی ما ۲۴/۷ در خدمت شما هستند.</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">آیا می‌توانم قالب فروشگاهم را تغییر دهم؟</h4>
                  <p className="text-gray-600 text-sm">بله، شما می‌توانید در هر زمان قالب فروشگاه خود را تغییر دهید.</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Map Section */}
        <section className="mt-16">
          <Card>
            <CardHeader>
              <CardTitle>موقعیت ما</CardTitle>
              <CardDescription>آدرس دفتر مرکزی Vitrin.AI</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-200 h-64 rounded-lg flex items-center justify-center">
                <div className="text-center text-gray-600">
                  <MapPin className="w-12 h-12 mx-auto mb-4" />
                  <p>نقشه در اینجا نمایش داده خواهد شد</p>
                  <p className="text-sm">تهران، خیابان ولیعصر، ساختمان تجاری پارس</p>
                </div>
              </div>
            </CardContent>
          </Card>
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
