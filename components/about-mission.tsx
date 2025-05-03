"use client"

import { motion } from "framer-motion"
import Image from "next/image"

export default function AboutMission() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">Our Mission</h2>
            <p className="text-gray-600 mb-6 text-lg">
              At JuiceVend, we believe that healthy, fresh juice should be accessible to everyone, everywhere. Our
              mission is to revolutionize the way people access nutritious beverages by combining cutting-edge vending
              technology with the highest quality, freshly-pressed juices.
            </p>
            <p className="text-gray-600 mb-6 text-lg">
              Founded in 2023, we set out to solve a simple problem: why is it so hard to find fresh, healthy juice
              options on the go? Our innovative vending machines are designed to deliver the freshest juice experience
              possible, making healthy choices convenient and delicious.
            </p>
            <div className="flex flex-wrap gap-4 mt-8">
              <div className="bg-green-50 rounded-lg p-4 flex-1 min-w-[180px]">
                <h3 className="font-bold text-green-700 text-xl mb-2">Quality</h3>
                <p className="text-gray-600">Only the freshest ingredients in every juice</p>
              </div>
              <div className="bg-green-50 rounded-lg p-4 flex-1 min-w-[180px]">
                <h3 className="font-bold text-green-700 text-xl mb-2">Innovation</h3>
                <p className="text-gray-600">Cutting-edge technology for the best experience</p>
              </div>
              <div className="bg-green-50 rounded-lg p-4 flex-1 min-w-[180px]">
                <h3 className="font-bold text-green-700 text-xl mb-2">Sustainability</h3>
                <p className="text-gray-600">Eco-friendly practices in everything we do</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="relative h-[400px] md:h-[500px] rounded-lg overflow-hidden"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Image
              src="/child.webp?height=800&width=600"
              alt="Fresh juice ingredients"
              fill
              className="object-cover"
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
