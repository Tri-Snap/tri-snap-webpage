"use client"

import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Github, Linkedin, Mail } from "lucide-react"

interface TeamMemberProps {
  name: string
  role: string
  bio: string
  imageSrc: string
  github?: string
  linkedin?: string
  email?: string
}

export default function TeamMember({ name, role, bio, imageSrc, github, linkedin, email }: TeamMemberProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      className="bg-white rounded-xl shadow-lg overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true, margin: "-50px" }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <div className="relative h-64 overflow-hidden">
        <Image
          src={imageSrc || "/placeholder.svg"}
          alt={name}
          fill
          className="object-cover transition-transform duration-500"
          style={{ transform: isHovered ? "scale(1.05)" : "scale(1)" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-70"></div>

        <motion.div
          className="absolute bottom-0 left-0 right-0 p-4 text-white"
          initial={{ y: 0 }}
          animate={{ y: isHovered ? -10 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <h3 className="text-xl font-bold">{name}</h3>
          <p className="text-sm text-gray-200">{role}</p>
        </motion.div>
      </div>

      <div className="p-5">
        <p className="text-gray-700 text-sm">{bio}</p>

        <div className="mt-4 flex space-x-3">
          {github && (
            <a
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-primary transition-colors"
            >
              <Github className="h-5 w-5" />
            </a>
          )}
          {linkedin && (
            <a
              href={linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-primary transition-colors"
            >
              <Linkedin className="h-5 w-5" />
            </a>
          )}
          {email && (
            <a href={`mailto:${email}`} className="text-gray-600 hover:text-primary transition-colors">
              <Mail className="h-5 w-5" />
            </a>
          )}
        </div>
      </div>
    </motion.div>
  )
}
