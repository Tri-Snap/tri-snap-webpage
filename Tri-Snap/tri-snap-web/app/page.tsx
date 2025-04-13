"use client"

import type React from "react"

import { useEffect, useRef } from "react"
import { motion, useInView, useAnimation } from "framer-motion"
import { Camera, MessageSquare, Video, Mic, Clock, Shield, Stethoscope } from "lucide-react"
import Image from "next/image"
import EarlyAccessForm from "@/components/early-access-form"
import AnimatedChatDemo from "@/components/animated-chat-demo"
import AnimatedAppDemo from "@/components/animated-app-demo"
import ContactForm from "@/components/contact-form"
import TeamMember from "@/components/team-member"

const FadeInSection = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const controls = useAnimation()

  useEffect(() => {
    if (isInView) {
      controls.start("visible")
    }
  }, [isInView, controls])

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, delay } },
      }}
    >
      {children}
    </motion.div>
  )
}

const AnimatedFeatureCard = ({
  icon: Icon,
  title,
  description,
  delay = 0,
}: {
  icon: React.ElementType
  title: string
  description: string
  delay?: number
}) => {
  return (
    <motion.div
      className="bg-white/90 backdrop-blur-sm p-8 rounded-xl shadow-lg"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true, margin: "-50px" }}
      whileHover={{
        y: -10,
        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      }}
    >
      <motion.div
        className="w-16 h-16 bg-gradient-to-br from-secondary/20 to-primary/20 rounded-full flex items-center justify-center mb-6"
        whileHover={{ scale: 1.1, backgroundColor: "rgba(0, 169, 157, 0.2)" }}
      >
        <Icon className="h-8 w-8 text-primary" />
      </motion.div>
      <h3 className="text-xl font-semibold text-secondary mb-4">{title}</h3>
      <p className="text-gray-700">{description}</p>
    </motion.div>
  )
}

const AnimatedMethodCard = ({
  icon: Icon,
  title,
  description,
  delay = 0,
}: {
  icon: React.ElementType
  title: string
  description: string
  delay?: number
}) => {
  return (
    <motion.div
      className="text-center bg-white/90 backdrop-blur-sm p-6 rounded-xl shadow-lg"
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true, margin: "-50px" }}
      whileHover={{ scale: 1.05 }}
    >
      <motion.div
        className="w-16 h-16 bg-gradient-to-br from-secondary to-primary text-white rounded-full flex items-center justify-center mx-auto mb-4"
        animate={{
          boxShadow: [
            "0px 0px 0px rgba(0, 169, 157, 0)",
            "0px 0px 20px rgba(0, 169, 157, 0.5)",
            "0px 0px 0px rgba(0, 169, 157, 0)",
          ],
        }}
        transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
      >
        <Icon className="h-8 w-8" />
      </motion.div>
      <h3 className="text-lg font-semibold text-secondary mb-2">{title}</h3>
      <p className="text-sm text-gray-700">{description}</p>
    </motion.div>
  )
}

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col bg-gradient-to-b from-secondary/5 to-primary/5">
      {/* Hero Section */}
      <section className="pt-12 pb-20 md:pt-20 md:pb-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-secondary/10 to-primary/10 z-0"></div>

        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-primary/10"
              style={{
                width: Math.random() * 100 + 50,
                height: Math.random() * 100 + 50,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                x: [0, Math.random() * 100 - 50],
                y: [0, Math.random() * 100 - 50],
                opacity: [0.1, 0.3, 0.1],
              }}
              transition={{
                duration: Math.random() * 20 + 10,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
              }}
            />
          ))}
        </div>

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
              <div className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                >
                  <Image
                    src="/images/tri-snap-horizontal.png"
                    alt="Tri-Snap Logo"
                    width={250}
                    height={80}
                    className="mb-6"
                  />
                </motion.div>

                <motion.p
                  className="text-primary font-medium text-lg"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                >
                  World's first instant clinical triage straight from your smartphone.
                </motion.p>

                <motion.h1
                  className="text-4xl md:text-5xl lg:text-6xl font-bold text-secondary"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7, duration: 0.5 }}
                >
                  The Future of Healthcare is here.
                </motion.h1>

                <motion.p
                  className="text-xl text-gray-700"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.9, duration: 0.5 }}
                >
                  The fastest, most accurate, real-time way to access primary care, anytime, anywhere.
                </motion.p>

                <motion.div
                  className="pt-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.1, duration: 0.5 }}
                >
                  <motion.a
                    href="#early-access"
                    className="inline-flex items-center bg-gradient-to-r from-secondary to-primary hover:opacity-90 text-white px-8 py-4 rounded-full font-medium shadow-lg"
                    whileHover={{ scale: 1.05, boxShadow: "0 10px 25px -5px rgba(0, 169, 157, 0.4)" }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Get Early Access
                  </motion.a>
                </motion.div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.8, type: "spring" }}
            >
              <AnimatedAppDemo />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Video Demo Section */}
      <section id="demo" className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 to-primary/5 z-0"></div>

        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute w-[800px] h-[800px] rounded-full bg-gradient-to-r from-primary/10 to-secondary/10 blur-3xl"
            style={{ top: "-400px", left: "-200px" }}
            animate={{
              x: [0, 100, 0],
              y: [0, 50, 0],
            }}
            transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY }}
          />
          <motion.div
            className="absolute w-[600px] h-[600px] rounded-full bg-gradient-to-r from-secondary/10 to-primary/10 blur-3xl"
            style={{ bottom: "-300px", right: "-200px" }}
            animate={{
              x: [0, -100, 0],
              y: [0, -50, 0],
            }}
            transition={{ duration: 15, repeat: Number.POSITIVE_INFINITY }}
          />
        </div>

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <motion.h2
              className="text-3xl md:text-4xl font-bold text-secondary mb-4"
              animate={{
                textShadow: [
                  "0px 0px 0px rgba(0, 169, 157, 0)",
                  "0px 0px 10px rgba(0, 169, 157, 0.3)",
                  "0px 0px 0px rgba(0, 169, 157, 0)",
                ],
              }}
              transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
            >
              See Tri-Snap in Action
            </motion.h2>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto">
              Watch how Tri-Snap provides instant clinical triage with just a few taps on your smartphone.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="relative"
          >
            <AnimatedChatDemo />

            {/* Decorative elements */}
            <motion.div
              className="absolute -top-10 -left-10 w-20 h-20 text-primary/20"
              initial={{ opacity: 0, rotate: -20 }}
              whileInView={{ opacity: 1, rotate: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" />
              </svg>
            </motion.div>

            <motion.div
              className="absolute -bottom-10 -right-10 w-20 h-20 text-secondary/20"
              initial={{ opacity: 0, rotate: 20 }}
              whileInView={{ opacity: 1, rotate: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
                <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                <line x1="12" y1="19" x2="12" y2="23" />
                <line x1="8" y1="23" x2="16" y2="23" />
              </svg>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Why Tri-Snap Section */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-secondary/10 to-primary/10 z-0"></div>
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-4">Why Tri-Snap?</h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              We believe Generative AI is safe enough for diagnosis.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <AnimatedFeatureCard
              icon={Clock}
              title="Instant Access"
              description="Get immediate clinical triage without waiting for appointments or spending hours in waiting rooms."
              delay={0.1}
            />

            <AnimatedFeatureCard
              icon={Stethoscope}
              title="Clinical Accuracy"
              description="Powered by advanced AI trained on medical data to provide accurate initial assessments."
              delay={0.2}
            />

            <AnimatedFeatureCard
              icon={Shield}
              title="Privacy First"
              description="Your health data is encrypted and secure, with privacy built into every aspect of our platform."
              delay={0.3}
            />
          </div>
        </div>
      </section>

      {/* How Tri-Snap Works */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 to-primary/5 z-0"></div>
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-4">Multiple Ways to Connect</h2>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto">
              Choose the communication method that works best for you.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            <AnimatedMethodCard
              icon={Camera}
              title="Photo"
              description="Capture and analyze visible symptoms instantly."
              delay={0.1}
            />

            <AnimatedMethodCard
              icon={Mic}
              title="Voice"
              description="Describe symptoms verbally for hands-free interaction."
              delay={0.2}
            />

            <AnimatedMethodCard
              icon={MessageSquare}
              title="Chat"
              description="Text with our AI for detailed symptom assessment."
              delay={0.3}
            />

            <AnimatedMethodCard
              icon={Video}
              title="Sign Language"
              description="Communicate using sign language for accessible care."
              delay={0.4}
            />
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section id="about" className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-secondary/10 to-primary/10 z-0"></div>
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-4">Meet Our Team</h2>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto">
              The passionate minds behind Tri-Snap working to revolutionize healthcare access.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <TeamMember
              name="Sukin Yang"
              role="CEO"
              bio="golden gooner"
              imageSrc="https://s.hdnux.com/photos/53/01/11/11276925/6/rawImage.jpg"
              linkedin="https://linkedin.com"
              email="sukin@tri-snap.com"
            />

            <TeamMember
              name="Andrew Wu"
              role="COO"
              bio="silver stroker."
              imageSrc="https://s.hdnux.com/photos/53/01/11/11276925/6/rawImage.jpg"
              linkedin="https://linkedin.com"
              email="andrew.wu@tri-snap.com"
            />

            <TeamMember
              name="Thien Hoang"
              role="CTO"
              bio="janitor"
              imageSrc="https://s.hdnux.com/photos/53/01/11/11276925/6/rawImage.jpg"
              linkedin="https://linkedin.com"
              email="thien@tri-snap.com"
            />
          </div>
        </div>
      </section>

      {/* Early Access Section */}
      <section id="early-access" className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-secondary to-primary opacity-90 z-0"></div>

        {/* Animated particles */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-white"
              style={{
                width: Math.random() * 6 + 2,
                height: Math.random() * 6 + 2,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -Math.random() * 100 - 50],
                opacity: [0, 0.7, 0],
              }}
              transition={{
                duration: Math.random() * 10 + 5,
                repeat: Number.POSITIVE_INFINITY,
                delay: Math.random() * 5,
              }}
            />
          ))}
        </div>

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <motion.div
            className="text-center mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Get Early Access</h2>
            <p className="text-lg text-gray-100 max-w-2xl mx-auto">
              Be among the first to experience the future of healthcare. Sign up for early access to Tri-Snap.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <EarlyAccessForm />
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-secondary/10 to-primary/10 z-0"></div>

        {/* Decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute w-[600px] h-[600px] rounded-full bg-gradient-to-r from-primary/5 to-secondary/5 blur-3xl"
            style={{ top: "-200px", right: "-200px" }}
            animate={{
              x: [0, -50, 0],
              y: [0, 50, 0],
            }}
            transition={{ duration: 15, repeat: Number.POSITIVE_INFINITY }}
          />
        </div>

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <motion.div
            className="text-center mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-4">Contact Us</h2>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto">
              Have questions or want to learn more about Tri-Snap? Reach out to us directly.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="relative"
          >
            <ContactForm />

            {/* Decorative elements */}
            <motion.div
              className="absolute -top-10 -left-10 md:-left-20 w-16 h-16 text-primary/20"
              initial={{ opacity: 0, rotate: -20 }}
              whileInView={{ opacity: 1, rotate: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M22 2H2v20l4-4h16V2z" />
              </svg>
            </motion.div>

            <motion.div
              className="absolute -bottom-10 -right-10 md:-right-20 w-16 h-16 text-secondary/20"
              initial={{ opacity: 0, rotate: 20 }}
              whileInView={{ opacity: 1, rotate: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              viewport={{ once: true }}
            >
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
              </svg>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-secondary py-8 text-center text-white relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djZoNnYtNmgtNnptMCAwdjZoNnYtNmgtNnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-10"></div>
        </div>

        <div className="container mx-auto px-4 relative">
          <div className="flex flex-col items-center justify-center">
            <Image
              src="/images/tri-snap-logo.png"
              alt="Tri-Snap Logo"
              width={60}
              height={60}
              className="mb-4 brightness-0 invert"
            />

            <p className="text-gray-300 mb-6 max-w-md mx-auto text-sm">
              The fastest, most accurate, real-time way to access primary care, anytime, anywhere.
            </p>

            <div className="flex space-x-6 mb-6">
              <motion.a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    fillRule="evenodd"
                    d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </motion.a>

              <motion.a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                </svg>
              </motion.a>

              <motion.a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    fillRule="evenodd"
                    d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </motion.a>

              <motion.a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"></path>
                </svg>
              </motion.a>
            </div>

            <p className="text-sm text-gray-400">&copy; {new Date().getFullYear()} Tri-Snap. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </main>
  )
}
