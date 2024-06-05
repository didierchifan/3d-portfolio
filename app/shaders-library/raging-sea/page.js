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
      <Leva collapsed />
      <BackButton />
    </>
  );
}
