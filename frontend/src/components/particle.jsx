import React, { useEffect, useMemo, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

function Particle() {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine); // carrega o slim engine
    }).then(() => {
      setInit(true);
    });
  }, []);

  const particlesLoaded = (container) => {
    console.log("Particles Loaded:", container);
  };

  const options = useMemo(() => ({
    background: { color: "#6a0dad" }, // fundo roxo vibrante
    fpsLimit: 60,
    interactivity: {
      events: {
        onClick: { enable: true, mode: "push" },
        onHover: { enable: true, mode: "repulse" },
      },
      modes: {
        push: { quantity: 5 },
        repulse: { distance: 200, duration: 0.4 },
      },
    },
    particles: {
      color: { value: ["#ff69b4", "#dda0dd", "#ee82ee"] }, // cores party
      links: {
        color: "#ff69b4",
        distance: 150,
        enable: true,
        opacity: 0.6,
        width: 1,
      },
      move: {
        direction: "none",
        enable: true,
        outModes: { default: "bounce" },
        speed: 3,
        random: true,
      },
      number: { density: { enable: true, area: 1200 }, value: 100 },
      opacity: { value: { min: 0.3, max: 0.8 }, animation: { enable: true, speed: 1 } },
      shape: { type: "circle" },
      size: { value: { min: 2, max: 6 }, random: { enable: true } },
    },
    detectRetina: true,
  }), []);

  return (
    <div className="App">
      {init && (
        <Particles
          id="tsparticles"
          options={options}
          particlesLoaded={particlesLoaded}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            zIndex: -1,
          }}
        />
      )}
    </div>
  );
}

export default Particle;

