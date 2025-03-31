"use client"

import { useEffect, useRef } from "react"
import { useTheme } from "next-themes"

export default function InteractiveBackground() {
  const canvasRef = useRef(null)
  const { theme } = useTheme()

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    let animationFrameId

    // Set canvas dimensions
    const setCanvasDimensions = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    setCanvasDimensions()
    window.addEventListener("resize", setCanvasDimensions)

    // Create gradient background
    const createGradient = () => {
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)

      if (theme === "dark") {
        gradient.addColorStop(0, "rgba(10, 10, 20, 1)")
        gradient.addColorStop(1, "rgba(5, 5, 15, 1)")
      } else {
        gradient.addColorStop(0, "rgba(245, 247, 250, 1)")
        gradient.addColorStop(1, "rgba(240, 242, 245, 1)")
      }

      return gradient
    }

    // Create grid of dots
    class Dot {
      constructor(x, y) {
        this.x = x
        this.y = y
        this.baseSize = 1
        this.size = this.baseSize
        this.maxSize = 3
        this.alpha = 0.3
        this.growing = false
      }

      draw() {
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)

        if (theme === "dark") {
          ctx.fillStyle = `rgba(100, 150, 255, ${this.alpha})`
        } else {
          ctx.fillStyle = `rgba(50, 100, 200, ${this.alpha})`
        }

        ctx.fill()
      }

      update(mouseX, mouseY) {
        const dx = mouseX - this.x
        const dy = mouseY - this.y
        const distance = Math.sqrt(dx * dx + dy * dy)
        const maxDistance = 100

        if (distance < maxDistance) {
          const scale = 1 - distance / maxDistance
          this.size = this.baseSize + (this.maxSize - this.baseSize) * scale
          this.alpha = 0.3 + 0.7 * scale
          this.growing = true
        } else if (this.growing) {
          this.size = Math.max(this.baseSize, this.size - 0.1)
          this.alpha = Math.max(0.3, this.alpha - 0.02)

          if (this.size <= this.baseSize) {
            this.growing = false
          }
        }
      }
    }

    // Initialize dots
    let dots = []
    const spacing = 30

    const initDots = () => {
      dots = []

      for (let x = 0; x < canvas.width; x += spacing) {
        for (let y = 0; y < canvas.height; y += spacing) {
          dots.push(new Dot(x, y))
        }
      }
    }

    initDots()

    // Track mouse position
    let mouseX = 0
    let mouseY = 0

    const handleMouseMove = (e) => {
      mouseX = e.clientX
      mouseY = e.clientY
    }

    window.addEventListener("mousemove", handleMouseMove)

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw background
      ctx.fillStyle = createGradient()
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Update and draw dots
      for (const dot of dots) {
        dot.update(mouseX, mouseY)
        dot.draw()
      }

      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", setCanvasDimensions)
      window.removeEventListener("mousemove", handleMouseMove)
      cancelAnimationFrame(animationFrameId)
    }
  }, [theme])

  return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full -z-10" />
}

