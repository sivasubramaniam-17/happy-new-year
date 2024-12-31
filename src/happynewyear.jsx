import { useEffect, useRef } from "react";

const FireworksScene = () => {
  const canvasFireworksRef = useRef(null);
  const audioRef = useRef(null);

  useEffect(() => {
    const canvasFireworks = canvasFireworksRef.current;
    const ctxFireworks = canvasFireworks.getContext("2d");

    canvasFireworks.width = window.innerWidth;
    canvasFireworks.height = window.innerHeight;

    const fireworks = [];

    // Firework Particle Class
    class FireworkParticle {
      constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.radius = Math.random() * 4 + 2;
        this.speedX = Math.random() * 6 - 3;
        this.speedY = Math.random() * 6 - 3;
        this.alpha = 1;
        this.decay = Math.random() * 0.02 + 0.01;
      }
      draw() {
        ctxFireworks.save();
        ctxFireworks.globalAlpha = this.alpha;
        ctxFireworks.beginPath();
        ctxFireworks.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctxFireworks.fillStyle = this.color;
        ctxFireworks.fill();
        ctxFireworks.restore();
      }
      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.alpha -= this.decay;
      }
    }

    function addFireworks(x, y) {
      const colors = [
        "red",
        "blue",
        "yellow",
        "green",
        "purple",
        "orange",
        `hsl(${Math.random() * 360}, 100%, 70%)`,
      ];
      for (let i = 0; i < 50; i++) {
        const color = colors[Math.floor(Math.random() * colors.length)];
        fireworks.push(new FireworkParticle(x, y, color));
      }
    }

    function animate() {
      ctxFireworks.clearRect(0, 0, canvasFireworks.width, canvasFireworks.height);
      fireworks.forEach((particle, index) => {
        particle.update();
        particle.draw();
        if (particle.alpha <= 0) fireworks.splice(index, 1);
      });
      requestAnimationFrame(animate);
    }

    // Trigger fireworks on click
    canvasFireworks.addEventListener("click", (e) => {
      const rect = canvasFireworks.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      addFireworks(x, y);
    });

    // Trigger fireworks periodically
    setInterval(() => {
      addFireworks(
        Math.random() * canvasFireworks.width,
        Math.random() * canvasFireworks.height / 2
      );
    }, 1200);

    animate();

    // Adjust canvas size on resize
    const handleResize = () => {
      canvasFireworks.width = window.innerWidth;
      canvasFireworks.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    // Handle audio
    const audioElement = audioRef.current;
    
    // Add click event listener to start audio
    const startAudio = () => {
      audioElement.play().catch(error => {
        console.log("Audio playback failed:", error);
      });
      document.removeEventListener('click', startAudio);
    };

    document.addEventListener('click', startAudio);

    return () => {
      window.removeEventListener("resize", handleResize);
      document.removeEventListener('click', startAudio);
      audioElement.pause();
      audioElement.currentTime = 0;
    };
  }, []);

  return (
    <div
      style={{
        position: "relative",
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        background: "linear-gradient(to bottom, #001d3d, #003566)",
      }}
    >
      {/* Background Audio */}
      <audio
        ref={audioRef}
        src="happy.mp3" // Make sure to put the audio file in the public folder
        autoPlay
        loop
        controls // Add controls for testing
        preload="auto"
        style={{ 
            display: "none"
        }}
      ></audio>

      {/* Fireworks Canvas */}
      <canvas
        ref={canvasFireworksRef}
        style={{ position: "absolute", top: 0, left: 0 }}
      ></canvas>

      {/* Text and Logo */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          textAlign: "center",
          color: "white",
          zIndex: 10,
        }}
      >
        <h1
          style={{
            fontSize: "5vw",
            fontFamily: "'Dancing Script', cursive",
            fontStyle: "italic",
            fontWeight: "bold",
            margin: 0,
            color: "#FFD700",
            animation: "glowAndRotate 3s infinite ease-in-out",
          }}
        >
          Happy New Year 2025 !
        </h1>
        <h2
          style={{
            fontSize: "2.5vw",
            fontFamily: "Arial, sans-serif",
            marginTop: "30px",
            color: "#FFD700",
            animation: "shimmer 3s infinite ease-in-out",
          }}
        >
          Matt Engineering Solution
        </h2>
      </div>

      {/* Logo */}
      <img
        src="logo.png" // Replace with your actual logo URL
        alt="Matt Engineering Logo"
        style={{
          position: "absolute",
          top: "70%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "50px",
          height: "auto",
          animation: "fadeInLeft 2s ease-in-out",
        }}
      />

      {/* Inline Animations */}
      <style>
        {`
       

          @keyframes shimmer {
            0% { background-position: -100%; }
            100% { background-position: 100%; }
          }

          @keyframes fadeInLeft {
            0% { opacity: 0; transform: translateX(-30px); }
            100% { opacity: 1; transform: translateX(0); }
          }

          @media screen and (max-width: 768px) {
            h1 {
              font-size: 8vw !important;
            }
            h2 {
              font-size: 4vw !important;
            }
            img {
              width: 40px !important;
            }
          }

          @media screen and (max-width: 480px) {
            h1 {
              font-size: 10vw !important;
            }
            h2 {
              font-size: 5vw !important;
            }
            img {
              width: 30px !important;
            }
          }

          @media screen and (orientation: landscape) and (max-height: 500px) {
            h1 {
              font-size: 6vw !important;
            }
            h2 {
              font-size: 3vw !important;
            }
          }
        `}
      </style>
    </div>
  );
};

export default FireworksScene;
