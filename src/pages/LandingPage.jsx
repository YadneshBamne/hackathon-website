import React from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Navbar from "@/components/navbar";
import { Link } from "react-router-dom";
import Footer from "@/components/footer";

const items = [
  {
    title: "48 Hours",
    desc: "Two focused days to ideate, build, and demo your project.",
  },
  {
    title: "Mentor Support",
    desc: "Guidance from industry mentors throughout the event.",
  },
  {
    title: "Team or Solo",
    desc: "Join with friends or match with collaborators on-site.",
  },
  {
    title: "Prizes & Swag",
    desc: "Win recognition, prizes, and exclusive event swag.",
  },
]

const LandingPage = () => {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50">
        <section className="relative mx-auto flex min-h-[72svh] max-w-7xl flex-col items-center justify-center px-4 py-16 text-center md:px-6 lg:py-24">
          {/* <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="mb-6"
          >
            <img
              src="/logo.png"
              alt="HackNova logomark"
              width={96}
              height={96}
              className="rounded-md"
              priority
            />
          </motion.div> */}

          <motion.h1
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.05 }}
            className="text-balance text-3xl font-semibold leading-tight tracking-tight md:text-5xl"
          >
            Build, learn, and ship at APSIT’s biggest hackathon
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.15 }}
            className="mt-4 max-w-2xl text-pretty text-sm leading-6 text-muted-foreground md:text-base md:leading-7"
          >
            Powered by CSA, CC, and GDG. Collaborate with peers, learn from
            mentors, and turn ideas into prototypes—fast.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25 }}
            className="mt-8 flex flex-wrap items-center justify-center gap-3"
          >
            <Link href="/register">
              <Button size="lg" className="px-6">
                Register Now
              </Button>
            </Link>
            <Link href="#tracks">
              <Button
                size="lg"
                variant="outline"
                className="px-6 bg-transparent"
              >
                View Tracks
              </Button>
            </Link>
          </motion.div>

          {/* Minimal, non-decorative divider using tokens */}
          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 mx-auto h-px w-48 bg-border"
            aria-hidden="true"
          />
        </section>
        <section
          id="about"
          className="mx-auto max-w-7xl px-4 py-12 md:px-6 lg:py-16"
        >
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-balance text-2xl font-semibold tracking-tight md:text-3xl">
              Why HackNova
            </h2>
            <p className="mt-3 text-sm leading-6 text-muted-foreground md:text-base">
              A welcoming space to learn by doing—ship something you’re proud
              of.
            </p>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-4 md:mt-10 md:grid-cols-2 lg:grid-cols-4">
            {items.map((it, i) => (
              <motion.article
                key={it.title}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="rounded-lg border bg-card p-5 shadow-xs"
              >
                <h3 className="text-base font-semibold">{it.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{it.desc}</p>
              </motion.article>
            ))}
          </div>
        </section>
      </main>
      <Footer/>
    </>
  );
};

export default LandingPage;
