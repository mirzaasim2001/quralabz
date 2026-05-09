"use client";

import { useEffect, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import type { ISourceOptions } from "@tsparticles/engine";

export default function ParticleNetwork() {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const options: ISourceOptions = {
    fullScreen: false,
    fpsLimit: 60,
    background: {
      color: {
        value: "transparent",
      },
    },
    interactivity: {
      events: {
        onHover: { enable: false },
        onClick: { enable: false },
        resize: {
          enable: true,
        },
      },
    },
    particles: {
      color: {
        value: ["#a78bfa", "#22d3ee", "#f472b6"],
      },
      links: {
        color: "#a78bfa",
        distance: 180,
        enable: true,
        opacity: 0.6,
        width: 2,
      },
      move: {
        enable: true,
        speed: 1.5, // Fast travel speed
        direction: "none",
        random: true,
        straight: false,
        outModes: {
          default: "bounce",
        },
      },
      // ROTATION IS HERE (SIBLING TO MOVE, NOT INSIDE IT)
      rotate: {
        value: 0,
        enable: true,
        direction: "random",
        animation: {
          enable: true,
          speed: 15, // Fast spin
          sync: false 
        }
      },
      number: {
        density: {
          enable: true,
        },
        value: 50,
      },
      opacity: {
        value: { min: 0.4, max: 1 },
        animation: {
          enable: true,
          speed: 0.5,
          sync: false,
        },
      },
      shape: {
        type: "polygon",
        options: {
          polygon: {
            sides: 6, // Hexagons
          },
        },
      },
      size: {
        value: { min: 4, max: 10 },
      },
    },
  };

  if (!init) return null;

  return (
    <Particles
      id="tsparticles"
      options={options}
      className="absolute inset-0 z-0"
    />
  );
}