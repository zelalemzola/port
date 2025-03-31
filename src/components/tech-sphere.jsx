"use client"

import { useEffect, useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useMobile } from "@/hooks/use-mobile"

export default function TechSphere() {
  const containerRef = useRef(null)
  const [hoveredTech, setHoveredTech] = useState(null)
  const isMobile = useMobile()

  const technologies = [
    { name: "Next.js", description: "For fast, scalable, and SEO-friendly web apps" },
    { name: "React", description: "Building interactive and dynamic user interfaces" },
    { name: "Tailwind CSS", description: "Fast, responsive, and customizable design" },
    { name: "TypeScript", description: "Building scalable and maintainable applications" },
    { name: "Node.js", description: "For backend functionality and building APIs" },
    { name: "GraphQL", description: "Efficient data fetching for seamless integrations" },
    { name: "MongoDB", description: "Flexible document database for modern apps" },
    { name: "PostgreSQL", description: "Powerful, open source object-relational database" },
    { name: "Docker", description: "Containerizing applications for easy deployment" },
    { name: "Git", description: "Version control for collaborative development" },
  ]

  useEffect(() => {
    if (isMobile) return

    const container = containerRef.current
    let radius = 200
    const autoRotate = true
    const rotateSpeed = -60
    let imgWidth = 60
    let imgHeight = 60

    // Adjust size for smaller screens
    const updateDimensions = () => {
      if (window.innerWidth < 768) {
        radius = 150
        imgWidth = 50
        imgHeight = 50
      } else {
        radius = 200
        imgWidth = 60
        imgHeight = 60
      }
    }

    updateDimensions()
    window.addEventListener("resize", updateDimensions)

    setTimeout(init, 1000)

    let odrag
    let ospin
    const aImg = []
    const aEle = []

    function init() {
      if (!container) return

      ospin = document.createElement("div")
      ospin.className = "spin"
      ospin.style.position = "relative"
      ospin.style.width = "100%"
      ospin.style.height = "100%"
      ospin.style.display = "flex"
      ospin.style.justifyContent = "center"
      ospin.style.alignItems = "center"

      container.appendChild(ospin)

      for (let i = 0; i < technologies.length; i++) {
        aEle[i] = document.createElement("div")
        aEle[i].className = "tech-item"
        aEle[i].style.position = "absolute"
        aEle[i].style.width = `${imgWidth}px`
        aEle[i].style.height = `${imgHeight}px`
        aEle[i].style.display = "flex"
        aEle[i].style.justifyContent = "center"
        aEle[i].style.alignItems = "center"
        aEle[i].style.borderRadius = "50%"
        aEle[i].style.backgroundColor = "rgba(var(--primary), 0.1)"
        aEle[i].style.color = "hsl(var(--primary))"
        aEle[i].style.fontWeight = "bold"
        aEle[i].style.cursor = "pointer"
        aEle[i].style.transition = "transform 0.3s, background-color 0.3s"
        aEle[i].style.zIndex = "1"

        aEle[i].innerHTML = technologies[i].name

        aEle[i].addEventListener("mouseenter", () => {
          setHoveredTech(technologies[i])
          aEle[i].style.backgroundColor = "hsl(var(--primary))"
          aEle[i].style.color = "hsl(var(--primary-foreground))"
          aEle[i].style.transform = "scale(1.2)"
        })

        aEle[i].addEventListener("mouseleave", () => {
          setHoveredTech(null)
          aEle[i].style.backgroundColor = "rgba(var(--primary), 0.1)"
          aEle[i].style.color = "hsl(var(--primary))"
          aEle[i].style.transform = "scale(1)"
        })

        ospin.appendChild(aEle[i])
        aImg.push(aEle[i])
      }

      odrag = document.createElement("div")
      odrag.className = "drag"
      odrag.style.position = "absolute"
      odrag.style.width = "100%"
      odrag.style.height = "100%"
      odrag.style.display = "flex"
      odrag.style.justifyContent = "center"
      odrag.style.alignItems = "center"
      odrag.style.cursor = "pointer"

      ospin.appendChild(odrag)

      // Mouse events
      container.addEventListener("mousedown", function (e) {
        clearInterval(odrag.timer)
        e = e || window.event
        let sX = e.clientX,
          sY = e.clientY

        this.addEventListener("mousemove", mousemove)
        this.addEventListener("mouseup", mouseup)

        function mousemove(e) {
          e = e || window.event
          const nX = e.clientX,
            nY = e.clientY

          desX = nX - sX
          desY = nY - sY
          tX += desX * 0.1
          tY += desY * 0.1

          applyTransform()

          sX = nX
          sY = nY
        }

        function mouseup() {
          container.removeEventListener("mousemove", mousemove)
          container.removeEventListener("mouseup", mouseup)

          odrag.timer = setInterval(() => {
            desX *= 0.95
            desY *= 0.95
            tX += desX * 0.1
            tY += desY * 0.1

            applyTransform()

            if (Math.abs(desX) < 0.5 && Math.abs(desY) < 0.5) {
              clearInterval(odrag.timer)
              playSpin()
            }
          }, 17)
        }

        return false
      })

      document.addEventListener("wheel", (e) => {
        e = e || window.event
        const d = e.deltaY > 0 ? -1 : 1

        radius += d * 50
        radius = Math.max(150, Math.min(radius, 400))

        update()
      })

      update()
      playSpin()
    }

    let desX = 0
    let desY = 0
    let tX = 0
    let tY = 10

    function playSpin() {
      if (!autoRotate) return

      clearInterval(odrag.timer)
      odrag.timer = setInterval(() => {
        tX += 0.05
        applyTransform()
      }, 17)
    }

    function applyTransform() {
      const a = -Math.min(Math.max(-tY, -15), 15) * (Math.PI / 180)
      const b = Math.min(Math.max(-tX, -15), 15) * (Math.PI / 180)

      ospin.style.transform = `rotateX(${a}rad) rotateY(${b}rad)`
    }

    function update() {
      for (let i = 0; i < aImg.length; i++) {
        aImg[i].style.transform = `rotateY(${i * (360 / aImg.length)}deg) translateZ(${radius}px)`
        aImg[i].style.transition = "transform 1s"
        aImg[i].style.transitionDelay = `${(aImg.length - i) / 4}s`
      }
    }

    return () => {
      window.removeEventListener("resize", updateDimensions)
      clearInterval(odrag?.timer)
    }
  }, [technologies, isMobile])

  if (isMobile) {
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
            <h3 className="font-semibold text-primary mb-1">{tech.name}</h3>
            <p className="text-sm text-muted-foreground">{tech.description}</p>
          </motion.div>
        ))}
      </div>
    )
  }

  return (
    <div className="relative">
      <div ref={containerRef} className="w-full h-[500px] flex items-center justify-center perspective" />

      <AnimatePresence>
        {hoveredTech && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2 bg-background rounded-lg p-4 shadow-lg border border-border text-center max-w-xs"
          >
            <h3 className="font-semibold text-primary mb-1">{hoveredTech.name}</h3>
            <p className="text-sm text-muted-foreground">{hoveredTech.description}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

