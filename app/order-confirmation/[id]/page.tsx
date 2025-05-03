"use client"

import { useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { CheckCircle2, Printer, ArrowLeft, MapPin, CreditCard } from "lucide-react"

import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { getOrderById, saveOrder } from "@/lib/orders"

export default function OrderConfirmation({ params }: { params: { id: string } }) {
  const order = getOrderById(params.id)

  // If order doesn't exist, create a placeholder
  const orderDetails = order 
  || {
    id: params.id,
    orderNumber: "ORD-" + params.id.padStart(6, "0"),
    date: new Date().toISOString(),
    status: "completed",
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
    },
  }

  // Save order to localStorage for order history
  useEffect(() => {
    if (!order) {
      saveOrder(orderDetails)
    }
  }, [order, orderDetails])

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow bg-gray-50">
        <div className="container max-w-4xl py-12 mx-auto">
          {/* Success Message */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
              <CheckCircle2 className="h-8 w-8 text-green-600" />
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">Order Confirmed!</h1>
            <p className="text-gray-600 mb-4">
              Thank you for your order. Your juices will be ready for pickup shortly.
            </p>
            <p className="text-sm text-gray-500">A confirmation has been sent to your email address.</p>
          </div>

          {/* Order Details */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
            <div className="border-b p-6">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-semibold text-gray-800">Order #{orderDetails.orderNumber}</h2>
                  <p className="text-gray-500">
                    Placed on {new Date(orderDetails.date).toLocaleDateString()} at{" "}
                    {new Date(orderDetails.date).toLocaleTimeString()}
                  </p>
                </div>
                <Button variant="outline" size="sm" className="flex items-center gap-2">
                  <Printer className="h-4 w-4" />
                  Print Receipt
                </Button>
              </div>
            </div>

            <div className="p-6">
              <h3 className="font-medium text-gray-800 mb-4">Order Summary</h3>

              <div className="divide-y">
                {orderDetails.items.map((item) => (
                  <div key={item.id} className="py-4 flex items-center">
                    <div className="relative h-16 w-16 rounded-md overflow-hidden bg-gray-100 flex-shrink-0">
                      <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                    </div>
                    <div className="ml-4 flex-grow">
                      <h4 className="font-medium text-gray-800">{item.name}</h4>
                      <p className="text-gray-500">Qty: {item.quantity}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">Rs. {(item.price * item.quantity).toFixed(2)}</p>
                      <p className="text-sm text-gray-500">Rs. {item.price.toFixed(2)} each</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t mt-4 pt-4 space-y-2">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>Rs. {orderDetails.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Tax</span>
                  <span>Rs. {orderDetails.tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-medium text-lg text-gray-800 pt-2 border-t">
                  <span>Total</span>
                  <span>Rs. {orderDetails.total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            <div className="p-6 bg-gray-50 grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-medium text-gray-800 mb-3 flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-green-600" />
                  Pickup Location
                </h3>
                <p className="font-medium">{orderDetails.location.name}</p>
                <p className="text-gray-600">{orderDetails.location.address}</p>
              </div>
              <div>
                <h3 className="font-medium text-gray-800 mb-3 flex items-center gap-2">
                  <CreditCard className="h-4 w-4 text-green-600" />
                  Payment Information
                </h3>
                <p className="text-gray-600">{orderDetails.paymentMethod}</p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild variant="outline" className="flex items-center gap-2">
              <Link href="/dashboard">
                <ArrowLeft className="h-4 w-4" />
                Continue Shopping
              </Link>
            </Button>
            <Button asChild className="bg-green-600 hover:bg-green-700">
              <Link href="/orders">View My Orders</Link>
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
