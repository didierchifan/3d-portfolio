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

import hologramVertexShader from "../../shaders-glsl/hologram/vertex.glsl";
import hologramFragmentShader from "../../shaders-glsl/hologram/fragment.glsl";

const HologramMaterial = shaderMaterial(
  //the functions receives 3 parameters
  //uniforms, vertex shader, fragment shader
  {
    uTime: 0,
    uColor: new THREE.Color("#fcc5c5"),
  },
  hologramVertexShader,
  hologramFragmentShader
);

extend({ HologramMaterial: HologramMaterial });

export function Model(props) {
  const { nodes, materials } = useGLTF("../3dModels/suzanne.glb");

  const monkeyMaterial = useRef();
  const monkeyModel = useRef();

  useFrame((state, delta) => {
    monkeyMaterial.current.uTime += delta;

    if (monkeyModel.current) {
      monkeyModel.current.rotation.x -= delta * 0.1;
      monkeyModel.current.rotation.y += delta * 0.2;
    }
  });

  const { color } = useControls({
    color: {
      value: "#618916",
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
        <hologramMaterial
          ref={monkeyMaterial}
          transparent={true}
          side={THREE.DoubleSide}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          uColor={color}
        />
      </mesh>
    </group>
  );
}

useGLTF.preload("/suzanne.glb");

export default function Experience() {
  const sphereMaterial = useRef();
  const thorusMaterial = useRef();

  useFrame((state, delta) => {
    sphereMaterial.current.uTime += delta;
    thorusMaterial.current.uTime += delta;
  });

  return (
    <>
      <CameraControls />

      <Center>
        <mesh position={[-3, 0, 0]}>
          <sphereGeometry />
          <hologramMaterial
            ref={sphereMaterial}
            transparent={true}
            side={THREE.DoubleSide}
            depthWrite={false}
            blending={THREE.AdditiveBlending}
          />
        </mesh>

        <mesh position={[3, 0, 0]}>
          <torusKnotGeometry args={[0.6, 0.25, 128, 32]} />
          <hologramMaterial
            ref={thorusMaterial}
            transparent={true}
            side={THREE.DoubleSide}
            depthWrite={false}
            blending={THREE.AdditiveBlending}
          />
        </mesh>

        <Model position={[0, 0, 0]} />
      </Center>
    </>
  );
}
