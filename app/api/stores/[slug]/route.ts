import { type NextRequest, NextResponse } from "next/server"
import mockData from "@/lib/mock-data.json"

export async function GET(request: NextRequest, { params }: { params: { slug: string } }) {
  try {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    // Find store by slug
    const store = mockData.stores.find((s) => s.slug === params.slug && s.is_active)

    if (!store) {
      return NextResponse.json({ error: "Store not found" }, { status: 404 })
    }

    // Get store products
    const products = mockData.products.filter((p) => p.store_id === store.id && p.is_active)

    // Add mock ratings to products
    const productsWithRatings = products.map((product) => {
      const productReviews = mockData.reviews.filter((r) => r.product_id === product.id && r.is_approved)
      const averageRating =
        productReviews.length > 0
          ? productReviews.reduce((sum, review) => sum + review.rating, 0) / productReviews.length
          : 0

      return {
        ...product,
        averageRating: Math.round(averageRating * 10) / 10,
        reviewCount: productReviews.length,
      }
    })

    return NextResponse.json({
      store: {
        ...store,
        products: productsWithRatings,
      },
    })
  } catch (error) {
    console.error("Store fetch error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
