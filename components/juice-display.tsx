"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { ShoppingCart } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { useCart } from "@/components/cart-provider"

interface Juice {
  id: number
  name: string
  description: string
  price: number
  image: string
  color: string
  textColor: string
  buttonColor: string
}

interface JuiceDisplayProps {
  juice: Juice
  reverse?: boolean
}

export default function JuiceDisplay({ juice, reverse = false }: JuiceDisplayProps) {
  const { addItem } = useCart()

  const handleAddToCart = () => {
    addItem({
      id: juice.id,
      name: juice.name,
      price: juice.price,
      quantity: 1,
      image: juice.image,
    })

    toast.success(`${juice.name} added to cart!`, {
      description: "Go to cart to complete your order",
    })
  }

  return (
    <section className={`py-10  ${juice.color} ${reverse ? 'px-20' : 'px-0'}`}>
      <div className="container">
        <motion.div
          className={`flex flex-col ${reverse ? "md:flex-row-reverse" : "md:flex-row"} items-center gap-8 md:gap-16`}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Juice Image */}
          <motion.div
            className="w-full md:w-1/2 flex justify-center"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            whileHover={{
              rotate: [0, -5, 5, -5, 0],
              transition: { duration: 0.5 },
            }}
          >
            <div className="relative h-[300px] w-[300px] md:h-[400px] md:w-[400px]">
              <Image
                src={juice.image || "/placeholder.svg"}
                alt={juice.name}
                fill
                className="object-contain drop-shadow-2xl"
                priority
              />
            </div>
          </motion.div>

          {/* Juice Description */}
          <motion.div
            className="w-full md:w-1/2 text-center md:text-left"
            initial={{ opacity: 0, x: reverse ? -30 : 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${juice.textColor}`}>{juice.name}</h2>
            <p className="text-gray-700 mb-6 text-lg">{juice.description}</p>

            <div className="flex flex-col sm:flex-row items-center gap-4">
              <p className={`text-2xl font-bold ${juice.textColor}`}>Rs. {juice.price.toFixed(2)}</p>
              <Button className={`${juice.buttonColor} text-white px-8 py-6 text-lg`} onClick={handleAddToCart}>
                <ShoppingCart className="mr-2 h-5 w-5" />
                Order Now
              </Button>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
