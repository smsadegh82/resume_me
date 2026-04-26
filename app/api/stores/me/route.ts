import { type NextRequest, NextResponse } from "next/server"
import mockData from "@/lib/mock-data.json"

function getUserFromToken(token: string | null) {
  if (!token) return null

  // Extract user ID from mock token
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

    return NextResponse.json({ store })
  } catch (error) {
    console.error("Store fetch error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    const updates = await request.json()

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

    // Mock update - in real app this would update database
    const updatedStore = {
      ...store,
      ...updates,
      updated_at: new Date().toISOString(),
    }

    return NextResponse.json({ store: updatedStore })
  } catch (error) {
    console.error("Store update error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
