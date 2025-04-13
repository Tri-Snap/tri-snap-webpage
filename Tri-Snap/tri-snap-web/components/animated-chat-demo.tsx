"use client"

import { useState, useEffect, useRef } from "react"
import { Mic, Phone, PhoneOff } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"

export default function AnimatedChatDemo() {
  const [callState, setCallState] = useState<"incoming" | "active" | "ended">("incoming")
  const [callDuration, setCallDuration] = useState(0)
  const audioRef = useRef<HTMLAudioElement>(null)
  const [audioPlaying, setAudioPlaying] = useState(false)
  const [showTranscript, setShowTranscript] = useState(false)
  const [currentTranscriptIndex, setCurrentTranscriptIndex] = useState(0)

  const transcript = [
    { speaker: "doctor", text: "Hello, this is Dr. Sarah from Tri-Snap. How can I help you today?" },
    { speaker: "patient", text: "Hi doctor, I've been having severe headaches for the past three days." },
    { speaker: "doctor", text: "I'm sorry to hear that. Can you describe the pain and its location?" },
    {
      speaker: "patient",
      text: "It's mostly on the right side of my head, and it gets worse when I'm in bright light.",
    },
    { speaker: "doctor", text: "Are you experiencing any nausea or visual disturbances with these headaches?" },
    { speaker: "patient", text: "Yes, I feel nauseous in the mornings, and sometimes my vision gets a bit blurry." },
    {
      speaker: "doctor",
      text: "Based on your symptoms, this sounds like it could be migraine headaches. I recommend...",
    },
  ]

  // Handle call states
  useEffect(() => {
    if (callState === "incoming") {
      const timer = setTimeout(() => {
        setCallState("active")
        setShowTranscript(true)
      }, 3000)
      return () => clearTimeout(timer)
    }

    if (callState === "active") {
      const timer = setInterval(() => {
        setCallDuration((prev) => prev + 1)
      }, 1000)

      return () => clearInterval(timer)
    }
  }, [callState])

  // Handle transcript display
  useEffect(() => {
    if (showTranscript && currentTranscriptIndex < transcript.length) {
      const timer = setTimeout(() => {
        setCurrentTranscriptIndex((prev) => prev + 1)

        // Play audio effect for new message
        if (audioRef.current) {
          audioRef.current.currentTime = 0
          audioRef.current.play().catch((e) => console.log("Audio play failed:", e))
        }

        // End call after transcript is done
        if (currentTranscriptIndex === transcript.length - 1) {
          setTimeout(() => {
            setCallState("ended")
          }, 3000)
        }
      }, 3000)

      return () => clearTimeout(timer)
    }
  }, [showTranscript, currentTranscriptIndex, transcript.length])

  // Format call duration
  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  return (
    <div className="bg-gradient-to-br from-secondary/10 to-primary/10 rounded-xl shadow-xl overflow-hidden flex flex-col h-[500px] max-w-md w-full mx-auto">
      {/* Audio effect for messages */}
      <audio ref={audioRef} className="hidden">
        <source src="https://assets.mixkit.co/sfx/preview/mixkit-software-interface-start-2574.mp3" type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>

      {/* Call interface */}
      <div className="bg-gradient-to-r from-secondary to-primary p-4 text-white flex items-center justify-between">
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center mr-3 overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80"
              alt="Doctor"
              width={40}
              height={40}
              className="object-cover"
              crossOrigin="anonymous"
            />
          </div>
          <div>
            <h3 className="font-medium">Dr. Sarah</h3>
            <div className="flex items-center text-xs text-gray-200">
              {callState === "incoming" && (
                <motion.span
                  animate={{ opacity: [1, 0.5, 1] }}
                  transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
                >
                  Incoming call...
                </motion.span>
              )}
              {callState === "active" && (
                <div className="flex items-center">
                  <motion.div
                    className="w-1.5 h-1.5 bg-green-400 rounded-full mr-1"
                    animate={{ opacity: [1, 0.5, 1] }}
                    transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
                  />
                  <span>{formatDuration(callDuration)}</span>
                </div>
              )}
              {callState === "ended" && <span>Call ended</span>}
            </div>
          </div>
        </div>

        {/* Call controls */}
        <div className="flex space-x-2">
          {callState === "incoming" && (
            <motion.button
              className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setCallState("active")}
            >
              <Phone className="h-5 w-5 text-white" />
            </motion.button>
          )}

          {callState === "active" && (
            <motion.button
              className="w-10 h-10 rounded-full bg-red-500 flex items-center justify-center"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setCallState("ended")}
            >
              <PhoneOff className="h-5 w-5 text-white" />
            </motion.button>
          )}
        </div>
      </div>

      {/* Call content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-white/80">
        {callState === "incoming" && (
          <div className="h-full flex flex-col items-center justify-center">
            <motion.div
              className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mb-6 overflow-hidden"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
            >
              <Image
                src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80"
                alt="Doctor"
                width={96}
                height={96}
                className="rounded-full"
                crossOrigin="anonymous"
              />
            </motion.div>

            <h3 className="text-xl font-bold text-secondary mb-2">Dr. Sarah</h3>
            <p className="text-gray-500 mb-6">Tri-Snap Medical Assistant</p>

            <div className="flex space-x-4">
              <motion.div
                className="flex flex-col items-center"
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, repeatType: "mirror" }}
              >
                <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mb-2">
                  <PhoneOff className="h-6 w-6 text-red-500" />
                </div>
                <span className="text-xs text-gray-500">Decline</span>
              </motion.div>

              <motion.div
                className="flex flex-col items-center"
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, repeatType: "mirror", delay: 0.2 }}
              >
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-2">
                  <Phone className="h-6 w-6 text-green-500" />
                </div>
                <span className="text-xs text-gray-500">Accept</span>
              </motion.div>
            </div>
          </div>
        )}

        {callState !== "incoming" && (
          <>
            {/* Voice visualization */}
            <div className="h-16 flex items-center justify-center mb-4">
              {Array.from({ length: 40 }).map((_, i) => (
                <motion.div
                  key={i}
                  className={`w-1 mx-0.5 rounded-full ${callState === "active" ? "bg-primary" : "bg-gray-300"}`}
                  animate={{
                    height:
                      callState === "active"
                        ? [Math.random() * 10 + 5, Math.random() * 30 + 10, Math.random() * 10 + 5]
                        : 5,
                  }}
                  transition={{
                    duration: 0.8,
                    repeat: callState === "active" ? Number.POSITIVE_INFINITY : 0,
                    delay: (i * 0.05) % 0.4,
                  }}
                />
              ))}
            </div>

            {/* Transcript */}
            <div className="space-y-4">
              <AnimatePresence>
                {transcript.slice(0, currentTranscriptIndex).map((item, index) => (
                  <motion.div
                    key={index}
                    className={`flex ${item.speaker === "patient" ? "justify-end" : "justify-start"}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div
                      className={`max-w-[80%] rounded-lg p-3 ${
                        item.speaker === "patient"
                          ? "bg-primary text-white rounded-tr-none"
                          : "bg-gray-200 text-gray-800 rounded-tl-none"
                      }`}
                    >
                      <p className="text-sm">{item.text}</p>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {/* Typing indicator */}
              {callState === "active" && currentTranscriptIndex < transcript.length && (
                <div
                  className={`flex ${
                    transcript[currentTranscriptIndex].speaker === "patient" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`rounded-lg p-3 ${
                      transcript[currentTranscriptIndex].speaker === "patient"
                        ? "bg-primary/30 rounded-tr-none"
                        : "bg-gray-200/50 rounded-tl-none"
                    }`}
                  >
                    <div className="flex space-x-1">
                      <motion.div
                        className={`w-2 h-2 rounded-full ${
                          transcript[currentTranscriptIndex].speaker === "patient" ? "bg-white/70" : "bg-gray-500/70"
                        }`}
                        animate={{ y: [0, -5, 0] }}
                        transition={{ duration: 0.6, repeat: Number.POSITIVE_INFINITY }}
                      />
                      <motion.div
                        className={`w-2 h-2 rounded-full ${
                          transcript[currentTranscriptIndex].speaker === "patient" ? "bg-white/70" : "bg-gray-500/70"
                        }`}
                        animate={{ y: [0, -5, 0] }}
                        transition={{ duration: 0.6, repeat: Number.POSITIVE_INFINITY, delay: 0.15 }}
                      />
                      <motion.div
                        className={`w-2 h-2 rounded-full ${
                          transcript[currentTranscriptIndex].speaker === "patient" ? "bg-white/70" : "bg-gray-500/70"
                        }`}
                        animate={{ y: [0, -5, 0] }}
                        transition={{ duration: 0.6, repeat: Number.POSITIVE_INFINITY, delay: 0.3 }}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Call ended message */}
            {callState === "ended" && (
              <motion.div
                className="mt-8 text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <div className="w-16 h-16 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <PhoneOff className="h-8 w-8 text-gray-500" />
                </div>
                <h3 className="text-lg font-semibold text-gray-700 mb-1">Call Ended</h3>
                <p className="text-gray-500 text-sm">Duration: {formatDuration(callDuration)}</p>

                <motion.button
                  className="mt-6 bg-primary text-white px-6 py-2 rounded-full"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setCallState("incoming")
                    setCallDuration(0)
                    setCurrentTranscriptIndex(0)
                    setShowTranscript(false)
                  }}
                >
                  Call Again
                </motion.button>
              </motion.div>
            )}
          </>
        )}
      </div>

      {/* Call action bar */}
      {callState === "active" && (
        <div className="p-4 bg-gray-50 border-t border-gray-200 flex justify-center space-x-6">
          <motion.div
            className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center"
            whileHover={{ scale: 1.1, backgroundColor: "#e5e7eb" }}
            whileTap={{ scale: 0.95 }}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-gray-700"
            >
              <path d="M15.6 11.6L22 7v10l-6.4-4.5v-1Z" />
              <path d="M1 7v10h15V7H1Z" />
            </svg>
          </motion.div>

          <motion.div
            className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center"
            whileHover={{ scale: 1.1, backgroundColor: "#e5e7eb" }}
            whileTap={{ scale: 0.95 }}
          >
            <Mic className="h-6 w-6 text-gray-700" />
          </motion.div>

          <motion.div
            className="w-12 h-12 rounded-full bg-red-500 flex items-center justify-center"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setCallState("ended")}
          >
            <PhoneOff className="h-6 w-6 text-white" />
          </motion.div>
        </div>
      )}
    </div>
  )
}
