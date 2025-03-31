"use client"

import { useState, useRef } from "react"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle, ChevronDown, ChevronUp, ArrowRight, Lightbulb, Palette, Code, Rocket, Zap } from "lucide-react"
import CustomCursor from "@/components/custom-cursor"
import { useMobile } from "@/hooks/use-mobile"

export default function ProcessPage() {
  const [cursorText, setCursorText] = useState("")
  const [cursorVariant, setCursorVariant] = useState("default")
  const [expandedStep, setExpandedStep] = useState(null)
  const isMobile = useMobile()

  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  })

  const headerY = useTransform(scrollYProgress, [0, 0.1], [0, -50])
  const headerOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0])

  const enterButton = () => {
    setCursorText("Click")
    setCursorVariant("button")
  }

  const leaveButton = () => {
    setCursorText("")
    setCursorVariant("default")
  }

  const toggleStep = (stepId) => {
    if (expandedStep === stepId) {
      setExpandedStep(null)
    } else {
      setExpandedStep(stepId)
    }
  }

  const processSteps = [
    {
      id: 1,
      title: "Discovery & Strategy",
      description:
        "I begin by understanding your business, audience, and goals. This sets the foundation for a project that truly reflects your vision.",
      icon: <Lightbulb className="h-8 w-8 text-primary" />,
      color: "from-blue-500/20 to-purple-500/20",
      activities: [
        "Initial consultation to understand your business needs",
        "Audience and market research",
        "Competitive analysis",
        "Project scope definition",
        "Timeline and milestone planning",
      ],
      deliverables: ["Project brief", "Scope document", "Project timeline", "Technical requirements"],
      quote: "The best designs come from deep understanding of user needs and business goals.",
    },
    {
      id: 2,
      title: "Design & Prototyping",
      description:
        "I design wireframes and interactive prototypes that bring your ideas to life, ensuring a seamless experience before development begins.",
      icon: <Palette className="h-8 w-8 text-primary" />,
      color: "from-purple-500/20 to-pink-500/20",
      activities: [
        "Wireframing key pages and user flows",
        "Interactive prototyping",
        "UI/UX design considerations",
        "Design review and feedback implementation",
        "Responsive design planning",
      ],
      deliverables: ["Wireframes", "Interactive prototypes", "Design system", "UI component library"],
      quote: "Prototyping reduces risk by validating ideas before full development begins.",
    },
    {
      id: 3,
      title: "Development & Testing",
      description:
        "Building the application with the latest tools, I ensure code quality, functionality, and usability are top-notch. Testing comes before launch to guarantee everything works as expected.",
      icon: <Code className="h-8 w-8 text-primary" />,
      color: "from-pink-500/20 to-orange-500/20",
      activities: [
        "Frontend development with Next.js and React",
        "Backend implementation and API integration",
        "Database setup and configuration",
        "Cross-browser and cross-device testing",
        "Performance optimization",
      ],
      deliverables: ["Production-ready codebase", "Responsive web application", "API documentation", "Testing reports"],
      quote: "Clean code isn't just about aesthetics—it's about maintainability and scalability.",
    },
    {
      id: 4,
      title: "Launch & Support",
      description:
        "Once everything is ready, I deploy and monitor the site, offering ongoing support to make sure your website continues to perform at its best.",
      icon: <Rocket className="h-8 w-8 text-primary" />,
      color: "from-orange-500/20 to-yellow-500/20",
      activities: [
        "Deployment to production environment",
        "Domain configuration and SSL setup",
        "Analytics implementation",
        "Post-launch monitoring",
        "Ongoing maintenance and support",
      ],
      deliverables: ["Live website", "Analytics dashboard", "Maintenance documentation", "Support plan"],
      quote: "Launching is just the beginning—continuous improvement is the key to long-term success.",
    },
    {
      id: 5,
      title: "Growth & Optimization",
      description:
        "After launch, I help you analyze performance data and implement improvements to enhance user experience and achieve business goals.",
      icon: <Zap className="h-8 w-8 text-primary" />,
      color: "from-yellow-500/20 to-green-500/20",
      activities: [
        "Performance analysis",
        "User behavior tracking",
        "Conversion optimization",
        "Feature enhancements",
        "SEO improvements",
      ],
      deliverables: ["Performance reports", "Optimization recommendations", "Feature roadmap", "Growth strategy"],
      quote: "Data-driven optimization turns good products into great ones.",
    },
  ]

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
              My <span className="text-primary">Process</span>
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
              I follow a structured yet flexible approach to ensure every project is delivered successfully. Here's how
              I turn your ideas into reality.
            </motion.p>
          </motion.div>

          <div className="max-w-5xl mx-auto">
            <div className="relative">
              <div className="absolute left-[50%] top-0 bottom-0 w-1 bg-gradient-to-b from-primary/50 via-primary/30 to-primary/10 hidden lg:block" />

              {processSteps.map((step, index) => (
                <ProcessStep
                  key={step.id}
                  step={step}
                  index={index}
                  isExpanded={expandedStep === step.id}
                  toggleStep={() => toggleStep(step.id)}
                  enterButton={enterButton}
                  leaveButton={leaveButton}
                  isLast={index === processSteps.length - 1}
                />
              ))}
            </div>

            <motion.div
              className="mt-20 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Badge className="mb-4">READY TO START?</Badge>
              <h2 className="text-3xl font-bold mb-4">Let's Work Together</h2>
              <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
                Now that you understand my process, I'd love to hear about your project and how we can collaborate to
                bring your vision to life.
              </p>
              <Button size="lg" className="group" onMouseEnter={enterButton} onMouseLeave={leaveButton} asChild>
                <a href="/contact">
                  Get in Touch <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </Button>
            </motion.div>
          </div>
        </div>
      </main>
    </>
  )
}

function ProcessStep({ step, index, isExpanded, toggleStep, enterButton, leaveButton, isLast }) {
  const isEven = index % 2 === 0

  return (
    <div className={`mb-12 lg:mb-24 relative ${isLast ? "" : "pb-12"}`}>
      <div className={`flex flex-col ${isEven ? "lg:flex-row" : "lg:flex-row-reverse"} items-center gap-8`}>
        <motion.div
          className="lg:w-1/2"
          initial={{ opacity: 0, x: isEven ? -50 : 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className={`bg-gradient-to-br ${step.color} p-8 rounded-2xl relative`}>
            <div className="absolute top-4 right-4 text-4xl font-bold text-primary/20">
              {step.id.toString().padStart(2, "0")}
            </div>

            <div className="flex items-center mb-4">
              <div className="p-3 bg-background rounded-full mr-4">{step.icon}</div>
              <h3 className="text-2xl font-bold">{step.title}</h3>
            </div>

            <p className="text-muted-foreground mb-6">{step.description}</p>

            <Button
              variant="outline"
              size="sm"
              className="group"
              onClick={toggleStep}
              onMouseEnter={enterButton}
              onMouseLeave={leaveButton}
            >
              {isExpanded ? (
                <>
                  Show Less <ChevronUp className="ml-2 h-4 w-4 group-hover:-translate-y-1 transition-transform" />
                </>
              ) : (
                <>
                  Learn More <ChevronDown className="ml-2 h-4 w-4 group-hover:translate-y-1 transition-transform" />
                </>
              )}
            </Button>
          </div>
        </motion.div>

        <div className="hidden lg:flex items-center justify-center w-12 h-12 bg-primary text-primary-foreground rounded-full font-bold z-10">
          {step.id}
        </div>

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              className="lg:w-1/2"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Card>
                <CardContent className="p-6">
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-lg font-semibold mb-3">Activities</h4>
                      <ul className="space-y-2">
                        {step.activities.map((activity, i) => (
                          <motion.li
                            key={i}
                            className="flex items-start"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3, delay: i * 0.1 }}
                          >
                            <CheckCircle className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                            <span>{activity}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="text-lg font-semibold mb-3">Deliverables</h4>
                      <div className="flex flex-wrap gap-2">
                        {step.deliverables.map((deliverable, i) => (
                          <motion.span
                            key={i}
                            className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.3, delay: 0.3 + i * 0.1 }}
                          >
                            {deliverable}
                          </motion.span>
                        ))}
                      </div>
                    </div>

                    <motion.div
                      className="border-l-4 border-primary pl-4 italic text-muted-foreground"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3, delay: 0.6 }}
                    >
                      "{step.quote}"
                    </motion.div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {!isLast && (
        <motion.div
          className="absolute left-1/2 bottom-0 transform -translate-x-1/2 hidden lg:block"
          initial={{ height: 0 }}
          whileInView={{ height: 40 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <svg width="20" height="40" viewBox="0 0 20 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 0V40M10 40L1 31M10 40L19 31" stroke="currentColor" strokeOpacity="0.2" strokeWidth="2" />
          </svg>
        </motion.div>
      )}
    </div>
  )
}

