// Mock authentication system
let currentUser: any = null
let authToken: string | null = null

export const mockAuth = {
  // Sign up
  signUp: async (userData: any) => {
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const user = {
      id: "user_" + Date.now(),
      email: userData.email,
      full_name: userData.fullName,
      phone: userData.phone,
      created_at: new Date().toISOString(),
    }

    currentUser = user
    authToken = "mock_token_" + Date.now()

    // Store in localStorage for persistence
    if (typeof window !== "undefined") {
      localStorage.setItem("mock_user", JSON.stringify(user))
      localStorage.setItem("mock_token", authToken)
    }

    return { user, token: authToken }
  },

  // Sign in
  signIn: async (email: string, password: string) => {
    await new Promise((resolve) => setTimeout(resolve, 800))

    // Mock validation
    if (email === "demo@vitrin.ai" && password === "demo123") {
      const user = {
        id: "user_demo",
        email: "demo@vitrin.ai",
        full_name: "کاربر نمونه",
        phone: "09123456789",
      }

      currentUser = user
      authToken = "mock_token_demo"

      if (typeof window !== "undefined") {
        localStorage.setItem("mock_user", JSON.stringify(user))
        localStorage.setItem("mock_token", authToken)
      }

      return { user, token: authToken }
    }

    throw new Error("ایمیل یا رمز عبور اشتباه است")
  },

  // Sign out
  signOut: async () => {
    await new Promise((resolve) => setTimeout(resolve, 200))

    currentUser = null
    authToken = null

    if (typeof window !== "undefined") {
      localStorage.removeItem("mock_user")
      localStorage.removeItem("mock_token")
    }
  },

  // Get current user
  getCurrentUser: () => {
    if (currentUser) return currentUser

    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("mock_user")
      const storedToken = localStorage.getItem("mock_token")

      if (storedUser && storedToken) {
        currentUser = JSON.parse(storedUser)
        authToken = storedToken
        return currentUser
      }
    }

    return null
  },

  // Get auth token
  getToken: () => {
    if (authToken) return authToken

    if (typeof window !== "undefined") {
      return localStorage.getItem("mock_token")
    }

    return null
  },

  // Check if authenticated
  isAuthenticated: () => {
    return !!mockAuth.getToken()
  },
}
