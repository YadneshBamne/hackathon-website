import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import CombinedSpaceAnimation from "@/components/preloader";

// --- Data for Page Sections ---
const items = [
  {
    title: "18 Hours",
    desc: "Two focused days to ideate, build, and demo your project.",
  },
  {
    title: "Mentor Support",
    desc: "Guidance from industry mentors throughout the event.",
  },
  {
    title: "Team",
    desc: "Code. Compete. Win. Together.",
  },
  {
    title: "Prizes",
    desc: "Win recognition, prizes, and exclusive event swag.",
  },
];

const timelineEvents = [
  {
    day: "Friday",
    date: "October 3, 2025",
    events: [
      {
        
        time: "7:00 PM",
        title: "Problem Statement Reveal",
        description:
          "The problem statements are live! Dive in, brainstorm with your team, and start shaping your ideas.",
      },
      // {
        
      //   time: "7:00 PM - 8:00 PM",
      //   title: "Doubt Session",
      //   description:
      //     "If you have any doubts you can contact the core team members through the gmeet link which will be circulated in the team leaders group",
      // },
      {
        time: "8:00 PM- 9:00 PM",
        title: "uploading selected PS",
        description:
          "All teams must submit a form with their idea brief and public GitHub repository along with your G-meet link.",
      },
      {
        time: "9:00 PM",
        title: "MENToRSHiP SESSioN (oNLiNE)",
        description:
          "Mentors will be available to guide teams. Each team will get 15 minutes with their mentor to seek guidance.",
      },
      // {
      //   time: "9:00 PM Onwards",
      //   title: "Mentorship Session (online)",
      //   description:
      //     "From evening onwards, mentors will be available to guide teams. Each team will get 15 minutes with their mentor to seek guidance.",
      // },
    ],
  },
  {
    day: "Saturday",
    date: "October 4, 2025",
    events: [
      {
        time: "6:00 AM",
        title: "First Evaluation (Checkpoint) - online",
        description:
          "Teams must submit their code repo and a short ppt. Evaluators will evaluate each team.",
      },
      {
        time: "8:30 AM",
        title: "Shortlisted team announcement",
        description: "Shortlisted teams must report to college before 10 AM with all members present - late arrival leads to disqualification.",
      },
      {
        time: "10:00 AM - 01:00 PM",
        title: "",
        description: "Shortlisted teams will wait in respective labs and continue working on their projects. ",
      },
      {
        time: "1:00 PM",
        title: "Final Evaluation (offline in College)",
        description:
          "Each team presents their project with final ppt and prototype. A judging panel evaluates based on criteria.",
      },
      {
        time: "3:00 PM",
        title: "Closing Ceremony",
        description: "Winners are announced and certificates are distributed.",
      },
    ],
  },
];

// --- Modal Poster Component ---
const PosterModal = ({ isOpen, onClose }) => {
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    // <AnimatePresence>
    //   {isOpen && (
    //     <motion.div
    //       initial={{ opacity: 0 }}
    //       animate={{ opacity: 1 }}
    //       exit={{ opacity: 0 }}
    //       transition={{ duration: 0.3 }}
    //       className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
    //       onClick={handleBackdropClick}
    //     >
         
    //       <div className="absolute inset-0 bg-black/80 backdrop-blur-sm">
    //         <div className="absolute inset-0 bg-gradient-radial from-yellow-400/20 via-transparent to-transparent animate-pulse" />
    //       </div>

          
    //       <motion.div
    //         initial={{ scale: 0.8, opacity: 0 }}
    //         animate={{ scale: 1, opacity: 1 }}
    //         exit={{ scale: 0.8, opacity: 0 }}
    //         transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
    //         className="relative bg-[#131314] rounded-2xl p-4 max-w-4xl max-h-[90vh] shadow-2xl border border-yellow-400/30"
    //         style={{
    //           boxShadow:
    //             "0 0 50px rgba(250, 204, 21, 0.3), 0 0 100px rgba(250, 204, 21, 0.2), 0 0 150px rgba(250, 204, 21, 0.1)",
    //         }}
    //       >
            
    //         <button
    //           onClick={onClose}
    //           className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center bg-red-500/20 hover:bg-red-500/30 border border-red-400/50 rounded-full transition-all duration-200 group"
    //         >
    //           <svg
    //             className="w-5 h-5 text-red-400 group-hover:text-red-300"
    //             fill="none"
    //             strokeLinecap="round"
    //             strokeLinejoin="round"
    //             strokeWidth={2}
    //             viewBox="0 0 24 24"
    //             stroke="currentColor"
    //           >
    //             <path d="M6 18L18 6M6 6l12 12" />
    //           </svg>
    //         </button>

            
    //         <motion.img
    //           initial={{ scale: 0.9 }}
    //           animate={{ scale: 1 }}
    //           transition={{ duration: 0.5, delay: 0.2 }}
    //           src="/poster.png"
    //           alt="HackNova Event Poster"
    //           className="w-full h-full object-contain rounded-xl max-h-[80vh]"
    //         />
    //       </motion.div>
    //     </motion.div>
    //   )}
    // </AnimatePresence>
    <></>
  );
};

// --- Reusable Countdown Timer Component ---
const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [eventStatus, setEventStatus] = useState("upcoming");

  useEffect(() => {
    const hackathonStartDate = new Date("2025-10-03T19:00:00+05:30").getTime();
    const hackathonEndDate = new Date("2025-10-04T17:00:00+05:30").getTime();

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distanceToStart = hackathonStartDate - now;
      const distanceToEnd = hackathonEndDate - now;

      if (distanceToStart > 0) {
        setEventStatus("upcoming");
        setTimeLeft({
          days: Math.floor(distanceToStart / (1000 * 60 * 60 * 24)),
          hours: Math.floor(
            (distanceToStart % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
          ),
          minutes: Math.floor(
            (distanceToStart % (1000 * 60 * 60)) / (1000 * 60)
          ),
          seconds: Math.floor((distanceToStart % (1000 * 60)) / 1000),
        });
      } else if (distanceToEnd > 0) {
        setEventStatus("live");
        setTimeLeft({
          days: Math.floor(distanceToEnd / (1000 * 60 * 60 * 24)),
          hours: Math.floor(
            (distanceToEnd % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
          ),
          minutes: Math.floor((distanceToEnd % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distanceToEnd % (1000 * 60)) / 1000),
        });
      } else {
        setEventStatus("ended");
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const TimerDigit = ({ value }) => (
    <AnimatePresence mode="wait">
      <motion.span
        key={value}
        initial={{ y: -30, opacity: 0, rotateX: 90 }}
        animate={{ y: 0, opacity: 1, rotateX: 0 }}
        exit={{ y: 30, opacity: 0, rotateX: -90 }}
        transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
        className="inline-block"
        style={{ transformStyle: "preserve-3d" }}
      >
        {value}
      </motion.span>
    </AnimatePresence>
  );

  const getTimerTitle = () =>
    ({
      upcoming: "Event Starts in:",
      live: "🔴 LIVE - Event Ends In:",
      ended: "Event Has Ended",
    }[eventStatus] || "Event Starts In:");

  const getTimerColor = () =>
    ({
      upcoming: "text-yellow-400 font-starjedi tracking-wider",
      live: "text-red-400 animate-pulse",
      ended: "text-gray-400",
    }[eventStatus] || "text-yellow-400");

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
      {eventStatus !== "ended" && (
        <div
          className={`flex justify-center space-x-4 sm:space-x-6 md:space-x-8 lg:space-x-12 ${getTimerColor()} font-tanker`}
        >
          {["days", "hours", "minutes", "seconds"].map((unit, i) => (
            <motion.div
              key={unit}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: i * 0.2 }}
              className="flex flex-col items-center"
            >
              <div className="flex text-6xl sm:text-7xl md:text-8xl tracking-wider">
                {timeLeft[unit]
                  .toString()
                  .padStart(2, "0")
                  .split("")
                  .map((digit, index) => (
                    <TimerDigit key={index} value={digit} />
                  ))}
              </div>
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 + i * 0.2 }}
                className="block text-lg md:text-xl font-medium text-muted-foreground mt-2 capitalize"
              >
                {unit}
              </motion.span>
            </motion.div>
          ))}
        </div>
      )}
      {eventStatus === "ended" && (
        <div className="mt-6 bg-gray-800/50 border border-gray-600/40 rounded-full px-8 py-4 inline-block">
          <span className="text-gray-400 text-lg">
            🏆 Thank you for being part of HackNova 2025!
          </span>
        </div>
      )}
    </motion.div>
  );
};

// --- Custom Preloader Wrapper ---
const CustomPreloaderWrapper = ({ onComplete }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 9500);
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

// --- Main Landing Page Component ---
const LandingPage = () => {
  const [pageState, setPageState] = useState(() => {
    return sessionStorage.getItem("hasSeenIntro") ? "completed" : "loading";
  });

  const [showPosterModal, setShowPosterModal] = useState(false);

  useEffect(() => {
    if (pageState === "loading") {
      const preloaderTimer = setTimeout(() => {
        setPageState("completed");
        sessionStorage.setItem("hasSeenIntro", "true");
        // Show poster modal after page is loaded
        setTimeout(() => setShowPosterModal(true), 1000);
      }, 9500);
      return () => clearTimeout(preloaderTimer);
    }
  }, [pageState]);

  const handleClosePosterModal = () => {
    setShowPosterModal(false);
  };

  return (
    <>
      <AnimatePresence>
        {pageState === "loading" && (
          <CustomPreloaderWrapper onComplete={() => {}} />
        )}
      </AnimatePresence>

      <style>{`
        @keyframes fadeInLanding { from { opacity: 0; transform: scale(0.98) translateY(20px); filter: blur(1px); } to { opacity: 1; transform: scale(1) translateY(0); filter: blur(0px); } }
        @keyframes slideInFromTop { from { opacity: 0; transform: translateY(-30px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes move-twink-back { from { background-position: 0 0; } to { background-position: -10000px 5000px; } }
        .stars-background { background: #000 url('https://i.imgur.com/YKY28eT.png') repeat top center; }
        .twinkling { background: transparent url('https://i.imgur.com/XYMF4ca.png') repeat top center; animation: move-twink-back 200s linear infinite; }
        .bg-gradient-radial { background: radial-gradient(circle, var(--tw-gradient-stops)); }
      `}</style>

      <div
        className={`bg-transparent min-h-screen relative z-10 ${
          pageState === "completed"
            ? "animate-[fadeInLanding_1.2s_ease-out_forwards]"
            : "opacity-0"
        }`}
      >
        <div id="hero-section" className="relative bg-transparent">
          <div className="stars-background absolute inset-0 w-full h-full -z-10 overflow-hidden pointer-events-none">
            <div className="twinkling absolute inset-0 w-full h-full z-10"></div>
          </div>
          <div
            className={
              pageState === "completed"
                ? "animate-[slideInFromTop_0.8s_ease-out]"
                : ""
            }
          >
            <Navbar />
          </div>
          <section className="relative mx-auto flex min-h-screen max-w-7xl flex-col items-center justify-center px-4 py-16 text-center md:px-6 lg:py-24">
            <motion.h1
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-balance text-3xl font-semibold leading-tight tracking-wider md:text-6xl lg:text-7xl mt-10 text-yellow-400 font-starjout"
            >
              The universe is calling
            </motion.h1>
            <motion.h2
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl leading-tight tracking-wider md:text-3xl lg:text-4xl mt-8 mb-6 text-white font-starjout relative"
            >
              <span className="mb-10">Chart your path in the Stellar </span>
              <br />
              <div className="relative inline-block">
                <div className="absolute inset-0 flex items-center justify-center w-full h-full mt-3">
                  <div
                    className="absolute h-1 z-[-1]"
                    style={{
                      width: "99vw",
                      left: "50%",
                      transform: "translateX(-50%)",
                      background:
                        "linear-gradient(90deg, transparent 0%, rgba(220, 38, 38, 0.1) 20%, rgba(220, 38, 38, 0.8) 50%, rgba(220, 38, 38, 0.1) 80%, transparent 100%)",
                      boxShadow:
                        "0 0 8px rgba(220, 38, 38, 0.9), 0 0 16px rgba(220, 38, 38, 0.7), 0 0 32px rgba(220, 38, 38, 0.5), 0 0 64px rgba(220, 38, 38, 0.3)",
                    }}
                  />
                  <div
                    className="absolute h-2 w-full z-[-1]"
                    style={{
                      background:
                        "linear-gradient(90deg, transparent 0%, rgba(220, 38, 38, 1) 50%, transparent 100%)",
                      boxShadow:
                        "0 0 8px rgba(220, 38, 38, 1), 0 0 16px rgba(220, 38, 38, 0.9), 0 0 32px rgba(220, 38, 38, 0.7), 0 0 64px rgba(220, 38, 38, 0.5), 0 0 128px rgba(220, 38, 38, 0.3)",
                      filter: "blur(20px)",
                    }}
                  />
                </div>
                <span className="starwars-outline text-5xl sm:text-6xl md:text-7xl lg:text-[8rem] font-starjout tracking-[0.08em] relative z-10">
                  HacknovA
                </span>
              </div>
            </motion.h2>
            <motion.h3
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-balance text-lg font-normal leading-relaxed tracking-wide md:text-2xl lg:text-3xl mt-4 text-white font-starjout"
            >
              Launch your ideas into orbit
            </motion.h3>
            <CountdownTimer />
          </section>
        </div>

        <div
          id="about-section"
          className="relative bg-gradient-to-b from-[#010101] to-[#0a0a0a] min-h-screen"
        >
          <section className="relative mx-auto max-w-7xl px-4 py-20 md:px-6">
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
              <p className="text-white mb-6 font-starjout text-xl tracking-widest   ">CSA x GDG x Coder's Club</p>
              <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
                HackNova is a 18-hour intergalactic coding odyssey where
                brilliant minds unite to solve the universe's greatest
                
                challenges. Powered by the force of innovation, collaboration,
                and stellar creativity.
              </p>
            </motion.div>
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
                  transition={{ duration: 0.6, delay: 0.6 + i * 0.1 }}
                  className="group relative rounded-2xl border border-yellow-400/30 bg-gradient-to-b from-yellow-400/5 to-transparent p-8 hover:border-yellow-400/60 transition-all duration-300 hover:transform hover:scale-105"
                >
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-yellow-400/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <h3 className="relative text-2xl font-semibold text-yellow-400 mb-4 font-starjout">
                    {item.title}
                  </h3>
                  <p className="relative text-gray-300 leading-relaxed text-lg">
                    {item.desc}
                  </p>
                </motion.article>
              ))}
            </motion.div>
          </section>
        </div>

        <div
          id="timeline"
          className="relative bg-gradient-to-b from-[#0a0a0a] to-[#131314] py-20"
        >
          <section className="relative mx-auto max-w-7xl px-4 md:px-6">
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
                Your 18-hour journey through the HackNova galaxy. Mark your
                calendars and prepare for an epic adventure!
              </p>
            </motion.div>
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
                  <div className="flex items-center mb-8">
                    <div className="bg-yellow-400 text-black px-6 py-3 rounded-full font-bold text-xl font-starjout">
                      {dayEvent.day}
                    </div>
                    <div className="ml-4 text-gray-400 text-lg">
                      {dayEvent.date}
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {dayEvent.events.map((event, eventIndex) => (
                      <motion.div
                        key={eventIndex}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.5, delay: eventIndex * 0.1 }}
                        className="bg-gradient-to-br from-gray-900/50 to-black/30 border tracking-widest border-yellow-400/20 rounded-xl p-6 hover:border-yellow-400/40 transition-all duration-300 hover:transform hover:scale-105"
                      >
                        <div className="text-yellow-400 font-bold text-lg mb-2">
                          {event.time}
                        </div>
                        <div className="text-white font-semibold text-xl mb-3 font-starjout">
                          {event.title}
                        </div>
                        <div className="text-gray-300 text-sm leading-relaxed">
                          {event.description}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
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
                Don't miss out on this galactic adventure. Secure your place in
                the HackNova alliance today!
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

        <div
          className={`bg-[#131314] ${
            pageState === "completed"
              ? "animate-[fadeInLanding_1s_ease-out_1.5s_both]"
              : ""
          }`}
        >
          <Footer />
        </div>
      </div>

      {/* Poster Modal */}
      <PosterModal isOpen={showPosterModal} onClose={handleClosePosterModal} />
    </>
  );
};

export default LandingPage;
