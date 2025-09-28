import React from 'react';

const StarFieldBackground = () => {
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
        `}
      </style>
      
      <div className="fixed inset-0 w-full h-full overflow-hidden pointer-events-none" style={{ zIndex: -1 }}>
        {/* Stars layer */}
        <div 
          className="absolute inset-0 w-full h-full"
          style={{
            zIndex: 0,
            background: '#000 url("https://i.imgur.com/YKY28eT.png") repeat top center',
          }}
        />
        
        {/* Twinkling layer */}
        <div 
          className="absolute inset-0 w-full h-full"
          style={{
            zIndex: 1,
            background: 'transparent url("https://i.imgur.com/XYMF4ca.png") repeat top center',
            animation: 'move-twink-back 200s linear infinite',
          }}
        />
        
        {/* Clouds layer */}
        <div 
          className="absolute inset-0 w-full h-full"
          style={{
            zIndex: 2,
            background: 'transparent url("https://i.imgur.com/mHbScrQ.png") repeat top center',
            animation: 'move-clouds-back 200s linear infinite',
          }}
        />
      </div>
    </>
  );
};

export default StarFieldBackground;
