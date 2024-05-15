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
  //leva gui
  const {
    metalness,
    roughness,
    transmission,
    ior,
    thickness,
    color,
    lightPosition,
    planePosition,
  } = useControls({
    metalness: { value: 0, min: 0, max: 1, step: 0.001 },
    roughness: { value: 0.5, min: 0, max: 1, step: 0.001 },
    transmission: { value: 0, min: 0, max: 1, step: 0.001 },
    ior: { value: 1.5, min: 0, max: 10, step: 0.001 },
    thickness: { value: 1.5, min: 0, max: 10, step: 0.001 },
    color: { value: "#FFFFFF" },
    lightPosition: { x: 0.25, y: 2, z: -2.25 },
    planePosition: { x: 0, y: -5, z: 5 },
  });

  return (
    <>
      <CameraControls />

      <Environment
        background
        intensity={2}
        files="../textures/wobble-sphere/urban_alley_01_1k.hdr"
      />

      <directionalLight
        color={"#ffffff"}
        intensity={3}
        position={[lightPosition.x, lightPosition.y, lightPosition.z]}
        castShadow={true}
        shadow-mapSize={[1024, 1024]}
        shadow-camera-far={15}
      />
      <Center>
        <mesh receiveShadow castShadow>
          <icosahedronGeometry args={[2.5, 50]} />
          <meshPhysicalMaterial
            metalness={metalness}
            roughness={roughness}
            transmission={transmission}
            ior={ior}
            thickness={thickness}
            color={color}
          />
        </mesh>
        <mesh
          rotation={[0, Math.PI, 0]}
          position={[planePosition.x, planePosition.y, planePosition.z]}
          receiveShadow
        >
          <planeGeometry args={[15, 15, 15]} />
          <meshStandardMaterial side={THREE.DoubleSide} />
        </mesh>
      </Center>
    </>
  );
}

// shadow-mapSize={{ width: 1024, height: 1024 }}
// shadow-camera-far={15}
// shadow-normalBias={0.05}
