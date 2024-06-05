"use client";

import { Canvas } from "@react-three/fiber";
import Experience from "./Experience";

import {
  ACESFilmicToneMapping,
  CineonToneMapping,
  NoToneMapping,
  ReinhardToneMapping,
} from "three";
import { useControls } from "leva";
import BackButton from "@/app/isometric-room/components/BackButton";

export default function Shader() {
  return (
    <>
      <Canvas
        gl={{ toneMapping: NoToneMapping }}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
        }}
        camera={{
          position: [0, 1, 8],
        }}
      >
        {/* <color args={["#181818"]} attach="background" /> */}
        <Experience />
      </Canvas>
      <BackButton />
    </>
  );
}
