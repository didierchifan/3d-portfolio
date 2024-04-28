"use client";

import { Canvas } from "@react-three/fiber";
import Experience from "./Experience";
import useStore from "./stores/useStore";

import { useEffect } from "react";

export default function Shader() {
  const setClicked = useStore((state) => state.setClicked);

  //one firework when the page is opened => the problem is that after this the next click wont call the useFireworks() hook => two clicks are needed

  useEffect(() => setClicked(true));

  return (
    <>
      <div className="text-7xl text-center pt-10">FIREWORKS</div>
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
    </>
  );
}
