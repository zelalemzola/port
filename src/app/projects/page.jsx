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
  const [searchQuery, setSearchQuery] = useState("")
  const [activeCategory, setActiveCategory] = useState("all")
  const [filteredProjects, setFilteredProjects] = useState(projects)
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const isMobile = useMobile()

  const { scrollYProgress } = useScroll()
  const headerOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0.2])

  const containerRef = useRef(null)

  useEffect(() => {
    let result = projects

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      result = result.filter(
        (project) =>
          project.title.toLowerCase().includes(query) ||
          project.description.toLowerCase().includes(query) ||
          project.technologies.some((tech) => tech.toLowerCase().includes(query)),
      )
    }

    // Filter by category
    if (activeCategory !== "all") {
      result = result.filter((project) => project.categories.includes(activeCategory))
    }

    setFilteredProjects(result)
  }, [searchQuery, activeCategory])

  const enterButton = () => {
    setCursorText("View")
    setCursorVariant("button")
  }

  const leaveButton = () => {
    setCursorText("")
    setCursorVariant("default")
  }

  const categories = [
    { id: "all", label: "All Projects" },
    { id: "web", label: "Web Development" },
    { id: "mobile", label: "Mobile Apps" },
    { id: "design", label: "UI/UX Design" },
  ]

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

          <motion.div
            className="mb-12 max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="flex flex-col md:flex-row gap-4 items-center">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search projects..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <div className="w-full md:w-auto">
                <div className="relative">
                  <Button
                    variant="outline"
                    className="w-full md:w-auto flex items-center justify-between"
                    onClick={() => setIsFilterOpen(!isFilterOpen)}
                  >
                    <Filter className="h-4 w-4 mr-2" />
                    Filter by Category
                    <ChevronDown className={`h-4 w-4 ml-2 transition-transform ${isFilterOpen ? "rotate-180" : ""}`} />
                  </Button>

                  <AnimatePresence>
                    {isFilterOpen && (
                      <motion.div
                        className="absolute top-full right-0 mt-2 w-full md:w-64 bg-background rounded-md border border-border shadow-md z-10"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="p-2">
                          {categories.map((category) => (
                            <button
                              key={category.id}
                              className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                                activeCategory === category.id
                                  ? "bg-primary/10 text-primary font-medium"
                                  : "hover:bg-muted"
                              }`}
                              onClick={() => {
                                setActiveCategory(category.id)
                                setIsFilterOpen(false)
                              }}
                            >
                              {category.label}
                            </button>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mt-4">
              <span className="text-sm text-muted-foreground">Active filters:</span>
              {activeCategory !== "all" && (
                <Badge variant="outline" className="flex items-center gap-1">
                  <Tag className="h-3 w-3" />
                  {categories.find((c) => c.id === activeCategory)?.label}
                  <button className="ml-1 hover:text-primary" onClick={() => setActiveCategory("all")}>
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              )}
              {searchQuery && (
                <Badge variant="outline" className="flex items-center gap-1">
                  <Search className="h-3 w-3" />"{searchQuery}"
                  <button className="ml-1 hover:text-primary" onClick={() => setSearchQuery("")}>
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              )}
            </div>
          </motion.div>

          <Tabs defaultValue="grid" className="max-w-6xl mx-auto">
            <div className="flex justify-center mb-8">
              <TabsList>
                <TabsTrigger value="grid">Grid View</TabsTrigger>
                <TabsTrigger value="list">List View</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="grid">
              {filteredProjects.length > 0 ? (
                <motion.div
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  {filteredProjects.map((project, index) => (
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
              {filteredProjects.length > 0 ? (
                <motion.div className="space-y-6" variants={containerVariants} initial="hidden" animate="visible">
                  {filteredProjects.map((project, index) => (
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
    title: "E-commerce Website",
    client: "Fashion Boutique",
    shortDescription: "A full-featured online store with payment integration",
    description:
      "An e-commerce platform that combines seamless checkout experiences with blazing-fast load times. Built with Next.js for server-side rendering, this website offers real-time product updates, secure payments via Stripe, and a fully responsive design.",
    challenge:
      "Ensuring a smooth, responsive design across mobile and desktop devices while managing real-time inventory updates was a key challenge. The client also needed a solution that could handle seasonal traffic spikes without performance degradation.",
    outcome:
      "The site saw a 40% increase in mobile conversions and a significant reduction in page load times, leading to improved customer satisfaction and higher sales volumes during peak shopping seasons.",
    technologies: ["Next.js", "Stripe", "MongoDB", "Tailwind CSS"],
    categories: ["web", "design"],
    timeline: "3 months",
    thumbnail: "/placeholder.svg?height=600&width=800",
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/example",
  },
  {
    id: 2,
    title: "Personal Blog",
    client: "Zelalem's Blog",
    shortDescription: "A minimalist blog with markdown support",
    description:
      "A personal blog built with Next.js and Markdown, providing a lightning-fast, minimalistic reading experience. This blog focuses on web development topics, and the design is fully responsive, making it accessible on any device.",
    challenge:
      "Optimizing content-heavy pages and ensuring they load instantly without sacrificing user experience. Implementing a robust content management system that was easy to update while maintaining excellent SEO performance.",
    outcome:
      "After launching, organic traffic grew by 30%, and the blog became one of the most visited resources on my site. The improved reading experience led to longer session times and higher engagement rates.",
    technologies: ["Next.js", "Markdown", "Tailwind CSS"],
    categories: ["web", "design"],
    timeline: "1 month",
    thumbnail: "/placeholder.svg?height=600&width=800",
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/example",
  },
  {
    id: 3,
    title: "SaaS Dashboard",
    client: "Tech Startup",
    shortDescription: "Admin dashboard for SaaS analytics",
    description:
      "A comprehensive dashboard for a SaaS product that provides real-time analytics and reports. Using GraphQL for fetching data, the platform allows users to track key performance metrics.",
    challenge:
      "The biggest challenge was ensuring that the dashboard could handle large datasets without slowing down. Creating intuitive data visualizations that communicated complex information clearly was also a significant focus.",
    outcome:
      "The dashboard is now used by thousands of users daily, providing valuable insights with zero downtime. The client reported a 25% reduction in customer support inquiries as users could now access the information they needed directly.",
    technologies: ["React.js", "Node.js", "GraphQL", "TypeScript"],
    categories: ["web"],
    timeline: "4 months",
    thumbnail: "/placeholder.svg?height=600&width=800",
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/example",
  },
  {
    id: 4,
    title: "Mobile Fitness App",
    client: "FitLife",
    shortDescription: "Cross-platform fitness tracking application",
    description:
      "A mobile application for fitness enthusiasts to track workouts, nutrition, and progress. Built with React Native for cross-platform compatibility, the app features offline functionality and syncs data when connectivity is restored.",
    challenge:
      "Creating a seamless experience across both iOS and Android platforms while implementing complex features like workout tracking, progress graphs, and social sharing capabilities.",
    outcome:
      "The app achieved over 10,000 downloads in the first month with a 4.8-star average rating. User retention rates exceeded industry averages by 35%.",
    technologies: ["React Native", "Firebase", "Redux", "Node.js"],
    categories: ["mobile"],
    timeline: "5 months",
    thumbnail: "/placeholder.svg?height=600&width=800",
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/example",
  },
  {
    id: 5,
    title: "Restaurant Ordering System",
    client: "Gourmet Dining",
    shortDescription: "Digital menu and ordering platform",
    description:
      "A comprehensive digital ordering system for a high-end restaurant chain, featuring QR code menus, real-time order tracking, and integration with the kitchen management system.",
    challenge:
      "Implementing a system that was both elegant enough for a luxury dining experience while being intuitive enough for all customers to use without assistance.",
    outcome:
      "The system reduced order errors by 95% and decreased average order time by 7 minutes, significantly improving the dining experience and operational efficiency.",
    technologies: ["Vue.js", "Express", "PostgreSQL", "Socket.io"],
    categories: ["web", "design"],
    timeline: "3 months",
    thumbnail: "/placeholder.svg?height=600&width=800",
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/example",
  },
  {
    id: 6,
    title: "Educational Platform",
    client: "LearnTech Academy",
    shortDescription: "Interactive learning management system",
    description:
      "A feature-rich educational platform with course management, interactive lessons, progress tracking, and certification capabilities for an online learning institution.",
    challenge:
      "Creating an engaging learning experience that maintained student interest while providing robust tools for educators to manage content and track student progress.",
    outcome:
      "The platform saw a 45% increase in course completion rates compared to the client's previous system, with student satisfaction scores improving by 60%.",
    technologies: ["Next.js", "MongoDB", "AWS", "WebRTC"],
    categories: ["web"],
    timeline: "6 months",
    thumbnail: "/placeholder.svg?height=600&width=800",
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/example",
  },
]

