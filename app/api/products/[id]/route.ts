import { type NextRequest, NextResponse } from "next/server"
import mockData from "@/lib/mock-data.json"

function getUserFromToken(token: string | null) {
  if (!token) return null

  if (token.startsWith("mock_token_")) {
    const userId = token.replace("mock_token_", "")
    return mockData.users.find((u) => u.id === userId)
  }

  return null
}

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 400))

    // Find product
    const product = mockData.products.find((p) => p.id === params.id && p.is_active)
    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 })
    }

    // Find store
    const store = mockData.stores.find((s) => s.id === product.store_id)
    if (!store) {
      return NextResponse.json({ error: "Store not found" }, { status: 404 })
    }

    // Get product reviews
    const productReviews = mockData.reviews.filter((r) => r.product_id === product.id && r.is_approved)
    const averageRating =
      productReviews.length > 0
        ? productReviews.reduce((sum, review) => sum + review.rating, 0) / productReviews.length
        : 0

    const productWithDetails = {
      ...product,
      averageRating: Math.round(averageRating * 10) / 10,
      reviewCount: productReviews.length,
      store: {
        id: store.id,
        name: store.name,
        slug: store.slug,
        logo_url: store.logo_url,
        contact_info: store.contact_info,
      },
    }

    return NextResponse.json({ product: productWithDetails })
  } catch (error) {
    console.error("Product fetch error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 600))

    const updates = await request.json()

    // Get token from Authorization header
    const authHeader = request.headers.get("authorization")
    const token = authHeader?.replace("Bearer ", "")

    const user = getUserFromToken(token)
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Find product
    const product = mockData.products.find((p) => p.id === params.id)
    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 })
    }

    // Verify ownership
    const store = mockData.stores.find((s) => s.id === product.store_id && s.user_id === user.id)
    if (!store) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 })
    }

    // Mock update
    const updatedProduct = {
      ...product,
      ...updates,
      updated_at: new Date().toISOString(),
    }

    return NextResponse.json({ product: updatedProduct })
  } catch (error) {
    console.error("Product update error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 400))

    // Get token from Authorization header
    const authHeader = request.headers.get("authorization")
    const token = authHeader?.replace("Bearer ", "")

    const user = getUserFromToken(token)
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Find product
    const product = mockData.products.find((p) => p.id === params.id)
    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 })
    }

    // Verify ownership
    const store = mockData.stores.find((s) => s.id === product.store_id && s.user_id === user.id)
    if (!store) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 })
    }

    return NextResponse.json({ message: "Product deleted successfully" })
  } catch (error) {
    console.error("Product deletion error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
