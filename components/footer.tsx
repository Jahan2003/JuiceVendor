import Link from "next/link"
import { Facebook, Twitter, Instagram, Mail, Phone } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-green-50 border-t">
      <div className="container py-8 md:py-12 px-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center md:text-left">
          <div className="flex flex-col items-center md:items-start">
            <h3 className="font-bold text-lg text-green-700 mb-4">JuiceVend</h3>
            <p className="text-sm text-gray-600 mb-4 max-w-xs">
              Fresh, healthy juices delivered straight from our vending machines to you.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-gray-500 hover:text-green-600">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="text-gray-500 hover:text-green-600">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="text-gray-500 hover:text-green-600">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-green-700 mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/dashboard" className="text-gray-600 hover:text-green-600">Home</Link></li>
              <li><Link href="/juices" className="text-gray-600 hover:text-green-600">All Juices</Link></li>
              <li><Link href="/orders" className="text-gray-600 hover:text-green-600">My Orders</Link></li>
              <li><Link href="/about" className="text-gray-600 hover:text-green-600">About Us</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-green-700 mb-4">Support</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/faq" className="text-gray-600 hover:text-green-600">FAQ</Link></li>
              <li><Link href="/contact" className="text-gray-600 hover:text-green-600">Contact Us</Link></li>
              <li><Link href="/privacy" className="text-gray-600 hover:text-green-600">Privacy Policy</Link></li>
              <li><Link href="/terms" className="text-gray-600 hover:text-green-600">Terms of Service</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-green-700 mb-4">Contact</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center justify-center md:justify-start gap-2">
                <Mail className="h-4 w-4 text-green-600" />
                <span className="text-gray-600">support@juicevend.com</span>
              </li>
              <li className="flex items-center justify-center md:justify-start gap-2">
                <Phone className="h-4 w-4 text-green-600" />
                <span className="text-gray-600">+1 (555) 123-4567</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-8 pt-8 text-center text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} JuiceVend. All rights reserved.</p>
        </div>
      </div>
    </footer>

  )
}
