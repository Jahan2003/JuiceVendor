"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { ShoppingCart } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface Juice {
  id: number
  name: string
  description: string
  price: number
  image: string
}

interface JuiceSectionProps {
  title: string
  description: string
  juices: Juice[]
  bgColor?: string
}

export default function JuiceSection({ title, description, juices, bgColor = "bg-white" }: JuiceSectionProps) {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  return (
    <section className={`py-16 ${bgColor}`}>
      <div className="container">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold text-green-700 mb-2">{title}</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">{description}</p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {juices.map((juice) => (
            <motion.div key={juice.id} variants={item}>
              <Card className="overflow-hidden h-full flex flex-col hover:shadow-lg transition-shadow duration-300">
                <div className="relative h-48 bg-gray-100">
                  <Image src={juice.image || "/placeholder.svg"} alt={juice.name} fill className="object-contain p-4" />
                  <Badge className="absolute top-2 right-2 bg-green-600">${juice.price.toFixed(2)}</Badge>
                </div>
                <CardHeader>
                  <CardTitle className="text-xl text-green-700">{juice.name}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-gray-600">{juice.description}</p>
                </CardContent>
                <CardFooter>
                  <Button className="w-full bg-green-600 hover:bg-green-700">
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    Add to Cart
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
