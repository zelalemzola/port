"use client"

import { useState, useRef, useEffect } from "react"
import { motion, useInView } from "framer-motion"
import { CheckCircle } from "lucide-react"

export default function InteractiveTimeline() {
  const [activeStep, setActiveStep] = useState(0)
  const containerRef = useRef(null)
  const isInView = useInView(containerRef, { once: true, amount: 0.2 })

  const steps = [
    {
      number: "01",
      title: "Discovery & Strategy",
      description:
        "I begin by understanding your business, audience, and goals. This sets the foundation for a project that truly reflects your vision.",
      items: [
        "Initial consultation to understand your business needs",
        "Audience and market research",
        "Project scope definition",
        "Timeline and milestone planning",
      ],
    },
    {
      number: "02",
      title: "Design & Prototyping",
      description:
        "I design wireframes and interactive prototypes that bring your ideas to life, ensuring a seamless experience before development begins.",
      items: [
        "Wireframing key pages and user flows",
        "Interactive prototyping",
        "UI/UX design considerations",
        "Design review and feedback implementation",
      ],
    },
    {
      number: "03",
      title: "Development & Testing",
      description:
        "Building the application with the latest tools, I ensure code quality, functionality, and usability are top-notch. Testing comes before launch to guarantee everything works as expected.",
      items: [
        "Frontend development with Next.js and React",
        "Backend implementation and API integration",
        "Cross-browser and cross-device testing",
        "Performance optimization",
      ],
    },
    {
      number: "04",
      title: "Launch & Support",
      description:
        "Once everything is ready, I deploy and monitor the site, offering ongoing support to make sure your website continues to perform at its best.",
      items: [
        "Deployment to production environment",
        "Analytics implementation",
        "Post-launch monitoring",
        "Ongoing maintenance and support",
      ],
    },
  ]

  useEffect(() => {
    if (isInView) {
      const interval = setInterval(() => {
        setActiveStep((prev) => (prev + 1) % steps.length)
      }, 3000)

      return () => clearInterval(interval)
    }
  }, [isInView, steps.length])

  return (
    <div ref={containerRef} className="relative">
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-muted hidden md:block" />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1">
          <div className="space-y-4 sticky top-24">
            {steps.map((step, index) => (
              <TimelineStep
                key={index}
                step={step}
                isActive={activeStep === index}
                onClick={() => setActiveStep(index)}
              />
            ))}
          </div>
        </div>

        <div className="md:col-span-2">
          <AnimatedContent step={steps[activeStep]} />
        </div>
      </div>
    </div>
  )
}

function TimelineStep({ step, isActive, onClick }) {
  return (
    <motion.div
      className={`
        flex items-center cursor-pointer p-4 rounded-lg transition-all duration-300
        ${isActive ? "bg-primary/10 border-l-4 border-primary" : "hover:bg-muted/50"}
      `}
      whileHover={{ x: 5 }}
      onClick={onClick}
    >
      <div
        className={`
        w-10 h-10 rounded-full flex items-center justify-center mr-4
        ${isActive ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}
      `}
      >
        {step.number}
      </div>
      <div>
        <h3 className={`font-semibold ${isActive ? "text-primary" : ""}`}>{step.title}</h3>
      </div>
    </motion.div>
  )
}

function AnimatedContent({ step }) {
  return (
    <motion.div
      key={step.number}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="bg-background rounded-xl p-6 border border-border shadow-sm"
    >
      <h3 className="text-2xl font-bold mb-4">{step.title}</h3>
      <p className="text-muted-foreground mb-6">{step.description}</p>

      <div className="space-y-3">
        {step.items.map((item, index) => (
          <motion.div
            key={index}
            className="flex items-start"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <CheckCircle className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
            <span>{item}</span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

