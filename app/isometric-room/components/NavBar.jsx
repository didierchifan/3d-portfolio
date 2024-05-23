import Link from "next/link";
import AboutMe from "../navigation-icons/about-me.svg";
import Shaders from "../navigation-icons/shaders.svg";
import MainLight from "../navigation-icons/main-light.svg";
import DonutLight from "../navigation-icons/donut.svg";
import AckjaLight from "../navigation-icons/akja.svg";
import WallLight from "../navigation-icons/wall-lamp.svg";
import TvLight from "../navigation-icons/tv.svg";
import ChairNav from "../navigation-icons/chair.svg";

export default function Navigation() {
  return (
    <div
      style={{ backgroundColor: "#181818" }}
      className="flex flex-col justify-center items-center gap-10"
    >
      {/* about me + shaders sections */}
      <div className="mb-auto self-start flex flex-col gap-10 mt-10">
        <div
          style={{ backgroundColor: "#F5F5F7" }}
          className="w-12 h-12 ml-8 mr-3 rounded-md flex items-center justify-center "
        >
          <Link href="./about-me">
            <AboutMe fill="#181818" className="w-10 h-10" />
          </Link>
        </div>
        <div
          style={{ backgroundColor: "#F5F5F7" }}
          className="w-12 h-12 ml-8 mr-3 rounded-md flex items-center justify-center "
        >
          <Link href="./shaders-library">
            <Shaders fill="#181818" className="w-10 h-10" />
          </Link>
        </div>
      </div>

      {/* experience tweaks */}
      <div
        style={{ backgroundColor: "#F5F5F7" }}
        className="w-12 h-12 ml-8 mr-8 rounded-md flex items-center justify-center "
      >
        <MainLight fill="#181818" className="w-10 h-10" />
      </div>
      <div
        style={{ backgroundColor: "#F5F5F7" }}
        className="w-12 h-12 ml-8 mr-8 rounded-md flex items-center justify-center "
      >
        <DonutLight fill="#181818" className="w-10 h-10" />
      </div>
      <div
        style={{ backgroundColor: "#F5F5F7" }}
        className="w-12 h-12 ml-8 mr-8 rounded-md flex items-center justify-center "
      >
        <AckjaLight fill="#181818" className="w-10 h-10" />
      </div>
      <div
        style={{ backgroundColor: "#F5F5F7" }}
        className="w-12 h-12 ml-8 mr-8 rounded-md flex items-center justify-center "
      >
        <WallLight fill="#181818" className="w-10 h-10 " />
      </div>
      <div
        style={{ backgroundColor: "#F5F5F7" }}
        className="w-12 h-12 ml-8 mr-8 rounded-md flex items-center justify-center "
      >
        <TvLight fill="#181818" className="w-10 h-10 " />
      </div>
      <div
        style={{ backgroundColor: "#F5F5F7" }}
        className="w-12 h-12 ml-8 mr-8 mb-8 rounded-md flex items-center justify-center"
      >
        <ChairNav fill="#181818" className="w-10 h-10 " />
      </div>
    </div>
  );
}
