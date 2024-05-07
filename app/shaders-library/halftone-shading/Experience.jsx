import {
  CameraControls,
  useGLTF,
  Center,
  useTexture,
  shaderMaterial,
} from "@react-three/drei";

import { extend, useFrame } from "@react-three/fiber";
import { useControls } from "leva";

import { useRef } from "react";

import * as THREE from "three";

import halftoneVertexShader from "../../shaders-glsl/halftone/vertex.glsl";
import halftoneFragmentShader from "../../shaders-glsl/halftone/fragment.glsl";

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
  pixelRatio: Math.min(window.devicePixelRatio, 2),
};

const HalftoneMaterial = shaderMaterial(
  {
    uColor: new THREE.Color("#fe794d"),
    uResolution: new THREE.Vector2(
      sizes.width * sizes.pixelRatio,
      sizes.height * sizes.pixelRatio
    ),
    uShadowRepetitions: 100,
    uShadowColor: new THREE.Color("#8e19b8"),
    uLightRepetitions: 130,
    uLightColor: new THREE.Color("#e5ffe0"),
  },
  halftoneVertexShader,
  halftoneFragmentShader
);

extend({ HalftoneMaterial: HalftoneMaterial });

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

  const {
    uColor,
    uShadowRepetitions,
    uShadowColor,
    uLightRepetitions,
    uLightColor,
  } = useControls({
    uColor: { value: "#2d00f7" },
    uShadowRepetitions: { value: 100, min: 1, max: 300, step: 1 },
    uShadowColor: { value: "#f20089" },
    uLightRepetitions: { value: 130, min: 1, max: 300, step: 1 },
    uLightColor: { value: "#bc00dd" },
  });

  return (
    <group {...props} dispose={null}>
      <mesh
        ref={monkeyModel}
        castShadow
        receiveShadow
        geometry={nodes.Suzanne.geometry}
      >
        <halftoneMaterial
          ref={monkeyMaterial}
          uColor={uColor}
          uShadowRepetitions={uShadowRepetitions}
          uShadowColor={uShadowColor}
          uLightRepetitions={uLightRepetitions}
          uLightColor={uLightColor}
        />
      </mesh>
    </group>
  );
}

useGLTF.preload("/suzanne.glb");

export default function Experience() {
  const sphereMaterial = useRef();
  const torusMaterial = useRef();

  return (
    <>
      <CameraControls />

      <Center>
        <mesh position={[-3, 0, 0]}>
          <sphereGeometry />
          <halftoneMaterial ref={sphereMaterial} />
        </mesh>

        <mesh position={[3, 0, 0]}>
          <torusKnotGeometry args={[0.6, 0.25, 128, 32]} />
          <halftoneMaterial ref={torusMaterial} />
        </mesh>

        <Model position={[0, 0, 0]} />
      </Center>
    </>
  );
}
