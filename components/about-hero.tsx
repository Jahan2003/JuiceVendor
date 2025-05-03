"use client"

import { motion } from "framer-motion"
import Image from "next/image"

export default function AboutHero() {
  return (
    <section className="relative bg-green-600 text-white overflow-hidden w-full mt-2">
      <div className="container relative z-10 py-10 md:py-10">
        <motion.div
          className="max-w-3xl mx-auto text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-4xl lg:text-5xl font-bold mb-6">About JuiceVend</h1>
          <p className="text-lg md:text-xl opacity-90 mb-8">
              At JuiceVend, we believe that healthy, fresh juice should be accessible to everyone, everywhere. Our
              mission is to revolutionize the way people access nutritious beverages by combining cutting-edge vending
              technology with the highest quality, freshly-pressed juices.
          </p>
          <div className="w-24 h-1 bg-white mx-auto rounded-full"></div>
        </motion.div>
      </div>
    </section>
  )
}
