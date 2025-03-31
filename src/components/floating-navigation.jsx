"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Home, Briefcase, Code, Layers, Cpu, Mail } from "lucide-react"

export default function FloatingNavigation({ activeSection }) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navItems = [
    { id: "hero", icon: <Home className="h-5 w-5" />, label: "Home" },
    { id: "services", icon: <Briefcase className="h-5 w-5" />, label: "Services" },
    { id: "process", icon: <Layers className="h-5 w-5" />, label: "Process" },
    { id: "projects", icon: <Code className="h-5 w-5" />, label: "Projects" },
    { id: "tech", icon: <Cpu className="h-5 w-5" />, label: "Tech" },
    { id: "contact", icon: <Mail className="h-5 w-5" />, label: "Contact" },
  ]

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed right-6 top-1/2 transform -translate-y-1/2 z-50 hidden md:block"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 50 }}
          transition={{ duration: 0.3 }}
        >
          <div className="bg-background/80 backdrop-blur-md rounded-full p-2 shadow-lg border border-border">
            <div className="flex flex-col items-center space-y-4 py-2">
              {navItems.map((item) => (
                <NavItem key={item.id} item={item} isActive={activeSection === item.id} href={`#${item.id}`} />
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function NavItem({ item, isActive, href }) {
  return (
    <a href={href} className="relative group">
      <div
        className={`
        p-2 rounded-full transition-all duration-300 relative
        ${isActive ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}
      `}
      >
        {item.icon}

        <div className="absolute right-full mr-2 top-1/2 transform -translate-y-1/2 px-2 py-1 rounded bg-background border border-border opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap">
          {item.label}
        </div>
      </div>

      {isActive && (
        <motion.div
          className="absolute top-0 right-0 w-1 h-full bg-primary rounded-full"
          layoutId="navIndicator"
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        />
      )}
    </a>
  )
}

