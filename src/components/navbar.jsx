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
    <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-6">
        <div className="flex items-center gap-3">
          <Link to="/" className="flex items-center gap-3">
            <img src="/logo.png" alt="HackNova logo" width={40} height={40} className="rounded-sm" priority />
            <span className="text-sm font-semibold tracking-tight md:text-base">HackNova</span>
          </Link>
        </div>

        <button
          aria-label={open ? "Close menu" : "Open menu"}
          className="inline-flex items-center rounded-md border px-3 py-2 text-sm md:hidden"
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
          <ul className="flex items-center gap-6 text-sm text-muted-foreground">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link className="hover:text-foreground transition-colors" to={item.href}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <Link to="/register">
            <Button size="sm">Register</Button>
          </Link>
        </div>
      </nav>

      {open && (
        <div className="border-t md:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-4 md:px-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm text-muted-foreground hover:text-foreground"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <Link href="/register" onClick={() => setOpen(false)}>
              <Button className="w-full">Register</Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}; 

export default Navbar;
