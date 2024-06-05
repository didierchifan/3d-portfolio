"use client";

import { Canvas } from "@react-three/fiber";
import Experience from "./Experience";
import BackButton from "@/app/isometric-room/components/BackButton";
import { Leva } from "leva";

export default function Shader() {
  return (
    <>
      <Canvas
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
        }}
      >
        <Experience />
      </Canvas>
      <Leva collapsed />
      <BackButton />
    </>
  );
}
