"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { motion, useScroll, useTransform } from "framer-motion"
import { ArrowRight, Code, Layout, Smartphone, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import InteractiveBackground from "@/components/interactive-background"
import FloatingNavigation from "@/components/floating-navigation"
import ProjectShowcase from "@/components/project-showcase"
import InteractiveTimeline from "@/components/interactive-timeline"
import EnhancedTechSphere from "@/components/enhanced-tech-sphere"
import CustomCursor from "@/components/custom-cursor"
import HeroSection from "@/components/hero-section"
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

  return (
    <>
      {!isMobile && <CustomCursor cursorText={cursorText} cursorVariant={cursorVariant} />}
      <InteractiveBackground />
      <FloatingNavigation activeSection={activeSection} />

      <main className="relative">
        {/* Hero Section */}
        <div ref={heroRef} id="hero" className="px-3">
          <HeroSection setCursorText={setCursorText} setCursorVariant={setCursorVariant} />
        </div>

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
              <EnhancedTechSphere />
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
                onMouseEnter={() => {
                  setCursorText("Click")
                  setCursorVariant("button")
                }}
                onMouseLeave={() => {
                  setCursorText("")
                  setCursorVariant("default")
                }}
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

