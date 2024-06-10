import Shaders from "../navigation-icons/shaders.svg";
import AboutMe from "../navigation-icons/about-me.svg";
import Link from "next/link";

export default function MobileNavTopBar() {
  {
    /* about me + shaders sections */
  }
  return (
    <div
      style={{ minWidth: "100vw", backgroundColor: "#181818" }}
      className="fixed top-0 flex gap-10 justify-between p-5 z-10"
    >
      <div className="flex gap-10">
        <div className="tooltip-container bg-white hover:bg-orange-500 w-12 h-12 rounded-md flex items-center justify-center ">
          <Link href="./about-me">
            <AboutMe fill="#181818" className="w-10 h-10" />
          </Link>
        </div>
        <div className="tooltip-container bg-white hover:bg-orange-500 w-12 h-12 rounded-md flex items-center justify-center">
          <Link href="./shaders-library">
            <Shaders fill="#181818" className="w-10 h-10" />
          </Link>
        </div>
      </div>
      <div className="ml-auto">
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
      </div>
    </div>
  );
}
