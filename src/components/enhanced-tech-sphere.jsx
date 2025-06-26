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
    { name: "React Native", description: "Cross-platform mobile app development", icon: "📱", color: "#61dafb" },
    { name: "Tailwind CSS", description: "Fast, responsive, and customizable design", icon: "🎨", color: "#38bdf8" },
    { name: "TypeScript", description: "Building scalable and maintainable applications", icon: "📝", color: "#3178c6" },
    { name: "Figma", description: "Collaborative interface design tool", icon: "🎨", color: "#a259ff" },
    { name: "GraphQL", description: "Efficient data fetching for seamless integrations", icon: "📊", color: "#e535ab" },
    { name: "MongoDB", description: "Flexible document database for modern apps", icon: "🍃", color: "#13aa52" },
    { name: "PostgreSQL", description: "Powerful, open source object-relational database", icon: "🐘", color: "#336791" },
    { name: "Docker", description: "Containerizing applications for easy deployment", icon: "🐳", color: "#2496ed" },
    { name: "Git", description: "Version control for collaborative development", icon: "📚", color: "#f05032" },
    { name: "Vercel", description: "Deployment platform for frontend applications", icon: "▲", color: "#000000" },
  ]

  const [isMobileView, setIsMobileView] = useState(false)
  const [hovered, setHovered] = useState(null);

  useEffect(() => {
    setIsMobileView(isMobile)
  }, [isMobile])

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

  // Option 3: Interactive Skill Map (network/graph)
  // For simplicity, use a static force-directed layout with related skills connected by lines.
  // Highlight related skills and show tooltip on hover.
  // This is a simple illustrative version (not a physics engine, but visually engaging).

  // Define related skills (edges)
  const edges = [
    ["Next.js", "React"],
    ["Next.js", "TypeScript"],
    ["React", "Tailwind CSS"],
    ["React", "TypeScript"],
    ["React Native", "React"],
    ["React Native", "TypeScript"],
    ["Figma", "Tailwind CSS"],
    ["Figma", "React"],
    ["GraphQL", "MongoDB"],
    ["MongoDB", "PostgreSQL"],
    ["Docker", "Vercel"],
    ["Git", "Vercel"],
    ["Git", "Docker"],
    ["Tailwind CSS", "TypeScript"],
    ["Vercel", "Next.js"],
  ];

  // Position nodes in a circle for simplicity
  const RADIUS = 180;
  const centerX = 250;
  const centerY = 220;
  const nodePositions = technologies.reduce((acc, tech, i) => {
    const angle = (2 * Math.PI * i) / technologies.length;
    acc[tech.name] = {
      x: centerX + RADIUS * Math.cos(angle),
      y: centerY + RADIUS * Math.sin(angle),
      tech,
    };
    return acc;
  }, {});

  return (
    <div className="w-full flex justify-center items-center py-8">
      <svg width={500} height={440} className="block">
        {/* Draw edges */}
        {edges.map(([from, to], i) => (
          <line
            key={i}
            x1={nodePositions[from].x}
            y1={nodePositions[from].y}
            x2={nodePositions[to].x}
            y2={nodePositions[to].y}
            stroke={
              hovered && (hovered === from || hovered === to)
                ? nodePositions[from].tech.color
                : "#bbb"
            }
            strokeWidth={hovered && (hovered === from || hovered === to) ? 2.5 : 1.2}
            opacity={hovered && !(hovered === from || hovered === to) ? 0.3 : 0.7}
          />
        ))}
        {/* Draw nodes */}
        {Object.values(nodePositions).map(({ x, y, tech }) => (
          <g
            key={tech.name}
            onMouseEnter={() => setHovered(tech.name)}
            onMouseLeave={() => setHovered(null)}
            style={{ cursor: "pointer" }}
          >
            <circle
              cx={x}
              cy={y}
              r={hovered === tech.name ? 32 : 26}
              fill={`${tech.color}20`}
              stroke={tech.color}
              strokeWidth={hovered === tech.name ? 3 : 1.5}
              filter={hovered === tech.name ? "drop-shadow(0 0 8px #0003)" : "none"}
            />
            <text
              x={x}
              y={y + 8}
              textAnchor="middle"
              fontSize={hovered === tech.name ? 32 : 26}
              fontWeight="bold"
              fill={tech.color}
              style={{ pointerEvents: "none", userSelect: "none" }}
            >
              {tech.icon}
            </text>
          </g>
        ))}
      </svg>
      {/* Tooltip */}
      {hovered && (
        <div
          className="fixed z-50 px-4 py-2 rounded bg-background border border-border shadow text-sm"
          style={{
            left: nodePositions[hovered].x + 60,
            top: nodePositions[hovered].y + 80,
            minWidth: 180,
            pointerEvents: "none",
          }}
        >
          <div className="font-semibold mb-1" style={{ color: nodePositions[hovered].tech.color }}>
            {nodePositions[hovered].tech.name}
          </div>
          <div className="text-muted-foreground">{nodePositions[hovered].tech.description}</div>
        </div>
      )}
    </div>
  );
}

