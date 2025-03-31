"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Quote } from "lucide-react"

export default function TestimonialCard({ quote, author, company }) {
  return (
    <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.3 }}>
      <Card className="h-full">
        <CardContent className="p-6 flex flex-col h-full">
          <div className="text-primary mb-4">
            <Quote className="h-8 w-8" />
          </div>
          <p className="text-lg italic mb-6 flex-grow">{quote}</p>
          <div>
            <p className="font-semibold">{author}</p>
            <p className="text-muted-foreground text-sm">{company}</p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

