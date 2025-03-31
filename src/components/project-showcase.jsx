"use client"

import { useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, ExternalLink, Github, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useMobile } from "@/hooks/use-mobile"

export default function ProjectShowcase({ projects }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [selectedProject, setSelectedProject] = useState(null)
  const containerRef = useRef(null)
  const isMobile = useMobile()

  const nextProject = () => {
    setActiveIndex((prev) => (prev + 1) % projects.length)
  }

  const prevProject = () => {
    setActiveIndex((prev) => (prev - 1 + projects.length) % projects.length)
  }

  const openProject = (project) => {
    setSelectedProject(project)
  }

  return (
    <>
      <div className="relative" ref={containerRef}>
        {!isMobile && (
          <>
            <button
              className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-background/80 backdrop-blur-sm p-2 rounded-full shadow-md border border-border"
              onClick={prevProject}
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-background/80 backdrop-blur-sm p-2 rounded-full shadow-md border border-border"
              onClick={nextProject}
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </>
        )}

        <div className="overflow-hidden">
          <div className="flex flex-col md:flex-row gap-8">
            {isMobile ? (
              // Mobile view - stack projects vertically
              <div className="space-y-8">
                {projects.map((project) => (
                  <ProjectCard key={project.id} project={project} onClick={() => openProject(project)} />
                ))}
              </div>
            ) : (
              // Desktop view - interactive carousel
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full"
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="flex items-center">
                    <div className="space-y-6">
                      <Badge>{projects[activeIndex].client}</Badge>
                      <h3 className="text-3xl font-bold">{projects[activeIndex].title}</h3>
                      <p className="text-muted-foreground">{projects[activeIndex].description}</p>

                      <div className="flex flex-wrap gap-2 my-4">
                        {projects[activeIndex].technologies.map((tech) => (
                          <Badge key={tech} variant="secondary">
                            {tech}
                          </Badge>
                        ))}
                      </div>

                      <div className="space-y-4">
                        <div>
                          <h4 className="font-semibold mb-1">Challenge</h4>
                          <p className="text-sm text-muted-foreground">{projects[activeIndex].challenge}</p>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-1">Outcome</h4>
                          <p className="text-sm text-muted-foreground">{projects[activeIndex].outcome}</p>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-4 pt-4">
                        {projects[activeIndex].liveUrl && (
                          <Button asChild>
                            <a href={projects[activeIndex].liveUrl} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="mr-2 h-4 w-4" /> View Live
                            </a>
                          </Button>
                        )}
                        {projects[activeIndex].githubUrl && (
                          <Button variant="outline" asChild>
                            <a href={projects[activeIndex].githubUrl} target="_blank" rel="noopener noreferrer">
                              <Github className="mr-2 h-4 w-4" /> View Code
                            </a>
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="relative aspect-video overflow-hidden rounded-xl border border-border shadow-lg">
                    <img
                      src={projects[activeIndex].thumbnail || "/placeholder.svg"}
                      alt={projects[activeIndex].title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                      <div className="p-6 text-white">
                        <div className="flex items-center justify-between">
                          <h4 className="text-xl font-bold">{projects[activeIndex].title}</h4>
                          <div className="flex space-x-2">
                            <span className="flex items-center text-xs">
                              {activeIndex + 1}/{projects.length}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            )}
          </div>
        </div>

        {isMobile && (
          <div className="flex justify-center mt-8 space-x-2">
            {projects.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full ${index === activeIndex ? "bg-primary" : "bg-muted"}`}
              />
            ))}
          </div>
        )}
      </div>

      <AnimatePresence>
        {selectedProject && <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />}
      </AnimatePresence>
    </>
  )
}

function ProjectCard({ project, onClick }) {
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
        <Badge className="mb-2">{project.client}</Badge>
        <h3 className="text-xl font-bold mb-2">{project.title}</h3>
        <p className="text-muted-foreground mb-4">{project.shortDescription}</p>
        <div className="flex flex-wrap gap-2">
          {project.technologies.slice(0, 3).map((tech) => (
            <Badge key={tech} variant="secondary">
              {tech}
            </Badge>
          ))}
          {project.technologies.length > 3 && <Badge variant="outline">+{project.technologies.length - 3}</Badge>}
        </div>
      </div>
    </motion.div>
  )
}

function ProjectModal({ project, onClose }) {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="bg-background rounded-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative aspect-video">
          <img
            src={project.thumbnail || "/placeholder.svg"}
            alt={project.title}
            className="w-full h-full object-cover"
          />
          <button
            className="absolute top-4 right-4 p-2 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors"
            onClick={onClose}
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-8">
          <Badge className="mb-2">{project.client}</Badge>
          <h2 className="text-3xl font-bold mb-4">{project.title}</h2>

          <div className="flex flex-wrap gap-2 mb-6">
            {project.technologies.map((tech) => (
              <Badge key={tech} variant="secondary">
                {tech}
              </Badge>
            ))}
          </div>

          <div className="prose prose-sm max-w-none mb-8">
            <h3 className="text-xl font-semibold mb-2">Description</h3>
            <p>{project.description}</p>

            <h3 className="text-xl font-semibold mt-6 mb-2">Challenge</h3>
            <p>{project.challenge}</p>

            <h3 className="text-xl font-semibold mt-6 mb-2">Outcome</h3>
            <p>{project.outcome}</p>
          </div>

          <div className="flex flex-wrap gap-4">
            {project.liveUrl && (
              <Button asChild>
                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="mr-2 h-4 w-4" /> View Live
                </a>
              </Button>
            )}
            {project.githubUrl && (
              <Button variant="outline" asChild>
                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                  <Github className="mr-2 h-4 w-4" /> View Code
                </a>
              </Button>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

