import Link from "next/link";
import AboutMe from "../navigation-icons/about-me.svg";
import Shaders from "../navigation-icons/shaders.svg";
import MainLight from "../navigation-icons/main-light.svg";
import DonutLight from "../navigation-icons/donut.svg";
import AckjaLight from "../navigation-icons/akja.svg";
import WallLight from "../navigation-icons/wall-lamp.svg";
import TvLight from "../navigation-icons/tv.svg";
import ChairNav from "../navigation-icons/chair.svg";

// import sound from "../navigation-icons/test-loop.wav";

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

  function play() {
    new Audio(sound).play();
  }

  return (
    <>
      {/* web nav */}

      <div
        style={{ right: "1.25rem", position: "absolute", zIndex: 1 }}
        data-tooltip="Download CV"
        className="tooltip-container tooltip-left top-10 right-10 bg-white hover:bg-orange-500 w-12 h-12 rounded-md flex items-center justify-center"
      >
        <span style={{ color: "#181818", fontWeight: "bold" }}>CV</span>
      </div>
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
          <div
            // style={{ backgroundColor: "#F5F5F7" }}
            data-tooltip="Shaders"
            className="tooltip-container bg-white hover:bg-orange-500 w-12 h-12 rounded-md flex items-center justify-center"
          >
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
            onClick={handleAmbientLightClick}
          >
            <MainLight fill="#181818" className="w-10 h-10" />
          </div>
          <div
            // style={{ backgroundColor: "#F5F5F7" }}
            data-tooltip="Donut Lamp"
            className="tooltip-container bg-white hover:bg-orange-500 w-12 h-12  rounded-md flex items-center justify-center "
            onClick={handleDonutLightClick}
          >
            <DonutLight fill="#181818" className="w-10 h-10" />
          </div>
          <div
            // style={{ backgroundColor: "#F5F5F7" }}
            data-tooltip="Akja Lamp"
            className="tooltip-container bg-white hover:bg-orange-500 w-12 h-12  rounded-md flex items-center justify-center "
            onClick={handleLampLight}
          >
            <AckjaLight fill="#181818" className="w-10 h-10" />
          </div>
          <div
            // style={{ backgroundColor: "#F5F5F7" }}
            data-tooltip="Wall Lamp"
            className="tooltip-container bg-white hover:bg-orange-500 w-12 h-12  rounded-md flex items-center justify-center "
            onClick={handlePaintLampLight}
          >
            <WallLight fill="#181818" className="w-10 h-10 " />
          </div>
          <div
            // style={{ backgroundColor: "#F5F5F7" }}
            data-tooltip="TV Ambient Light"
            className="tooltip-container bg-white hover:bg-orange-500 w-12 h-12  rounded-md flex items-center justify-center "
            onClick={handleTvLight}
          >
            <TvLight fill="#181818" className="w-10 h-10 " />
          </div>
          <div
            // style={{ backgroundColor: "#F5F5F7" }}
            data-tooltip="Have a sit!"
            className="tooltip-container bg-white hover:bg-orange-500 w-12 h-12 rounded-md flex items-center justify-center"
            onClick={() => {
              console.log("clickcassss");
              document.dispatchEvent(takeASeatEvent);
            }}
          >
            <ChairNav fill="#181818" className="w-10 h-10 " />
          </div>
        </div>
      </div>
    </>
  );
}
