"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Check, Loader2, ArrowRight } from "lucide-react"
import { motion } from "framer-motion"

export default function EarlyAccessForm() {
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState("")

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
      setEmail("")
    } catch (err) {
      setError("Something went wrong. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div id="early-access" className="w-full max-w-md mx-auto">
      {!isSubmitted ? (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <form onSubmit={handleSubmit} className="relative">
            <div className="flex flex-col sm:flex-row gap-3">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-grow bg-white/90 backdrop-blur-sm border-0 shadow-lg focus:ring-2 focus:ring-primary h-14 pl-5 pr-12 rounded-full"
                required
              />
              <Button
                type="submit"
                className="bg-primary hover:bg-primary/90 text-white h-14 px-8 rounded-full shadow-lg"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                ) : (
                  <motion.div
                    className="flex items-center"
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <span className="mr-2">Get Early Access</span>
                    <ArrowRight className="h-5 w-5" />
                  </motion.div>
                )}
              </Button>
            </div>
            {error && (
              <motion.p
                className="text-red-500 text-sm mt-2 ml-2"
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
          className="bg-white/90 backdrop-blur-sm p-6 rounded-2xl shadow-xl flex flex-col items-center text-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <motion.div
            className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 400, damping: 10, delay: 0.2 }}
          >
            <Check className="h-8 w-8 text-green-600" />
          </motion.div>
          <h3 className="text-xl font-bold text-secondary mb-2">Thank You!</h3>
          <p className="text-gray-700">We'll notify you when early access is available.</p>
          <motion.button
            className="mt-6 text-primary font-medium flex items-center"
            onClick={() => setIsSubmitted(false)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span>Submit another email</span>
          </motion.button>
        </motion.div>
      )}
    </div>
  )
}
