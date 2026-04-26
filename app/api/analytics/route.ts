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
    await new Promise((resolve) => setTimeout(resolve, 500))

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

    const { searchParams } = new URL(request.url)
    const period = searchParams.get("period") || "30d"

    // Get analytics for the store
    const storeAnalytics = mockData.analytics.filter((a) => a.store_id === store.id)
    const storeOrders = mockData.orders.filter((o) => o.store_id === store.id)

    // Calculate summary stats
    const views = storeAnalytics.filter((a) => a.event_type === "store_view").length
    const productViews = storeAnalytics.filter((a) => a.event_type === "product_view").length
    const orders = storeOrders.length
    const revenue = storeOrders.reduce((sum, order) => sum + order.total, 0)

    // Generate daily stats for the last 7 days
    const dailyStats: { [key: string]: any } = {}
    const today = new Date()

    for (let i = 6; i >= 0; i--) {
      const date = new Date(today)
      date.setDate(date.getDate() - i)
      const dateStr = date.toISOString().split("T")[0]

      dailyStats[dateStr] = {
        views: Math.floor(Math.random() * 50) + 10,
        orders: Math.floor(Math.random() * 5),
        revenue: Math.floor(Math.random() * 2000000),
      }
    }

    const mockAnalytics = {
      summary: {
        views: views + Math.floor(Math.random() * 500) + 200,
        productViews: productViews + Math.floor(Math.random() * 300) + 100,
        orders,
        revenue,
      },
      dailyStats,
    }

    return NextResponse.json(mockAnalytics)
  } catch (error) {
    console.error("Analytics fetch error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
