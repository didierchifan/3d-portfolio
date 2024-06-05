"use client";

import { Canvas } from "@react-three/fiber";
import Experience from "./Experience";
import useStore from "./stores/useStore";

import { useEffect } from "react";
import BackButton from "@/app/isometric-room/components/BackButton";
import { Leva } from "leva";

export default function Shader() {
  const setClicked = useStore((state) => state.setClicked);

  //one firework when the page is opened => the problem is that after this the next click wont call the useFireworks() hook => two clicks are needed

  useEffect(() => setClicked(true));

  return (
    <>
      <Canvas
        onPointerDown={() => setClicked(true)}
        onPointerUp={() => setClicked(false)}
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
      <div className="fixed top-10 right-8  ">
        <h1>click to sparkle</h1>
      </div>
    </>
  );
}
