"use client"

import { useEffect, useRef, useState } from "react"
import { motion, AnimatePresence, useMotionValue } from "framer-motion"
import { useMobile } from "@/hooks/use-mobile"

export default function EnhancedTechSphere() {
  const containerRef = useRef(null)
  const [hoveredTech, setHoveredTech] = useState(null)
  const [isRotating, setIsRotating] = useState(true)
  const isMobile = useMobile()

  const rotateX = useMotionValue(0)
  const rotateY = useMotionValue(0)

  const technologies = [
    { name: "Next.js", description: "For fast, scalable, and SEO-friendly web apps", icon: "⚛️", color: "#0070f3" },
    { name: "React", description: "Building interactive and dynamic user interfaces", icon: "🔄", color: "#61dafb" },
    { name: "Tailwind CSS", description: "Fast, responsive, and customizable design", icon: "🎨", color: "#38bdf8" },
    {
      name: "TypeScript",
      description: "Building scalable and maintainable applications",
      icon: "📝",
      color: "#3178c6",
    },
    { name: "Node.js", description: "For backend functionality and building APIs", icon: "🚀", color: "#68a063" },
    { name: "GraphQL", description: "Efficient data fetching for seamless integrations", icon: "📊", color: "#e535ab" },
    { name: "MongoDB", description: "Flexible document database for modern apps", icon: "🍃", color: "#13aa52" },
    {
      name: "PostgreSQL",
      description: "Powerful, open source object-relational database",
      icon: "🐘",
      color: "#336791",
    },
    { name: "Docker", description: "Containerizing applications for easy deployment", icon: "🐳", color: "#2496ed" },
    { name: "Git", description: "Version control for collaborative development", icon: "📚", color: "#f05032" },
    { name: "AWS", description: "Cloud infrastructure for scalable applications", icon: "☁️", color: "#ff9900" },
    { name: "Vercel", description: "Deployment platform for frontend applications", icon: "▲", color: "#000000" },
  ]

  const [isMobileView, setIsMobileView] = useState(false)

  useEffect(() => {
    setIsMobileView(isMobile)
  }, [isMobile])

  if (isMobileView) {
    return (
      <div className="grid grid-cols-2 gap-4">
        {technologies.map((tech, index) => (
          <motion.div
            key={index}
            className="bg-background rounded-lg p-4 border border-border"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="flex items-center gap-3 mb-2">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-lg"
                style={{ backgroundColor: `${tech.color}20` }}
              >
                {tech.icon}
              </div>
              <h3 className="font-semibold" style={{ color: tech.color }}>
                {tech.name}
              </h3>
            </div>
            <p className="text-sm text-muted-foreground">{tech.description}</p>
          </motion.div>
        ))}
      </div>
    )
  }

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    let lastX = 0
    let lastY = 0
    let speedX = 0
    let speedY = 0

    const handleMouseMove = (e) => {
      if (!isRotating) return

      const { clientX, clientY } = e
      const { left, top, width, height } = container.getBoundingClientRect()

      const x = (clientX - left - width / 2) / (width / 2)
      const y = (clientY - top - height / 2) / (height / 2)

      speedX = x - lastX
      speedY = y - lastY

      lastX = x
      lastY = y

      rotateX.set(rotateX.get() + speedY * 2)
      rotateY.set(rotateY.get() - speedX * 2)
    }

    const handleMouseLeave = () => {
      if (!isRotating) return

      // Continue rotation with momentum
      const momentumInterval = setInterval(() => {
        speedX *= 0.95
        speedY *= 0.95

        rotateX.set(rotateX.get() + speedY * 2)
        rotateY.set(rotateY.get() - speedX * 2)

        if (Math.abs(speedX) < 0.001 && Math.abs(speedY) < 0.001) {
          clearInterval(momentumInterval)
        }
      }, 16)
    }

    // Auto rotation
    const autoRotate = () => {
      if (!isRotating) return

      rotateY.set(rotateY.get() + 0.2)
      requestAnimationFrame(autoRotate)
    }

    const autoRotateId = requestAnimationFrame(autoRotate)

    container.addEventListener("mousemove", handleMouseMove)
    container.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      container.removeEventListener("mousemove", handleMouseMove)
      container.removeEventListener("mouseleave", handleMouseLeave)
      cancelAnimationFrame(autoRotateId)
    }
  }, [isRotating, rotateX, rotateY])

  return (
    <div className="relative h-[500px]">
      <div
        ref={containerRef}
        className="w-full h-full flex items-center justify-center perspective"
        onClick={() => setIsRotating(!isRotating)}
      >
        <motion.div
          className="relative w-[300px] h-[300px] transform-style-3d"
          style={{
            rotateX: rotateX,
            rotateY: rotateY,
            transformStyle: "preserve-3d",
          }}
        >
          {technologies.map((tech, i) => {
            const theta = (i / technologies.length) * Math.PI * 2
            const phi = Math.acos(-1 + (2 * i) / technologies.length)

            const x = 150 * Math.cos(theta) * Math.sin(phi)
            const y = 150 * Math.sin(theta) * Math.sin(phi)
            const z = 150 * Math.cos(phi)

            return (
              <motion.div
                key={tech.name}
                className="absolute w-16 h-16 rounded-full flex items-center justify-center cursor-pointer transform-style-3d"
                style={{
                  x,
                  y,
                  z,
                  transformStyle: "preserve-3d",
                  backgroundColor: `${tech.color}20`,
                  border: `1px solid ${tech.color}40`,
                  boxShadow: `0 0 10px ${tech.color}30`,
                }}
                whileHover={{ scale: 1.2 }}
                onMouseEnter={() => {
                  setHoveredTech(tech)
                  setIsRotating(false)
                }}
                onMouseLeave={() => {
                  setHoveredTech(null)
                  setIsRotating(true)
                }}
              >
                <div className="text-2xl">{tech.icon}</div>
                <div
                  className="absolute whitespace-nowrap px-2 py-1 rounded bg-background border border-border text-xs font-medium transform translate-z-20"
                  style={{
                    transform: "translateZ(30px)",
                    opacity: 0.8,
                    color: tech.color,
                  }}
                >
                  {tech.name}
                </div>
              </motion.div>
            )
          })}

          {/* Inner sphere */}
          <div
            className="absolute w-[100px] h-[100px] rounded-full bg-gradient-to-br from-primary/10 to-primary/5"
            style={{ transform: "translateZ(0)" }}
          />

          {/* Orbits */}
          <div
            className="absolute w-[300px] h-[300px] rounded-full border border-primary/10"
            style={{ transform: "rotateX(90deg)" }}
          />
          <div
            className="absolute w-[300px] h-[300px] rounded-full border border-primary/10"
            style={{ transform: "rotateY(90deg)" }}
          />
          <div className="absolute w-[300px] h-[300px] rounded-full border border-primary/10" />
        </motion.div>
      </div>

    

      <AnimatePresence>
        {hoveredTech && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2 bg-background rounded-lg p-4 shadow-lg border border-border text-center max-w-xs"
            style={{ zIndex: 20 }}
          >
            <div
              className="inline-block w-10 h-10 rounded-full mb-2 flex items-center justify-center text-xl"
              style={{ backgroundColor: `${hoveredTech.color}20` }}
            >
              {hoveredTech.icon}
            </div>
            <h3 className="font-semibold mb-1" style={{ color: hoveredTech.color }}>
              {hoveredTech.name}
            </h3>
            <p className="text-sm text-muted-foreground">{hoveredTech.description}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

