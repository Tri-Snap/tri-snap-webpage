"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Check, Loader2, Mail, Send } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export default function ContactForm() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState("")
  const [focusedField, setFocusedField] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError("")

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address")
      setIsSubmitting(false)
      return
    }

    // Simulate API call
    try {
      // In a real app, you would send this to your backend
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setIsSubmitted(true)
      setName("")
      setEmail("")
      setMessage("")
    } catch (err) {
      setError("Something went wrong. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <AnimatePresence mode="wait">
        {!isSubmitted ? (
          <motion.div
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative">
                <motion.div
                  className="absolute -top-2 left-4 px-2 bg-white text-xs font-medium text-primary z-10"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{
                    opacity: focusedField === "name" || name ? 1 : 0.7,
                    y: focusedField === "name" || name ? 0 : 10,
                    color: focusedField === "name" ? "#00A99D" : "#64748b",
                  }}
                  transition={{ duration: 0.2 }}
                >
                  Your Name
                </motion.div>
                <Input
                  type="text"
                  placeholder="Your Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="bg-white/90 backdrop-blur-sm border-primary/20 rounded-lg h-14 px-4 shadow-sm focus:ring-2 focus:ring-primary focus:border-transparent"
                  required
                  onFocus={() => setFocusedField("name")}
                  onBlur={() => setFocusedField(null)}
                />
              </div>

              <div className="relative">
                <motion.div
                  className="absolute -top-2 left-4 px-2 bg-white text-xs font-medium text-primary z-10"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{
                    opacity: focusedField === "email" || email ? 1 : 0.7,
                    y: focusedField === "email" || email ? 0 : 10,
                    color: focusedField === "email" ? "#00A99D" : "#64748b",
                  }}
                  transition={{ duration: 0.2 }}
                >
                  Your Email
                </motion.div>
                <Input
                  type="email"
                  placeholder="Your Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-white/90 backdrop-blur-sm border-primary/20 rounded-lg h-14 px-4 shadow-sm focus:ring-2 focus:ring-primary focus:border-transparent"
                  required
                  onFocus={() => setFocusedField("email")}
                  onBlur={() => setFocusedField(null)}
                />
              </div>

              <div className="relative">
                <motion.div
                  className="absolute -top-2 left-4 px-2 bg-white text-xs font-medium text-primary z-10"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{
                    opacity: focusedField === "message" || message ? 1 : 0.7,
                    y: focusedField === "message" || message ? 0 : 10,
                    color: focusedField === "message" ? "#00A99D" : "#64748b",
                  }}
                  transition={{ duration: 0.2 }}
                >
                  Your Message
                </motion.div>
                <Textarea
                  placeholder="Your Message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="bg-white/90 backdrop-blur-sm border-primary/20 rounded-lg min-h-[120px] p-4 shadow-sm focus:ring-2 focus:ring-primary focus:border-transparent"
                  required
                  onFocus={() => setFocusedField("message")}
                  onBlur={() => setFocusedField(null)}
                />
              </div>

              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button
                  type="submit"
                  className="bg-gradient-to-r from-secondary to-primary hover:opacity-90 text-white w-full h-14 rounded-lg shadow-lg"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  ) : (
                    <motion.div
                      className="flex items-center justify-center w-full"
                      initial={{ x: 0 }}
                      whileHover={{ x: 5 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                      <Mail className="mr-2 h-5 w-5" />
                      <span>Send Message</span>
                      <Send className="ml-2 h-4 w-4" />
                    </motion.div>
                  )}
                </Button>
              </motion.div>

              {error && (
                <motion.p
                  className="text-red-500 text-sm"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {error}
                </motion.p>
              )}
            </form>
          </motion.div>
        ) : (
          <motion.div
            key="success"
            className="bg-white/90 backdrop-blur-sm p-8 rounded-2xl shadow-xl flex flex-col items-center text-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <motion.div
              className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 400, damping: 10, delay: 0.2 }}
            >
              <Check className="h-10 w-10 text-green-600" />
            </motion.div>
            <h3 className="text-2xl font-bold text-secondary mb-3">Message Sent!</h3>
            <p className="text-gray-700 mb-6">Thank you for reaching out. We'll get back to you as soon as possible.</p>
            <motion.button
              className="text-primary font-medium flex items-center"
              onClick={() => setIsSubmitted(false)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>Send another message</span>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
