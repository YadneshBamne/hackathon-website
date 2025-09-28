import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Navbar from "@/components/navbar";
import { Link } from "react-router-dom";
import Footer from "@/components/footer";
import CombinedSpaceAnimation from "@/components/preloader"; // Adjust path as needed

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

// Custom wrapper for preloader with bg-[#131314] and proper styling
const CustomPreloaderWrapper = ({ onComplete }) => {
  useEffect(() => {
    // Complete preloader after 4 seconds
    const timer = setTimeout(() => {
      onComplete();
    }, 10000);
    
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      backgroundColor: '#131314',
      zIndex: 9999,
      overflow: 'hidden'
    }}>
      <div style={{
        position: 'relative',
        width: '100%',
        height: '100%'
      }}>
        <CombinedSpaceAnimation />
      </div>
    </div>
  );
};

const LandingPage = () => {
  const [preloaderState, setPreloaderState] = useState(() => {
    const hasSeenPreloader = sessionStorage.getItem('hasSeenPreloader');
    return hasSeenPreloader ? 'completed' : 'loading';
  });

  const handlePreloaderComplete = () => {
    setPreloaderState('transitioning');
    sessionStorage.setItem('hasSeenPreloader', 'true');
    
    // Start fade-in transition after a brief moment
    setTimeout(() => {
      setPreloaderState('completed');
    }, 300);
  };

  // Show preloader
  if (preloaderState === 'loading') {
    return <CustomPreloaderWrapper onComplete={handlePreloaderComplete} />;
  }

  // Show landing page with smooth fade-in effect
  return (
    <>
      <style>
        {`
          @keyframes fadeInLanding {
            0% { 
              opacity: 0; 
              transform: scale(0.98) translateY(20px);
              filter: blur(1px);
            }
            100% { 
              opacity: 1; 
              transform: scale(1) translateY(0);
              filter: blur(0px);
            }
          }
          
          @keyframes slideInFromTop {
            0% {
              opacity: 0;
              transform: translateY(-30px);
            }
            100% {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes move-twink-back {
            from { background-position: 0 0; }
            to { background-position: -10000px 5000px; }
          }

          @keyframes move-clouds-back {
            from { background-position: 0 0; }
            to { background-position: 10000px 0; }
          }

          .stars-background {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: -1;
            overflow: hidden;
            pointer-events: none;
          }

          .stars {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: #000 url('https://i.imgur.com/YKY28eT.png') repeat top center;
            z-index: 0;
          }

          .twinkling {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: transparent url('https://i.imgur.com/XYMF4ca.png') repeat top center;
            animation: move-twink-back 200s linear infinite;
            z-index: 1;
          }

          .clouds {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: transparent url('https://i.imgur.com/mHbScrQ.png') repeat top center;
            animation: move-clouds-back 200s linear infinite;
            z-index: 2;
          }
        `}
      </style>
      
      {/* Star Field Background */}
      <div className="stars-background">
        <div className="stars"></div>
        <div className="twinkling"></div>
        <div className="clouds"></div>
      </div>
      
      <div 
        style={{
          backgroundColor: 'transparent', // Changed from #131314 to transparent
          minHeight: '100vh',
          position: 'relative',
          zIndex: 10,
          animation: preloaderState === 'transitioning' ? 'fadeInLanding 1.2s ease-out forwards' : 'none',
          opacity: preloaderState === 'transitioning' ? 0 : 1,
        }}
      >
        <div style={{
          animation: preloaderState === 'completed' ? 'slideInFromTop 0.8s ease-out' : 'none',
        }}>
          <Navbar />
        </div>
        
        <main className="min-h-screen" style={{ background: 'transparent' }}>
          <section className="relative mx-auto flex min-h-[72svh] max-w-7xl flex-col items-center justify-center px-4 py-16 text-center md:px-6 lg:py-24">
            <motion.h1
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.8, 
                delay: preloaderState === 'completed' ? 0.3 : 0.05 
              }}
              className="text-balance text-3xl font-semibold leading-tight tracking-tight md:text-5xl text-yellow-400 font-starjout"
            >
              Build, learn, and ship at APSIT's biggest hackathon
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.8, 
                delay: preloaderState === 'completed' ? 0.5 : 0.15 
              }}
              className="mt-4 max-w-2xl text-pretty text-sm leading-6 text-muted-foreground md:text-base md:leading-7"
            >
              Powered by CSA, CC, and GDG. Collaborate with peers, learn from
              mentors, and turn ideas into prototypes—fast.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.8, 
                delay: preloaderState === 'completed' ? 0.7 : 0.25 
              }}
              className="mt-8 flex flex-wrap items-center justify-center gap-3"
            >
              <Link to="/register">
                <Button 
                  size="lg" 
                  className="px-6 bg-yellow-400 text-black hover:bg-yellow-300 font-medium"
                >
                  Register Now
                </Button>
              </Link>
              <Link to="#tracks">
                <Button
                  size="lg"
                  variant="outline"
                  className="px-6 bg-transparent border-yellow-400 text-yellow-400 hover:bg-yellow-400/10"
                >
                  View Tracks
                </Button>
              </Link>
            </motion.div>

            <div
              className="pointer-events-none absolute inset-x-0 bottom-0 mx-auto h-px w-48 bg-yellow-400/20"
              aria-hidden="true"
            />
          </section>
          
          <section
            id="about"
            className="mx-auto max-w-7xl px-4 py-12 md:px-6 lg:py-16"
          >
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.8, 
                delay: preloaderState === 'completed' ? 0.9 : 0.3 
              }}
              className="mx-auto max-w-2xl text-center"
            >
              <h2 className="text-balance text-2xl font-semibold tracking-tight md:text-3xl text-yellow-400">
                Why HackNova
              </h2>
              <p className="mt-3 text-sm leading-6 text-muted-foreground md:text-base">
                A welcoming space to learn by doing—ship something you're proud
                of.
              </p>
            </motion.div>

            <div className="mt-8 grid grid-cols-1 gap-4 md:mt-10 md:grid-cols-2 lg:grid-cols-4">
              {items.map((it, i) => (
                <motion.article
                  key={it.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    duration: 0.6, 
                    delay: preloaderState === 'completed' ? 1.1 + (i * 0.1) : 0.4 + (i * 0.05) 
                  }}
                  className="rounded-lg border border-yellow-400/20 bg-card/50 p-5 shadow-xs hover:border-yellow-400/40 transition-colors"
                >
                  <h3 className="text-base font-semibold text-yellow-400">{it.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{it.desc}</p>
                </motion.article>
              ))}
            </div>
          </section>
        </main>
        
        <div style={{
          animation: preloaderState === 'completed' ? 'fadeInLanding 1s ease-out 1.5s both' : 'none',
        }}>
          <Footer/>
        </div>
      </div>
    </>
  );
};

export default LandingPage;
