import ordersData from "@/data/orders.json"

export interface OrderItem {
  id: number
  name: string
  price: number
  quantity: number
  image: string
}

export interface Order {
  id: string
  orderNumber: string
  date: string
  status: string
  items: OrderItem[]
  subtotal: number
  tax: number
  total: number
  paymentMethod: string
  location: {
    name: string
    address: string
  }
}

// Get all orders
export function getOrders(): Order[] {
  // In a real app, this would fetch from an API
  // For now, we'll combine JSON data with localStorage
  const localOrders = getLocalOrders()
  return [...ordersData, ...localOrders]
}

// Get a specific order by ID
export function getOrderById(id: string): Order | undefined {
  const allOrders = getOrders()
  return allOrders.find((order) => order.id === id)
}

// Get orders from localStorage
export function getLocalOrders(): Order[] {
  if (typeof window === "undefined") return []

  const storedOrders = localStorage.getItem("juiceOrders")
  if (!storedOrders) return []

  try {
    return JSON.parse(storedOrders)
  } catch (e) {
    console.error("Failed to parse orders from localStorage")
    return []
  }
}

// Save a new order
export function saveOrder(order: Order): void {
  if (typeof window === "undefined") return

  const existingOrders = getLocalOrders()

  // Check if this order is already saved
  const orderExists = existingOrders.some((o) => o.id === order.id)

  if (!orderExists) {
    const updatedOrders = [...existingOrders, order]
    localStorage.setItem("juiceOrders", JSON.stringify(updatedOrders))
  }
}

// Generate a new order ID
export function generateOrderId(): string {
  return Math.floor(Math.random() * 1000000)
    .toString()
    .padStart(6, "0")
}
