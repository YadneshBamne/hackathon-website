import React from 'react';
import Navbar from "@/components/navbar"; // Assuming you have a Navbar
import Footer from "@/components/footer"; // Assuming you have a Footer

// Data for the tracks. You can easily add more tracks here later.
const trackData = [
  {
    title: "Track 1: Celestial Innovations",
    description: "Forge new constellations of technology. This track is for groundbreaking ideas that push the boundaries of what's possible.",
    // You can add more properties like an icon or image later
  },
  {
    title: "Track 2: Galactic Guardians",
    description: "Build solutions that protect and serve our digital universe. Focus on cybersecurity, data privacy, and ethical tech.",
  },
];

const Tracks = () => {
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
      
      <div className="relative z-10 flex min-h-screen flex-col bg-transparent text-white">
        <Navbar />
        
        <main className="flex-grow min-h-screen">
          <div className="mx-auto max-w-7xl px-4 py-24 sm:py-32">
            <h1 className="mb-16 text-center font-starjout text-4xl font-bold text-yellow-400 md:text-5xl">
              Choose Your Mission Track
            </h1>
            
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              {trackData.map((track) => (
                <div 
                  key={track.title}
                  className="group transform rounded-xl border border-yellow-400/30 bg-black/50 p-8 backdrop-blur-sm transition-all duration-300 hover:-translate-y-2 hover:border-yellow-400/60 hover:shadow-2xl hover:shadow-yellow-400/10"
                >
                  <h2 className="mb-4 font-starjout text-2xl font-semibold text-yellow-300">
                    {track.title}
                  </h2>
                  <p className="text-gray-300 leading-relaxed">
                    {track.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </main>
        
        <Footer />
      </div>
    </>
  )
}

export default Tracks;
