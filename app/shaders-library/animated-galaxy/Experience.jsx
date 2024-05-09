import {
  shaderMaterial,
  CameraControls,
  useGLTF,
  Center,
} from "@react-three/drei";
import * as THREE from "three";

import { extend, useFrame } from "@react-three/fiber";
import { useRef } from "react";

import { useControls } from "leva";

import GalaxyGenerator from "./GalaxyGenerator";

export default function Experience() {
  return (
    <>
      <CameraControls />
      <Center>
        <GalaxyGenerator />
      </Center>
    </>
  );
}
