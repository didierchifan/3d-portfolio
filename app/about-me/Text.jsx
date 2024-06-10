"use client";

import Blender from "./icons/blender.svg";
import Figma from "./icons/figma.svg";
import Next from "./icons/next-web.svg";
import React from "./icons/react.svg";
import Threejs from "./icons/threejs.svg";
import Vercel from "./icons/vercel.svg";
import Unicorn from "./icons/unicorn.svg";

import Link from "next/link";

export default function Text() {
  return (
    <div className="absolute flex flex-col w-[35vw] text-xl items-start leading-tight text-white">
      <p>
        As a <span className="font-bold">FRONTEND DEVELOPER</span> with a strong
        background in <span className="font-bold">DESIGN</span> and{" "}
        <span className="font-bold">3D MODELING</span>, I bring a unique
        perspective to front-end development. 
      </p>
      <div>
        <div className="flex gap-16 mt-10">
          <React className="w-12 h-12" />
          <Threejs className="w-12 h-12" />
          <p>react | three.js</p>
        </div>
        <div className="flex gap-16 mt-10 ">
          <Vercel className="w-12 h-12" />
          <Next className="w-12 h-12" />
          <p>vercel | next.js</p>
        </div>
        <div className="flex gap-16 mt-10">
          <Blender className="w-12 h-12" />
          <Figma className="w-12 h-12" />
          <p>blender | figma</p>
        </div>
      </div>

      <div className="flex items-center z-50 mt-24 gap-8">
        {/* <Unicorn className="w-14 h-14" /> */}
        <Link href="https://www.linkedin.com/in/didierchifan/">
          <div className="flex bg-orange-600 text-white text-base py-2 px-4 rounded-full cursor-pointer font-medium hover:bg-white hover:text-black ">
            CONTACT
          </div>
        </Link>
      </div>
    </div>
  );
}
