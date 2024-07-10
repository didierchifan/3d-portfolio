import Link from "next/link";
import AboutMe from "../navigation-icons/about-me.svg";
import Shaders from "../navigation-icons/shaders.svg";
import MainLight from "../navigation-icons/main-light.svg";
import DonutLight from "../navigation-icons/donut.svg";
import AckjaLight from "../navigation-icons/akja.svg";
import WallLight from "../navigation-icons/wall-lamp.svg";
import TvLight from "../navigation-icons/tv.svg";
import ChairNav from "../navigation-icons/chair.svg";

import { useRef } from "react";
import { useRouter } from "next/navigation";

export default function Navigation() {
  const handleAmbientLightClick = (e) => {
    const event = new CustomEvent("mainLightButtonClick", {
      detail: { mainLightClicked: true },
    });
    window.dispatchEvent(event);
  };

  const handleDonutLightClick = (e) => {
    const event = new CustomEvent("donutLightButtonClick", {
      detail: { donutLightClicked: true },
    });
    window.dispatchEvent(event);
  };

  const handleLampLight = (e) => {
    const event = new CustomEvent("lampLightButtonClick", {
      detail: { lampLightClicked: true },
    });
    window.dispatchEvent(event);
  };

  const handlePaintLampLight = (e) => {
    const event = new CustomEvent("paintLampLightButtonClick", {
      detail: { paintLampLightClicked: true },
    });
    window.dispatchEvent(event);
  };

  const handleTvLight = (e) => {
    const event = new CustomEvent("tvLightButtonClick", {
      detail: { tvLightClicked: true },
    });
    window.dispatchEvent(event);
  };

  const takeASeatEvent = new Event("sitOnTheChair");

  // sounds
  const shadersSound = useRef(null);
  const neon = useRef(null);
  const router = useRouter();

  // async sound + routing
  const playOnClick = () => {
    const audio = shadersSound.current;
    console.log("button clicked");
    if (audio) {
      audio
        .play()
        .then(() => {
          // Wait for the audio to finish playing
          audio.onended = () => {
            router.push("./shaders-library");
          };
        })
        .catch((error) => console.log("Playback prevented:", error));
    }
  };

  // simple sound on click
  const playNeon = () => {
    const sound = neon.current;
    if (sound) {
      sound.play().catch((error) => console.log("Playback prevented ", error));
    }
  };

  const handleAmbientLightandPlaySound = (e) => {
    handleAmbientLightClick(e), playNeon(e);
  };

  const donut = useRef();
  const playDonut = () => {
    const sound = donut.current;
    if (sound) {
      sound.play().catch((error) => console.log("Playback prevented", error));
    }
  };

  const handleDonutLightandPlayDonut = (e) => {
    handleDonutLightClick(e), playDonut(e);
  };

  const chairSound = useRef();
  const playChair = () => {
    const sound = chairSound.current;
    if (sound) {
      sound.play().catch((error) => console.log("Playbacik prevented:", error));
    }
  };

  const tvSound = useRef();
  const playTvSound = () => {
    const sound = tvSound.current;
    if (sound) {
      sound.play().catch((error) => console.log("Playback prevented:", erro));
    }
  };
  const handleTvAndPlayTvSound = (e) => {
    handleTvLight(e), playTvSound(e);
  };

  const wallLampSound = useRef();
  const playWallLamp = () => {
    const sound = wallLampSound.current;
    if (sound)
      sound.play().catch((error) => console.log("Playback prevented:", error));
  };

  const handleWallLampAndPlayWallLampSound = (e) => {
    handlePaintLampLight(e), playWallLamp();
  };

  const lampSound = useRef();
  const playLampSound = () => {
    const sound = lampSound.current;
    if (sound) {
      sound.play().catch((error) => console.log("Playback prevented:", error));
    }
  };
  const handleLampSoundandPlayLampSound = (e) => {
    handleLampLight(e), playLampSound(e);
  };

  return (
    <>
      {/* web nav */}
      <Link
        href="https://drive.google.com/file/d/1HahMIX8tY6ao-LvL_BmYGU7sJRgr4P4Z/view"
        atl="Didier Chifan resume for download"
        target="_blank"
      >
        <div
          style={{ right: "1.25rem", position: "absolute", zIndex: 1 }}
          data-tooltip="Download CV"
          className="tooltip-container tooltip-left top-10 right-10 bg-white hover:bg-orange-500 w-12 h-12 rounded-md flex items-center justify-center"
        >
          <span style={{ color: "#181818", fontWeight: "bold" }}>CV</span>
        </div>
      </Link>

      <div
        style={{ backgroundColor: "#181818" }}
        className="flex flex-col gap-10"
      >
        {/* about me + shaders sections */}
        <div className="mb-auto self-start flex flex-col gap-10 mt-10 pl-5">
          <div
            // style={{ backgroundColor: "#F5F5F7" }}
            data-tooltip="About me"
            className="tooltip-container bg-white hover:bg-orange-500 w-12 h-12 rounded-md flex items-center justify-center "
          >
            <Link href="./about-me">
              <AboutMe fill="#181818" className="w-10 h-10" />
            </Link>
          </div>

          {/* SHADERS LIBRARY ROUTER => async sound */}
          <div
            // style={{ backgroundColor: "#F5F5F7" }}
            data-tooltip="Shaders"
            className="tooltip-container bg-white hover:bg-orange-500 w-12 h-12 rounded-md flex items-center justify-center"
            onClick={playOnClick}
          >
            <audio ref={shadersSound}>
              <source src="sounds/shaders-sound.wav" type="audio/wav" />
              Your browser does not support the audio file.
            </audio>
            <Link href="./shaders-library">
              <Shaders fill="#181818" className="w-10 h-10" />
            </Link>
          </div>
        </div>

        {/* experience tweaks */}
        <div className="flex flex-col gap-10 pl-5 pr-5 mb-10">
          <div
            // style={{ backgroundColor: "#F5F5F7" }}
            data-tooltip="Light Switch"
            className="tooltip-container bg-white hover:bg-orange-500 w-12 h-12 rounded-md flex items-center justify-center"
            onClick={handleAmbientLightandPlaySound}
          >
            <audio ref={neon}>
              <source src="sounds/neon.wav" type="audio/wav" />
              Your browser does not support the audio file.
            </audio>

            <MainLight fill="#181818" className="w-10 h-10" />
          </div>
          <div
            // style={{ backgroundColor: "#F5F5F7" }}
            data-tooltip="Donut Lamp"
            className="tooltip-container bg-white hover:bg-orange-500 w-12 h-12  rounded-md flex items-center justify-center "
            onClick={handleDonutLightandPlayDonut}
          >
            <audio ref={donut}>
              <source src="sounds/donut.wav" type="audio/wav" />
              Your browser does not support the audio file.
            </audio>

            <DonutLight fill="#181818" className="w-10 h-10" />
          </div>
          <div
            // style={{ backgroundColor: "#F5F5F7" }}
            data-tooltip="Akja Lamp"
            className="tooltip-container bg-white hover:bg-orange-500 w-12 h-12  rounded-md flex items-center justify-center "
            onClick={handleLampSoundandPlayLampSound}
          >
            <audio ref={lampSound}>
              <source src="sounds/ackja.wav" type="audio/wav" />
              Your browser does not support the audio file.
            </audio>
            <AckjaLight fill="#181818" className="w-10 h-10" />
          </div>
          <div
            // style={{ backgroundColor: "#F5F5F7" }}
            data-tooltip="Wall Lamp"
            className="tooltip-container bg-white hover:bg-orange-500 w-12 h-12  rounded-md flex items-center justify-center "
            onClick={handleWallLampAndPlayWallLampSound}
          >
            <audio ref={wallLampSound}>
              <source src="sounds/wall-lamp.wav" type="audio/wav" />
              Your browser does not support the audio file.
            </audio>
            <WallLight fill="#181818" className="w-10 h-10 " />
          </div>

          <div
            // style={{ backgroundColor: "#F5F5F7" }}
            data-tooltip="TV Ambient Light"
            className="tooltip-container bg-white hover:bg-orange-500 w-12 h-12  rounded-md flex items-center justify-center "
            onClick={handleTvAndPlayTvSound}
          >
            <audio ref={tvSound}>
              <source src="sounds/tv.wav" type="audio/wav" />
              Your browser does not support the audio file.
            </audio>
            <TvLight fill="#181818" className="w-10 h-10 " />
          </div>

          <div
            // style={{ backgroundColor: "#F5F5F7" }}
            data-tooltip="Have a sit!"
            className="tooltip-container bg-white hover:bg-orange-500 w-12 h-12 rounded-md flex items-center justify-center"
            onClick={() => {
              document.dispatchEvent(takeASeatEvent);
              playChair();
            }}
          >
            <audio ref={chairSound}>
              <source src="sounds/chair.wav" type="audio/wav" />
              Your browser does not support the audio file.
            </audio>

            <ChairNav fill="#181818" className="w-10 h-10 " />
          </div>
        </div>
      </div>
    </>
  );
}
