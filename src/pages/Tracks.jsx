import React from 'react'

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
      
      {/* You can add the rest of your track-specific content here */}
      <div 
        style={{
          backgroundColor: 'transparent',
          minHeight: '100vh',
          position: 'relative',
          zIndex: 10,
          color: 'white',
          textAlign: 'center',
          paddingTop: '10rem'
        }}
      >
        <h1 className="text-4xl font-bold">Tracks Page</h1>
        <p className="mt-4">This page now has the starfield background.</p>
      </div>
    </>
  )
}

export default Tracks
