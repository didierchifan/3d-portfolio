"use client";

import { Canvas } from "@react-three/fiber";
import Experience from "./Experience";
import {
  ACESFilmicToneMapping,
  CineonToneMapping,
  NoToneMapping,
  ReinhardToneMapping,
} from "three";

export default function Shader() {
  return (
    <>
      <div className="text-7xl text-center pt-10">HALFTONE SHADING</div>
      <Canvas
        gl={{ toneMapping: NoToneMapping }}
        flat
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
    </>
  );
}
