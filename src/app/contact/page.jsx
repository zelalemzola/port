"use client"

import { useState, useRef, useEffect } from "react"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Mail, Phone, MapPin, Send, Github, Linkedin, CheckCircle, Copy, ExternalLink } from "lucide-react"
import CustomCursor from "@/components/custom-cursor"
import { useMobile } from "@/hooks/use-mobile"

export default function ContactPage() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    projectType: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [formError, setFormError] = useState(null)
  const [cursorText, setCursorText] = useState("")
  const [cursorVariant, setCursorVariant] = useState("default")
  const [copiedField, setCopiedField] = useState(null)
  const [mapHovered, setMapHovered] = useState(false)
  const isMobile = useMobile()

  const containerRef = useRef(null)
  const formRef = useRef(null)
  const mapRef = useRef(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  })

  const headerY = useTransform(scrollYProgress, [0, 0.1], [0, -50])
  const headerOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormState((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (value) => {
    setFormState((prev) => ({ ...prev, projectType: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setFormError(null)

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formState,
          to: "tzelalemtesfaye@gmail.com",
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || "Failed to send email")
      }

      setIsSubmitted(true)
      setFormState({
        name: "",
        email: "",
        subject: "",
        projectType: "",
        message: "",
      })

      // Reset success message after 5 seconds
      setTimeout(() => {
        setIsSubmitted(false)
      }, 5000)
    } catch (error) {
      setFormError(error.message || "Something went wrong. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const enterButton = () => {
    setCursorText("Click")
    setCursorVariant("button")
  }

  const leaveButton = () => {
    setCursorText("")
    setCursorVariant("default")
  }

  const copyToClipboard = (text, field) => {
    navigator.clipboard.writeText(text)
    setCopiedField(field)

    setTimeout(() => {
      setCopiedField(null)
    }, 2000)
  }

  useEffect(() => {
    if (!mapRef.current || isMobile) return

    const map = mapRef.current
    const ctx = map.getContext("2d")
    let animationFrameId
    let particles = []

    const setCanvasDimensions = () => {
      map.width = map.offsetWidth
      map.height = map.offsetHeight
    }

    setCanvasDimensions()
    window.addEventListener("resize", setCanvasDimensions)

    class Particle {
      constructor() {
        this.x = Math.random() * map.width
        this.y = Math.random() * map.height
        this.size = Math.random() * 3 + 1
        this.speedX = Math.random() * 1 - 0.5
        this.speedY = Math.random() * 1 - 0.5
        this.color = `hsl(${Math.random() * 60 + 200}, 70%, 50%)`
      }

      update() {
        this.x += this.speedX
        this.y += this.speedY

        if (this.x < 0 || this.x > map.width) this.speedX *= -1
        if (this.y < 0 || this.y > map.height) this.speedY *= -1
      }

      draw() {
        ctx.fillStyle = this.color
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    const init = () => {
      particles = []
      for (let i = 0; i < 50; i++) {
        particles.push(new Particle())
      }
    }

    const animate = () => {
      ctx.clearRect(0, 0, map.width, map.height)

      // Draw map background
      ctx.fillStyle = "rgba(100, 150, 255, 0.1)"
      ctx.fillRect(0, 0, map.width, map.height)

      // Draw map grid
      ctx.strokeStyle = "rgba(100, 150, 255, 0.2)"
      ctx.lineWidth = 0.5

      const gridSize = 20
      for (let x = 0; x < map.width; x += gridSize) {
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, map.height)
        ctx.stroke()
      }

      for (let y = 0; y < map.height; y += gridSize) {
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(map.width, y)
        ctx.stroke()
      }

      // Draw location marker
      const centerX = map.width / 2
      const centerY = map.height / 2

      ctx.fillStyle = "hsl(var(--primary))"
      ctx.beginPath()
      ctx.arc(centerX, centerY, mapHovered ? 12 : 8, 0, Math.PI * 2)
      ctx.fill()

      if (mapHovered) {
        ctx.fillStyle = "rgba(var(--primary), 0.2)"
        ctx.beginPath()
        ctx.arc(centerX, centerY, 30, 0, Math.PI * 2)
        ctx.fill()
      }

      // Draw particles
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
      cancelAnimationFrame(animationFrameId)
    }
  }, [mapHovered, isMobile])

  return (
    <>
      {!isMobile && <CustomCursor cursorText={cursorText} cursorVariant={cursorVariant} />}

      <main className="min-h-screen pt-24 pb-20 px-4" ref={containerRef}>
        <div className="container mx-auto">
          <motion.div className="max-w-4xl mx-auto mb-16 text-center" style={{ y: headerY, opacity: headerOpacity }}>
            <motion.h1
              className="text-5xl md:text-6xl font-bold mb-6 relative inline-block"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Get in <span className="text-primary">Touch</span>
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
              I'd love to hear about your project! Whether you're looking for a brand-new website or need help improving
              an existing one, I'm here to help.
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            <motion.div
              className="space-y-8"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div>
                <Badge className="mb-4">CONTACT INFO</Badge>
                <h2 className="text-3xl font-bold mb-6">Let's Connect</h2>

                <div className="space-y-4">
                  <ContactCard
                    icon={<Mail className="h-5 w-5 text-primary" />}
                    title="Email"
                    content="tzelalemtesfaye@gmail.com"
                    action={() => copyToClipboard("tzelalemtesfaye@gmail.com", "email")}
                    actionIcon={
                      copiedField === "email" ? <CheckCircle className="h-4 w-4" /> : <Copy className="h-4 w-4" />
                    }
                    actionText={copiedField === "email" ? "Copied!" : "Copy"}
                    link="mailto:tzelalemtesfaye@gmail.com"
                    enterButton={enterButton}
                    leaveButton={leaveButton}
                  />

                  <ContactCard
                    icon={<Phone className="h-5 w-5 text-primary" />}
                    title="Phone"
                    content="+251988745721"
                    action={() => copyToClipboard("+251988745721", "phone")}
                    actionIcon={
                      copiedField === "phone" ? <CheckCircle className="h-4 w-4" /> : <Copy className="h-4 w-4" />
                    }
                    actionText={copiedField === "phone" ? "Copied!" : "Copy"}
                    link="tel:+251988745721"
                    enterButton={enterButton}
                    leaveButton={leaveButton}
                  />

                  <ContactCard
                    icon={<MapPin className="h-5 w-5 text-primary" />}
                    title="Location"
                    content="Addis Ababa, Ethiopia"
                    action={() => window.open("https://maps.google.com/?q=Addis+Ababa,Ethiopia", "_blank")}
                    actionIcon={<ExternalLink className="h-4 w-4" />}
                    actionText="View Map"
                    enterButton={enterButton}
                    leaveButton={leaveButton}
                  />
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-4">Connect With Me</h3>
                <div className="flex space-x-4">
                  <motion.a
                    href="http://github.com/zelalemzola"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-full bg-muted hover:bg-muted/80 transition-colors"
                    whileHover={{ y: -5 }}
                    onMouseEnter={enterButton}
                    onMouseLeave={leaveButton}
                  >
                    <Github className="h-5 w-5" />
                  </motion.a>
                  <motion.a
                    href="http://linkedin.com/in/zelalem-tesfaye-124686258"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-full bg-muted hover:bg-muted/80 transition-colors"
                    whileHover={{ y: -5 }}
                    onMouseEnter={enterButton}
                    onMouseLeave={leaveButton}
                  >
                    <Linkedin className="h-5 w-5" />
                  </motion.a>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-4">My Location</h3>
                <div
                  className="rounded-xl overflow-hidden border border-border h-[250px] relative"
                  onMouseEnter={() => setMapHovered(true)}
                  onMouseLeave={() => setMapHovered(false)}
                >
                  <canvas ref={mapRef} className="w-full h-full" />
                  {isMobile && (
                    <div className="absolute inset-0 flex items-center justify-center bg-primary/10">
                      <div className="bg-primary text-primary-foreground p-2 rounded-full">
                        <MapPin className="h-6 w-6" />
                      </div>
                      <p className="absolute bottom-4 text-sm font-medium">Addis Ababa, Ethiopia</p>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>

            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              ref={formRef}
            >
              <Card className="overflow-hidden">
                <CardContent className="p-0 flex flex-col items-center justify-center min-h-[340px]">
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.7, type: 'spring' }}
                    className="flex flex-col items-center justify-center py-10"
                  >
                    <motion.div
                      initial={{ rotate: -10 }}
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
                      className="text-7xl mb-4"
                    >
                      👋
                    </motion.div>
                    <h2 className="text-2xl font-bold mb-2 text-center">Let's Connect!</h2>
                    <p className="text-muted-foreground mb-4 text-center max-w-xs">
                      I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision. Reach out via email, LinkedIn, or phone—I'll respond promptly!
                    </p>
                    <div className="flex space-x-4 mt-4">
                      <motion.a
                        href="mailto:tzelalemtesfaye@gmail.com"
                        className="p-3 rounded-full bg-primary/10 hover:bg-primary/20 transition-colors text-primary text-2xl"
                        whileHover={{ scale: 1.2 }}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Mail className="h-6 w-6" />
                      </motion.a>
                      <motion.a
                        href="http://linkedin.com/in/zelalem-tesfaye-124686258"
                        className="p-3 rounded-full bg-primary/10 hover:bg-primary/20 transition-colors text-primary text-2xl"
                        whileHover={{ scale: 1.2 }}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Linkedin className="h-6 w-6" />
                      </motion.a>
                      <motion.a
                        href="tel:+251988745721"
                        className="p-3 rounded-full bg-primary/10 hover:bg-primary/20 transition-colors text-primary text-2xl"
                        whileHover={{ scale: 1.2 }}
                      >
                        <Phone className="h-6 w-6" />
                      </motion.a>
                    </div>
                  </motion.div>
                </CardContent>
              </Card>
              <div className="absolute -z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl opacity-50" />
            </motion.div>
          </div>
        </div>
      </main>
    </>
  )
}

function ContactCard({ icon, title, content, action, actionIcon, actionText, link, enterButton, leaveButton }) {
  return (
    <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.2 }}>
      <Card className="overflow-hidden">
        <CardContent className="p-6">
          <div className="flex items-start justify-between">
            <div className="flex items-start">
              <div className="mr-4 bg-primary/10 p-3 rounded-full">{icon}</div>
              <div>
                <h3 className="text-lg font-semibold mb-1">{title}</h3>
                {link ? (
                  <a href={link} className="text-muted-foreground hover:text-primary transition-colors">
                    {content}
                  </a>
                ) : (
                  <p className="text-muted-foreground">{content}</p>
                )}
              </div>
            </div>

            <Button
              variant="ghost"
              size="sm"
              className="text-xs flex items-center gap-1"
              onClick={action}
              onMouseEnter={enterButton}
              onMouseLeave={leaveButton}
            >
              {actionIcon}
              <span>{actionText}</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

