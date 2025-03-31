"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { ArrowRight } from "lucide-react"

export default function ProjectCard({ project, onClick, showLink = false }) {
  return (
    <motion.div
      className="group cursor-pointer bg-background rounded-xl overflow-hidden border border-border hover:shadow-lg transition-all duration-300"
      whileHover={{ y: -5 }}
      onClick={onClick}
    >
      <div className="aspect-video overflow-hidden">
        <img
          src={project.thumbnail || "/placeholder.svg"}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold mb-1">{project.title}</h3>
        <p className="text-primary text-sm mb-2">{project.client}</p>
        <p className="text-muted-foreground mb-4">{project.shortDescription}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies.slice(0, 3).map((tech) => (
            <Badge key={tech} variant="secondary">
              {tech}
            </Badge>
          ))}
          {project.technologies.length > 3 && <Badge variant="outline">+{project.technologies.length - 3}</Badge>}
        </div>

        {showLink && (
          <div className="flex justify-end">
            <Link
              href={`/projects?id=${project.id}`}
              className="text-primary font-medium flex items-center hover:underline"
              onClick={(e) => e.stopPropagation()}
            >
              View Details <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
        )}
      </div>
    </motion.div>
  )
}

