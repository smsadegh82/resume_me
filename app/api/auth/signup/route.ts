import { type NextRequest, NextResponse } from "next/server"
import mockData from "@/lib/mock-data.json"

export async function POST(request: NextRequest) {
  try {
    const { email, password, fullName, phone, storeName, category } = await request.json()

    // Simulate processing delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Check if user already exists
    const existingUser = mockData.users.find((user) => user.email === email)
    if (existingUser) {
      return NextResponse.json({ error: "کاربری با این ایمیل قبلاً ثبت نام کرده است" }, { status: 400 })
    }

    // Mock successful response
    const mockUser = {
      id: "user_" + Date.now(),
      email,
      full_name: fullName,
      phone,
      avatar_url: null,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }

    const storeSlug = storeName
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "")

    const mockStore = {
      id: "store_" + Date.now(),
      user_id: mockUser.id,
      name: storeName,
      slug: storeSlug,
      category,
      description: `فروشگاه آنلاین ${storeName}`,
      logo_url: null,
      banner_url: null,
      theme: {
        primaryColor: "#3B82F6",
        secondaryColor: "#8B5CF6",
      },
      settings: {
        currency: "IRR",
        language: "fa",
        timezone: "Asia/Tehran",
        shipping: {
          freeShippingThreshold: 1000000,
          standardShippingCost: 30000,
          expressShippingCost: 50000,
        },
      },
      contact_info: {
        phone: phone,
      },
      is_active: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }

    // Generate mock token
    const token = "mock_token_" + Date.now()

    return NextResponse.json({
      message: "Account created successfully",
      user: mockUser,
      store: mockStore,
      token,
    })
  } catch (error) {
    console.error("Signup error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
