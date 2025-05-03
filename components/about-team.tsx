"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Linkedin, Twitter, Mail } from "lucide-react"

export default function AboutTeam() {
  const team = [
    {
      name: "Sarah Johnson",
      role: "Founder & CEO",
      bio: "Former nutritionist with a passion for making healthy options accessible to everyone.",
      image: "/placeholder.svg?height=400&width=400",
    },
    {
      name: "Michael Chen",
      role: "CTO",
      bio: "Tech innovator with experience in IoT and smart vending solutions.",
      image: "/placeholder.svg?height=400&width=400",
    },
    {
      name: "Priya Patel",
      role: "Head of Product",
      bio: "Food scientist specializing in juice preservation and flavor optimization.",
      image: "/placeholder.svg?height=400&width=400",
    },
    {
      name: "David Rodriguez",
      role: "Operations Director",
      bio: "Supply chain expert ensuring our juices are always fresh and available.",
      image: "/placeholder.svg?height=400&width=400",
    },
  ]

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container">
        <motion.div
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">Meet Our Team</h2>
          <p className="text-gray-600 text-lg">
            The passionate individuals behind JuiceVend who are committed to bringing fresh, healthy juice to your
            neighborhood.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((member, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-100"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="relative h-64 bg-gray-100">
                <Image src={member.image || "/placeholder.svg"} alt={member.name} fill className="object-cover" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800">{member.name}</h3>
                <p className="text-green-600 mb-3">{member.role}</p>
                <p className="text-gray-600 mb-4">{member.bio}</p>
                <div className="flex space-x-3">
                  <a
                    href="#"
                    className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-green-100 hover:text-green-600 transition-colors"
                  >
                    <Linkedin className="h-4 w-4" />
                  </a>
                  <a
                    href="#"
                    className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-green-100 hover:text-green-600 transition-colors"
                  >
                    <Twitter className="h-4 w-4" />
                  </a>
                  <a
                    href="#"
                    className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-green-100 hover:text-green-600 transition-colors"
                  >
                    <Mail className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h3 className="text-2xl font-bold text-gray-800 mb-4">Join Our Team</h3>
          <p className="text-gray-600 max-w-2xl mx-auto mb-8">
            We're always looking for passionate individuals to join our mission of making healthy juice accessible to
            everyone. Check out our current openings or send us your resume.
          </p>
          <a
            href="#"
            className="inline-block bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-6 rounded-md transition-colors"
          >
            View Careers
          </a>
        </motion.div>
      </div>
    </section>
  )
}
