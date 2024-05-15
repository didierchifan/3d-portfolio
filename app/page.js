"use client";

import Link from "next/link";

import { Canvas } from "@react-three/fiber";
import {
  ACESFilmicToneMapping,
  CineonToneMapping,
  NoToneMapping,
  ReinhardToneMapping,
} from "three";

import Experience from "./isometric-room/Experience";

export default function Homepage() {
  return (
    <>
      <h1 className="text-2xl text-left">
        <Link href="./shaders-library">SHADER WIZARDRY</Link>
      </h1>

      <Canvas
        gl={{ toneMapping: NoToneMapping }}
        shadows
        orthographic
        style={{
          position: "fixed",
          top: 50,
          left: 0,
          width: "100%",
          height: "100%",
        }}
        camera={{
          fov: 45,
          near: 0.1,
          far: 100,
          position: [-2.5, 1, 2.5],
          zoom: 200,
        }}
      >
        <Experience />
      </Canvas>
    </>
  );
}
