import React from 'react';
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Button } from '@/components/ui/button';
import { Download, FileText, Eye } from 'lucide-react'; // npm i lucide-react

const trackData = [
  {
    heading: "Problem Statement - 1",
    title: "Attendance Anomaly System",
    pdfUrl: "/PS1.pdf",
    downloadName: "Attendance-AnomalySystem.pdf",
  },
  {
    heading: "Problem Statement - 2",
    title: "Campus Access Control",
    pdfUrl: "/PS2.pdf",
    downloadName: "Campus-Access-Control.pdf",
  },
];

const Tracks = () => {
  return (
    <>
      {/* Respect reduced motion while keeping ambience [motion-safe variants] */}
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
          .stars-background { position: fixed; inset: 0; z-index: -1; overflow: hidden; pointer-events: none; }
          .stars, .twinkling, .clouds { position: absolute; inset: 0; width: 100%; height: 100%; }
          .stars { background: #000 url('https://i.imgur.com/YKY28eT.png') repeat top center; z-index: 0; }
          .twinkling { background: transparent url('https://i.imgur.com/XYMF4ca.png') repeat top center; z-index: 1; }
          .clouds { background: transparent url('https://i.imgur.com/mHbScrQ.png') repeat top center; z-index: 2; }
          @media (prefers-reduced-motion: no-preference) {
            .twinkling { animation: move-twink-back 200s linear infinite; }
            .clouds { animation: move-clouds-back 200s linear infinite; }
          }
        `}
      </style>

      <div className="stars-background">
        <div className="stars" />
        <div className="twinkling" />
        <div className="clouds" />
      </div>

      <div className="relative z-10 flex min-h-screen flex-col bg-transparent text-white">
        <Navbar />

        <main className="flex-grow min-h-screen">
          <div className="mx-auto max-w-7xl px-4 py-20 sm:py-24">
            <header className="mb-28 mt-10 text-center">
              <h1 className="mb-4 text-4xl font-bold text-yellow-400 md:text-5xl font-starjout">
                Choose Your Mission Track
              </h1>
              
            </header>

            <section
              className="grid grid-cols-1 gap-8 md:grid-cols-2"
              aria-label="Problem statement tracks"
            >
              {trackData.map((track) => (
                <article
                  key={track.title}
                  tabIndex={0}
                  className="
                    group relative rounded-2xl border border-yellow-400/20 bg-black/50 p-6
                    outline-none transition
                    hover:border-yellow-400/50 hover:shadow-2xl hover:shadow-yellow-400/10
                    focus-visible:border-yellow-400/70 focus-visible:ring-2 focus-visible:ring-yellow-400/40
                    motion-safe:transition-all motion-safe:duration-300 tracking wider
                  "
                >
                  {/* Badge + Icon header */}
                  <div className="mb-5 flex items-center gap-3">
                    <span className="inline-flex items-center gap-2 rounded-full border border-yellow-400/40 bg-yellow-400/10 px-3 py-1 text-xs uppercase tracking-wider text-yellow-300 ">
                      <FileText className="h-3.5 w-3.5" />
                      {track.heading}
                    </span>
                  </div>

                  <h2 className="mb-5 text-2xl font-semibold text-yellow-300 font-starjout">
                    {track.title}
                  </h2>

                  

                  {/* Actions */}
                  <div className="flex flex-wrap items-center gap-3">
                    {/* Primary: Download */}
                    <a href={track.pdfUrl} download={track.downloadName}>
                      <Button
                        className="
                          bg-yellow-400 text-black
                          hover:bg-black hover:text-yellow-400
                          border border-yellow-400
                          motion-safe:transition-all motion-safe:duration-200
                          motion-safe:hover:-translate-y-0.5
                          focus-visible:ring-2 focus-visible:ring-yellow-400/50 cursor-pointer font-starjout
                        "
                      >
                        <Download className="mr-2 h-4 w-4" />
                        Download PS
                      </Button>
                    </a>

                    {/* Secondary: View in new tab */}
                    <a
                      href={track.pdfUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="
                        inline-flex items-center rounded-md border border-yellow-400/40 px-3 py-2 text-sm text-yellow-300
                        hover:border-yellow-400/70 hover:bg-yellow-400/10
                        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400/40
                        motion-safe:transition-colors font-starjout
                      "
                      aria-label={`View ${track.title} PDF in a new tab`}
                    >
                      <Eye className="mr-2 h-4 w-4" />
                      view
                    </a>
                  </div>

                  {/* Subtle decorative gradient on hover */}
                  <div
                    className="
                      pointer-events-none absolute inset-0 rounded-2xl opacity-0
                      group-hover:opacity-100
                      motion-safe:transition-opacity
                      bg-gradient-to-br from-yellow-400/5 via-transparent to-transparent
                    "
                    aria-hidden="true"
                  />
                </article>
              ))}
            </section>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Tracks;
