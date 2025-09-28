import React from 'react'

const Footer = () => {
  return (
    <footer className="border-t">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-8 text-center text-sm text-muted-foreground md:flex-row md:px-6">
        <p>© {new Date().getFullYear()} HackNova. All rights reserved.</p>
        <nav className="flex items-center gap-4">
          <a href="#faq" className="hover:text-foreground transition-colors">
            FAQ
          </a>
          <a href="#tracks" className="hover:text-foreground transition-colors">
            Tracks
          </a>
          <a href="#schedule" className="hover:text-foreground transition-colors">
            Schedule
          </a>
        </nav>
      </div>
    </footer>
  )
}

export default Footer
