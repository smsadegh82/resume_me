import { type NextRequest, NextResponse } from "next/server"
import mockData from "@/lib/mock-data.json"

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    // Simulate processing delay
    await new Promise((resolve) => setTimeout(resolve, 800))

    // Find user in mock data
    const user = mockData.users.find((u) => u.email === email)

    if (!user) {
      return NextResponse.json({ error: "کاربری با این ایمیل یافت نشد" }, { status: 400 })
    }

    // Mock password validation (in real app, you'd hash and compare)
    const validPasswords: { [key: string]: string } = {
      "demo@vitrin.ai": "demo123",
      "maryam@example.com": "maryam123",
    }

    if (validPasswords[email] !== password) {
      return NextResponse.json({ error: "رمز عبور اشتباه است" }, { status: 400 })
    }

    // Find user's store
    const store = mockData.stores.find((s) => s.user_id === user.id)

    // Generate mock token
    const token = "mock_token_" + user.id

    return NextResponse.json({
      message: "Login successful",
      user,
      store,
      token,
    })
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
