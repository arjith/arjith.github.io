import React, { useEffect, useRef } from 'react';
import lottie from 'lottie-web';

const HeroAnimation = () => {
  const animationContainer = useRef(null);
  const animationInstance = useRef(null);

  useEffect(() => {
    if (animationContainer.current) {
      // Create a simple coding-themed Lottie animation data
      const animationData = {
        "v": "5.7.4",
        "fr": 30,
        "ip": 0,
        "op": 120,
        "w": 400,
        "h": 400,
        "nm": "Hero Animation",
        "ddd": 0,
        "assets": [],
        "layers": [
          {
            "ddd": 0,
            "ind": 1,
            "ty": 4,
            "nm": "Code Editor",
            "sr": 1,
            "ks": {
              "o": {"a": 0, "k": 100},
              "r": {"a": 0, "k": 0},
              "p": {"a": 0, "k": [200, 200, 0]},
              "a": {"a": 0, "k": [0, 0, 0]},
              "s": {
                "a": 1,
                "k": [
                  {"i": {"x": [0.833], "y": [0.833]}, "o": {"x": [0.167], "y": [0.167]}, "t": 0, "s": [80]},
                  {"i": {"x": [0.833], "y": [0.833]}, "o": {"x": [0.167], "y": [0.167]}, "t": 60, "s": [100]},
                  {"t": 120, "s": [80]}
                ]
              }
            },
            "ao": 0,
            "shapes": [
              {
                "ty": "gr",
                "it": [
                  {
                    "ty": "rc",
                    "d": 1,
                    "s": {"a": 0, "k": [300, 200]},
                    "p": {"a": 0, "k": [0, 0]},
                    "r": {"a": 0, "k": 10}
                  },
                  {
                    "ty": "fl",
                    "c": {"a": 0, "k": [0.12, 0.12, 0.12, 1]},
                    "o": {"a": 0, "k": 100}
                  },
                  {
                    "ty": "st",
                    "c": {"a": 0, "k": [0.23, 0.51, 0.96, 1]},
                    "o": {"a": 0, "k": 100},
                    "w": {"a": 0, "k": 2}
                  }
                ]
              }
            ],
            "ip": 0,
            "op": 120,
            "st": 0,
            "bm": 0
          }
        ]
      };

      try {
        animationInstance.current = lottie.loadAnimation({
          container: animationContainer.current,
          renderer: 'svg',
          loop: true,
          autoplay: true,
          animationData: animationData
        });
      } catch (error) {
        // Fallback to CSS animation if Lottie fails
        console.warn('Lottie animation failed, using CSS fallback');
        animationContainer.current.innerHTML = `
          <div class="css-animation-fallback">
            <div class="floating-code-editor">
              <div class="code-lines">
                <div class="code-line"></div>
                <div class="code-line short"></div>
                <div class="code-line"></div>
                <div class="code-line medium"></div>
              </div>
            </div>
          </div>
        `;
      }
    }

    return () => {
      if (animationInstance.current) {
        animationInstance.current.destroy();
      }
    };
  }, []);

  return (
    <div className="hero-animation-wrapper relative w-80 h-80 md:w-96 md:h-96">
      <div 
        ref={animationContainer} 
        className="w-full h-full flex items-center justify-center"
      />
      
      {/* CSS Animation Fallback Styles */}
      <style jsx>{`
        .css-animation-fallback {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .floating-code-editor {
          width: 240px;
          height: 160px;
          background: linear-gradient(135deg, #1e1e1e 0%, #2d2d2d 100%);
          border-radius: 12px;
          border: 2px solid #3b82f6;
          padding: 20px;
          animation: float 3s ease-in-out infinite;
          box-shadow: 0 10px 30px rgba(59, 130, 246, 0.3);
        }

        .code-lines {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .code-line {
          height: 8px;
          background: linear-gradient(90deg, #3b82f6 0%, #60a5fa 100%);
          border-radius: 4px;
          animation: typing 2s ease-in-out infinite;
        }

        .code-line.short {
          width: 60%;
          animation-delay: 0.5s;
        }

        .code-line.medium {
          width: 80%;
          animation-delay: 1s;
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px) scale(1);
          }
          50% {
            transform: translateY(-10px) scale(1.05);
          }
        }

        @keyframes typing {
          0%, 100% {
            opacity: 0.6;
          }
          50% {
            opacity: 1;
            box-shadow: 0 0 10px rgba(59, 130, 246, 0.5);
          }
        }
      `}</style>
    </div>
  );
};

export default HeroAnimation;
