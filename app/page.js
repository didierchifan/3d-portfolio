"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { roomObjects } from "./isometric-room/tooltipData";

import ShaderCard from "./shaders-library/components/ShaderCard";
import { shadersData } from "./shaders-library/shaderCardsData";

import HorizontalCarousel from "./shaders-library/components/HorizontalCarousel";
import TextReveal from "./shaders-library/components/TextRevealWord";

export default function Home() {
  //******LOADING SCREEN *****//
  //the "fake" landing screen should appear on the first render of the landing page only => if i come back from an already visited page there should be no loading screen
  //separate component for the landing screen
  const welcomeMessages = [
    "Setting the scene",
    "Cleaning the room",
    "Feeding the cat",
    "Preparing the stage",
    "Brewing some coffee",
    "Warming up the engines",
    "Opening the curtains",
    "Tuning the instruments",
    "Greeting the guests",
    "Polishing the silverware",
    "Checking the sound system",
    "Arranging the flowers",
  ];

  const [isLoading, setIsLoading] = useState(true);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  // tried to set the useState( Math.floor(Math.random() * welcomeMessages.length)) so the first message would be random as well => strange Next.js error => check

  // Set is loading to false after 3.75 seconds
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  }, []);

  // Change message index every 1.25 seconds
  // there is a chance I randomly pick the same message twice from the array => needs an extra condition
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessageIndex(
        Math.floor(Math.random() * welcomeMessages.length)
      );
    }, 500);

    return () => clearInterval(interval);
  }, []);

  //******LOADING SCREEN *****//

  return (
    <>
      {isLoading ? (
        <h1 className="text-2xl text-orange-700 text-center flex justify-center items-center h-screen">
          {welcomeMessages[currentMessageIndex]}
        </h1>
      ) : (
        <div>
          <div id="hero-section">
            {/* top-nav */}
            <div className="ml-10 mt-5 mr-10 flex items-center justify-center">
              <div className="flex w-1/3">
                <div className="ml-20 w-20 h-20 rounded-full bg-orange-500 self-start"></div>
              </div>
              {/* top right shaders menu */}
              <div className="flex 2/3 flex-wrap justify-end gap-7 items-center">
                <h1 className="text-orange-500">
                  <Link href="/shaders-library/modified-materials">
                    Modified Materials
                  </Link>
                </h1>
                <h1 className="text-orange-500">
                  <Link href="/shaders-library/animated-galaxy">
                    Animated Galaxy
                  </Link>
                </h1>
                <h1 className="text-orange-500">
                  <Link href="/shaders-library/coffee-smoke">Coffee Smoke</Link>
                </h1>
                <h1 className="text-orange-500">
                  <Link href="/shaders-library/hologram">Hologram</Link>
                </h1>
                <h1 className="text-orange-500">
                  <Link href="/shaders-library/light-shading">
                    Custom Lights
                  </Link>
                </h1>

                <h1 className="text-orange-500">
                  <Link href="/shaders-library/fireworks">Fireworks</Link>
                </h1>

                <h1 className="text-orange-500">
                  <Link href="/shaders-library/raging-sea">
                    Brain Simulator
                  </Link>
                </h1>
                <h1>
                  <Link href="/shaders-library/halftone-shading">Halftone</Link>
                </h1>
                <h1>Earth</h1>
                <h1>Particles Cursor Animation</h1>
                <h1>Morphing Particles</h1>
                <h1>Flow Field Particles</h1>
                <h1>Wobble Sphere</h1>
                <h1>Sliced Model</h1>
                <h1>Procedural Terrain</h1>
              </div>
            </div>
            <div>
              <HorizontalCarousel />
            </div>
          </div>
          <div>
            <TextReveal />
          </div>
          <div className="h-96 bg-purple-500"></div>
        </div>
      )}
    </>
  );
}
