"use client"

import { motion } from "framer-motion"
import { Leaf, Droplets, Truck, Clock } from "lucide-react"

export default function AboutProcess() {
  const steps = [
    {
      icon: Leaf,
      title: "Fresh Ingredients",
      description:
        "We source only the freshest fruits and vegetables from local farms, ensuring peak nutrition and flavor in every juice.",
    },
    {
      icon: Droplets,
      title: "Cold-Pressed Daily",
      description:
        "Our juices are cold-pressed daily to preserve nutrients and enzymes, delivering maximum health benefits.",
    },
    {
      icon: Truck,
      title: "Delivered to Vending Machines",
      description:
        "Fresh juices are delivered to our smart vending machines daily, ensuring you always get the freshest product.",
    },
    {
      icon: Clock,
      title: "Ready When You Are",
      description:
        "Our vending machines keep juices at the perfect temperature and are available 24/7 for your convenience.",
    },
  ]

  return (
    <section className="py-16 md:py-24 bg-green-50">
      <div className="container mx-auto px-2">
        <motion.div
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">How It Works</h2>
          <p className="text-gray-600 text-lg">
            From farm to vending machine, we ensure the highest quality and freshness at every step of our process.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-lg p-6 shadow-sm"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <step.icon className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
