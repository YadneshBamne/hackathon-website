import React from 'react';
import Navbar from "@/components/navbar"; // Assuming you have a Navbar
import Footer from "@/components/footer"; // Assuming you have a Footer

// Data for the rules, making it easier to manage
const rulesData = [
  {
    title: "Eligibility and Participation",
    points: [
      "Participation is strictly for Computer Engineering students only.",
      "Each team must consist of exactly 4 members.",
    ],
  },
  {
    title: "Event Mode and Attendance",
    points: [
      "The event will be conducted in Hybrid Mode.",
      "All team members must report to the college on time with the full team present.",
      "Any delay will lead to disqualification of the team.",
      "No excuses such as distance, traffic, or personal reasons will be accepted — so plan accordingly.",
    ],
  },
  {
    title: "Development Rules",
    points: [
      "All coding and development should start only after the official kickoff.",
      "Use of open-source libraries/APIs is allowed (must give credit).",
      "Plagiarism or submission of pre-built projects will lead to disqualification.",
    ],
  },
  {
    title: "Deliverables and Evaluation",
    points: [
      "Teams must submit their checkpoint deliverables at 6:30 AM sharp.",
      "Final presentation is mandatory for all shortlisted teams.",
      "Judges’ decisions will be final and binding.",
    ],
  },
  {
    title: "Code of Conduct",
    points: ["Teams must respect the mentors, judges, and organizers at all times."],
  },
];

const Rules = () => {
  return (
    <>
      <style>
        {`
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
      
      <div className="stars-background">
        <div className="stars"></div>
        <div className="twinkling"></div>
        <div className="clouds"></div>
      </div>
      
      <div className="relative z-10 min-h-screen bg-transparent text-white">
        <Navbar />
        <main className="mx-auto max-w-4xl px-4 py-24 sm:py-32">
          <h1 className="mb-12 text-center font-starjout text-4xl font-bold text-yellow-400 md:text-5xl">
            Rules and Guidelines
          </h1>
          
          <div className="space-y-10 rounded-lg border border-yellow-400/20 bg-black/50 p-6 backdrop-blur-sm sm:p-10">
            {rulesData.map((section) => (
              <section key={section.title}>
                <h2 className="mb-4 font-starjout text-2xl font-semibold text-yellow-300">
                  {section.title}
                </h2>
                <ul className="list-inside list-disc space-y-2 text-gray-300">
                  {section.points.map((point, index) => (
                    <li key={index} className="leading-relaxed">
                      {point}
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        </main>
        <Footer />
      </div>
    </>
  )
}

export default Rules;
