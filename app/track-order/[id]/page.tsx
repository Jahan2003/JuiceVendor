import Link from "next/link"
import { ArrowLeft, MapPin } from "lucide-react"

import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import OrderProgress from "@/components/order-progress"
import { Button } from "@/components/ui/button"

// This would normally come from a database
const getOrderDetails = (id: string) => {
  return {
    id: id,
    orderNumber: "ORD-" + id.padStart(6, "0"),
    date: new Date().toISOString(),
    status: "confirmed",
    items: [
      {
        id: 1,
        name: "Orange Sunrise",
        price: 4.99,
        quantity: 2,
        image: "/placeholder.svg?height=100&width=100",
      },
      {
        id: 3,
        name: "Berry Bliss",
        price: 5.49,
        quantity: 1,
        image: "/placeholder.svg?height=100&width=100",
      },
    ],
    subtotal: 15.47,
    tax: 1.24,
    total: 16.71,
    paymentMethod: "Visa •••• 4242",
    location: {
      name: "Downtown Vending Machine",
      address: "123 Main Street, City Center",
      coordinates: "40.7128° N, 74.0060° W",
    },
    estimatedPickup: "15 minutes",
  }
}

export default function TrackOrder({ params }: { params: { id: string } }) {
  const order = getOrderDetails(params.id)

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow bg-gray-50">
        <div className="container max-w-4xl py-12">
          <div className="mb-6">
            <Button asChild variant="outline" size="sm" className="mb-4">
              <Link href={`/order-confirmation/${order.id}`}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Order Details
              </Link>
            </Button>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Track Your Order</h1>
            <p className="text-gray-600">Order #{order.orderNumber}</p>
          </div>

          <OrderProgress status={order.status} estimatedTime={order.estimatedPickup} />

          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Pickup Location</h2>
            <div className="flex items-start gap-4">
              <MapPin className="h-5 w-5 text-green-600 mt-1" />
              <div>
                <p className="font-medium">{order.location.name}</p>
                <p className="text-gray-600 mb-2">{order.location.address}</p>
                <div className="aspect-video w-full bg-gray-200 rounded-lg">
                  {/* This would be a map in a real application */}
                  <div className="h-full w-full flex items-center justify-center text-gray-500">
                    Map would be displayed here
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Instructions</h2>
            <ol className="list-decimal list-inside space-y-2 text-gray-600 ml-2">
              <li>Proceed to the vending machine location shown on the map.</li>
              <li>
                Enter your order number <span className="font-medium">{order.orderNumber}</span> on the machine keypad.
              </li>
              <li>Follow the on-screen instructions to collect your fresh juices.</li>
              <li>Enjoy your healthy refreshment!</li>
            </ol>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
