import { useState, useEffect } from "react";
const LoadingScreen = () => {
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
    // @TODO create a separate array and pop the selected element so that it doesn not contain it anymore. keep in mind that you need to use the length of the new array.
    const interval = setInterval(() => {
      setCurrentMessageIndex(
        Math.floor(Math.random() * welcomeMessages.length)
      );
    }, 500);

    return () => clearInterval(interval);
  }, []);

  if (!isLoading) {
    return null;
  }

  return (
    <div
      style={{
        fontSize: "54px",
        backgroundColor: "black",
        color: "white",
        width: "100vw",
        height: "100vh",
        position: "absolute",
      }}
    >
      {welcomeMessages[currentMessageIndex]}
    </div>
  );
};

export default LoadingScreen;
