import Linkedin from "./footer-icons/linkedin.svg";
import Git from "./footer-icons/git.svg";
import Instagram from "./footer-icons/instagram.svg";
import X from "./footer-icons/x.svg";
import Behance from "./footer-icons/behance.svg";
import Fiverr from "./footer-icons/fiverr.svg";

import Link from "next/link";

export default function Content({ backgroundColor, color }) {
  return (
    <div
      style={{ backgroundColor }}
      className="py-8 px-12 h-full w-full flex flex-col justify-between"
    >
      <Logos />
      <Section1 color={color} />
      <Section2 color={color} />
    </div>
  );
}

const Section1 = ({ color }) => {
  return (
    <div>
      <Nav color={color} />
    </div>
  );
};

const Section2 = ({ color }) => {
  return (
    <div className="flex justify-between items-end">
      <h1 style={{ color }} className="text-[10vw] leading-[0.8] mt-10">
        DIDIER CHIFAN
      </h1>
      <p style={{ color }}>©copyright</p>
    </div>
  );
};

const Nav = ({ color }) => {
  return (
    <div className="flex shrink-0 gap-20">
      <div className="flex flex-col gap-2 cursor-pointer">
        <Link href="/" alt="Didier Chifan's 3d Portfolio Homepage">
          <p style={{ color }}>Home</p>{" "}
        </Link>

        <Link href="/shaders-library" alt="Shaders Library page">
          <p style={{ color }}>Shaders Library</p>
        </Link>

        <Link href="/about-me" alt="About Me Page">
          <p style={{ color }}>About Me</p>
        </Link>
      </div>
    </div>
  );
};

const Logos = () => {
  return (
    <div className="flex gap-12 cursor-pointer">
      <Link href="https://www.linkedin.com/in/didierchifan/" legacyBehavior>
        <a
          target="_blank"
          rel="noopener noreferrer"
          alt="didier chifan linked in page"
        >
          <Linkedin className="w-12 h-12" />
        </a>
      </Link>

      <Link href="https://github.com/didierchifan" legacyBehavior>
        <a
          target="_blank"
          rel="noopener noreferrer"
          alt="didier chifan github page"
        >
          <Git className="w-12 h-12" />
        </a>
      </Link>

      <Link href="https://www.instagram.com/didierchifan/" legacyBehavior>
        <a
          target="_blank"
          rel="noopener noreferrer"
          alt="didier chifan instagram page"
        >
          <Instagram className="w-12 h-12" />
        </a>
      </Link>

      <Link href="https://x.com/ddrchf" legacyBehavior>
        <a target="_blank" rel="noopener noreferrer" alt="didier chifan X page">
          <X className="w-12 h-12" />
        </a>
      </Link>

      <Link href="https://www.behance.net/didierchifan" legacyBehavior>
        <a
          target="_blank"
          rel="noopener noreferrer"
          alt="didier chifan behance page"
        >
          <Behance className="w-12 h-12" />
        </a>
      </Link>

      <Link
        href="https://www.fiverr.com/didierchifan?up_rollout=true"
        legacyBehavior
      >
        <a
          target="_blank"
          rel="noopener noreferrer"
          alt="didier chifan fiverr page"
        >
          <Fiverr className="w-12 h-12" />
        </a>
      </Link>
    </div>
  );
};
