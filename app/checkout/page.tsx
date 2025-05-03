"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, CreditCard, Loader2 } from "lucide-react"
import { z } from "zod"

import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useCart } from "@/components/cart-provider"
import { generateOrderId, Order, saveOrder } from "@/lib/orders"

const paymentSchema = z.object({
  cardName: z.string().min(1, "Cardholder name is required"),
  cardNumber: z.string().regex(/^\d{16}$/, "Card number must be 16 digits"),
  expiry: z.string().regex(/^\d{2}\/\d{2}$/, "Expiry date must be in MM/YY format"),
  cvc: z.string().regex(/^\d{3,4}$/, "CVC must be 3 or 4 digits"),
})

export default function Checkout() {
  const router = useRouter()
  const { items, subtotal, clearCart } = useCart()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState("card")
  const [googlePayAvailable, setGooglePayAvailable] = useState(false)
  const [formData, setFormData] = useState({
    cardName: "",
    cardNumber: "",
    expiry: "",
    cvc: "",
  })
  const [errors, setErrors] = useState({
    cardName: "",
    cardNumber: "",
    expiry: "",
    cvc: "",
  })

  // Calculate tax and total
  const tax = subtotal * 0.08
  const total = subtotal + tax

  // Check if Google Pay is available
  useEffect(() => {
    // In a real app, we would check if Google Pay is actually available
    // For this demo, we'll just simulate it being available
    setGooglePayAvailable(true)
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    // Format card number with spaces for display
    if (name === "cardNumber") {
      const cleaned = value.replace(/\s+/g, "")
      if (cleaned.length <= 16) {
        setFormData({ ...formData, [name]: cleaned })
      }
      return
    }

    // Format expiry date
    if (name === "expiry") {
      const cleaned = value.replace(/[^\d]/g, "")
      if (cleaned.length <= 4) {
        const formatted = cleaned.length > 2 ? `${cleaned.slice(0, 2)}/${cleaned.slice(2)}` : cleaned
        setFormData({ ...formData, [name]: formatted })
      }
      return
    }

    setFormData({ ...formData, [name]: value })
  }

  const validateField = (name: string, value: string) => {
    try {
      const field = { [name]: value }
      paymentSchema.shape[name].parse(value)
      setErrors((prev) => ({ ...prev, [name]: "" }))
      return true
    } catch (error) {
      if (error instanceof z.ZodError) {
        setErrors((prev) => ({ ...prev, [name]: error.errors[0].message }))
      }
      return false
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (paymentMethod === "google-pay") {
      processPayment("Google Pay")
      return
    }

    // Validate all fields for card payment
    const isCardNameValid = validateField("cardName", formData.cardName)
    const isCardNumberValid = validateField("cardNumber", formData.cardNumber)
    const isExpiryValid = validateField("expiry", formData.expiry)
    const isCvcValid = validateField("cvc", formData.cvc)

    if (isCardNameValid && isCardNumberValid && isExpiryValid && isCvcValid) {
      processPayment("Visa •••• " + formData.cardNumber.slice(-4))
    }
  }

  // const processPayment = (paymentMethodText: string) => {
  //   setIsSubmitting(true)

  //   // Generate a random order ID
  //   const orderId = generateOrderId()
      
  //   // Simulate payment processing
  //   setTimeout(() => {
  //     clearCart()
  //     router.push(`/order-confirmation/${orderId}`)
  //   }, 1500)
  // }

  const processPayment = (paymentMethodText: string) => {
    setIsSubmitting(true)
  
    const orderId = generateOrderId()
  
    const order: Order = {
      id: orderId,
      orderNumber: orderId, // you can differentiate this if needed
      date: new Date().toISOString(),
      status: "Completed", // or "Confirmed", "Pending", etc.
      items: items.map((item) => ({
        id: item.id,
        name: item.name,
        quantity: item.quantity,
        price: item.price,
        image: item.image
      })),
      subtotal,
      tax,
      total,
      paymentMethod: paymentMethodText,
      location: {
        name: "Main Juice Store", // Replace with dynamic data if needed
        address: "123 Juicy Lane, Flavor Town", // Replace if available from user input
      },
    }
  
    // Save the order before clearing the cart
    saveOrder(order)
  
    // Simulate payment processing
    setTimeout(() => {
      clearCart()
      router.push(`/order-confirmation/${orderId}`)
    }, 1500)
  }
  

  if (items.length === 0 && !isSubmitting) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow flex items-center justify-center bg-gray-50">
          <div className="text-center p-8">
            <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
            <p className="mb-6">Add some juices to your cart before checking out.</p>
            <Button asChild className="bg-green-600 hover:bg-green-700">
              <Link href="/dashboard">Browse Juices</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow bg-gray-50 py-12 p-5">
        <div className="container max-w-7xl">
          <div className="mb-8">
            <Button asChild variant="outline" size="sm">
              <Link href="/dashboard">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Continue Shopping
              </Link>
            </Button>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Order Summary */}
            <div className="md:col-span-1">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-lg font-semibold mb-4">Order Summary</h2>

                <div className="space-y-4 mb-6">
                  {items.map((item) => (
                    <div key={item.id} className="flex gap-4">
                      <div className="relative h-16 w-16 rounded-md overflow-hidden bg-gray-100 flex-shrink-0">
                        <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">{item.name}</p>
                        <div className="flex justify-between text-sm text-gray-500">
                          <p>Qty: {item.quantity}</p>
                          <p>${(item.price * item.quantity).toFixed(2)}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <Separator className="my-4" />

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span>Rs. {subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tax (8%)</span>
                    <span>Rs. {tax.toFixed(2)}</span>
                  </div>
                  <Separator className="my-2" />
                  <div className="flex justify-between font-semibold text-lg">
                    <span>Total</span>
                    <span>Rs. {total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Form */}
            <div className="md:col-span-2">
              <div className="bg-white rounded-lg shadow-md p-6 ">
                <h2 className="text-xl font-semibold mb-6">Payment Information</h2>

                <Tabs defaultValue="card" value={paymentMethod} onValueChange={setPaymentMethod}>
                  <TabsList className="grid grid-cols-2 mb-6">
                    <TabsTrigger value="card" className="flex items-center gap-2">
                      <CreditCard className="h-4 w-4" />
                      Credit Card
                    </TabsTrigger>
                    <TabsTrigger value="google-pay" disabled={!googlePayAvailable} className="flex items-center gap-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M3.5 11.5H6.5V14.5H3.5V11.5Z" />
                        <path d="M8.5 9.5H11.5V16.5H8.5V9.5Z" />
                        <path d="M13.5 7.5H16.5V18.5H13.5V7.5Z" />
                        <path d="M18.5 5.5H21.5V20.5H18.5V5.5Z" />
                      </svg>
                      Google Pay
                    </TabsTrigger>
                  </TabsList>

                  <form onSubmit={handleSubmit}>
                    <TabsContent value="card" className="space-y-6">
                      <div className="space-y-2">
                        <Label htmlFor="cardName">Cardholder Name</Label>
                        <Input
                          id="cardName"
                          name="cardName"
                          placeholder="John Doe"
                          value={formData.cardName}
                          onChange={handleChange}
                          onBlur={() => validateField("cardName", formData.cardName)}
                          className={errors.cardName ? "border-red-500" : ""}
                        />
                        {errors.cardName && <p className="text-red-500 text-sm">{errors.cardName}</p>}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="cardNumber">Card Number</Label>
                        <div className="relative">
                          <Input
                            id="cardNumber"
                            name="cardNumber"
                            placeholder="1234 5678 9012 3456"
                            value={formData.cardNumber.replace(/(.{4})/g, "$1 ").trim()}
                            onChange={handleChange}
                            onBlur={() => validateField("cardNumber", formData.cardNumber)}
                            className={errors.cardNumber ? "border-red-500 pr-10" : "pr-10"}
                          />
                          <CreditCard className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                        </div>
                        {errors.cardNumber && <p className="text-red-500 text-sm">{errors.cardNumber}</p>}
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="expiry">Expiry Date</Label>
                          <Input
                            id="expiry"
                            name="expiry"
                            placeholder="MM/YY"
                            value={formData.expiry}
                            onChange={handleChange}
                            onBlur={() => validateField("expiry", formData.expiry)}
                            className={errors.expiry ? "border-red-500" : ""}
                          />
                          {errors.expiry && <p className="text-red-500 text-sm">{errors.expiry}</p>}
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="cvc">CVC</Label>
                          <Input
                            id="cvc"
                            name="cvc"
                            placeholder="123"
                            value={formData.cvc}
                            onChange={handleChange}
                            onBlur={() => validateField("cvc", formData.cvc)}
                            className={errors.cvc ? "border-red-500" : ""}
                            maxLength={4}
                          />
                          {errors.cvc && <p className="text-red-500 text-sm">{errors.cvc}</p>}
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="google-pay">
                      <div className="text-center py-6">
                        <div className="inline-block mb-6 p-4 border rounded-lg">
                          <Image src="gpay.png" alt="gpay" height="50" width="50"></Image>
                        </div>
                        <p className="text-gray-600 mb-6">
                          Click the button below to pay with Google Pay. You'll be redirected to complete your payment.
                        </p>
                      </div>
                    </TabsContent>

                    <Button
                      type="submit"
                      className="w-full bg-green-600 hover:bg-green-700 py-6 text-lg mt-6"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                          Processing...
                        </>
                      ) : paymentMethod === "google-pay" ? (
                        "Pay with Google Pay"
                      ) : (
                        `Pay Rs. ${total.toFixed(2)}`
                      )}
                    </Button>
                  </form>
                </Tabs>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
