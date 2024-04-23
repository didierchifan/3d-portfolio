"use client";

import { Canvas } from "@react-three/fiber";
import { CameraControls, Center } from "@react-three/drei";

export default function Shader() {
  return (
    <>
      <div class="text-7xl text-center pt-10">COFFEE SMOKE</div>
      <Canvas
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
        }}
      >
        <CameraControls />
        <Center>
          <mesh scale={[1, 1, 1]}>
            <boxGeometry />
            <meshBasicMaterial color="red" />
          </mesh>
        </Center>
      </Canvas>
    </>
  );
}
