"use client";
import {
  shaderMaterial,
  CameraControls,
  useGLTF,
  Center,
} from "@react-three/drei";
import { BoxGeometry } from "three";

export default function Experience() {
  return (
    <>
      <CameraControls />
      <Center>
        <mesh>
          <boxGeometry />
          <meshBasicMaterial />
        </mesh>
      </Center>
    </>
  );
}
