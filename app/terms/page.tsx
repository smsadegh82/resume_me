"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

// SVG Icons
const FileText = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"
    />
    <polyline strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} points="14,2 14,8 20,8" />
    <line strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} x1="16" y1="13" x2="8" y2="13" />
    <line strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} x1="16" y1="17" x2="8" y2="17" />
    <polyline strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} points="10,9 9,9 8,9" />
  </svg>
)

export default function TermsPage() {
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
          <FileText className="w-16 h-16 mx-auto mb-4" />
          <h1 className="text-4xl md:text-5xl font-bold mb-4">شرایط و قوانین</h1>
          <p className="text-xl">قوانین استفاده از خدمات Vitrin.AI</p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <Card>
          <CardHeader>
            <CardTitle>شرایط و قوانین استفاده از Vitrin.AI</CardTitle>
            <CardDescription>آخرین بروزرسانی: ۱۴۰۳/۰۸/۱۵</CardDescription>
          </CardHeader>
          <CardContent className="prose prose-lg max-w-none">
            <div className="space-y-8">
              <section>
                <h2 className="text-2xl font-bold mb-4">۱. تعاریف</h2>
                <p className="text-gray-700 leading-relaxed">
                  در این قوانین، منظور از "سرویس" یا "خدمات" کلیه خدمات ارائه شده توسط پلتفرم Vitrin.AI است که شامل ساخت
                  فروشگاه آنلاین، میزبانی، پشتیبانی و سایر خدمات مرتبط می‌باشد.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">۲. پذیرش قوانین</h2>
                <p className="text-gray-700 leading-relaxed">
                  با استفاده از خدمات Vitrin.AI، شما این قوانین و شرایط را می‌پذیرید. در صورت عدم موافقت با هر یک از این
                  شرایط، لطفاً از استفاده از خدمات ما خودداری کنید.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">۳. حساب کاربری</h2>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  <li>شما مسئول حفظ امنیت حساب کاربری خود هستید</li>
                  <li>اطلاعات ارائه شده باید صحیح و به‌روز باشد</li>
                  <li>هر حساب کاربری تنها برای یک شخص یا سازمان قابل استفاده است</li>
                  <li>استفاده از حساب کاربری برای اهداف غیرقانونی ممنوع است</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">۴. استفاده مجاز</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  شما موافقت می‌کنید که از خدمات ما تنها برای اهداف قانونی و مطابق با این قوانین استفاده کنید. استفاده‌های
                  غیرمجاز شامل موارد زیر است:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  <li>انتشار محتوای غیرقانونی، مضر یا توهین‌آمیز</li>
                  <li>نقض حقوق مالکیت معنوی</li>
                  <li>ارسال اسپم یا محتوای تبلیغاتی غیرمجاز</li>
                  <li>تلاش برای نفوذ غیرمجاز به سیستم‌ها</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">۵. پرداخت و بازپرداخت</h2>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  <li>تمام پرداخت‌ها باید به موقع انجام شود</li>
                  <li>در صورت عدم پرداخت، خدمات ممکن است متوقف شود</li>
                  <li>بازپرداخت تنها در شرایط خاص و طبق سیاست‌های تعریف شده امکان‌پذیر است</li>
                  <li>تغییر قیمت‌ها با اطلاع قبلی انجام خواهد شد</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">۶. حریم خصوصی</h2>
                <p className="text-gray-700 leading-relaxed">
                  ما متعهد به حفظ حریم خصوصی شما هستیم. اطلاعات شخصی شما طبق سیاست حریم خصوصی ما محافظت می‌شود و تنها
                  برای ارائه خدمات بهتر استفاده خواهد شد.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">۷. مسئولیت</h2>
                <p className="text-gray-700 leading-relaxed">
                  Vitrin.AI تلاش می‌کند بهترین خدمات را ارائه دهد، اما مسئولیت محتوای فروشگاه‌ها و تراکنش‌های انجام شده بر
                  عهده کاربران است. ما در قبال خسارات غیرمستقیم مسئولیتی نداریم.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">۸. تغییرات</h2>
                <p className="text-gray-700 leading-relaxed">
                  ما حق تغییر این قوانین را در هر زمان محفوظ می‌داریم. تغییرات مهم از طریق ایمیل یا اعلان در سایت
                  اطلاع‌رسانی خواهد شد.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">۹. قانون حاکم</h2>
                <p className="text-gray-700 leading-relaxed">
                  این قوانین تحت قوانین جمهوری اسلامی ایران تنظیم شده و هرگونه اختلاف در محاکم صالح ایران رسیدگی خواهد
                  شد.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">۱۰. تماس با ما</h2>
                <p className="text-gray-700 leading-relaxed">
                  در صورت داشتن سوال یا ابهام در مورد این قوانین، می‌توانید از طریق ایمیل info@vitrin.ai یا تلفن
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
