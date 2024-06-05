"use client";

import { Canvas } from "@react-three/fiber";
import Experience from "./Experience";

import {
  ACESFilmicToneMapping,
  CineonToneMapping,
  NoToneMapping,
  ReinhardToneMapping,
} from "three";
import BackButton from "@/app/isometric-room/components/BackButton";
import { Leva } from "leva";

export default function Shader() {
  return (
    <>
      <Canvas
        gl={{ toneMapping: NoToneMapping }}
        shadows
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
        }}
        camera={{ position: [8, 0, 0] }}
      >
        {/* <color args={["#181818"]} attach="background" /> */}
        <Experience />
      </Canvas>
      <Leva collapsed />
      <BackButton />
    </>
  );
}
