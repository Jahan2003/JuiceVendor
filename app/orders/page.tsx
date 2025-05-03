"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { format } from "date-fns"
import { Eye } from "lucide-react"

import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { getOrders, type Order } from "@/lib/orders"

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([])
  const [activeTab, setActiveTab] = useState("all")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Fetch orders
    setOrders(getOrders())
    setIsLoading(false)
  }, [])

  const filteredOrders =
    activeTab === "all"
      ? orders
      : orders.filter((order) => {
          const orderDate = new Date(order.date)
          const now = new Date()

          if (activeTab === "recent") {
            // Last 7 days
            const sevenDaysAgo = new Date(now.setDate(now.getDate() - 7))
            return orderDate >= sevenDaysAgo
          }

          return false
        })

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow bg-gray-50 py-12">
        <div className="container max-w-4xl mx-auto px-3">
          <h1 className="text-2xl md:text-3xl font-bold mb-2">My Orders</h1>
          <p className="text-gray-600 mb-8">View and track your juice orders</p>

          <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-8">
              <TabsTrigger value="all">All Orders</TabsTrigger>
              <TabsTrigger value="recent">Recent (7 days)</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-6">
              {isLoading ? (
                <div className="text-center py-12 bg-white rounded-lg shadow-sm">
                  <p>Loading orders...</p>
                </div>
              ) : filteredOrders.length === 0 ? (
                <div className="text-center py-12 bg-white rounded-lg shadow-sm">
                  <h3 className="text-lg font-medium mb-2">No orders found</h3>
                  <p className="text-gray-500 mb-6">You haven't placed any orders yet.</p>
                  <Button asChild className="bg-green-600 hover:bg-green-700">
                    <Link href="/dashboard">Browse Juices</Link>
                  </Button>
                </div>
              ) : (
                filteredOrders.map((order) => <OrderCard key={order.id} order={order} />)
              )}
            </TabsContent>

            <TabsContent value="recent" className="space-y-6">
              {isLoading ? (
                <div className="text-center py-12 bg-white rounded-lg shadow-sm">
                  <p>Loading orders...</p>
                </div>
              ) : filteredOrders.length === 0 ? (
                <div className="text-center py-12 bg-white rounded-lg shadow-sm">
                  <h3 className="text-lg font-medium mb-2">No recent orders</h3>
                  <p className="text-gray-500 mb-6">You haven't placed any orders in the last 7 days.</p>
                  <Button asChild className="bg-green-600 hover:bg-green-700">
                    <Link href="/dashboard">Order Now</Link>
                  </Button>
                </div>
              ) : (
                filteredOrders.map((order) => <OrderCard key={order.id} order={order} />)
              )}
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  )
}

function OrderCard({ order }: { order: Order }) {
  const statusColors = {
    pending: "bg-yellow-100 text-yellow-800",
    confirmed: "bg-blue-100 text-blue-800",
    completed: "bg-green-100 text-green-800",
    cancelled: "bg-red-100 text-red-800",
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-6 border-b">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-3">
              <h3 className="font-medium">Order #{order.orderNumber}</h3>
              <Badge className={statusColors["completed"] || "bg-gray-100"}>
                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
              </Badge>
            </div>
            <p className="text-sm text-gray-500">{format(new Date(order.date), "MMM d, yyyy 'at' h:mm a")}</p>
          </div>
          <Button asChild variant="outline" size="sm">
            <Link href={`/order-confirmation/${order.id}`}>
              <Eye className="h-4 w-4 mr-2" />
              View Details
            </Link>
          </Button>
        </div>
      </div>

      <div className="p-6">
        <div className="flex flex-wrap gap-4 mb-4">
          {order.items.map((item) => (
            <div key={`${order.id}-${item.id}`} className="flex items-center gap-3">
              <div className="relative h-12 w-12 rounded-md overflow-hidden bg-gray-100">
                <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
              </div>
              <div>
                <p className="font-medium text-sm">{item.name}</p>
                <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap justify-between items-center mt-4 pt-4 border-t">
          <div>
            <p className="text-sm text-gray-500">Pickup Location</p>
            <p className="font-medium">{order.location.name}</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500">Total</p>
            <p className="font-medium text-lg">Rs. {order.total.toFixed(2)}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
