import Image from "next/image"

interface OrderItem {
  id: number
  name: string
  price: number
  quantity: number
  image: string
}

interface Order {
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
    coordinates: string
  }
  estimatedPickup: string
}

export default function OrderSummary({ order }: { order: Order }) {
  return (
    <div className="p-6">
      <h3 className="font-medium text-gray-800 mb-4">Order Summary</h3>

      <div className="divide-y">
        {order.items.map((item) => (
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
          <span>Rs. {order.subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-gray-600">
          <span>Tax</span>
          <span>Rs. {order.tax.toFixed(2)}</span>
        </div>
        <div className="flex justify-between font-medium text-lg text-gray-800 pt-2 border-t">
          <span>Total</span>
          <span>Rs. {order.total.toFixed(2)}</span>
        </div>
      </div>
    </div>
  )
}
