"use client"

import { motion } from "framer-motion"

export default function ProcessStep({ number, title, description }) {
  return (
    <motion.div
      className="flex flex-col md:flex-row gap-6"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className="md:w-24 flex-shrink-0">
        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xl">
          {number}
        </div>
      </div>
      <div className="flex-1 md:border-l md:pl-6 pb-12 relative">
        <div className="absolute top-0 left-0 w-px h-full bg-border hidden md:block" />
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
      </div>
    </motion.div>
  )
}

