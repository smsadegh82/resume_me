'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Progress } from '@/components/ui/progress'
import { ShoppingBag, ArrowRight, Check, AlertCircle, Eye, EyeOff, Loader2 } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function RegisterPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    storeName: '',
    category: '',
    password: '',
    confirmPassword: ''
  })
  const [agreed, setAgreed] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const totalSteps = 3
  const progress = (currentStep / totalSteps) * 100

  const validateStep = (step: number) => {
    switch (step) {
      case 1:
        return formData.fullName && formData.email && formData.phone
      case 2:
        return formData.storeName && formData.category
      case 3:
        return formData.password && formData.confirmPassword && formData.password === formData.confirmPassword && agreed
      default:
        return false
    }
  }

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, totalSteps))
      setError('')
    } else {
      setError('لطفاً تمام فیلدهای الزامی را تکمیل کنید')
    }
  }

  const handleBack = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1))
    setError('')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateStep(3)) {
      setError('لطفاً تمام فیلدها را صحیح تکمیل کنید')
      return
    }

    if (formData.password !== formData.confirmPassword) {
      setError('رمز عبور و تأیید آن یکسان نیستند')
      return
    }

    setIsLoading(true)
    setError('')

    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'خطا در ایجاد حساب کاربری')
      }

      setSuccess('حساب کاربری با موفقیت ایجاد شد! در حال انتقال به داشبورد...')
      
      // Wait a bit then redirect
      setTimeout(() => {
        router.push('/dashboard')
      }, 2000)

    } catch (error: any) {
      setError(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  const categories = [
    { value: 'fashion', label: 'پوشاک و فشن', icon: '👗' },
    { value: 'food', label: 'غذا و نوشیدنی', icon: '🍕' },
    { value: 'electronics', label: 'الکترونیک', icon: '📱' },
    { value: 'beauty', label: 'آرایشی و بهداشتی', icon: '💄' },
    { value: 'home', label: 'خانه و آشپزخانه', icon: '🏠' },
    { value: 'art', label: 'هنر و صنایع دستی', icon: '🎨' },
    { value: 'books', label: 'کتاب و لوازم التحریر', icon: '📚' },
    { value: 'other', label: 'سایر موارد', icon: '🛍️' }
  ]

  const benefits = [
    'فروشگاه آنلاین رایگان',
    'طراحی خودکار با هوش مصنوعی', 
    'افزودن محصولات از تلگرام/اینستاگرام',
    'لینک اختصاصی فروشگاه',
    'پشتیبانی ۲۴/۷',
    'بدون محدودیت تعداد محصول'
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4" dir="rtl">
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* Left side - Benefits */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-8"
        >
          <div className="text-center lg:text-right">
            <Link href="/" className="inline-flex items-center space-x-2 space-x-reverse mb-8">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <ShoppingBag className="w-7 h-7 text-white" />
              </div>
              <span className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Vitrin.AI
              </span>
            </Link>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              فروشگاه آنلاین خودت رو بساز
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              ساده، سریع و با هوش مصنوعی
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold mb-6">چرا Vitrin.AI؟</h2>
            {benefits.map((benefit, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center space-x-3 space-x-reverse"
              >
                <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Check className="w-4 h-4 text-green-600" />
                </div>
                <span className="text-gray-700">{benefit}</span>
              </motion.div>
            ))}
          </div>

          <div className="hidden lg:block">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100"
            >
              <div className="text-center">
                <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                  +۱۰,۰۰۰
                </div>
                <div className="text-gray-600 text-lg">فروشگاه فعال</div>
                <div className="text-sm text-gray-500 mt-2">و در حال رشد...</div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Right side - Signup Form */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          className="w-full max-w-md mx-auto"
        >
          <Card className="border-0 shadow-2xl bg-white/95 backdrop-blur-sm">
            <CardHeader className="text-center pb-4">
              <div className="flex items-center justify-between mb-4">
                <CardTitle className="text-2xl">ایجاد حساب کاربری</CardTitle>
                <div className="text-sm text-gray-500">
                  {currentStep} از {totalSteps}
                </div>
              </div>
              <Progress value={progress} className="h-2 mb-4" />
              <CardDescription>
                {currentStep === 1 && 'اطلاعات شخصی خود را وارد کنید'}
                {currentStep === 2 && 'اطلاعات فروشگاه خود را تنظیم کنید'}
                {currentStep === 3 && 'رمز عبور خود را تعیین کنید'}
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <AnimatePresence mode="wait">
                  {/* Step 1: Personal Information */}
                  {currentStep === 1 && (
                    <motion.div
                      key="step1"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-4"
                    >
                      <div>
                        <Label htmlFor="fullName">نام و نام خانوادگی *</Label>
                        <Input
                          id="fullName"
                          type="text"
                          required
                          value={formData.fullName}
                          onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                          className="mt-1 h-12"
                          placeholder="مثال: علی احمدی"
                        />
                      </div>

                      <div>
                        <Label htmlFor="email">ایمیل *</Label>
                        <Input
                          id="email"
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({...formData, email: e.target.value})}
                          className="mt-1 h-12"
                          placeholder="example@email.com"
                        />
                      </div>

                      <div>
                        <Label htmlFor="phone">شماره موبایل *</Label>
                        <Input
                          id="phone"
                          type="tel"
                          required
                          placeholder="09123456789"
                          value={formData.phone}
                          onChange={(e) => setFormData({...formData, phone: e.target.value})}
                          className="mt-1 h-12"
                        />
                      </div>
                    </motion.div>
                  )}

                  {/* Step 2: Store Information */}
                  {currentStep === 2 && (
                    <motion.div
                      key="step2"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-4"
                    >
                      <div>
                        <Label htmlFor="storeName">نام فروشگاه *</Label>
                        <Input
                          id="storeName"
                          type="text"
                          required
                          placeholder="مثال: مریم فشن"
                          value={formData.storeName}
                          onChange={(e) => setFormData({...formData, storeName: e.target.value})}
                          className="mt-1 h-12"
                        />
                        {formData.storeName && (
                          <p className="text-xs text-gray-500 mt-1">
                            آدرس فروشگاه: vitrin.ai/v/{formData.storeName.toLowerCase().replace(/\s+/g, '-')}
                          </p>
                        )}
                      </div>

                      <div>
                        <Label htmlFor="category">دسته‌بندی محصولات *</Label>
                        <div className="grid grid-cols-2 gap-2 mt-2">
                          {categories.map((category) => (
                            <button
                              key={category.value}
                              type="button"
                              onClick={() => setFormData({...formData, category: category.value})}
                              className={`p-3 rounded-lg border-2 transition-all text-sm ${
                                formData.category === category.value
                                  ? 'border-blue-500 bg-blue-50 text-blue-700'
                                  : 'border-gray-200 hover:border-gray-300'
                              }`}
                            >
                              <div className="text-lg mb-1">{category.icon}</div>
                              <div className="font-medium">{category.label}</div>
                            </button>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Step 3: Password */}
                  {currentStep === 3 && (
                    <motion.div
                      key="step3"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-4"
                    >
                      <div>
                        <Label htmlFor="password">رمز عبور *</Label>
                        <div className="relative">
                          <Input
                            id="password"
                            type={showPassword ? "text" : "password"}
                            required
                            value={formData.password}
                            onChange={(e) => setFormData({...formData, password: e.target.value})}
                            className="mt-1 h-12 pl-10"
                            placeholder="حداقل ۸ کاراکتر"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                          >
                            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </button>
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="confirmPassword">تأیید رمز عبور *</Label>
                        <div className="relative">
                          <Input
                            id="confirmPassword"
                            type={showConfirmPassword ? "text" : "password"}
                            required
                            value={formData.confirmPassword}
                            onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                            className="mt-1 h-12 pl-10"
                            placeholder="رمز عبور را مجدداً وارد کنید"
                          />
                          <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                          >
                            {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </button>
                        </div>
                        {formData.password && formData.confirmPassword && formData.password !== formData.confirmPassword && (
                          <p className="text-xs text-red-500 mt-1">رمز عبور و تأیید آن یکسان نیستند</p>
                        )}
                      </div>

                      <div className="flex items-start space-x-2 space-x-reverse">
                        <Checkbox
                          id="terms"
                          checked={agreed}
                          onCheckedChange={(checked) => setAgreed(checked as boolean)}
                          className="mt-1"
                        />
                        <Label htmlFor="terms" className="text-sm cursor-pointer leading-relaxed">
                          با{' '}
                          <Link href="/terms" className="text-blue-600 hover:underline">
                            شرایط و قوانین
                          </Link>
                          {' '}و{' '}
                          <Link href="/privacy" className="text-blue-600 hover:underline">
                            حریم خصوصی
                          </Link>
                          {' '}موافقم
                        </Label>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Error/Success Messages */}
                <AnimatePresence>
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                    >
                      <Alert className="border-red-200 bg-red-50">
                        <AlertCircle className="h-4 w-4 text-red-600" />
                        <AlertDescription className="text-red-700">
                          {error}
                        </AlertDescription>
                      </Alert>
                    </motion.div>
                  )}

                  {success && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                    >
                      <Alert className="border-green-200 bg-green-50">
                        <Check className="h-4 w-4 text-green-600" />
                        <AlertDescription className="text-green-700">
                          {success}
                        </AlertDescription>
                      </Alert>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Navigation Buttons */}
                <div className="flex justify-between pt-4">
                  {currentStep > 1 && (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleBack}
                      disabled={isLoading}
                    >
                      قبلی
                    </Button>
                  )}
                  
                  <div className="mr-auto">
                    {currentStep < totalSteps ? (
                      <Button
                        type="button"
                        onClick={handleNext}
                        disabled={!validateStep(currentStep) || isLoading}
                        className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                      >
                        بعدی
                        <ArrowRight className="w-4 h-4 mr-2" />
                      </Button>
                    ) : (
                      <Button 
                        type="submit" 
                        disabled={!validateStep(3) || isLoading}
                        className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                      >
                        {isLoading ? (
                          <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            در حال ایجاد...
                          </>
                        ) : (
                          <>
                            ایجاد فروشگاه
                            <ArrowRight className="w-4 h-4 mr-2" />
                          </>
                        )}
                      </Button>
                    )}
                  </div>
                </div>

                <div className="text-center text-sm text-gray-600 pt-4 border-t">
                  قبلاً حساب دارید؟{' '}
                  <Link href="/login" className="text-blue-600 hover:underline font-medium">
                    وارد شوید
                  </Link>
                </div>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
