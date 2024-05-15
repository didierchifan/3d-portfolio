"use client";
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

import materialVertexShader from "../../shaders-glsl/lightsShading/vertex.glsl";
import materialFragmentShader from "../../shaders-glsl/lightsShading/fragment.glsl";

const ShadingMaterial = shaderMaterial(
  //the order of the parameters is important: uniforms, vertex, fragment
  {
    uColor: new THREE.Color("#ffffff"),
  },
  materialVertexShader,
  materialFragmentShader
);

extend({ ShadingMaterial: ShadingMaterial });

export function Model(props) {
  const { nodes } = useGLTF("../3dModels/suzanne.glb");

  const monkeyMaterial = useRef();
  const monkeyModel = useRef();

  useFrame((state, delta) => {
    if (monkeyModel.current) {
      monkeyModel.current.rotation.x -= delta * 0.1;
      monkeyModel.current.rotation.y += delta * 0.2;
    }
  });

  const { color } = useControls({
    color: {
      value: "#ffffff",
    },
  });

  return (
    <group {...props} dispose={null}>
      <mesh
        ref={monkeyModel}
        castShadow
        receiveShadow
        geometry={nodes.Suzanne.geometry}
      >
        <shadingMaterial ref={monkeyMaterial} uColor={color} />
      </mesh>
    </group>
  );
}

useGLTF.preload("/suzanne.glb");

export default function Experience() {
  const sphereMaterial = useRef();
  const torusKnotMaterial = useRef();

  return (
    <>
      <CameraControls />

      <Center>
        <mesh position={[-3, 0, 0]}>
          <sphereGeometry />
          <shadingMaterial ref={sphereMaterial} />
        </mesh>

        <mesh position={[3, 0, 0]}>
          <torusKnotGeometry args={[0.6, 0.25, 128, 32]} />
          <shadingMaterial ref={torusKnotMaterial} />
        </mesh>

        <Model position={[0, 0, 0]} />
      </Center>
    </>
  );
}
