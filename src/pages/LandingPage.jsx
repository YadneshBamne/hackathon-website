import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import CombinedSpaceAnimation from "@/components/preloader";
import ScrollVelocity from "@/components/variabletext";

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

// Timeline data with updated dates
const timelineEvents = [
  {
    day: "Day 1",
    date: "October 3, 2025 (Friday)",
    events: [
      { time: "09:00 AM", title: "Registration & Check-in", description: "Welcome to HackNova! Get your badges and swag." },
      { time: "10:00 AM", title: "Opening Ceremony", description: "Kick-off with inspiring talks and event overview." },
      { time: "11:00 AM", title: "Team Formation", description: "Find your galactic crew or form new alliances." },
      { time: "12:00 PM", title: "Hacking Begins", description: "Start building your stellar projects!" },
      { time: "01:00 PM", title: "Lunch Break", description: "Fuel up for the coding marathon." },
      { time: "06:00 PM", title: "Mentor Sessions", description: "Get guidance from industry experts." },
      { time: "08:00 PM", title: "Dinner", description: "Evening meal to keep you energized." },
      { time: "12:00 AM", title: "Midnight Snacks", description: "Late-night fuel for coding warriors." }
    ]
  },
  {
    day: "Day 2", 
    date: "October 4, 2025 (Saturday)",
    events: [
      { time: "08:00 AM", title: "Breakfast", description: "Start your day with energy." },
      { time: "10:00 AM", title: "Progress Check", description: "Share your progress with mentors." },
      { time: "12:00 PM", title: "Final Sprint", description: "Last hours to polish your projects." },
      { time: "01:00 PM", title: "Lunch", description: "Final meal before submissions." },
      { time: "03:00 PM", title: "Project Submission", description: "Submit your stellar creations." },
      { time: "04:00 PM", title: "Project Showcase", description: "Present your solutions to the galaxy." },
      { time: "06:00 PM", title: "Judging & Evaluation", description: "Expert judges review all projects." },
      { time: "07:30 PM", title: "Closing Ceremony", description: "Awards, recognition, and celebration!" }
    ]
  }
];

// Enhanced Countdown Timer Component with IST support
const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  const [eventStatus, setEventStatus] = useState('upcoming'); // 'upcoming', 'live', 'ended'

  useEffect(() => {
    // HackNova starts on Friday, October 3, 2025 at 9:00 AM IST
    const hackathonStartDate = new Date('2025-10-03T09:00:00+05:30').getTime();
    // Event ends on Saturday, October 4, 2025 at 7:30 PM IST
    const hackathonEndDate = new Date('2025-10-04T19:30:00+05:30').getTime();

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distanceToStart = hackathonStartDate - now;
      const distanceToEnd = hackathonEndDate - now;

      if (distanceToStart > 0) {
        // Event hasn't started yet
        setEventStatus('upcoming');
        setTimeLeft({
          days: Math.floor(distanceToStart / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distanceToStart % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distanceToStart % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distanceToStart % (1000 * 60)) / 1000)
        });
      } else if (distanceToEnd > 0) {
        // Event is live
        setEventStatus('live');
        setTimeLeft({
          days: Math.floor(distanceToEnd / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distanceToEnd % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distanceToEnd % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distanceToEnd % (1000 * 60)) / 1000)
        });
      } else {
        // Event has ended
        setEventStatus('ended');
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const getTimerTitle = () => {
    switch (eventStatus) {
      case 'upcoming':
        return 'Event Starts In:';
      case 'live':
        return '🔴 LIVE - Event Ends In:';
      case 'ended':
        return 'Event Has Ended';
      default:
        return 'Event Starts In:';
    }
  };

  const getTimerColor = () => {
    switch (eventStatus) {
      case 'upcoming':
        return 'text-yellow-400';
      case 'live':
        return 'text-red-400 animate-pulse';
      case 'ended':
        return 'text-gray-400';
      default:
        return 'text-yellow-400';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.9 }}
      className="mt-8 mb-8 text-center"
    >
      <h3 className={`text-2xl font-semibold ${getTimerColor()} mb-2`}>
        {getTimerTitle()}
      </h3>
      
      {eventStatus !== 'ended' && (
        <>
      

          <div className={`flex justify-center space-x-12 ${getTimerColor()} font-extrabold`}>
            <div className="text-6xl sm:text-7xl md:text-8xl">
              {timeLeft.days.toString().padStart(2, '0')}
              <span className="block text-lg md:text-xl font-medium text-muted-foreground mt-2">
                Days
              </span>
            </div>
            <div className="text-6xl sm:text-7xl md:text-8xl">
              {timeLeft.hours.toString().padStart(2, '0')}
              <span className="block text-lg md:text-xl font-medium text-muted-foreground mt-2">
                Hours
              </span>
            </div>
            <div className="text-6xl sm:text-7xl md:text-8xl">
              {timeLeft.minutes.toString().padStart(2, '0')}
              <span className="block text-lg md:text-xl font-medium text-muted-foreground mt-2">
                Minutes
              </span>
            </div>
            <div className="text-6xl sm:text-7xl md:text-8xl">
              {timeLeft.seconds.toString().padStart(2, '0')}
              <span className="block text-lg md:text-xl font-medium text-muted-foreground mt-2">
                Seconds
              </span>
            </div>
          </div>

          {eventStatus === 'live' && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-6 bg-red-500/20 border border-red-500/40 rounded-full px-6 py-3 inline-block"
            >
              <span className="text-red-400 font-semibold">🚀 HackNova is LIVE! Join the action now!</span>
            </motion.div>
          )}
        </>
      )}

      {eventStatus === 'ended' && (
        <div className="mt-6 bg-gray-800/50 border border-gray-600/40 rounded-full px-8 py-4 inline-block">
          <span className="text-gray-400 text-lg">🏆 Thank you for being part of HackNova 2025!</span>
        </div>
      )}
    </motion.div>
  );
};

// Custom wrapper for preloader
const CustomPreloaderWrapper = ({ onComplete }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 10000);
    
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 w-screen h-screen bg-[#131314] z-[9999] overflow-hidden">
      <div className="relative w-full h-full">
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

  const [velocity, setVelocity] = useState(1);

  const handlePreloaderComplete = () => {
    setPreloaderState('transitioning');
    sessionStorage.setItem('hasSeenPreloader', 'true');
    
    setTimeout(() => {
      setPreloaderState('completed');
    }, 300);
  };

  useEffect(() => {
    let lastScrollY = window.scrollY;
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollDelta = Math.abs(currentScrollY - lastScrollY);
      const newVelocity = Math.min(scrollDelta * 0.1, 5);
      setVelocity(newVelocity || 1);
      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (preloaderState === 'loading') {
    return <CustomPreloaderWrapper onComplete={handlePreloaderComplete} />;
  }

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
            background: #000 url('https://i.imgur.com/YKY28eT.png') repeat top center;
          }

          .twinkling {
            background: transparent url('https://i.imgur.com/XYMF4ca.png') repeat top center;
            animation: move-twink-back 200s linear infinite;
          }

          .clouds {
            background: transparent url('https://i.imgur.com/mHbScrQ.png') repeat top center;
            animation: move-clouds-back 200s linear infinite;
          }

          .timeline-line {
            background: linear-gradient(to bottom, 
              transparent 0%, 
              #fbbf24 20%, 
              #fbbf24 80%, 
              transparent 100%);
          }
        `}
      </style>
      
      <div 
        className={`
          bg-transparent min-h-screen relative z-10
          ${preloaderState === 'transitioning' ? 'animate-[fadeInLanding_1.2s_ease-out_forwards] opacity-0' : 'opacity-100'}
        `}
      >
        {/* HERO SECTION with Stars Background */}
        <div id="hero-section" className="relative bg-transparent">
          <div className="stars-background absolute inset-0 w-full h-full -z-10 overflow-hidden pointer-events-none">
            <div className="absolute inset-0 w-full h-full stars-background"></div>
            <div className="twinkling absolute inset-0 w-full h-full z-10"></div>
          </div>
          
          <div className={preloaderState === 'completed' ? 'animate-[slideInFromTop_0.8s_ease-out]' : ''}>
            <Navbar />
          </div>
          
          <section className="relative mx-auto flex min-h-screen max-w-7xl flex-col items-center justify-center px-4 py-16 text-center md:px-6 lg:py-24">
            <motion.h1
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.8, 
                delay: preloaderState === 'completed' ? 0.3 : 0.05 
              }}
              className="text-balance text-3xl font-semibold leading-tight tracking-wider md:text-6xl lg:text-7xl mt-10 text-yellow-400 font-starjout"
            >
              The universe is calling
            </motion.h1>

            <motion.h2
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.8, 
                delay: preloaderState === 'completed' ? 0.4 : 0.1 
              }}
              className="text-balance text-xl font-medium leading-tight tracking-wide md:text-3xl lg:text-4xl mt-6 text-white font-starjout"
            >
              Chart your path in the Stellar HackNova
            </motion.h2>

            <motion.h3
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.8, 
                delay: preloaderState === 'completed' ? 0.5 : 0.15 
              }}
              className="text-balance text-lg font-normal leading-relaxed tracking-wide md:text-2xl lg:text-3xl mt-4 text-yellow-300 font-starjout"
            >
              Launch your ideas into orbit
            </motion.h3>

            <CountdownTimer />

            <div className="pointer-events-none absolute inset-x-0 bottom-0 mx-auto h-px w-48 bg-yellow-400/20" aria-hidden="true" />
          </section>
        </div>
        
        {/* ENHANCED ABOUT SECTION */}
        <div 
          id="about-section" 
          className="relative bg-gradient-to-b from-[#010101] to-[#0a0a0a] min-h-screen"
        >
          <section className="relative mx-auto max-w-7xl px-4 py-20 md:px-6">
            {/* About Header */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-20"
            >
              <h2 className="text-4xl md:text-6xl font-bold text-yellow-400 font-starjout mb-6 mt-16">
                About HackNova
              </h2>
              <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
                HackNova is a 48-hour intergalactic coding odyssey where brilliant minds unite to solve the universe's greatest challenges. 
                Powered by the force of innovation, collaboration, and stellar creativity.
              </p>
            </motion.div>

            {/* About Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20"
            >
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-yellow-400 font-starjout">500</div>
                <div className="text-gray-400 mt-2">Galactic Participants</div>
              </div>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-yellow-400 font-starjout">48</div>
                <div className="text-gray-400 mt-2">Hours of Creation</div>
              </div>
                <div className="text-center">
                  <div className="text-4xl md:text-5xl font-bold text-yellow-400 font-starjout">₹50k</div>
                  <div className="text-gray-400 mt-2">Prize Pool</div>
                </div>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-yellow-400 font-starjout">20</div>
                <div className="text-gray-400 mt-2">Jedi Mentors</div>
              </div>
            </motion.div>

            {/* Features Grid */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4 mb-16"
            >
              {items.map((item, i) => (
                <motion.article
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.6, delay: 0.6 + (i * 0.1) }}
                  className="group relative rounded-2xl border border-yellow-400/30 bg-gradient-to-b from-yellow-400/5 to-transparent p-8 hover:border-yellow-400/60 transition-all duration-300 hover:transform hover:scale-105"
                >
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-yellow-400/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <h3 className="relative text-2xl font-semibold text-yellow-400 mb-4 font-starjout">{item.title}</h3>
                  <p className="relative text-gray-300 leading-relaxed text-lg">{item.desc}</p>
                </motion.article>
              ))}
            </motion.div>

            {/* CTA Section */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, delay: 1.0 }}
              className="text-center"
            >
              <div className="flex flex-wrap items-center justify-center gap-6">
                <a href="/register">
                  <Button 
                    size="lg" 
                    className="px-12 py-6 text-xl bg-yellow-400 text-black hover:bg-yellow-300 font-bold rounded-full transform hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-yellow-400/40"
                  >
                    Join the Alliance
                  </Button>
                </a>
                <a href="#timeline">
                  <Button
                    size="lg"
                    variant="outline"
                    className="px-12 py-6 text-xl bg-transparent border-3 border-yellow-400 text-yellow-400 hover:bg-yellow-400/10 rounded-full transform hover:scale-105 transition-all duration-300"
                  >
                    View Timeline
                  </Button>
                </a>
              </div>
            </motion.div>
          </section>
        </div>

        {/* TIMELINE SECTION */}
        <div 
          id="timeline" 
          className="relative bg-gradient-to-b from-[#0a0a0a] to-[#131314] py-20"
        >
          <section className="relative mx-auto max-w-7xl px-4 md:px-6">
            {/* Timeline Header */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-20"
            >
              <h2 className="text-4xl md:text-6xl font-bold text-yellow-400 font-starjout mb-6">
                Mission Timeline
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Your 48-hour journey through the HackNova galaxy. Mark your calendars and prepare for an epic adventure!
              </p>
            </motion.div>

            {/* Timeline Content */}
            <div className="space-y-16">
              {timelineEvents.map((dayEvent, dayIndex) => (
                <motion.div
                  key={dayEvent.day}
                  initial={{ opacity: 0, x: dayIndex % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.8, delay: dayIndex * 0.2 }}
                  className="relative"
                >
                  {/* Day Header */}
                  <div className="flex items-center mb-8">
                    <div className="bg-yellow-400 text-black px-6 py-3 rounded-full font-bold text-xl font-starjout">
                      {dayEvent.day}
                    </div>
                    <div className="ml-4 text-gray-400 text-lg">{dayEvent.date}</div>
                  </div>

                  {/* Events Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {dayEvent.events.map((event, eventIndex) => (
                      <motion.div
                        key={eventIndex}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.5, delay: eventIndex * 0.1 }}
                        className="bg-gradient-to-br from-gray-900/50 to-black/30 border tracking-widest border-yellow-400/20 rounded-xl p-6 hover:border-yellow-400/40 transition-all duration-300 hover:transform hover:scale-105"
                      >
                        <div className="text-yellow-400 font-bold text-lg mb-2">{event.time}</div>
                        <div className="text-white font-semibold text-xl mb-3 font-starjout">{event.title}</div>
                        <div className="text-gray-300 text-sm leading-relaxed">{event.description}</div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Timeline CTA */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-center mt-20"
            >
              <h3 className="text-3xl font-bold text-yellow-400 font-starjout mb-6">
                Ready to Begin Your Mission?
              </h3>
              <p className="text-gray-300 text-xl mb-8 max-w-2xl mx-auto">
                Don't miss out on this galactic adventure. Secure your place in the HackNova alliance today!
              </p>
              <a href="/register">
                <Button 
                  size="lg" 
                  className="px-12 py-6 text-xl bg-yellow-400 text-black hover:bg-yellow-300 font-bold rounded-full transform hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-yellow-400/40"
                >
                  Register Now
                </Button>
              </a>
            </motion.div>
          </section>
        </div>
        
        <div className={`bg-[#131314] ${preloaderState === 'completed' ? 'animate-[fadeInLanding_1s_ease-out_1.5s_both]' : ''}`}>
          <Footer/>
        </div>
      </div>
    </>
  );
};

export default LandingPage;
