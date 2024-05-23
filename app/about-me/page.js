"use client";
import Experience from "./Experience";
import Scene from "./Scene";
import Text from "./Text";

import { Canvas } from "@react-three/fiber";

export default function AboutMe() {
  return (
    <div className="flex">
      {/* 2d canvas api */}
      <div
        style={{ backgroundColor: "#181818" }}
        className=" flex w-1/2 h-screen items-center justify-center"
      >
        <Text />
        <Scene />
      </div>

      {/* react three fiber canvas */}
      <div style={{ backgroundColor: "#181818" }} className="w-1/2">
        <Canvas
          style={{
            top: 0,
            left: 0,
            width: "50vw",
            height: "100vh",
          }}
        >
          <Experience />
        </Canvas>
      </div>
    </div>
  );
}
