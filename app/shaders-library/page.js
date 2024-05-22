"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { roomObjects } from "../isometric-room/tooltipData";

import ShaderCard from "./components/ShaderCard";
import { shadersData } from "./shaderCardsData";

import HorizontalCarousel from "./components/HorizontalCarousel";
import TextReveal from "./components/TextRevealWord";
import Footer from "./components/Footer";

export default function Home() {
  // //******LOADING SCREEN *****//
  // //the "fake" landing screen should appear on the first render of the landing page only => if i come back from an already visited page there should be no loading screen
  // //separate component for the landing screen
  // const welcomeMessages = [
  //   "Setting the scene",
  //   "Cleaning the room",
  //   "Feeding the cat",
  //   "Preparing the stage",
  //   "Brewing some coffee",
  //   "Warming up the engines",
  //   "Opening the curtains",
  //   "Tuning the instruments",
  //   "Greeting the guests",
  //   "Polishing the silverware",
  //   "Checking the sound system",
  //   "Arranging the flowers",
  // ];

  // const [isLoading, setIsLoading] = useState(true);
  // const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  // // tried to set the useState( Math.floor(Math.random() * welcomeMessages.length)) so the first message would be random as well => strange Next.js error => check

  // // Set is loading to false after 3.75 seconds
  // useEffect(() => {
  //   setTimeout(() => {
  //     setIsLoading(false);
  //   }, 1500);
  // }, []);

  // // Change message index every 1.25 seconds
  // // there is a chance I randomly pick the same message twice from the array => needs an extra condition
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setCurrentMessageIndex(
  //       Math.floor(Math.random() * welcomeMessages.length)
  //     );
  //   }, 500);

  //   return () => clearInterval(interval);
  // }, [welcomeMessages.length]);

  // //******LOADING SCREEN *****//

  return (
    <>
      {/* {isLoading ? (
        <h1 className="text-2xl text-orange-700 text-center flex justify-center items-center h-screen">
          {welcomeMessages[currentMessageIndex]}
        </h1>
      ) : ( */}
      <div style={{ backgroundColor: "#F5F5F7" }}>
        <div id="hero-section">
          {/* top-nav */}
          <div className="ml-10 pt-5 mr-10 flex items-center justify-center">
            <div className="flex w-1/2">
              <div className="ml-20 w-20 h-20 rounded-full bg-orange-500 self-start"></div>
            </div>
            {/* top right shaders menu */}
            <div className="flex 1/2 flex-wrap justify-end gap-7 ">
              {shadersData.map((item, index) => (
                <div key={index} className="max-h-full">
                  <h1 className="text-black font-medium">
                    <Link href={item.link}>{item.name}</Link>
                  </h1>
                </div>
              ))}
            </div>
            {/* topbar */}
          </div>
          <div>
            <HorizontalCarousel />
          </div>
        </div>
        <div>
          <TextReveal />
        </div>
        <Footer />
      </div>
    </>
  );
}
