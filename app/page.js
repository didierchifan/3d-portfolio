"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { roomObjects } from "./isometric-room/data";

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
        <div className="ml-5 mt-5">
          <div className="text-sky-400">SHADER LIBRARY</div>
          <div className="h-5"></div>
          <div>
            <h1 className="text-orange-500">
              <Link href="/shaders-library/modified-materials">
                MODIFIED MATERIALS
              </Link>
            </h1>
            <h1 className="text-orange-500">
              <Link href="/shaders-library/animated-galaxy">
                ANIMATED GALAXY
              </Link>
            </h1>
            <h1 className="text-orange-500">
              <Link href="/shaders-library/coffee-smoke">COFFEE SMOKE</Link>
            </h1>
            <h1 className="text-orange-500">
              <Link href="/shaders-library/hologram">HOLOGRAM</Link>
            </h1>
            <h1 className="text-orange-500">
              <Link href="/shaders-library/light-shading">LIGHTS SHADING</Link>
            </h1>

            <h1 className="text-orange-500">
              <Link href="/shaders-library/fireworks">FIREWORKS</Link>
            </h1>

            <h1 className="text-orange-500">
              <Link href="/shaders-library/raging-sea">RAGING SEA SHADING</Link>
            </h1>
            <h1>
              <Link href="/shaders-library/halftone-shading">
                HALFTONE SHADING
              </Link>
            </h1>
            <h1>EARTH</h1>
            <h1>PARTICLES CURSOR ANIMATION</h1>
            <h1>PARTICLES MORPHING</h1>
            <h1>GPGPU FLOW FIELD PARTICLES</h1>
            <h1>WOBBLE SPHERE</h1>
            <h1>SLICED MODEL</h1>
            <h1>PROCEDURAL TERRAIN</h1>

            {/* tooltip data teste below => delete later */}

            <h1>
              <span>
                <br />
                <br />
                <p className="text-orange-500">tooltip data test below:</p>
                <br />
              </span>
            </h1>
            <div>
              {roomObjects.map((item, index) => (
                <h1 key={index} className="flex flex-col">
                  {roomObjects[index].description.map((item, index) => (
                    <div key={index}>{item}</div>
                  ))}
                  <div>
                    <span>-------------------</span>
                  </div>
                </h1>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
