"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Menu } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import CartSheet from "@/components/cart-sheet"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <motion.header
      className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md px-1"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/dashboard" className="flex items-center gap-2">
            <div className="rounded-full bg-green-600 p-1">
              <div className="h-6 w-6 rounded-full bg-white flex items-center justify-center">
                <span className="text-green-600 font-bold text-sm">JV</span>
              </div>
            </div>
            <span className="font-bold text-xl hidden sm:inline-block text-green-700">JuiceVend</span>
          </Link>
        </div>

        <nav className="hidden md:flex items-center gap-6">
          <Link href="/dashboard" className="text-sm font-medium hover:text-green-600 transition-colors">
            Home
          </Link>
          {/* <Link href="/juices" className="text-sm font-medium hover:text-green-600 transition-colors">
            All Juices
          </Link> */}
          <Link href="/orders" className="text-sm font-medium hover:text-green-600 transition-colors">
            My Orders
          </Link>
          <Link href="/about" className="text-sm font-medium hover:text-green-600 transition-colors">
            About Us
          </Link>
          <Link
          href="/"
          className="text-sm font-medium hover:text-green-600 transition-colors"
          onClick={() => setIsOpen(false)}
        >
          Sign Out
        </Link>
        </nav>

        <div className="flex items-center gap-4">
          <CartSheet />

          <Avatar className="h-8 w-8 border border-green-200">
            <AvatarFallback className="bg-green-100 text-green-700">JS</AvatarFallback>
          </Avatar>

          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="flex flex-col gap-6 mt-8">
                <Link
                  href="/dashboard"
                  className="text-sm font-medium hover:text-green-600 transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  Home
                </Link>
                {/* <Link
                  href="/juices"
                  className="text-sm font-medium hover:text-green-600 transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  All Juices
                </Link> */}
                <Link
                  href="/orders"
                  className="text-sm font-medium hover:text-green-600 transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  My Orders
                </Link>
                <Link
                  href="/about"
                  className="text-sm font-medium hover:text-green-600 transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  About Us
                </Link>
                <Link
                  href="/"
                  className="text-sm font-medium hover:text-green-600 transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  Sign Out
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </motion.header>
  )
}
