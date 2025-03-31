"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { motion, useScroll, useTransform } from "framer-motion"
import { ArrowRight, Code, Layout, Smartphone, CheckCircle, MousePointer } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import InteractiveBackground from "@/components/interactive-background"
import FloatingNavigation from "@/components/floating-navigation"
import ProjectShowcase from "@/components/project-showcase"
import InteractiveTimeline from "@/components/interactive-timeline"
import TechSphere from "@/components/tech-sphere"
import CustomCursor from "@/components/custom-cursor"
import { useMobile } from "@/hooks/use-mobile"

export default function Home() {
  const [activeSection, setActiveSection] = useState("hero")
  const [cursorText, setCursorText] = useState("")
  const [cursorVariant, setCursorVariant] = useState("default")
  const isMobile = useMobile()

  const heroRef = useRef(null)
  const servicesRef = useRef(null)
  const processRef = useRef(null)
  const projectsRef = useRef(null)
  const techRef = useRef(null)
  const contactRef = useRef(null)

  const { scrollYProgress } = useScroll()
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.8])

  useEffect(() => {
    const sections = [
      { ref: heroRef, id: "hero" },
      { ref: servicesRef, id: "services" },
      { ref: processRef, id: "process" },
      { ref: projectsRef, id: "projects" },
      { ref: techRef, id: "tech" },
      { ref: contactRef, id: "contact" },
    ]

    const handleScroll = () => {
      const pageYOffset = window.pageYOffset
      let newActiveSection = sections[0].id

      for (const section of sections) {
        const sectionElement = section.ref.current
        if (!sectionElement) continue

        const sectionTop = sectionElement.offsetTop - 100
        if (pageYOffset >= sectionTop) {
          newActiveSection = section.id
        }
      }

      setActiveSection(newActiveSection)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const enterButton = () => {
    setCursorText("Click")
    setCursorVariant("button")
  }

  const leaveButton = () => {
    setCursorText("")
    setCursorVariant("default")
  }

  return (
    <>
      {!isMobile && <CustomCursor cursorText={cursorText} cursorVariant={cursorVariant} />}
      <InteractiveBackground />
      <FloatingNavigation activeSection={activeSection} />

      <main className="relative">
        {/* Hero Section */}
        <section ref={heroRef} className="min-h-screen flex items-center relative overflow-hidden py-20" id="hero">
          <div className="container mx-auto relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                className="space-y-8"
                initial={{ opacity: 0, x: -100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <motion.div style={{ opacity, scale }} className="inline-block">
                  <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
                    Full-Stack Developer
                  </span>
                </motion.div>
                <motion.h1
                  className="text-5xl md:text-7xl font-bold tracking-tight"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  Hi, I'm{" "}
                  <span className="text-primary relative">
                    Zelalem
                    <motion.span
                      className="absolute -bottom-2 left-0 w-full h-1 bg-primary"
                      initial={{ width: 0 }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 0.8, delay: 1.2 }}
                    />
                  </span>
                </motion.h1>
                <motion.div
                  className="relative h-20"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                >
                  <AnimatedTextWord text="Transforming Ideas into Digital Masterpieces" />
                </motion.div>
                <motion.p
                  className="text-lg text-muted-foreground max-w-xl"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.8 }}
                >
                  Building fast, SEO-optimized, and visually stunning web applications that not only look great but also
                  perform flawlessly.
                </motion.p>
                <motion.div
                  className="flex flex-wrap gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 1 }}
                >
                  <Button
                    asChild
                    size="lg"
                    className="group relative overflow-hidden"
                    onMouseEnter={enterButton}
                    onMouseLeave={leaveButton}
                  >
                    <Link href="#projects">
                      <span className="relative z-10">Let's Create Something Amazing Together</span>
                      <motion.span
                        className="absolute inset-0 bg-white dark:bg-black opacity-20"
                        initial={{ x: "-100%" }}
                        whileHover={{ x: "100%" }}
                        transition={{ duration: 0.5 }}
                      />
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                  <motion.div
                    className="hidden md:flex items-center gap-2 text-muted-foreground"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5 }}
                  >
                    <MousePointer className="h-4 w-4 animate-bounce" />
                    <span className="text-sm">Scroll to explore</span>
                  </motion.div>
                </motion.div>
              </motion.div>

              <motion.div
                className="relative h-[400px] md:h-[500px]"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <HeroCanvas />
              </motion.div>
            </div>
          </div>

          <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {["hero", "services", "process", "projects", "tech", "contact"].map((section) => (
              <motion.div
                key={section}
                className={`w-2 h-2 rounded-full ${activeSection === section ? "bg-primary" : "bg-muted"}`}
                whileHover={{ scale: 1.5 }}
              />
            ))}
          </div>
        </section>

        {/* Services Section */}
        <section ref={servicesRef} className="py-20 relative" id="services">
          <div className="container mx-auto">
            <motion.div
              className="text-center mb-16 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Badge className="mb-4">SERVICES</Badge>
              <h2 className="text-4xl md:text-5xl font-bold mb-4">What I Do</h2>
              <p className="text-muted-foreground">
                As a web developer with a passion for Next.js, I offer specialized services to help your business grow
                in the digital landscape.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <ServiceCard
                icon={<Code className="h-10 w-10 text-primary" />}
                title="Custom Web Development"
                description="From concept to execution, I build custom websites that reflect your brand and deliver exceptional user experiences."
                delay={0.1}
              />
              <ServiceCard
                icon={<Layout className="h-10 w-10 text-primary" />}
                title="SEO & Performance"
                description="I ensure your website ranks high in search results and performs seamlessly on any device, maximizing user engagement."
                delay={0.2}
              />
              <ServiceCard
                icon={<Smartphone className="h-10 w-10 text-primary" />}
                title="E-Commerce Solutions"
                description="Leverage the power of Next.js for fast, secure, and scalable e-commerce platforms that drive sales and grow your online presence."
                delay={0.3}
              />
              <ServiceCard
                icon={<CheckCircle className="h-10 w-10 text-primary" />}
                title="Maintenance & Support"
                description="Ongoing support and updates to keep your website running smoothly and securely, with a focus on continuous improvement."
                delay={0.4}
              />
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section ref={processRef} className="py-20 relative" id="process">
          <div className="container mx-auto">
            <motion.div
              className="text-center mb-16 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Badge className="mb-4">APPROACH</Badge>
              <h2 className="text-4xl md:text-5xl font-bold mb-4">My Process</h2>
              <p className="text-muted-foreground">
                Every project I work on is a collaboration between creativity and technical precision. Here's how I
                approach each web development journey.
              </p>
            </motion.div>

            <div className="max-w-5xl mx-auto">
              <InteractiveTimeline />
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section ref={projectsRef} className="py-20 relative" id="projects">
          <div className="container mx-auto">
            <motion.div
              className="text-center mb-16 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Badge className="mb-4">PORTFOLIO</Badge>
              <h2 className="text-4xl md:text-5xl font-bold mb-4">Featured Projects</h2>
              <p className="text-muted-foreground">
                Take a look at some of the projects I've worked on. These examples showcase my expertise in creating
                fast, functional, and beautiful web applications.
              </p>
            </motion.div>

            <ProjectShowcase projects={featuredProjects} />
          </div>
        </section>

        {/* Technologies Section */}
        <section ref={techRef} className="py-20 relative" id="tech">
          <div className="container mx-auto">
            <motion.div
              className="text-center mb-16 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Badge className="mb-4">SKILLS</Badge>
              <h2 className="text-4xl md:text-5xl font-bold mb-4">Technologies I Use</h2>
              <p className="text-muted-foreground">
                I utilize a mix of cutting-edge technologies to deliver high-performing websites that meet your unique
                business needs.
              </p>
            </motion.div>

            <div className="flex justify-center">
              <TechSphere />
            </div>
          </div>
        </section>

        {/* Contact CTA Section */}
        <section ref={contactRef} className="py-20 relative" id="contact">
          <div className="container mx-auto">
            <motion.div
              className="max-w-4xl mx-auto bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 rounded-3xl p-12 text-center"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Badge className="mb-4">GET IN TOUCH</Badge>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">Let's Create Something Great Together!</h2>
              <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
                Are you ready to start your next web development project? Let's discuss how I can help you build a
                website that exceeds your expectations.
              </p>
              <Button
                asChild
                size="lg"
                className="group relative overflow-hidden"
                onMouseEnter={enterButton}
                onMouseLeave={leaveButton}
              >
                <Link href="/contact">
                  <span className="relative z-10">Get in Touch</span>
                  <motion.span
                    className="absolute inset-0 bg-white dark:bg-black opacity-20"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "100%" }}
                    transition={{ duration: 0.5 }}
                  />
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </section>
      </main>
    </>
  )
}

function ServiceCard({ icon, title, description, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -10, transition: { duration: 0.2 } }}
      className="group"
    >
      <div className="bg-background rounded-xl p-6 h-full border border-border shadow-sm hover:shadow-md transition-all duration-300 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="relative z-10">
          <div className="mb-4 p-3 bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
            {icon}
          </div>
          <h3 className="text-xl font-semibold mb-4">{title}</h3>
          <p className="text-muted-foreground">{description}</p>
        </div>
      </div>
    </motion.div>
  )
}

function AnimatedTextWord({ text }) {
  const words = text.split(" ")

  return (
    <div className="flex flex-wrap">
      {words.map((word, i) => (
        <motion.span
          key={i}
          className="mr-2 text-2xl md:text-3xl font-bold text-primary"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 + i * 0.1 }}
        >
          {word}
        </motion.span>
      ))}
    </div>
  )
}

function HeroCanvas() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    let animationFrameId
    let particles = []
    let mouseX = 0
    let mouseY = 0

    // Set canvas dimensions
    const setCanvasDimensions = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }

    setCanvasDimensions()
    window.addEventListener("resize", setCanvasDimensions)

    // Track mouse position
    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect()
      mouseX = e.clientX - rect.left
      mouseY = e.clientY - rect.top
    }

    canvas.addEventListener("mousemove", handleMouseMove)

    // Particle class
    class Particle {
      constructor(x, y) {
        this.x = x || Math.random() * canvas.width
        this.y = y || Math.random() * canvas.height
        this.size = Math.random() * 5 + 1
        this.baseX = this.x
        this.baseY = this.y
        this.density = Math.random() * 30 + 1
        this.color = `hsl(${Math.random() * 60 + 200}, 70%, 50%)`
      }

      draw() {
        ctx.fillStyle = this.color
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.closePath()
        ctx.fill()
      }

      update() {
        // Calculate distance between particle and mouse
        const dx = mouseX - this.x
        const dy = mouseY - this.y
        const distance = Math.sqrt(dx * dx + dy * dy)
        const forceDirectionX = dx / distance
        const forceDirectionY = dy / distance

        // Max distance, past that the force will be 0
        const maxDistance = 100
        let force = (maxDistance - distance) / maxDistance

        if (force < 0) force = 0

        const directionX = forceDirectionX * force * this.density
        const directionY = forceDirectionY * force * this.density

        if (distance < maxDistance) {
          this.x += directionX
          this.y += directionY
        } else {
          if (this.x !== this.baseX) {
            const dx = this.x - this.baseX
            this.x -= dx / 10
          }
          if (this.y !== this.baseY) {
            const dy = this.y - this.baseY
            this.y -= dy / 10
          }
        }
      }
    }

    // Initialize particles
    const init = () => {
      particles = []
      const numberOfParticles = (canvas.width * canvas.height) / 9000

      for (let i = 0; i < numberOfParticles; i++) {
        particles.push(new Particle())
      }
    }

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw connections
      ctx.strokeStyle = "rgba(100, 150, 255, 0.1)"
      ctx.lineWidth = 0.5

      for (let i = 0; i < particles.length; i++) {
        for (let j = i; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 100) {
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.stroke()
          }
        }
      }

      // Update and draw particles
      for (let i = 0; i < particles.length; i++) {
        particles[i].update()
        particles[i].draw()
      }

      animationFrameId = requestAnimationFrame(animate)
    }

    init()
    animate()

    return () => {
      window.removeEventListener("resize", setCanvasDimensions)
      canvas.removeEventListener("mousemove", handleMouseMove)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return <canvas ref={canvasRef} className="w-full h-full rounded-2xl bg-gradient-to-br from-primary/5 to-background" />
}

const featuredProjects = [
  {
    id: 1,
    title: "E-commerce Website",
    client: "Fashion Boutique",
    shortDescription: "A full-featured online store with payment integration",
    description:
      "An e-commerce platform that combines seamless checkout experiences with blazing-fast load times. Built with Next.js for server-side rendering, this website offers real-time product updates, secure payments via Stripe, and a fully responsive design.",
    challenge:
      "Ensuring a smooth, responsive design across mobile and desktop devices while managing real-time inventory updates was a key challenge.",
    outcome:
      "The site saw a 40% increase in mobile conversions and a significant reduction in page load times, leading to improved customer satisfaction.",
    technologies: ["Next.js", "Stripe", "MongoDB", "Tailwind CSS"],
    thumbnail: "/placeholder.svg?height=400&width=600",
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
    challenge: "Optimizing content-heavy pages and ensuring they load instantly without sacrificing user experience.",
    outcome:
      "After launching, organic traffic grew by 30%, and the blog became one of the most visited resources on my site.",
    technologies: ["Next.js", "Markdown", "Tailwind CSS"],
    thumbnail: "/placeholder.svg?height=400&width=600",
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
      "The biggest challenge was ensuring that the dashboard could handle large datasets without slowing down.",
    outcome: "The dashboard is now used by thousands of users daily, providing valuable insights with zero downtime.",
    technologies: ["React.js", "Node.js", "GraphQL", "TypeScript"],
    thumbnail: "/placeholder.svg?height=400&width=600",
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/example",
  },
]

