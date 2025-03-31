import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Briefcase, GraduationCap, Award, Download, Mail, Github, Linkedin } from "lucide-react"

export default function AboutPage() {
  return (
    <main className="min-h-screen py-20 px-4">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-20">
              <div className="bg-background rounded-xl overflow-hidden border border-border shadow-sm mb-8">
                <div className="aspect-square relative overflow-hidden">
                  <img
                    src="/placeholder.svg?height=400&width=400"
                    alt="Zelalem Tesfaye"
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="p-6 text-center">
                  <h1 className="text-2xl font-bold mb-2">Zelalem Tesfaye</h1>
                  <p className="text-primary font-medium mb-4">Full-Stack Developer</p>
                  <div className="flex justify-center space-x-4 mb-6">
                    <a
                      href="https://github.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-full bg-muted hover:bg-muted/80 transition-colors"
                    >
                      <Github className="h-5 w-5" />
                    </a>
                    <a
                      href="https://linkedin.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-full bg-muted hover:bg-muted/80 transition-colors"
                    >
                      <Linkedin className="h-5 w-5" />
                    </a>
                    <a
                      href="mailto:contact@example.com"
                      className="p-2 rounded-full bg-muted hover:bg-muted/80 transition-colors"
                    >
                      <Mail className="h-5 w-5" />
                    </a>
                  </div>
                  <Button className="w-full" asChild>
                    <a href="/resume.pdf" download>
                      <Download className="mr-2 h-4 w-4" /> Download Resume
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
            <section>
              <h2 className="text-3xl font-bold mb-6">About Me</h2>
              <div className="prose max-w-none">
                <p>
                  Hello! I'm Zelalem Tesfaye, a passionate full-stack developer with over 2 years of professional
                  experience in creating web and mobile applications. I hold a Bachelor's degree in Computer Science
                  from Addis Ababa University.
                </p>
                <p>
                  My journey in software development began during my university years, where I discovered my passion for
                  creating intuitive and efficient digital solutions. Since then, I've worked on a variety of projects,
                  from e-commerce platforms to mobile applications, always striving to deliver high-quality,
                  user-centered experiences.
                </p>
                <p>
                  I specialize in modern web technologies like React, Next.js, and Node.js, as well as mobile
                  development with Flutter. I'm constantly learning and exploring new technologies to stay at the
                  forefront of the rapidly evolving tech landscape.
                </p>
                <p>
                  When I'm not coding, you can find me exploring new technologies, contributing to open-source projects,
                  or sharing my knowledge with the developer community.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-3xl font-bold mb-6">Experience</h2>
              <div className="space-y-6">
                <TimelineItem
                  icon={<Briefcase className="h-5 w-5" />}
                  title="Freelance Developer"
                  organization="Various Clients"
                  period="2022 - Present"
                  description="Working with diverse clients to deliver custom web and mobile solutions. Projects include e-commerce platforms, business websites, and mobile applications."
                />
                <TimelineItem
                  icon={<Briefcase className="h-5 w-5" />}
                  title="Junior Web Developer"
                  organization="Tech Solutions Inc."
                  period="2021 - 2022"
                  description="Developed and maintained client websites using React and Node.js. Collaborated with the design team to implement responsive UI components and integrate backend APIs."
                />
                <TimelineItem
                  icon={<Briefcase className="h-5 w-5" />}
                  title="Web Development Intern"
                  organization="Digital Innovations"
                  period="2020 - 2021"
                  description="Assisted in the development of web applications using HTML, CSS, and JavaScript. Gained hands-on experience with React and modern frontend development practices."
                />
              </div>
            </section>

            <section>
              <h2 className="text-3xl font-bold mb-6">Education</h2>
              <div className="space-y-6">
                <TimelineItem
                  icon={<GraduationCap className="h-5 w-5" />}
                  title="Bachelor of Science in Computer Science"
                  organization="Addis Ababa University"
                  period="2016 - 2020"
                  description="Focused on software engineering, algorithms, and web development. Completed a capstone project developing a community marketplace platform."
                />
                <TimelineItem
                  icon={<Award className="h-5 w-5" />}
                  title="Web Development Certification"
                  organization="Udemy"
                  period="2019"
                  description="Completed comprehensive courses on modern web development technologies including React, Node.js, and responsive design principles."
                />
              </div>
            </section>

            <section>
              <h2 className="text-3xl font-bold mb-6">Skills</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <SkillCategory
                  title="Frontend Development"
                  skills={["HTML", "CSS", "JavaScript", "React", "Next.js", "Tailwind CSS", "Responsive Design"]}
                />
                <SkillCategory
                  title="Backend Development"
                  skills={["Node.js", "Express", "RESTful APIs", "GraphQL", "MongoDB", "PostgreSQL"]}
                />
                <SkillCategory
                  title="Mobile Development"
                  skills={["Flutter", "React Native", "Cross-platform Development"]}
                />
                <SkillCategory
                  title="Tools & Others"
                  skills={["Git", "GitHub", "VS Code", "Figma", "Agile Methodology", "UI/UX Design"]}
                />
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>
  )
}

function TimelineItem({ icon, title, organization, period, description }) {
  return (
    <div className="relative pl-10 pb-8 border-l border-border last:border-0 last:pb-0">
      <div className="absolute left-0 top-0 bg-background p-1 -translate-x-1/2 rounded-full border border-border">
        <div className="bg-primary/10 text-primary p-1.5 rounded-full">{icon}</div>
      </div>
      <div>
        <h3 className="text-xl font-semibold">{title}</h3>
        <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 mb-2">
          <span className="text-muted-foreground">{organization}</span>
          <span className="hidden sm:inline text-muted-foreground">•</span>
          <span className="text-sm text-muted-foreground">{period}</span>
        </div>
        <p className="text-muted-foreground">{description}</p>
      </div>
    </div>
  )
}

function SkillCategory({ title, skills }) {
  return (
    <Card>
      <CardContent className="p-6">
        <h3 className="text-lg font-semibold mb-4">{title}</h3>
        <div className="flex flex-wrap gap-2">
          {skills.map((skill) => (
            <span key={skill} className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
              {skill}
            </span>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

