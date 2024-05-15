"use client";
import { useMemo, useRef, useEffect } from "react";
import * as THREE from "three";
import { extend } from "@react-three/fiber";
import {
  shaderMaterial,
  CameraControls,
  Center,
  useTexture,
  useGLTF,
  Environment,
  useHelper,
} from "@react-three/drei";
import { useControls } from "leva";
import { DirectionalLightHelper } from "three";

export default function Experience() {
  return (
    <>
      <CameraControls />
      <Center>
        <mesh>
          <boxGeometry />
          <meshBasicMaterial side={THREE.DoubleSide} />
        </mesh>
      </Center>
    </>
  );
}
