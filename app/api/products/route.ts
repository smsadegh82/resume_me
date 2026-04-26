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

export async function GET(request: NextRequest) {
  try {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 300))

    // Get token from Authorization header
    const authHeader = request.headers.get("authorization")
    const token = authHeader?.replace("Bearer ", "")

    const user = getUserFromToken(token)
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Find user's store
    const store = mockData.stores.find((s) => s.user_id === user.id)
    if (!store) {
      return NextResponse.json({ error: "Store not found" }, { status: 404 })
    }

    // Get store products
    const products = mockData.products.filter((p) => p.store_id === store.id)

    return NextResponse.json({ products })
  } catch (error) {
    console.error("Products fetch error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 800))

    const productData = await request.json()

    // Get token from Authorization header
    const authHeader = request.headers.get("authorization")
    const token = authHeader?.replace("Bearer ", "")

    const user = getUserFromToken(token)
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Find user's store
    const store = mockData.stores.find((s) => s.user_id === user.id)
    if (!store) {
      return NextResponse.json({ error: "Store not found" }, { status: 404 })
    }

    // Mock product creation
    const newProduct = {
      id: "product_" + Date.now(),
      store_id: store.id,
      ...productData,
      is_active: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }

    return NextResponse.json({ product: newProduct })
  } catch (error) {
    console.error("Product creation error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
