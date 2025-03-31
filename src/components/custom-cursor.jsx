"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

export default function CustomCursor({ cursorText, cursorVariant }) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const mouseMove = (e) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      })
    }

    window.addEventListener("mousemove", mouseMove)

    return () => {
      window.removeEventListener("mousemove", mouseMove)
    }
  }, [])

  const variants = {
    default: {
      x: mousePosition.x - 16,
      y: mousePosition.y - 16,
      height: 32,
      width: 32,
      backgroundColor: "transparent",
      border: "2px solid hsl(var(--primary))",
      transition: {
        type: "spring",
        mass: 0.6,
      },
    },
    button: {
      x: mousePosition.x - 32,
      y: mousePosition.y - 32,
      height: 64,
      width: 64,
      backgroundColor: "rgba(var(--primary), 0.1)",
      border: "2px solid hsl(var(--primary))",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      color: "hsl(var(--primary))",
      fontSize: "14px",
      fontWeight: "bold",
    },
  }

  return (
    <motion.div
      className="fixed top-0 left-0 rounded-full pointer-events-none z-50 flex items-center justify-center"
      variants={variants}
      animate={cursorVariant}
    >
      {cursorText && <span className="text-sm font-medium">{cursorText}</span>}
    </motion.div>
  )
}

