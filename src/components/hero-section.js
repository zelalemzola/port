"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion"
import { ArrowRight, MousePointer } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useMobile } from "@/hooks/use-mobile"

export default function HeroSection({ setCursorText, setCursorVariant }) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const heroRef = useRef(null)
  const canvasRef = useRef(null)
  const isMobile = useMobile()

  const { scrollYProgress } = useScroll()
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.8])

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const springConfig = { damping: 25, stiffness: 300 }
  const springX = useSpring(mouseX, springConfig)
  const springY = useSpring(mouseY, springConfig)

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e
      const { left, top, width, height } = heroRef.current.getBoundingClientRect()

      const x = clientX - left
      const y = clientY - top

      setMousePosition({ x, y })
      mouseX.set(x / width - 0.5)
      mouseY.set(y / height - 0.5)
    }

    heroRef.current.addEventListener("mousemove", handleMouseMove)

    return () => {
      if (heroRef.current) {
        heroRef.current.removeEventListener("mousemove", handleMouseMove)
      }
    }
  }, [mouseX, mouseY])

  useEffect(() => {
    if (!canvasRef.current || isMobile) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    let animationFrameId
    let particles = []

    // Set canvas dimensions
    const setCanvasDimensions = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }

    setCanvasDimensions()
    window.addEventListener("resize", setCanvasDimensions)

    // Particle class
    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.size = Math.random() * 2 + 0.5
        this.baseX = this.x
        this.baseY = this.y
        this.density = Math.random() * 20 + 1
        this.color = `hsla(${Math.random() * 60 + 200}, 70%, 50%, ${Math.random() * 0.3 + 0.1})`
      }

      draw() {
        ctx.fillStyle = this.color
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.closePath()
        ctx.fill()
      }

      update() {
        // Calculate distance between particle and mouse
        const dx = mousePosition.x - this.x
        const dy = mousePosition.y - this.y
        const distance = Math.sqrt(dx * dx + dy * dy)
        const forceDirectionX = dx / distance
        const forceDirectionY = dy / distance

        // Max distance, past that the force will be 0
        const maxDistance = 100
        let force = (maxDistance - distance) / maxDistance

        if (force < 0) force = 0

        const directionX = forceDirectionX * force * this.density
        const directionY = forceDirectionY * force * this.density

        if (distance < maxDistance) {
          this.x += directionX
          this.y += directionY
        } else {
          if (this.x !== this.baseX) {
            const dx = this.x - this.baseX
            this.x -= dx / 10
          }
          if (this.y !== this.baseY) {
            const dy = this.y - this.baseY
            this.y -= dy / 10
          }
        }
      }
    }

    // Initialize particles
    const init = () => {
      particles = []
      const numberOfParticles = (canvas.width * canvas.height) / 6000

      for (let i = 0; i < numberOfParticles; i++) {
        particles.push(new Particle())
      }
    }

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw connections
      ctx.strokeStyle = "rgba(100, 150, 255, 0.05)"
      ctx.lineWidth = 0.5

      for (let i = 0; i < particles.length; i++) {
        for (let j = i; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 100) {
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.stroke()
          }
        }
      }

      // Update and draw particles
      for (let i = 0; i < particles.length; i++) {
        particles[i].update()
        particles[i].draw()
      }

      animationFrameId = requestAnimationFrame(animate)
    }

    init()
    animate()

    return () => {
      window.removeEventListener("resize", setCanvasDimensions)
      cancelAnimationFrame(animationFrameId)
    }
  }, [mousePosition, isMobile])

  const enterButton = () => {
    setCursorText("Click")
    setCursorVariant("button")
  }

  const leaveButton = () => {
    setCursorText("")
    setCursorVariant("default")
  }

  return (
    <section ref={heroRef} className="min-h-screen flex items-center relative overflow-hidden py-20" id="hero">
      <div className="absolute inset-0 -z-10">
        <canvas ref={canvasRef} className="w-full h-full" />
      </div>

      <div className="container mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.div style={{ opacity, scale }} className="inline-block">
              <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
                Full-Stack Developer
              </span>
            </motion.div>

            <div className="relative">
              <motion.h1
                className="text-5xl md:text-7xl font-bold tracking-tight"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                Hi, I'm{" "}
                <div className="relative inline-block">
                  <span className="relative z-10 text-primary">Zelalem</span>
                  <motion.div
                    className="absolute -bottom-2 left-0 w-full h-1 bg-primary"
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 0.8, delay: 1.2 }}
                  />
                  <motion.div
                    className="absolute -inset-1 bg-primary/10 rounded-lg -z-10"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 1.4 }}
                  />
                </div>
              </motion.h1>
            </div>

            <motion.div
              className="relative h-20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <AnimatedTextReveal text="Transforming Ideas into Digital Masterpieces" />
            </motion.div>

            <motion.p
              className="text-lg text-muted-foreground max-w-xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              Building fast, SEO-optimized, and visually stunning web applications that not only look great but also
              perform flawlessly.
            </motion.p>

            <motion.div
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
            >
              <Button
                asChild
                size="lg"
                className="group relative overflow-hidden"
                onMouseEnter={enterButton}
                onMouseLeave={leaveButton}
              >
                <Link href="#projects">
                  <span className="relative z-10">Let's Create Something Amazing Together</span>
                  <motion.span
                    className="absolute inset-0 bg-white dark:bg-black opacity-20"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "100%" }}
                    transition={{ duration: 0.5 }}
                  />
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>

              <motion.div
                className="hidden md:flex items-center gap-2 text-muted-foreground"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
              >
                <MousePointer className="h-4 w-4 animate-bounce" />
                <span className="text-sm">Scroll to explore</span>
              </motion.div>
            </motion.div>
          </motion.div>

          <motion.div
            className="relative h-[400px] md:h-[500px]"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <HeroVisual springX={springX} springY={springY} />
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {["hero", "services", "process", "projects", "tech", "contact"].map((section) => (
          <motion.div
            key={section}
            className={`w-2 h-2 rounded-full ${section === "hero" ? "bg-primary" : "bg-muted"}`}
            whileHover={{ scale: 1.5 }}
          />
        ))}
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent pointer-events-none" />
    </section>
  )
}

function AnimatedTextReveal({ text }) {
  const words = text.split(" ")

  return (
    <div className="flex flex-wrap">
      {words.map((word, i) => (
        <div key={i} className="mr-2 overflow-hidden">
          <motion.span
            className="text-2xl md:text-3xl font-bold text-primary inline-block"
            initial={{ y: 50 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5, delay: 1 + i * 0.1 }}
          >
            {word}
          </motion.span>
        </div>
      ))}
    </div>
  )
}

function HeroVisual({ springX, springY }) {
  const visualRef = useRef(null)

  return (
    <div ref={visualRef} className="w-full h-full relative">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-background rounded-2xl overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent"
          style={{
            x: useTransform(springX, [-0.5, 0.5], [-20, 20]),
            y: useTransform(springY, [-0.5, 0.5], [-20, 20]),
          }}
        />

        <motion.div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-gradient-to-br from-primary/20 to-primary/5"
          style={{
            x: useTransform(springX, [-0.5, 0.5], [-30, 30]),
            y: useTransform(springY, [-0.5, 0.5], [-30, 30]),
          }}
        />

        <motion.div
          className="absolute top-1/4 right-1/4 w-20 h-20 rounded-full bg-primary/10"
          style={{
            x: useTransform(springX, [-0.5, 0.5], [-50, 50]),
            y: useTransform(springY, [-0.5, 0.5], [-20, 20]),
          }}
        />

        <motion.div
          className="absolute bottom-1/4 left-1/3 w-16 h-16 rounded-full bg-primary/15"
          style={{
            x: useTransform(springX, [-0.5, 0.5], [-40, 40]),
            y: useTransform(springY, [-0.5, 0.5], [-40, 40]),
          }}
        />

        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            className="relative"
            style={{
              x: useTransform(springX, [-0.5, 0.5], [-10, 10]),
              y: useTransform(springY, [-0.5, 0.5], [-10, 10]),
            }}
          >
            <div className="w-40 h-40 md:w-48 md:h-48 rounded-full bg-gradient-to-br from-primary to-primary/50 flex items-center justify-center shadow-lg relative">
              <span className="text-white text-3xl md:text-4xl font-bold">ZT</span>

              <motion.div
                className="absolute -inset-4 border-2 border-primary/30 rounded-full"
                animate={{
                  rotate: 360,
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  rotate: { duration: 20, ease: "linear", repeat: Number.POSITIVE_INFINITY },
                  scale: { duration: 3, repeat: Number.POSITIVE_INFINITY },
                }}
              />

              <motion.div
                className="absolute -inset-8 border border-primary/20 rounded-full"
                animate={{ rotate: -360 }}
                transition={{ duration: 30, ease: "linear", repeat: Number.POSITIVE_INFINITY }}
              />
            </div>
          </motion.div>
        </div>

        {/* Floating elements */}
        <FloatingElement
          icon="⚛️"
          size="lg"
          position="top-1/4 right-1/3"
          delay={0}
          springX={springX}
          springY={springY}
          multiplier={2}
        />
        <FloatingElement
          icon="🚀"
          size="md"
          position="bottom-1/4 right-1/4"
          delay={0.5}
          springX={springX}
          springY={springY}
          multiplier={1.5}
        />
        <FloatingElement
          icon="💻"
          size="sm"
          position="top-1/3 left-1/4"
          delay={1}
          springX={springX}
          springY={springY}
          multiplier={2.5}
        />
        <FloatingElement
          icon="🔮"
          size="md"
          position="bottom-1/3 left-1/3"
          delay={1.5}
          springX={springX}
          springY={springY}
          multiplier={1.8}
        />
      </div>
    </div>
  )
}

function FloatingElement({ icon, size, position, delay, springX, springY, multiplier = 1 }) {
  const sizeClasses = {
    sm: "w-8 h-8 text-sm",
    md: "w-12 h-12 text-lg",
    lg: "w-16 h-16 text-2xl",
  }

  return (
    <motion.div
      className={`absolute ${position} ${sizeClasses[size]} bg-background rounded-full flex items-center justify-center shadow-md z-10`}
      initial={{ opacity: 0, y: 20 }}
      animate={{
        opacity: 1,
        y: 0,
        x: useTransform(springX, [-0.5, 0.5], [-15 * multiplier, 15 * multiplier]),
        y: useTransform(springY, [-0.5, 0.5], [-15 * multiplier, 15 * multiplier]),
      }}
      transition={{
        opacity: { duration: 0.5, delay },
        y: { duration: 0.5, delay },
      }}
    >
      {icon}
    </motion.div>
  )
}

