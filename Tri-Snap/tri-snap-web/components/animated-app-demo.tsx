"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { Video, Mic, ArrowRight } from "lucide-react"

export default function AnimatedAppDemo() {
  const [activeScreen, setActiveScreen] = useState(0)
  const totalScreens = 4
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isDrawing, setIsDrawing] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveScreen((prev) => (prev + 1) % totalScreens)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  // Play/pause video based on active screen
  useEffect(() => {
    if (videoRef.current) {
      if (activeScreen === 1) {
        videoRef.current.currentTime = 0
        videoRef.current.play().catch((e) => console.log("Video play failed:", e))
      } else {
        videoRef.current.pause()
      }
    }
  }, [activeScreen])

  // Hand sign animation
  useEffect(() => {
    if (activeScreen === 2 && canvasRef.current) {
      const canvas = canvasRef.current
      const ctx = canvas.getContext("2d")
      if (!ctx) return

      let frameId: number
      const handPositions: { x: number; y: number; fingers: number[] }[] = []

      // Initialize hand positions for animation
      for (let i = 0; i < 60; i++) {
        const baseX = canvas.width / 2
        const baseY = canvas.height / 2 + 50
        const time = i / 10

        // Different finger positions based on time
        const fingers = [
          Math.sin(time) * 20,
          Math.cos(time + 0.5) * 25,
          Math.sin(time + 1) * 15,
          Math.cos(time + 1.5) * 20,
          Math.sin(time + 2) * 15,
        ]

        handPositions.push({
          x: baseX + Math.sin(time / 2) * 30,
          y: baseY + Math.cos(time / 3) * 20,
          fingers,
        })
      }

      let frameIndex = 0

      const drawHand = () => {
        if (!ctx) return

        ctx.clearRect(0, 0, canvas.width, canvas.height)

        const pos = handPositions[frameIndex % handPositions.length]

        // Draw palm
        ctx.fillStyle = "#f8d9c0"
        ctx.beginPath()
        ctx.ellipse(pos.x, pos.y, 30, 40, 0, 0, Math.PI * 2)
        ctx.fill()
        ctx.strokeStyle = "#e0b090"
        ctx.lineWidth = 2
        ctx.stroke()

        // Draw fingers
        for (let i = 0; i < 5; i++) {
          const angle = Math.PI / 2 - (Math.PI / 4) * i
          const length = 60 + pos.fingers[i]

          const fingerEndX = pos.x + Math.cos(angle) * length
          const fingerEndY = pos.y - Math.sin(angle) * length

          // Finger
          ctx.beginPath()
          ctx.lineWidth = 12
          ctx.lineCap = "round"
          ctx.strokeStyle = "#f8d9c0"
          ctx.moveTo(pos.x, pos.y)
          ctx.lineTo(fingerEndX, fingerEndY)
          ctx.stroke()

          // Finger outline
          ctx.beginPath()
          ctx.lineWidth = 2
          ctx.lineCap = "round"
          ctx.strokeStyle = "#e0b090"
          ctx.moveTo(pos.x, pos.y)
          ctx.lineTo(fingerEndX, fingerEndY)
          ctx.stroke()

          // Finger joints
          const midX = pos.x + Math.cos(angle) * (length / 2)
          const midY = pos.y - Math.sin(angle) * (length / 2)

          ctx.beginPath()
          ctx.lineWidth = 2
          ctx.strokeStyle = "#e0b090"
          ctx.arc(midX, midY, 6, 0, Math.PI * 2)
          ctx.stroke()
        }

        // Recognition points
        ctx.fillStyle = "#00A99D"
        for (let i = 0; i < 5; i++) {
          const angle = Math.PI / 2 - (Math.PI / 4) * i
          const length = 60 + pos.fingers[i]

          const fingerEndX = pos.x + Math.cos(angle) * length
          const fingerEndY = pos.y - Math.sin(angle) * length

          ctx.beginPath()
          ctx.arc(fingerEndX, fingerEndY, 5, 0, Math.PI * 2)
          ctx.fill()
        }

        // Draw tracking lines
        ctx.strokeStyle = "#00A99D"
        ctx.lineWidth = 1
        ctx.setLineDash([5, 3])
        ctx.beginPath()

        for (let i = 0; i < 5; i++) {
          const angle = Math.PI / 2 - (Math.PI / 4) * i
          const length = 60 + pos.fingers[i]

          const fingerEndX = pos.x + Math.cos(angle) * length
          const fingerEndY = pos.y - Math.sin(angle) * length

          if (i === 0) {
            ctx.moveTo(fingerEndX, fingerEndY)
          } else {
            ctx.lineTo(fingerEndX, fingerEndY)
          }
        }

        ctx.closePath()
        ctx.stroke()
        ctx.setLineDash([])

        frameIndex = (frameIndex + 1) % handPositions.length
        frameId = requestAnimationFrame(drawHand)
      }

      setIsDrawing(true)
      drawHand()

      return () => {
        cancelAnimationFrame(frameId)
        setIsDrawing(false)
      }
    }
  }, [activeScreen])

  return (
    <div className="relative w-full max-w-[300px] mx-auto">
      {/* Phone frame */}
      <div className="relative rounded-[40px] overflow-hidden border-8 border-secondary shadow-xl bg-white aspect-[9/19] w-full">
        {/* Screen 1: Chat Interface */}
        <AnimatePresence>
          {activeScreen === 0 && (
            <motion.div
              className="absolute inset-0 flex flex-col bg-gradient-to-br from-secondary/5 to-primary/5"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* Header with logo */}
              <div className="bg-gradient-to-r from-secondary to-primary p-3 flex items-center justify-between">
                <div className="flex items-center">
                  <Image src="/images/tri-snap-logo.png" alt="Tri-Snap Logo" width={30} height={30} className="mr-2" />
                  <span className="text-white font-semibold text-sm">Tri-Snap</span>
                </div>
                <div className="flex space-x-1">
                  {[1, 2, 3].map((_, i) => (
                    <motion.div
                      key={i}
                      className="w-1.5 h-1.5 bg-white rounded-full"
                      animate={{
                        opacity: [0.4, 1, 0.4],
                        scale: [0.8, 1, 0.8],
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Number.POSITIVE_INFINITY,
                        delay: i * 0.2,
                      }}
                    />
                  ))}
                </div>
              </div>

              <div className="flex-1 p-4 flex flex-col">
                <motion.div
                  className="bg-primary/10 p-4 rounded-lg mb-4 self-start max-w-[85%]"
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <p className="text-sm text-secondary font-medium">How can we help you today?</p>
                </motion.div>

                <motion.div
                  className="mt-auto bg-secondary text-white p-4 rounded-lg self-end max-w-[85%]"
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.3 }}
                >
                  <p className="text-sm font-medium">
                    I've been having chest pain and shortness of breath since yesterday.
                  </p>
                </motion.div>

                {/* Typing indicator */}
                <motion.div
                  className="mt-3 self-start bg-primary/10 px-4 py-2 rounded-full"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 1, 1, 0] }}
                  transition={{
                    times: [0, 0.3, 0.7, 1],
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatDelay: 1,
                  }}
                >
                  <div className="flex space-x-1">
                    <motion.div
                      className="w-2 h-2 bg-primary rounded-full"
                      animate={{ y: [0, -3, 0] }}
                      transition={{ duration: 0.6, repeat: Number.POSITIVE_INFINITY }}
                    />
                    <motion.div
                      className="w-2 h-2 bg-primary rounded-full"
                      animate={{ y: [0, -3, 0] }}
                      transition={{ duration: 0.6, repeat: Number.POSITIVE_INFINITY, delay: 0.15 }}
                    />
                    <motion.div
                      className="w-2 h-2 bg-primary rounded-full"
                      animate={{ y: [0, -3, 0] }}
                      transition={{ duration: 0.6, repeat: Number.POSITIVE_INFINITY, delay: 0.3 }}
                    />
                  </div>
                </motion.div>
              </div>

              {/* Input area */}
              <div className="p-3 border-t border-gray-200">
                <div className="flex items-center bg-gray-100 rounded-full px-4 py-2">
                  <input
                    type="text"
                    placeholder="Type your message..."
                    className="bg-transparent flex-1 outline-none text-sm"
                    disabled
                  />
                  <motion.button
                    className="ml-2 w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <ArrowRight className="h-4 w-4" />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Screen 2: Sign Language */}
        <AnimatePresence>
          {activeScreen === 1 && (
            <motion.div
              className="absolute inset-0 flex flex-col"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* Header with mode indicator */}
              <div className="bg-gradient-to-r from-secondary to-primary p-3 flex items-center justify-between z-10">
                <div className="flex items-center">
                  <Video className="h-4 w-4 text-white mr-2" />
                  <span className="text-white font-semibold text-sm">Sign Language</span>
                </div>
                <motion.div
                  className="w-2 h-2 bg-red-500 rounded-full"
                  animate={{
                    opacity: [1, 0.5, 1],
                    scale: [1, 1.2, 1],
                  }}
                  transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                />
              </div>

              <div className="flex-1 bg-gray-900 relative">
                {/* Video of person signing */}
                <video ref={videoRef} className="absolute inset-0 w-full h-full object-cover" muted playsInline>
                  <source
                    src="https://assets.mixkit.co/videos/preview/mixkit-woman-talking-in-sign-language-42208-large.mp4"
                    type="video/mp4"
                  />
                  Your browser does not support the video tag.
                </video>

                {/* Sign recognition overlay */}
                <div className="absolute inset-0 pointer-events-none">
                  <motion.div
                    className="absolute top-1/4 left-1/4 w-1/2 h-1/2 border-2 border-primary rounded-lg"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{
                      scale: [0.8, 1.1, 1],
                      opacity: [0, 0.8, 1],
                    }}
                    transition={{
                      duration: 1.5,
                      times: [0, 0.6, 1],
                      repeat: Number.POSITIVE_INFINITY,
                      repeatType: "loop",
                    }}
                  />

                  <motion.svg
                    className="absolute inset-0 w-full h-full"
                    viewBox="0 0 300 600"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                  >
                    <motion.path
                      d="M100,300 C120,280 140,270 160,270 C180,270 200,280 220,300"
                      stroke="#00A99D"
                      strokeWidth="2"
                      strokeDasharray="5,5"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                    />
                    <motion.circle
                      cx="150"
                      cy="300"
                      r="5"
                      fill="#00A99D"
                      initial={{ scale: 0 }}
                      animate={{ scale: [0, 1.5, 1] }}
                      transition={{ duration: 1, delay: 1.5 }}
                    />
                  </motion.svg>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Screen 3: Hand Sign Animation */}
        <AnimatePresence>
          {activeScreen === 2 && (
            <motion.div
              className="absolute inset-0 flex flex-col"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* Header with mode indicator */}
              <div className="bg-gradient-to-r from-secondary to-primary p-3 flex items-center justify-between z-10">
                <div className="flex items-center">
                  <Video className="h-4 w-4 text-white mr-2" />
                  <span className="text-white font-semibold text-sm">Sign Recognition</span>
                </div>
                <motion.div
                  className="w-2 h-2 bg-red-500 rounded-full"
                  animate={{
                    opacity: [1, 0.5, 1],
                    scale: [1, 1.2, 1],
                  }}
                  transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                />
              </div>

              <div className="flex-1 bg-gradient-to-b from-secondary/80 to-primary/80 flex flex-col">
                <canvas ref={canvasRef} width={300} height={600} className="w-full h-full" />

                {/* Recognition indicators */}
                <motion.div
                  className="absolute top-1/4 right-4 bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-lg"
                  initial={{ x: 50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 1, duration: 0.5 }}
                >
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-primary rounded-full mr-2 animate-pulse" />
                    <p className="text-white text-xs font-medium">Analyzing gestures</p>
                  </div>
                </motion.div>

                <motion.div
                  className="absolute bottom-20 left-4 right-4 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 2, duration: 0.5 }}
                >
                  <p className="text-white text-xs font-medium">Recognized: "I need medical help"</p>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Screen 4: Voice Call */}
        <AnimatePresence>
          {activeScreen === 3 && (
            <motion.div
              className="absolute inset-0 flex flex-col"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* Header with mode indicator */}
              <div className="bg-gradient-to-r from-secondary to-primary p-3 flex items-center justify-between z-10">
                <div className="flex items-center">
                  <Mic className="h-4 w-4 text-white mr-2" />
                  <span className="text-white font-semibold text-sm">Voice Call</span>
                </div>
                <motion.div
                  className="w-2 h-2 bg-red-500 rounded-full"
                  animate={{
                    opacity: [1, 0.5, 1],
                    scale: [1, 1.2, 1],
                  }}
                  transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                />
              </div>

              <div className="flex-1 bg-gradient-to-b from-secondary/80 to-primary/80 flex flex-col">
                <div className="flex-1 flex items-center justify-center p-4">
                  <div className="relative">
                    <motion.div
                      className="w-32 h-32 rounded-full bg-white/20 flex items-center justify-center overflow-hidden"
                      initial={{ scale: 0.8 }}
                      animate={{ scale: [0.8, 1, 0.8] }}
                      transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                    >
                      <Image
                        src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80"
                        alt="Virtual Doctor"
                        width={128}
                        height={128}
                        className="rounded-full"
                        crossOrigin="anonymous"
                      />
                    </motion.div>

                    {/* Sound waves animation */}
                    {[1, 2, 3, 4].map((i) => (
                      <motion.div
                        key={i}
                        className="absolute inset-0 border-2 border-white/30 rounded-full"
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{
                          scale: [0.5, 1.5],
                          opacity: [0, 0.5, 0],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Number.POSITIVE_INFINITY,
                          delay: i * 0.3,
                          repeatDelay: 0.5,
                        }}
                      />
                    ))}
                  </div>
                </div>

                {/* Voice waveform */}
                <div className="px-4 pb-8">
                  <div className="h-16 flex items-center justify-center">
                    {Array.from({ length: 30 }).map((_, i) => (
                      <motion.div
                        key={i}
                        className="w-1 mx-0.5 bg-white/70 rounded-full"
                        animate={{
                          height: [Math.random() * 10 + 5, Math.random() * 30 + 10, Math.random() * 10 + 5],
                        }}
                        transition={{
                          duration: 0.8,
                          repeat: Number.POSITIVE_INFINITY,
                          delay: (i * 0.05) % 0.4,
                        }}
                      />
                    ))}
                  </div>
                </div>

                {/* Call controls */}
                <div className="flex justify-center space-x-4 pb-8">
                  <motion.div
                    className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center"
                    whileHover={{ scale: 1.1, backgroundColor: "rgba(255,255,255,0.3)" }}
                  >
                    <Mic className="h-6 w-6 text-white" />
                  </motion.div>
                  <motion.div
                    className="w-12 h-12 rounded-full bg-red-500 flex items-center justify-center"
                    whileHover={{ scale: 1.1 }}
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
                      className="text-white"
                    >
                      <path d="M10.68 13.31a16 16 0 0 0 3.41 2.6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7 2 2 0 0 1 1.72 2v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.42 19.42 0 0 1-3.33-2.67m-2.67-3.34a19.79 19.79 0 0 1-3.07-8.63A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91" />
                      <line x1="22" y1="2" x2="2" y2="22" />
                    </svg>
                  </motion.div>
                  <motion.div
                    className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center"
                    whileHover={{ scale: 1.1, backgroundColor: "rgba(255,255,255,0.3)" }}
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
                      className="text-white"
                    >
                      <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
                      <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                      <line x1="12" y1="19" x2="12" y2="23" />
                      <line x1="8" y1="23" x2="16" y2="23" />
                    </svg>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Navigation dots */}
      <div className="flex justify-center space-x-2 mt-4">
        {Array.from({ length: totalScreens }).map((_, index) => (
          <motion.button
            key={index}
            className={`w-2 h-2 rounded-full ${activeScreen === index ? "bg-primary" : "bg-gray-300"}`}
            onClick={() => setActiveScreen(index)}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
          />
        ))}
      </div>
    </div>
  )
}
