"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Home, Briefcase, Code, Layers, Cpu, Mail } from "lucide-react"

export default function FloatingNavigation() {
  return null;
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

