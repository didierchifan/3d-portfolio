"use client";

import { Canvas } from "@react-three/fiber";
import Experience from "./Experience";
import { ToneMapping } from "@react-three/postprocessing";
import {
  ACESFilmicToneMapping,
  CineonToneMapping,
  NoToneMapping,
  ReinhardToneMapping,
} from "three";

export default function Shader() {
  return (
    <>
      <div className="text-7xl text-center pt-10">MODIFIED MATERIALS</div>
      <Canvas
        flat
        camera={{
          fov: 45,
          near: 0.1,
          far: 100,
          zoom: 0.3,
        }}
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
