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
      <div className="text-7xl text-center pt-10">PROCEDURAL TERRAIN</div>
      <Canvas
        gl={{ toneMapping: ACESFilmicToneMapping }}
        shadows
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
        }}
        camera={{
          fov: 45,
          near: 0.1,
          far: 100,
          position: [0, 10, 0],
          zoom: 0.6,
        }}
      >
        <color args={["#181818"]} attach="background" />
        <Experience />
      </Canvas>
    </>
  );
}
