import React, { useEffect } from 'react';

const CompleteStarWarsPreloader = ({ onComplete, duration = 19000 }) => {
  
  useEffect(() => {
    if (onComplete) {
      const timer = setTimeout(() => {
        onComplete();
      }, duration);
      
      return () => clearTimeout(timer);
    }
  }, [onComplete, duration]);

  // Generate 144 stars with random properties
  const generateStars = () => {
    const stars = [];
    for (let i = 1; i <= 144; i++) {
      const d = i * 2.5;
      const r = Math.random() * 0.02;
      const p = Math.random() * 60 + 40;
      const height = 6 + Math.random() * 1.5;
      const randomHide = Math.random() > 0.75; // 25% chance to hide
      
      stars.push(
        <div
          key={i}
          className="star"
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            zIndex: 9,
            width: '2px',
            height: `${height}vh`,
            border: `1px solid rgba(0, 0, 255, ${Math.random() * 0.1 + 0.3})`,
            borderRadius: '50%',
            backgroundColor: 'white',
            filter: 'blur(0.1px)',
            transformOrigin: 'top center',
            transform: `rotate(${d}deg) perspective(10vh) rotateX(15deg) translateY(${30 + Math.random() * 5}vh)`,
            animation: `star-blur-${i} 19s ease-in-out infinite`,
            display: randomHide ? 'none' : 'block'
          }}
        />
      );
    }
    return stars;
  };

  return (
    <>
      <style>
        {`
          /* Generate keyframes for all 144 stars */
          ${Array.from({ length: 144 }, (_, i) => {
            const index = i + 1;
            const d = index * 2.5;
            const p = Math.random() * 60 + 40;
            return `
              @keyframes star-blur-${index} {
                0% { transform: rotate(${d}deg) perspective(3vh) rotateX(15deg) translateY(0) scaleY(0.1); }
                12% { transform: rotate(${d}deg) perspective(3vh) rotateX(15deg) translateY(${p}vh) scaleY(1); }
                44% { transform: rotate(${d}deg) perspective(3vh) rotateX(15deg) translateY(7vh) scaleY(1); }
                46% { transform: rotate(${d}deg) perspective(2vh) rotateX(15deg) translateY(0.5vh) scaleY(1); }
                55% { transform: rotate(${d}deg) perspective(2vh) rotateX(15deg) translateY(${p}vh) scaleY(0.7); }
                100% { transform: rotate(${d}deg) perspective(2vh) rotateX(15deg) translateY(7vh) scaleY(1); }
              }
            `;
          }).join('')}

          /* All animation keyframes */
          @keyframes bb-swivel {
            0% { background-position: 40% center; }
            3% { background-position: 40% center; }
            5% { background-position: 58% center; }
            8% { background-position: 58% center; }
            10% { background-position: 58% center; }
            12% { background-position: 40% center; }
            15% { background-position: 60% center; }
            25% { background-position: 60% center; }
            35% { background-position: 10% center; }
            39% { background-position: 10% center; }
            40% { background-position: 60% center; }
            52% { background-position: 37% center; }
            53% { background-position: 63% center; }
            54% { background-position: 39% center; }
            55% { background-position: 60% center; }
            56% { background-position: 36% center; }
            57% { background-position: 62% center; }
            66% { background-position: 62% center; }
            67% { background-position: 45% center; }
            70% { background-position: 45% center; }
            75% { background-position: 100% center; }
            100% { background-position: 100% center; }
          }

          @keyframes flicker {
            0% { transform: scale(1); }
            20% { transform: scale(1.07); }
            30% { transform: scale(0.94); }
            50% { transform: scale(1.05); }
            70% { transform: scale(0.95); }
            85% { transform: scale(1.05); }
            100% { transform: scale(1); }
          }

          @keyframes thrusters {
            0% { transform: scale(2.25); }
            15% { transform: scale(0.8); }
            30% { transform: scale(2.25); }
            44% { transform: scale(0.95); }
            52% { transform: scale(1.75); }
            54% { transform: scale(0.9); }
            62% { transform: scale(2.5); }
            100% { transform: scale(0.8); }
          }

          @keyframes flightplan {
            0% {
              transform: translate(-45%, 50%) rotate(20deg) scale(3);
              opacity: 0;
            }
            2% { opacity: 1; }
            15% {
              transform: translate(-25%, -10%) rotate(-40deg) scale(0.5);
            }
            30% {
              transform: translate(-70%, 0%) rotate(28deg) scale(1);
            }
            47% {
              transform: translate(-20%, -20%) rotate(-25deg) scale(0.75);
            }
            53% {
              transform: translate(-8%, -17%) rotate(-28deg) scale(1.11);
            }
            90% {
              transform: translate(-80%, -50%) rotate(25deg) scale(0);
            }
            100% {
              transform: translate(-80%, -50%) rotate(25deg) scale(0);
            }
          }

          @keyframes rotate {
            0% { background-position: 0px; }
            100% { background-position: 602px; }
          }

          @keyframes planet-zoom {
            0% { transform: scale(0.01) translateY(0px); opacity: 0; }
            50% { transform: scale(0.2) translateY(0px); opacity: 0; }
            51% { opacity: 1; }
            52% { transform: scale(0.8) translateY(0px); }
            100% { transform: scale(1) translateY(0px); }
          }

          @keyframes space-zoom {
            0% { opacity: 0; }
            4% { opacity: 0; }
            5% { opacity: 1; }
            11% { opacity: 1; }
            12% { opacity: 0; }
            47% { opacity: 0; }
            48% { opacity: 1; }
            49% { opacity: 1; }
            53% { opacity: 0; }
            100% { opacity: 0; }
          }

          @keyframes move {
            0% { transform: translateZ(-500px) rotate(0deg); }
            100% { transform: translateZ(500px) rotate(0deg); }
          }

          @keyframes fade {
            0% { opacity: 0; }
            25% { opacity: 1; }
            75% { opacity: 1; }
            100% { opacity: 0; }
          }

          @keyframes hyperRotate {
            0% { transform: rotateZ(0deg); }
            100% { transform: rotateZ(360deg); }
          }

          @keyframes exitHyperspace {
            0% { opacity: 0; transform: translateY(50vh) scale(0.25); }
            7% { opacity: 0; transform: translateY(50vh) scale(0.25); }
            10% { opacity: 1; transform: translateY(50vh) scale(3); }
            47% { opacity: 1; transform: translateY(50vh) scale(3); }
            48% { opacity: 0; transform: translateY(50vh) scale(0.25); }
            100% { transform: translateY(50vh) scale(0.25); }
          }

          /* Warp transition effect */
          @keyframes warpTransition {
            0% {
              transform: scale(1) rotateZ(0deg);
              opacity: 1;
              filter: blur(0px);
            }
            50% {
              transform: scale(10) rotateZ(180deg);
              opacity: 0.8;
              filter: blur(2px);
            }
            100% {
              transform: scale(50) rotateZ(360deg);
              opacity: 0;
              filter: blur(10px);
            }
          }

          .warp-exit {
            animation: warpTransition 1s ease-out forwards;
          }
        `}
      </style>
      
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: '#131314',
        textAlign: 'center',
        overflow: 'hidden',
        opacity: 1,
        zIndex: 9999
      }}>
        
        {/* Stars Background */}
        <div 
          className="space"
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundPosition: '50% 50%',
            animation: 'space-zoom 19s 1 ease',
            opacity: 0
          }}
        >
          <div className="stars-inner">
            {generateStars()}
          </div>
        </div>

        {/* Hyperspace Effect */}
        <div 
          className="hyperspace"
          style={{
            width: '100%',
            height: '100%',
            position: 'absolute',
            transformOrigin: '50% 50%',
            animation: 'hyperRotate 25s infinite linear'
          }}
        >
          <div 
            className="scene"
            style={{
              display: 'inline-block',
              verticalAlign: 'middle',
              perspective: '5px',
              perspectiveOrigin: '50% 50%',
              position: 'relative',
              animation: 'exitHyperspace 19s ease',
              opacity: 0
            }}
          >
            {/* Hyperspace tunnel walls - first set */}
            <div 
              className="wrap"
              style={{
                position: 'absolute',
                width: '1000px',
                height: '1000px',
                left: '-500px',
                top: '-500px',
                transformStyle: 'preserve-3d',
                animation: 'move 12s infinite linear',
                animationFillMode: 'forwards'
              }}
            >
              <div className="wall wall-right" style={{
                width: '100%',
                height: '100%',
                position: 'absolute',
                opacity: 0,
                animation: 'fade 12s infinite linear',
                background: 'url("https://c0.wallpaperflare.com/preview/557/288/926/shooting-monochrome-space-background-starry-sky.jpg")',
                backgroundSize: 'cover',
                transform: 'rotateY(90deg) translateZ(500px)'
              }} />
              <div className="wall wall-left" style={{
                width: '100%',
                height: '100%',
                position: 'absolute',
                opacity: 0,
                animation: 'fade 12s infinite linear',
                background: 'url("https://c0.wallpaperflare.com/preview/557/288/926/shooting-monochrome-space-background-starry-sky.jpg")',
                backgroundSize: 'cover',
                transform: 'rotateY(-90deg) translateZ(500px)'
              }} />
              <div className="wall wall-top" style={{
                width: '100%',
                height: '100%',
                position: 'absolute',
                opacity: 0,
                animation: 'fade 12s infinite linear',
                background: 'url("https://c0.wallpaperflare.com/preview/557/288/926/shooting-monochrome-space-background-starry-sky.jpg")',
                backgroundSize: 'cover',
                transform: 'rotateX(90deg) translateZ(500px)'
              }} />
              <div className="wall wall-bottom" style={{
                width: '100%',
                height: '100%',
                position: 'absolute',
                opacity: 0,
                animation: 'fade 12s infinite linear',
                background: 'url("https://c0.wallpaperflare.com/preview/557/288/926/shooting-monochrome-space-background-starry-sky.jpg")',
                backgroundSize: 'cover',
                transform: 'rotateX(-90deg) translateZ(500px)'
              }} />
              <div className="wall wall-back" style={{
                width: '100%',
                height: '100%',
                position: 'absolute',
                opacity: 0,
                animation: 'fade 12s infinite linear',
                background: 'url("https://c0.wallpaperflare.com/preview/557/288/926/shooting-monochrome-space-background-starry-sky.jpg")',
                backgroundSize: 'cover',
                transform: 'rotateX(180deg) translateZ(500px)'
              }} />
            </div>
            
            {/* Hyperspace tunnel walls - second set */}
            <div 
              className="wrap"
              style={{
                position: 'absolute',
                width: '1000px',
                height: '1000px',
                left: '-500px',
                top: '-500px',
                transformStyle: 'preserve-3d',
                animation: 'move 12s infinite linear',
                animationDelay: '6s',
                animationFillMode: 'forwards'
              }}
            >
              <div className="wall wall-right" style={{
                width: '100%',
                height: '100%',
                position: 'absolute',
                opacity: 0,
                animation: 'fade 12s infinite linear',
                animationDelay: '6s',
                background: 'url("https://c0.wallpaperflare.com/preview/557/288/926/shooting-monochrome-space-background-starry-sky.jpg")',
                backgroundSize: 'cover',
                transform: 'rotateY(90deg) translateZ(500px)'
              }} />
              <div className="wall wall-left" style={{
                width: '100%',
                height: '100%',
                position: 'absolute',
                opacity: 0,
                animation: 'fade 12s infinite linear',
                animationDelay: '6s',
                background: 'url("https://c0.wallpaperflare.com/preview/557/288/926/shooting-monochrome-space-background-starry-sky.jpg")',
                backgroundSize: 'cover',
                transform: 'rotateY(-90deg) translateZ(500px)'
              }} />
              <div className="wall wall-top" style={{
                width: '100%',
                height: '100%',
                position: 'absolute',
                opacity: 0,
                animation: 'fade 12s infinite linear',
                animationDelay: '6s',
                background: 'url("https://c0.wallpaperflare.com/preview/557/288/926/shooting-monochrome-space-background-starry-sky.jpg")',
                backgroundSize: 'cover',
                transform: 'rotateX(90deg) translateZ(500px)'
              }} />
              <div className="wall wall-bottom" style={{
                width: '100%',
                height: '100%',
                position: 'absolute',
                opacity: 0,
                animation: 'fade 12s infinite linear',
                animationDelay: '6s',
                background: 'url("https://c0.wallpaperflare.com/preview/557/288/926/shooting-monochrome-space-background-starry-sky.jpg")',
                backgroundSize: 'cover',
                transform: 'rotateX(-90deg) translateZ(500px)'
              }} />
              <div className="wall wall-back" style={{
                width: '100%',
                height: '100%',
                position: 'absolute',
                opacity: 0,
                animation: 'fade 12s infinite linear',
                animationDelay: '6s',
                background: 'url("https://c0.wallpaperflare.com/preview/557/288/926/shooting-monochrome-space-background-starry-sky.jpg")',
                backgroundSize: 'cover',
                transform: 'rotateX(180deg) translateZ(500px)'
              }} />
            </div>
          </div>
        </div>

        {/* Planet and X-Wing */}
        <div 
          className="subspace"
          style={{
            zIndex: 500,
            width: '300px',
            height: '300px',
            position: 'absolute',
            marginTop: '-150px',
            top: '50%',
            marginLeft: '-150px',
            left: '50%'
          }}
        >
          {/* Planet */}
          <div 
            className="hosnian-prime"
            style={{
              position: 'absolute',
              top: '50%',
              left: 0,
              right: 0,
              margin: '-35vh auto 0',
              zIndex: 8,
              backgroundImage: 'url("https://s3-us-west-2.amazonaws.com/s.cdpn.io/436243/hosnian.jpg")',
              width: '75vh',
              maxWidth: '368px',
              height: '75vh',
              maxHeight: '368px',
              boxShadow: `
                inset 175px 0 80px 3px rgba(0,0,0,0.6),
                inset 75px 0 80px 3px rgba(0,0,0,0.2),
                inset -2px 0 50px 15px rgba(255,255,255,0.5),
                inset -2px 0 15px 2px rgba(255,255,255,1),
                0 0 55px 10px rgba(0, 0, 255, 0.45),
                3px 0 10px 2px rgba(0, 0, 255, 0.75),
                -3px 0 10px 2px rgba(0, 0, 255, 0.75)
              `,
              backgroundSize: '602px',
              borderRadius: '50%',
              transform: 'scale(1) translateY(0px)',
              animation: 'rotate 80s linear infinite, planet-zoom 19s ease-out 1'
            }}
          />
          
          {/* X-Wing */}
          <div 
            className="x-wing"
            style={{
              opacity: 1,
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%) rotate(0deg) scale(0)',
              zIndex: 9999,
              height: '41vh',
              width: '80vh',
              maxHeight: '205px',
              maxWidth: '400px',
              backgroundSize: 'cover',
              backgroundImage: 'url("https://s3-us-west-2.amazonaws.com/s.cdpn.io/436243/x-wing.png")',
              animation: 'flightplan 19s ease-in-out 1'
            }}
          >
            {/* BB Unit
            <div 
              className="bb-unit"
              style={{
                position: 'absolute',
                height: '2.15vh',
                width: '2.5vh',
                maxHeight: '11px',
                maxWidth: '13px',
                boxShadow: 'inset 0 0 1px 1px rgba(0,0,0,0.5)',
                backgroundImage: 'url("https://s3-us-west-2.amazonaws.com/s.cdpn.io/436243/bb-face.jpg")',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                borderRadius: '60% 60% 45% 45%',
                top: '32.25%',
                left: '48.25%',
                transform: 'rotate(-1deg)',
                animation: 'bb-swivel 19s ease-out 1'
              }}
            /> */}
            
            {/* Thrusters */}
            <div 
              className="thruster-flicker"
              style={{
                opacity: 0.5,
                width: '100%',
                height: '100%',
                animation: 'flicker 0.025s linear infinite'
              }}
            >
              <div className="thruster t1" style={{
                position: 'absolute',
                borderRadius: '50%',
                height: '2.8vh',
                width: '2.8vh',
                maxHeight: '13px',
                maxWidth: '13px',
                backgroundColor: 'white',
                boxShadow: '0 0 8px 3px red',
                animation: 'thrusters 19s ease-out 1',
                top: '42%',
                left: '35%'
              }} />
              <div className="thruster t2" style={{
                position: 'absolute',
                borderRadius: '50%',
                height: '2.8vh',
                width: '2.8vh',
                maxHeight: '13px',
                maxWidth: '13px',
                backgroundColor: 'white',
                boxShadow: '0 0 8px 3px red',
                animation: 'thrusters 19s ease-out 1',
                top: '41.5%',
                left: '64.5%'
              }} />
              <div className="thruster t3" style={{
                position: 'absolute',
                borderRadius: '50%',
                height: '2.8vh',
                width: '2.8vh',
                maxHeight: '13px',
                maxWidth: '13px',
                backgroundColor: 'white',
                boxShadow: '0 0 8px 3px red',
                animation: 'thrusters 19s ease-out 1',
                top: '80.5%',
                left: '63%'
              }} />
              <div className="thruster t4" style={{
                position: 'absolute',
                borderRadius: '50%',
                height: '2.8vh',
                width: '2.8vh',
                maxHeight: '13px',
                maxWidth: '13px',
                backgroundColor: 'white',
                boxShadow: '0 0 8px 3px red',
                animation: 'thrusters 19s ease-out 1',
                top: '81.5%',
                left: '36.5%'
              }} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CompleteStarWarsPreloader;
