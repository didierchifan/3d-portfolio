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
      <div className="ml-auto">
        <div className="bg-white hover:bg-orange-500 w-12 h-12 rounded-md flex items-center justify-center">
          <span
            style={{
              color: "#181818",
              fontWeight: "bold",
            }}
          >
            CV
          </span>
        </div>
      </div>
    </div>
  );
}
