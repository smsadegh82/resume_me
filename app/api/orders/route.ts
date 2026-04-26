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

export async function POST(request: NextRequest) {
  try {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const orderData = await request.json()

    // Mock order creation
    const newOrder = {
      id: "order_" + Date.now(),
      ...orderData,
      status: "pending",
      payment_status: orderData.payment_method === "online" ? "pending" : "pending",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }

    return NextResponse.json({ order: newOrder })
  } catch (error) {
    console.error("Order creation error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
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

    // Get store orders
    const orders = mockData.orders.filter((o) => o.store_id === store.id)

    return NextResponse.json({ orders })
  } catch (error) {
    console.error("Orders fetch error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
