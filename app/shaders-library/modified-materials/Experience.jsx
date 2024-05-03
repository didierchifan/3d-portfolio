import {
  shaderMaterial,
  CameraControls,
  useGLTF,
  useTexture,
  Center,
} from "@react-three/drei";
import * as THREE from "three";

import { extend, useFrame } from "@react-three/fiber";
import { useRef } from "react";

import { useControls } from "leva";

export default function Experience() {
  const { nodes } = useGLTF("../3dModels/LeePerrySmith/LeePerrySmith.glb");
  const texture = useTexture("../3dModels/LeePerrySmith/color.jpg");
  const normalMap = useTexture("../3dModels/LeePerrySmith/normal.jpg");
  console.log(normalMap);

  return (
    <>
      <ambientLight intensity={2} />

      {/* take the parameters from the threejs scene */}
      <directionalLight
        color="#ffffff"
        intensity={3}
        position={[0.252, -2.25]}
      />

      <CameraControls />
      <Center>
        <mesh geometry={nodes.LeePerrySmith.geometry}>
          <meshStandardMaterial map={texture} normalMap={normalMap} />
        </mesh>
      </Center>
    </>
  );
}
