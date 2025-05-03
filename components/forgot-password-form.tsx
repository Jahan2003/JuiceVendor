"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { z } from "zod"
import Link from "next/link"
import { ArrowLeft, Loader2, CheckCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

const emailSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
})

export default function ForgotPasswordForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [email, setEmail] = useState("")
  const [error, setError] = useState("")

  const validateEmail = (value: string) => {
    try {
      emailSchema.parse({ email: value })
      setError("")
      return true
    } catch (error) {
      if (error instanceof z.ZodError) {
        setError(error.errors[0].message)
      }
      return false
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
    if (e.target.value) {
      validateEmail(e.target.value)
    } else {
      setError("")
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (validateEmail(email)) {
      setIsLoading(true)

      // Simulate API call
      setTimeout(() => {
        setIsLoading(false)
        setIsSubmitted(true)
      }, 1500)
    }
  }

  return (
    <div className="w-full max-w-md">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl text-green-700">Reset Password</CardTitle>
            <CardDescription>Enter your email address and we'll send you a link to reset your password</CardDescription>
          </CardHeader>
          <CardContent>
            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <motion.div
                  className="space-y-2"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                >
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={handleChange}
                    className={error ? "border-red-500" : ""}
                  />
                  {error && <p className="text-red-500 text-sm">{error}</p>}
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                >
                  <Button type="submit" className="w-full bg-green-600 hover:bg-green-700" disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      "Send Reset Link"
                    )}
                  </Button>
                </motion.div>
              </form>
            ) : (
              <motion.div
                className="text-center py-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">Check your email</h3>
                <p className="text-muted-foreground mb-4">
                  We've sent a password reset link to <span className="font-medium">{email}</span>
                </p>
                <Button variant="outline" className="mt-2" asChild>
                  <Link href="/">Return to login</Link>
                </Button>
              </motion.div>
            )}
          </CardContent>
          <CardFooter className="flex justify-center border-t pt-4">
            <Button variant="link" asChild>
              <Link href="/" className="text-green-600 hover:text-green-800">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to login
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  )
}
