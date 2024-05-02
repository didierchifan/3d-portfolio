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
      <div className="text-7xl text-center pt-10">RAGING SEA</div>
      <Canvas
        //no tone mapping has to be set to override the default R3f tonemapping
        gl={{ toneMapping: NoToneMapping }}
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
          position: [0, 1, 0],
          zoom: 0.25,
        }}
      >
        <Experience />
      </Canvas>
    </>
  );
}
