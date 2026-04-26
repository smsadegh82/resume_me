"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import ModernMinimalTemplate from "@/components/templates/modern-minimal"
import ElegantDarkTemplate from "@/components/templates/elegant-dark"
import ColorfulVibrantTemplate from "@/components/templates/colorful-vibrant"
import templateSchema from "@/lib/template-schema.json"

interface Store {
  id: string
  name: string
  slug: string
  description: string
  logo_url: string | null
  banner_url: string | null
  category: string
  contact_info: any
}

interface Product {
  id: string
  name: string
  description: string
  price: number
  original_price: number | null
  images: string[]
  category: string
  tags: string[]
  variants: any
  inventory_count: number
  averageRating: number
  reviewCount: number
}

export default function TemplatePreviewPage() {
  const params = useParams()
  const storeName = params.storeName as string
  const templateId = params.templateId as string

  const [store, setStore] = useState<Store | null>(null)
  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    fetchStoreData()
  }, [storeName])

  const fetchStoreData = async () => {
    try {
      setIsLoading(true)
      const response = await fetch(`/api/stores/${storeName}`)

      if (!response.ok) {
        throw new Error("Store not found")
      }

      const data = await response.json()
      setStore(data.store)
      setProducts(data.store.products || [])
    } catch (error) {
      setError("خطا در بارگذاری فروشگاه")
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">در حال بارگذاری...</p>
        </div>
      </div>
    )
  }

  if (error || !store) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">خطا در بارگذاری</h1>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    )
  }

  // Get template settings
  const template = templateSchema.defaultTemplates.find((t) => t.id === templateId)
  const settings = template?.settings || templateSchema.defaultTemplates[0].settings

  // Render appropriate template
  const renderTemplate = () => {
    switch (templateId) {
      case "modern-minimal":
        return <ModernMinimalTemplate store={store} products={products} settings={settings} />
      case "elegant-dark":
        return <ElegantDarkTemplate store={store} products={products} settings={settings} />
      case "colorful-vibrant":
        return <ColorfulVibrantTemplate store={store} products={products} settings={settings} />
      default:
        return <ModernMinimalTemplate store={store} products={products} settings={settings} />
    }
  }

  return renderTemplate()
}
