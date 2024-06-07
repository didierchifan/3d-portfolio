"use client";

import Blender from "./icons/blender.svg";
import Figma from "./icons/figma.svg";
import Next from "./icons/next.svg";
import React from "./icons/react.svg";
import Threejs from "./icons/threejs.svg";
import Vercel from "./icons/vercel.svg";
import Unicorn from "./icons/unicorn.svg";

import Link from "next/link";

export default function Text() {
  return (
    <div className="flex flex-col text-l items-center text-white text-center pt-40 pl-10 pr-10">
      <p>
        As a <span className="font-bold">FRONTEND DEVELOPER</span> with a strong
        background in <span className="font-bold">DESIGN</span> and{" "}
        <span className="font-bold">3D MODELING</span>, I bring a unique
        perspective to front-end development. 
      </p>
      <div>
        <div className="flex flex-col gap-5 mt-10">
          <div className="flex gap-16 justify-between items-center">
            <div className="flex flex-col gap-2">
              <React className="w-12 h-12" />
              <p>react</p>
            </div>
            <p>|</p>
            <div className="flex flex-col ap-2 gap-2">
              <Threejs className="w-12 h-12" />
              <p>three.js</p>
            </div>
          </div>

          <hr className="border-t border-gray-300 mt-4 mb-4" />

          <div className="flex gap-16 justify-between items-center">
            <div className="flex flex-col gap-2">
              <Vercel className="w-12 h-12" />
              <p>vercel</p>
            </div>
            <p>|</p>
            <div className="flex flex-col gap-2">
              <Next className="w-12 h-12" />
              <p>next.js</p>
            </div>
          </div>

          <hr className="border-t border-gray-300 mt-4 mb-4" />

          <div className="flex gap-16 justify-between items-center">
            <div className="flex flex-col gap-2">
              <Blender className="w-12 h-12" />
              <p>blender</p>
            </div>
            <p>|</p>
            <div className="flex flex-col gap-2">
              <Figma className="w-12 h-12" />
              <p>figma</p>
            </div>
          </div>
        </div>
      </div>

      <Link href="https://www.linkedin.com/in/didierchifan/">
        <div className="flex justify-center mt-16">
          <div className="bg-white text-black py-2 px-4 rounded-full cursor-pointer hover:bg-orange-600 font-medium">
            yes, I need a unicorn
          </div>
        </div>
      </Link>
      <Unicorn className="w-14 h-14 mt-4" />
    </div>
  );
}
