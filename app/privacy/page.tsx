"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

// SVG Icons
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

export default function PrivacyPage() {
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
          <Shield className="w-16 h-16 mx-auto mb-4" />
          <h1 className="text-4xl md:text-5xl font-bold mb-4">حریم خصوصی</h1>
          <p className="text-xl">سیاست حفاظت از اطلاعات شخصی شما</p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <Card>
          <CardHeader>
            <CardTitle>سیاست حریم خصوصی Vitrin.AI</CardTitle>
            <CardDescription>آخرین بروزرسانی: ۱۴۰۳/۰۸/۱۵</CardDescription>
          </CardHeader>
          <CardContent className="prose prose-lg max-w-none">
            <div className="space-y-8">
              <section>
                <h2 className="text-2xl font-bold mb-4">۱. مقدمه</h2>
                <p className="text-gray-700 leading-relaxed">
                  در Vitrin.AI، حفاظت از حریم خصوصی شما برای ما بسیار مهم است. این سیاست توضیح می‌دهد که چگونه اطلاعات
                  شخصی شما را جمع‌آوری، استفاده و محافظت می‌کنیم.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">۲. اطلاعات جمع‌آوری شده</h2>
                <p className="text-gray-700 leading-relaxed mb-4">ما انواع مختلفی از اطلاعات را جمع‌آوری می‌کنیم:</p>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  <li>
                    <strong>اطلاعات شخصی:</strong> نام، ایمیل، شماره تلفن
                  </li>
                  <li>
                    <strong>اطلاعات حساب:</strong> نام کاربری، رمز عبور
                  </li>
                  <li>
                    <strong>اطلاعات فروشگاه:</strong> نام فروشگاه، محصولات، تنظیمات
                  </li>
                  <li>
                    <strong>اطلاعات فنی:</strong> آدرس IP، نوع مرورگر، سیستم عامل
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">۳. نحوه استفاده از اطلاعات</h2>
                <p className="text-gray-700 leading-relaxed mb-4">اطلاعات شما برای اهداف زیر استفاده می‌شود:</p>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  <li>ارائه و بهبود خدمات</li>
                  <li>پشتیبانی از کاربران</li>
                  <li>ارسال اطلاعیه‌های مهم</li>
                  <li>تحلیل و بهبود عملکرد سایت</li>
                  <li>جلوگیری از سوء استفاده</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">۴. اشتراک‌گذاری اطلاعات</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  ما اطلاعات شخصی شما را با اشخاص ثالث به اشتراک نمی‌گذاریم، مگر در موارد زیر:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  <li>با رضایت صریح شما</li>
                  <li>برای ارائه خدمات درخواستی</li>
                  <li>در صورت الزام قانونی</li>
                  <li>برای محافظت از حقوق ما یا دیگران</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">۵. امنیت اطلاعات</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  ما از روش‌های مختلف برای محافظت از اطلاعات شما استفاده می‌کنیم:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  <li>رمزگذاری SSL برای انتقال داده‌ها</li>
                  <li>رمزگذاری پایگاه داده</li>
                  <li>کنترل دسترسی محدود</li>
                  <li>نظارت مداوم بر امنیت</li>
                  <li>پشتیبان‌گیری منظم</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">۶. کوکی‌ها</h2>
                <p className="text-gray-700 leading-relaxed">
                  ما از کوکی‌ها برای بهبود تجربه کاربری استفاده می‌کنیم. شما می‌توانید تنظیمات کوکی‌ها را در مرورگر خود
                  تغییر دهید، اما این ممکن است بر عملکرد برخی قسمت‌های سایت تأثیر بگذارد.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">۷. حقوق شما</h2>
                <p className="text-gray-700 leading-relaxed mb-4">شما حقوق زیر را در مورد اطلاعات شخصی‌تان دارید:</p>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  <li>دسترسی به اطلاعات شخصی</li>
                  <li>تصحیح اطلاعات نادرست</li>
                  <li>حذف اطلاعات شخصی</li>
                  <li>محدود کردن پردازش</li>
                  <li>انتقال اطلاعات</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">۸. نگهداری اطلاعات</h2>
                <p className="text-gray-700 leading-relaxed">
                  اطلاعات شما تا زمانی که حساب شما فعال است یا برای ارائه خدمات لازم است، نگهداری می‌شود. پس از حذف حساب،
                  اطلاعات شخصی در مدت زمان مشخص حذف خواهد شد.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">۹. تغییرات سیاست</h2>
                <p className="text-gray-700 leading-relaxed">
                  ما ممکن است این سیاست حریم خصوصی را به‌روزرسانی کنیم. تغییرات مهم از طریق ایمیل یا اعلان در سایت
                  اطلاع‌رسانی خواهد شد.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">۱۰. تماس با ما</h2>
                <p className="text-gray-700 leading-relaxed">
                  اگر سوالی در مورد این سیاست حریم خصوصی دارید، می‌توانید از طریق ایمیل privacy@vitrin.ai یا تلفن
                  ۰۲۱-۱۲۳۴۵۶۷۸ با ما تماس بگیرید.
                </p>
              </section>
            </div>
          </CardContent>
        </Card>

        <div className="text-center mt-8">
          <Button asChild>
            <Link href="/">بازگشت به صفحه اصلی</Link>
          </Button>
        </div>
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
