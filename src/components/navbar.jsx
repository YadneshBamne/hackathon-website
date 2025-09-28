import React, { useState } from "react";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [open, setOpen] = useState(false)

  const navItems = [
    { href: "#about", label: "About" },
    { href: "#schedule", label: "Schedule" },
    { href: "#tracks", label: "Tracks" },
    { href: "#faq", label: "FAQ" },
  ]
  
  return (
    <header className="fixed top-0 z-50 w-full bg-transparent backdrop-blur-sm border-b border-yellow-400/20">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-6">
        <div className="flex items-center gap-3">
          <Link to="/" className="flex items-center gap-3">
            <span className="text-3xl tracking-widest font-starjout text-yellow-400 drop-shadow-lg hover:text-yellow-300 transition-colors">
              HackNova
            </span>
          </Link>
        </div>

        <button
          aria-label={open ? "Close menu" : "Open menu"}
          className="inline-flex items-center rounded-md border border-yellow-400/30 px-3 py-2 text-sm md:hidden text-yellow-400 hover:bg-yellow-400/10"
          onClick={() => setOpen((s) => !s)}
        >
          <span className="sr-only">Toggle menu</span>
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            className="size-5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            {open ? <path d="M6 18L18 6M6 6l12 12" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
          </svg>
        </button>

        <div className="hidden items-center gap-8 md:flex">
          <ul className="flex items-center gap-6 text-sm">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link 
                  className="text-yellow-400/80 hover:text-yellow-400 transition-colors font-medium tracking-wide" 
                  to={item.href}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <Link to="/register">
            <Button 
              size="sm" 
              className="bg-yellow-400 text-black hover:bg-yellow-300 font-medium border border-yellow-400"
            >
              Register
            </Button>
          </Link>
        </div>
      </nav>

      {open && (
        <div className="border-t border-yellow-400/20 md:hidden bg-black/80 backdrop-blur-sm">
          <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-4 md:px-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className="text-sm text-yellow-400/80 hover:text-yellow-400 font-medium tracking-wide"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <Link to="/register" onClick={() => setOpen(false)}>
              <Button className="w-full bg-yellow-400 text-black hover:bg-yellow-300 font-medium">
                Register
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}; 

export default Navbar;
