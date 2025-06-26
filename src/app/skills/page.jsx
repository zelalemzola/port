"use client"

import { useState, useRef, useEffect } from "react"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight, Code, Database, Layout, Smartphone, Server, Palette } from "lucide-react"
import CustomCursor from "@/components/custom-cursor"
import { useMobile } from "@/hooks/use-mobile"

export default function SkillsPage() {
  const [cursorText, setCursorText] = useState("")
  const [cursorVariant, setCursorVariant] = useState("default")
  const [activeSkill, setActiveSkill] = useState(null)
  const isMobile = useMobile()

  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  })

  const headerY = useTransform(scrollYProgress, [0, 0.1], [0, -50])
  const headerOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0])

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

      <main className="min-h-screen pt-24 pb-20 px-4" ref={containerRef}>
        <div className="container mx-auto">
          <motion.div className="max-w-4xl mx-auto mb-16 text-center" style={{ y: headerY, opacity: headerOpacity }}>
            <motion.h1
              className="text-5xl md:text-6xl font-bold mb-6 relative inline-block"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              My <span className="text-primary">Skills</span>
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
              I've developed a diverse set of skills throughout my career. Here's an interactive overview of my
              technical expertise and the technologies I work with.
            </motion.p>
          </motion.div>

          <Tabs defaultValue="overview" className="max-w-5xl mx-auto">
            <div className="flex justify-center mb-8">
              <TabsList className="grid w-full max-w-md grid-cols-3">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="technical">Technical</TabsTrigger>
                <TabsTrigger value="soft">Soft Skills</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="overview" className="space-y-12">
              <SkillsOverview enterButton={enterButton} leaveButton={leaveButton} setActiveSkill={setActiveSkill} />
            </TabsContent>

            <TabsContent value="technical" className="space-y-12">
              <TechnicalSkills />
            </TabsContent>

            <TabsContent value="soft" className="space-y-12">
              <SoftSkills />
            </TabsContent>
          </Tabs>
        </div>

        <AnimatePresence>
          {activeSkill && <SkillModal skill={activeSkill} onClose={() => setActiveSkill(null)} />}
        </AnimatePresence>
      </main>
    </>
  )
}

function SkillsOverview({ enterButton, leaveButton, setActiveSkill }) {
  const skillCategories = [
    {
      icon: <Code className="h-10 w-10 text-primary" />,
      title: "Frontend Development",
      description: "Creating responsive, interactive user interfaces with modern frameworks and libraries.",
      skills: [
        { name: "React.js", level: 90 },
        { name: "Next.js", level: 85 },
        { name: "TypeScript", level: 80 },
        { name: "Tailwind CSS", level: 95 },
      ],
    },
    {
      icon: <Database className="h-10 w-10 text-primary" />,
      title: "Database Management",
      description: "Designing and optimizing database structures for efficient data storage and retrieval.",
      skills: [
        { name: "MongoDB", level: 85 },
        { name: "PostgreSQL", level: 80 },
        { name: "Firebase", level: 75 },
        { name: "Redis", level: 70 },
      ],
    },
    {
      icon: <Smartphone className="h-10 w-10 text-primary" />,
      title: "Mobile Development",
      description: "Creating cross-platform mobile applications with modern frameworks.",
      skills: [
        { name: "React Native", level: 80 },
        { name: "Flutter", level: 70 },
        { name: "Mobile UI Design", level: 85 },
        { name: "App Performance", level: 75 },
      ],
    },
    {
      icon: <Layout className="h-10 w-10 text-primary" />,
      title: "UI/UX Design",
      description: "Designing intuitive, accessible, and visually appealing user interfaces.",
      skills: [
        { name: "Figma", level: 85 },
        { name: "User Research", level: 75 },
        { name: "Wireframing", level: 90 },
        { name: "Prototyping", level: 85 },
      ],
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {skillCategories.map((category, index) => (
        <SkillCard
          key={index}
          category={category}
          index={index}
          enterButton={enterButton}
          leaveButton={leaveButton}
          onClick={() => setActiveSkill(category)}
        />
      ))}
    </div>
  )
}

function SkillCard({ category, index, enterButton, leaveButton, onClick }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -10 }}
      className="group cursor-pointer"
      onMouseEnter={enterButton}
      onMouseLeave={leaveButton}
      onClick={onClick}
    >
      <Card className="h-full transition-all duration-300 hover:shadow-md overflow-hidden">
        <CardContent className="p-6 flex flex-col h-full">
          <div className="mb-4 p-3 bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
            {category.icon}
          </div>

          <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">{category.title}</h3>

          <p className="text-muted-foreground mb-6 flex-grow">{category.description}</p>

          <div className="space-y-3">
            {category.skills.slice(0, 2).map((skill) => (
              <div key={skill.name} className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span>{skill.name}</span>
                  <span className="text-primary">{skill.level}%</span>
                </div>
                <Progress value={skill.level} className="h-1.5" />
              </div>
            ))}
          </div>

          <div className="mt-4 text-sm text-primary flex items-center justify-end">
            <span>View more</span>
            <ArrowRight className="ml-1 h-3 w-3 group-hover:translate-x-1 transition-transform" />
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

function TechnicalSkills() {
  const frontendSkills = [
    { name: "HTML5/CSS3", level: 95 },
    { name: "JavaScript (ES6+)", level: 90 },
    { name: "React.js", level: 90 },
    { name: "Next.js", level: 85 },
    { name: "TypeScript", level: 80 },
    { name: "Tailwind CSS", level: 95 },
    { name: "Redux", level: 85 },
    { name: "Framer Motion", level: 80 },
    { name: "Responsive Design", level: 95 },
    { name: "Web Accessibility", level: 85 },
  ]

  const otherSkills = [
    { name: "Git/GitHub", level: 90 },
    { name: "Performance Optimization", level: 85 },
    { name: "SEO", level: 80 },
    { name: "Testing (Jest, Cypress)", level: 75 },
    { name: "Agile Methodologies", level: 85 },
    { name: "Technical Documentation", level: 80 },
  ]

  return (
    <div className="space-y-12">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <h2 className="text-2xl font-bold mb-6 flex items-center">
          <Code className="h-6 w-6 mr-2 text-primary" />
          Frontend Development
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {frontendSkills.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="space-y-2"
            >
              <div className="flex justify-between items-center">
                <span className="font-medium">{skill.name}</span>
                <Badge variant="outline">{skill.level}%</Badge>
              </div>
              <div className="relative h-2 w-full bg-muted rounded-full overflow-hidden">
                <motion.div
                  className="absolute top-0 left-0 h-full bg-primary rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${skill.level}%` }}
                  transition={{ duration: 1, delay: 0.2 + index * 0.05 }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <h2 className="text-2xl font-bold mb-6 flex items-center">
          <Palette className="h-6 w-6 mr-2 text-primary" />
          Other Technical Skills
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {otherSkills.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="space-y-2"
            >
              <div className="flex justify-between items-center">
                <span className="font-medium">{skill.name}</span>
                <Badge variant="outline">{skill.level}%</Badge>
              </div>
              <div className="relative h-2 w-full bg-muted rounded-full overflow-hidden">
                <motion.div
                  className="absolute top-0 left-0 h-full bg-primary rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${skill.level}%` }}
                  transition={{ duration: 1, delay: 0.2 + index * 0.05 }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}

function SoftSkills() {
  const softSkills = [
    {
      title: "Problem Solving",
      description: "Analytical thinking and creative approach to solving complex technical challenges.",
      level: 90,
      icon: "🧩",
    },
    {
      title: "Communication",
      description: "Clear and effective communication with clients, team members, and stakeholders.",
      level: 85,
      icon: "💬",
    },
    {
      title: "Time Management",
      description: "Efficient organization and prioritization of tasks to meet deadlines.",
      level: 85,
      icon: "⏱️",
    },
    {
      title: "Adaptability",
      description: "Quick adjustment to new technologies, requirements, and working environments.",
      level: 90,
      icon: "🔄",
    },
    {
      title: "Teamwork",
      description: "Collaborative approach to working with diverse teams and stakeholders.",
      level: 85,
      icon: "👥",
    },
    {
      title: "Attention to Detail",
      description: "Meticulous focus on quality and precision in all aspects of development.",
      level: 90,
      icon: "🔍",
    },
    {
      title: "Creativity",
      description: "Innovative thinking and unique approaches to design and development challenges.",
      level: 80,
      icon: "💡",
    },
    {
      title: "Leadership",
      description: "Guiding teams and projects with clear vision and effective delegation.",
      level: 75,
      icon: "🚀",
    },
  ]

  return (
    <div className="space-y-8">
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-lg text-muted-foreground max-w-3xl mx-auto text-center mb-8"
      >
        Technical skills are essential, but soft skills are what truly enable successful collaboration and project
        delivery. Here are the interpersonal and professional skills I bring to every project.
      </motion.p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {softSkills.map((skill, index) => (
          <motion.div
            key={skill.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ y: -5 }}
          >
            <Card className="h-full">
              <CardContent className="p-6">
                <div className="flex items-start">
                  <div className="text-4xl mr-4">{skill.icon}</div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-2">{skill.title}</h3>
                    <p className="text-muted-foreground mb-4">{skill.description}</p>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Proficiency</span>
                        <span className="text-primary">{skill.level}%</span>
                      </div>
                      <div className="relative h-2 w-full bg-muted rounded-full overflow-hidden">
                        <motion.div
                          className="absolute top-0 left-0 h-full bg-primary rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: `${skill.level}%` }}
                          transition={{ duration: 1, delay: 0.2 }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

function SkillModal({ skill, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose()
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [onClose])

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="bg-background rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-8">
          <div className="flex items-center mb-6">
            <div className="p-3 bg-primary/10 rounded-full mr-4">{skill.icon}</div>
            <h2 className="text-3xl font-bold">{skill.title}</h2>
          </div>

          <p className="text-muted-foreground mb-8">{skill.description}</p>

          <h3 className="text-xl font-semibold mb-4">Key Skills</h3>

          <div className="space-y-6">
            {skill.skills.map((item) => (
              <div key={item.name} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-medium">{item.name}</span>
                  <Badge variant="outline">{item.level}%</Badge>
                </div>
                <div className="relative h-2 w-full bg-muted rounded-full overflow-hidden">
                  <motion.div
                    className="absolute top-0 left-0 h-full bg-primary rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${item.level}%` }}
                    transition={{ duration: 1 }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 pt-6 border-t border-border">
            <h3 className="text-xl font-semibold mb-4">Related Projects</h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Card>
                <CardContent className="p-4">
                  <h4 className="font-medium mb-1">E-commerce Website</h4>
                  <p className="text-sm text-muted-foreground">
                    Applied these skills to create a responsive online store
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <h4 className="font-medium mb-1">SaaS Dashboard</h4>
                  <p className="text-sm text-muted-foreground">Utilized this expertise for analytics visualization</p>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="mt-8 flex justify-end">
            <Button onClick={onClose}>Close</Button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

