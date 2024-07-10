import { useEffect, useRef } from "react";

const AmbientSound = () => {
  const audioRef = useRef(null);

  useEffect(() => {
    const handleUserInteraction = () => {
      const audio = audioRef.current;
      if (audio) {
        audio
          .play()
          .catch((error) => console.log("Playback prevented: ", error));
      }

      // Remove event listeners after the first interaction
      document.removeEventListener("click", handleUserInteraction);
      document.removeEventListener("keydown", handleUserInteraction);
    };

    // Add event listeners for user interaction
    document.addEventListener("click", handleUserInteraction);
    document.addEventListener("keydown", handleUserInteraction);

    // Cleanup event listeners on component unmount
    return () => {
      document.removeEventListener("click", handleUserInteraction);
      document.removeEventListener("keydown", handleUserInteraction);
    };
  }, []);

  return (
    <audio ref={audioRef}>
      <source src="sounds/ambient.mp3" type="audio/mpeg" />
      Your browser does not support the audio element
    </audio>
  );
};

export default AmbientSound;
