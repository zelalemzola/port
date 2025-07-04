import Link from "next/link"
import { Github, Linkedin, Mail, Phone } from "lucide-react"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative z-10 py-12 px-4 border-t border-border">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <Link href="/" className="text-2xl font-bold">
              <span className="text-primary">Z</span>elalem
            </Link>
            <p className="mt-4 text-muted-foreground max-w-xs">
              Creating beautiful, functional, and user-centered digital experiences through thoughtful web development.
            </p>
            <div className="flex space-x-4 mt-6">
              <a
                href="https://github.com/zelalemzola"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-background hover:bg-background/80 transition-colors"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href="http://linkedin.com/in/zelalem-tesfaye-124686258"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-background hover:bg-background/80 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href="mailto:tzelalemtesfaye@gmail.com"
                className="p-2 rounded-full bg-background hover:bg-background/80 transition-colors"
                aria-label="Email"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <nav className="flex flex-col space-y-3">
              <Link href="/" className="text-muted-foreground hover:text-primary transition-colors">
                Home
              </Link>
              <Link href="/projects" className="text-muted-foreground hover:text-primary transition-colors">
                Projects
              </Link>
              <Link href="/skills" className="text-muted-foreground hover:text-primary transition-colors">
                Skills
              </Link>
              <Link href="/process" className="text-muted-foreground hover:text-primary transition-colors">
                Process
              </Link>
              <Link href="/contact" className="text-muted-foreground hover:text-primary transition-colors">
                Contact
              </Link>
            </nav>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <div className="space-y-3">
              <p className="flex items-center text-muted-foreground">
                <Mail className="h-4 w-4 mr-2" />
                Email: <a href="mailto:tzelalemtesfaye@gmail.com" className="ml-1 underline">tzelalemtesfaye@gmail.com</a>
              </p>
              <p className="flex items-center text-muted-foreground">
                <Linkedin className="h-4 w-4 mr-2" />
                LinkedIn: <a href="http://linkedin.com/in/zelalem-tesfaye-124686258" target="_blank" rel="noopener noreferrer" className="ml-1 underline">linkedin.com/in/zelalem-tesfaye-124686258</a>
              </p>
              <p className="flex items-center text-muted-foreground">
                <Github className="h-4 w-4 mr-2" />
                GitHub: <a href="http://github.com/zelalemzola" target="_blank" rel="noopener noreferrer" className="ml-1 underline">github.com/zelalemzola</a>
              </p>
              <p className="flex items-center text-muted-foreground">
                <Phone className="h-4 w-4 mr-2" />
                Phone: <a href="tel:+251988745721" className="ml-1 underline">+251988745721</a>
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-12 pt-6 text-center text-muted-foreground">
          <p>© {currentYear} Zelalem Tesfaye. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

