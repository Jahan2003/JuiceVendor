"use client"

import { motion } from "framer-motion"
import { CheckCircle2, Clock } from "lucide-react"

interface OrderProgressProps {
  status: string
  estimatedTime: string
}

export default function OrderProgress({ status, estimatedTime }: OrderProgressProps) {
  // Define the steps in the order process
  const steps = [
    { key: "confirmed", label: "Order Confirmed" },
    { key: "preparing", label: "Preparing" },
    { key: "ready", label: "Ready for Pickup" },
    { key: "completed", label: "Completed" },
  ]

  // Map the current status to a step index
  const currentStepIndex = steps.findIndex((step) => step.key === status)

  // Calculate progress percentage
  const progressPercentage = ((currentStepIndex + 1) / steps.length) * 100

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-800">Order Status</h2>
        <div className="flex items-center text-green-600">
          <Clock className="h-4 w-4 mr-1" />
          <span className="text-sm">Estimated pickup: {estimatedTime}</span>
        </div>
      </div>

      {/* Progress bar */}
      <div className="relative h-2 bg-gray-200 rounded-full mb-6">
        <motion.div
          className="absolute h-full bg-green-600 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${progressPercentage}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />
      </div>

      {/* Steps */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        {steps.map((step, index) => {
          const isCompleted = index <= currentStepIndex
          const isCurrent = index === currentStepIndex

          return (
            <div
              key={step.key}
              className={`text-center p-2 rounded-md ${
                isCurrent ? "bg-green-50 text-green-700" : isCompleted ? "text-green-600" : "text-gray-400"
              }`}
            >
              <motion.div
                className="flex justify-center mb-1"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: index * 0.2, duration: 0.5 }}
              >
                <CheckCircle2 className={`h-5 w-5 ${isCompleted ? "opacity-100" : "opacity-30"}`} />
              </motion.div>
              <p className={`text-sm ${isCompleted ? "font-medium" : ""}`}>{step.label}</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}
