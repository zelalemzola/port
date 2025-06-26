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

      <main className="relative px-3 md:px-8 lg:px-16">
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

