"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion"
import { X, ExternalLink, Github, Search, Filter, ChevronDown, Tag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import CustomCursor from "@/components/custom-cursor"
import { useMobile } from "@/hooks/use-mobile"

export default function ProjectsPage() {
  const [selectedProject, setSelectedProject] = useState(null)
  const [cursorText, setCursorText] = useState("")
  const [cursorVariant, setCursorVariant] = useState("default")
  const isMobile = useMobile()

  const { scrollYProgress } = useScroll()
  const headerOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0.2])

  const containerRef = useRef(null)

  const allProjects = projects // No filtering, just show all

  const enterButton = () => {
    setCursorText("View")
    setCursorVariant("button")
  }

  const leaveButton = () => {
    setCursorText("")
    setCursorVariant("default")
  }

  return (
    <>
      {!isMobile && <CustomCursor cursorText={cursorText} cursorVariant={cursorVariant} />}

      <main className="min-h-screen pt-24 pb-20 px-4">
        <div className="container mx-auto">
          <motion.div
            className="max-w-4xl mx-auto mb-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.h1
              className="text-5xl md:text-6xl font-bold mb-6 relative inline-block"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              My <span className="text-primary">Projects</span>
              <motion.span
                className="absolute -bottom-2 left-0 w-full h-1 bg-primary"
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 0.8, delay: 0.6 }}
              />
            </motion.h1>
            <motion.p
              className="text-lg text-muted-foreground max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Explore my portfolio of creative and functional projects. Each one represents a unique challenge and
              showcases different aspects of my skills and expertise.
            </motion.p>
          </motion.div>

          <Tabs defaultValue="grid" className="max-w-6xl mx-auto">
            <div className="flex justify-center mb-8">
              <TabsList>
                <TabsTrigger value="grid">Grid View</TabsTrigger>
                <TabsTrigger value="list">List View</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="grid">
              {allProjects.length > 0 ? (
                <motion.div
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  {allProjects.map((project, index) => (
                    <ProjectCard
                      key={project.id}
                      project={project}
                      index={index}
                      onClick={() => setSelectedProject(project)}
                      onMouseEnter={enterButton}
                      onMouseLeave={leaveButton}
                    />
                  ))}
                </motion.div>
              ) : (
                <motion.div
                  className="text-center py-20"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="text-6xl mb-4">🔍</div>
                  <h3 className="text-2xl font-bold mb-2">No projects found</h3>
                  <p className="text-muted-foreground">Try adjusting your search or filter criteria</p>
                </motion.div>
              )}
            </TabsContent>

            <TabsContent value="list">
              {allProjects.length > 0 ? (
                <motion.div className="space-y-6" variants={containerVariants} initial="hidden" animate="visible">
                  {allProjects.map((project, index) => (
                    <ProjectListItem
                      key={project.id}
                      project={project}
                      index={index}
                      onClick={() => setSelectedProject(project)}
                      onMouseEnter={enterButton}
                      onMouseLeave={leaveButton}
                    />
                  ))}
                </motion.div>
              ) : (
                <motion.div
                  className="text-center py-20"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="text-6xl mb-4">🔍</div>
                  <h3 className="text-2xl font-bold mb-2">No projects found</h3>
                  <p className="text-muted-foreground">Try adjusting your search or filter criteria</p>
                </motion.div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <AnimatePresence>
        {selectedProject && <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />}
      </AnimatePresence>
    </>
  )
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
}

function ProjectCard({ project, index, onClick, onMouseEnter, onMouseLeave }) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      variants={itemVariants}
      className="group relative"
      onMouseEnter={() => {
        setIsHovered(true)
        onMouseEnter()
      }}
      onMouseLeave={() => {
        setIsHovered(false)
        onMouseLeave()
      }}
      onClick={onClick}
      whileHover={{ y: -10 }}
    >
      <div className="relative overflow-hidden rounded-xl border border-border bg-background shadow-sm transition-all duration-300 hover:shadow-md cursor-pointer h-full">
        <div className="aspect-video overflow-hidden">
          <motion.img
            src={project.thumbnail || "/placeholder.svg?height=400&width=600"}
            alt={project.title}
            className="w-full h-full object-cover"
            animate={{ scale: isHovered ? 1.05 : 1 }}
            transition={{ duration: 0.4 }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
            <div className="p-6 text-white">
              <h3 className="text-xl font-bold">{project.title}</h3>
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="flex flex-wrap gap-2 mb-4">
            {project.technologies.slice(0, 3).map((tech) => (
              <Badge key={tech} variant="secondary">
                {tech}
              </Badge>
            ))}
            {project.technologies.length > 3 && <Badge variant="outline">+{project.technologies.length - 3}</Badge>}
          </div>

          <h3 className="text-xl font-bold mb-2">{project.title}</h3>
          <p className="text-muted-foreground mb-4 line-clamp-2">{project.shortDescription}</p>

          <motion.div
            className="absolute bottom-0 left-0 right-0 h-1 bg-primary origin-left"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: isHovered ? 1 : 0 }}
            transition={{ duration: 0.4 }}
          />
        </div>
      </div>
    </motion.div>
  )
}

function ProjectListItem({ project, index, onClick, onMouseEnter, onMouseLeave }) {
  return (
    <motion.div
      variants={itemVariants}
      className="group"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
    >
      <div className="flex flex-col md:flex-row gap-6 bg-background rounded-xl border border-border p-4 hover:shadow-md transition-all duration-300 cursor-pointer">
        <div className="md:w-1/3 aspect-video rounded-lg overflow-hidden">
          <motion.img
            src={project.thumbnail || "/placeholder.svg?height=400&width=600"}
            alt={project.title}
            className="w-full h-full object-cover"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.4 }}
          />
        </div>

        <div className="md:w-2/3">
          <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{project.title}</h3>
          <p className="text-muted-foreground mb-4">{project.shortDescription}</p>

          <div className="flex flex-wrap gap-2 mb-4">
            {project.technologies.map((tech) => (
              <Badge key={tech} variant="secondary">
                {tech}
              </Badge>
            ))}
          </div>

          <div className="flex items-center text-sm text-muted-foreground">
            <span className="mr-2">Client:</span>
            <span className="font-medium">{project.client}</span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

function ProjectModal({ project, onClose }) {
  const [activeTab, setActiveTab] = useState("overview")
  const modalRef = useRef(null)

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose()
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [onClose])

  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "challenge", label: "Challenge" },
    { id: "solution", label: "Solution" },
    { id: "outcome", label: "Outcome" },
  ]

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        ref={modalRef}
        className="bg-background rounded-xl w-full max-w-5xl max-h-[90vh] overflow-hidden flex flex-col"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative aspect-video">
          <img
            src={project.thumbnail || "/placeholder.svg?height=600&width=1200"}
            alt={project.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end">
            <div className="p-8">
              <Badge className="mb-2">{project.client}</Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">{project.title}</h2>

              <div className="flex flex-wrap gap-2 mb-4">
                {project.technologies.map((tech) => (
                  <Badge key={tech} variant="secondary">
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
          <button
            className="absolute top-4 right-4 p-2 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors"
            onClick={onClose}
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex border-b border-border">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`px-6 py-3 text-sm font-medium relative ${
                activeTab === tab.id ? "text-primary" : "text-muted-foreground hover:text-foreground"
              }`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
              {activeTab === tab.id && (
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                  layoutId="activeTab"
                  transition={{ type: "spring", damping: 25, stiffness: 300 }}
                />
              )}
            </button>
          ))}
        </div>

        <div className="p-8 overflow-y-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              {activeTab === "overview" && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold mb-3">Project Overview</h3>
                    <p className="text-muted-foreground">{project.description}</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-muted/30 rounded-lg p-4">
                      <h4 className="font-medium mb-2">Project Type</h4>
                      <p>{project.categories.join(", ")}</p>
                    </div>
                    <div className="bg-muted/30 rounded-lg p-4">
                      <h4 className="font-medium mb-2">Timeline</h4>
                      <p>{project.timeline || "3 months"}</p>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "challenge" && (
                <div>
                  <h3 className="text-xl font-semibold mb-3">The Challenge</h3>
                  <p className="text-muted-foreground mb-6">{project.challenge}</p>

                  <div className="bg-muted/30 rounded-lg p-6 border-l-4 border-primary">
                    <h4 className="font-medium mb-2">Key Challenges</h4>
                    <ul className="space-y-2 list-disc pl-5">
                      <li>Ensuring responsive design across all device sizes</li>
                      <li>Optimizing performance for large datasets</li>
                      <li>Implementing secure payment processing</li>
                      <li>Creating an intuitive user experience</li>
                    </ul>
                  </div>
                </div>
              )}

              {activeTab === "solution" && (
                <div>
                  <h3 className="text-xl font-semibold mb-3">The Solution</h3>
                  <p className="text-muted-foreground mb-6">
                    I implemented a comprehensive solution using {project.technologies.join(", ")} to address the
                    client's needs. The approach focused on creating a scalable, maintainable codebase with excellent
                    user experience.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-muted/30 rounded-lg p-4">
                      <h4 className="font-medium mb-2">Technical Approach</h4>
                      <p className="text-sm text-muted-foreground">
                        Utilized modern development practices including component-based architecture, server-side
                        rendering, and optimized database queries.
                      </p>
                    </div>
                    <div className="bg-muted/30 rounded-lg p-4">
                      <h4 className="font-medium mb-2">Design Philosophy</h4>
                      <p className="text-sm text-muted-foreground">
                        Created a clean, intuitive interface with accessibility in mind, ensuring a seamless experience
                        for all users.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "outcome" && (
                <div>
                  <h3 className="text-xl font-semibold mb-3">The Outcome</h3>
                  <p className="text-muted-foreground mb-6">{project.outcome}</p>

                  <div className="bg-muted/30 rounded-lg p-6 mb-6">
                    <h4 className="font-medium mb-3">Key Results</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                      <div>
                        <div className="text-2xl font-bold text-primary mb-1">40%</div>
                        <p className="text-sm text-muted-foreground">Increase in Conversions</p>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-primary mb-1">50%</div>
                        <p className="text-sm text-muted-foreground">Faster Load Times</p>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-primary mb-1">95%</div>
                        <p className="text-sm text-muted-foreground">User Satisfaction</p>
                      </div>
                    </div>
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
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  )
}

const projects = [
  {
    id: 1,
    title: "Addis Ababa University Digital Transformation",
    client: "Addis Ababa University",
    shortDescription: "Landing page, CMS, and chatbot for a major university.",
    description:
      "Led and managed a cross-functional team as Team Lead & Scrum Master, delivering digital transformation projects for Addis Ababa University with agile practices. Built a scalable landing page with CMS, and developed a full-featured staff and course management system with admin controls, boosting institutional efficiency and presence. Designed and implemented a performant frontend architecture using Next.js, TypeScript, Tailwind, Zustand, and React Query, ensuring smooth state management and user experience.",
    challenge:
      "Delivering a robust, scalable platform for a large institution with complex content and user management needs, while integrating a custom chatbot for student and staff support.",
    outcome:
      "The new platform significantly improved the university's digital presence, streamlined administrative processes, and enhanced user engagement through the integrated chatbot.",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Zustand", "React Query"],
    thumbnail: "/aau.png",
    liveUrl: "https://aau.edu.et/",
    categories: ["web", "design"],
    timeline: "6 months",
  },
  {
    id: 2,
    title: "Ethio CC Tech Centralized Car Repair Facilitation System",
    client: "Ethio CC Tech",
    shortDescription: "Platform connecting car owners with repair shops and suppliers.",
    description:
      "A digital platform that connects car owners with nearby, relevant spare part suppliers and repair shops. Led requirements gathering and managed ongoing stakeholder communication. Helped design the full UI/UX workflow to ensure intuitive user experience. Developed the frontend and integrated APIs using Next.js, Tailwind CSS, TypeScript, and TanStack Query.",
    challenge:
      "Building a seamless, user-friendly interface that efficiently matches car owners with the right service providers, while managing real-time data and multiple user roles.",
    outcome:
      "The platform streamlined the car repair process, improved transparency, and increased customer satisfaction for both car owners and service providers.",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "TanStack Query"],
    thumbnail: "/ethiocc.png",
    liveUrl: "https://ethiocctech.com/",
    categories: ["web", "design"],
    timeline: "4 months",
  },
  {
    id: 3,
    title: "Inventory Management System for Spare Parts Retailers",
    client: "Multiple Clients",
    shortDescription: "Dynamic landing pages and real-time inventory management.",
    description:
      "Delivered multiple solutions for car spare parts sellers and other clients. Built dynamic landing pages integrated with back-office CMS, enabling non-technical teams to manage content easily and maintain brand consistency. Developed a comprehensive inventory management system featuring real-time stock tracking, product categorization, and role-based access control, deployed across multiple clients. Developed the frontend and designed and integrated axios APIs using Next.js, Tailwind CSS, TypeScript, and MongoDB.",
    challenge:
      "Ensuring real-time accuracy of inventory data and providing a flexible, easy-to-use CMS for non-technical users.",
    outcome:
      "Clients reported improved operational efficiency, reduced stockouts, and better customer experience due to accurate, up-to-date inventory information.",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "MongoDB", "Axios"],
    thumbnail: "/inventory.png",
    categories: ["web", "design"],
    timeline: "3 months",
  },
  {
    id: 4,
    title: "TeleMedicine Startup Platform",
    client: "TeleMedicine Startup",
    shortDescription: "Landing page and integrated chatbot for telemedicine.",
    description:
      "Built the landing page and chatbot integrated with a backoffice chatting system, giving professionals access to respond to customer questions. Admins can assign professionals suited for each case, and the system tracks resolution times for customer satisfaction metrics. Chatting is also integrated with a Telegram bot for seamless communication.",
    challenge:
      "Integrating real-time chat with both web and Telegram, and building a robust admin workflow for case assignment and tracking.",
    outcome:
      "The platform enabled faster, more efficient customer support and improved satisfaction through streamlined communication and analytics.",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Telegram Bot API"],
    thumbnail: "/tenaye.png",
    liveUrl: "https://ethiocctech.com/",
    categories: ["web", "design"],
    timeline: "4 months",
  },
  {
    id: 5,
    title: "Partnership Management System",
    client: "Addis Ababa University",
    shortDescription: "Internal tool for managing institutional partnerships.",
    description:
      "An internal tool for registering, managing, and analyzing institutional partnerships. Delivered for Addis Ababa University to streamline their partnership operations. Conducted stakeholder interviews and translated needs into wireframes and design prototypes. Built the frontend and handled API integration using Next.js, Tailwind CSS, TypeScript, and TanStack Query.",
    challenge:
      "Translating complex partnership workflows into an intuitive, easy-to-use digital tool for university staff.",
    outcome:
      "The system improved data accuracy, reduced manual work, and provided actionable insights for partnership management.",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "TanStack Query"],
    thumbnail: "/partnership.png",
    categories: ["web", "design"],
    timeline: "2 months",
  },
]

