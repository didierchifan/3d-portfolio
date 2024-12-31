"use client";
import { useMemo, useRef, useEffect } from "react";

import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { Perf } from "r3f-perf";

import {
  shaderMaterial,
  CameraControls,
  Center,
  useTexture,
  useGLTF,
  Environment,
  useHelper,
  Text3D,
  Float,
} from "@react-three/drei";
import { useControls, folder } from "leva";

import { mergeVertices } from "three/examples/jsm/utils/BufferGeometryUtils.js";
import CustomShaderMaterial from "three-custom-shader-material";
import wobbleVertexShader from "../../shaders-glsl/wobbleSphere/vertex.glsl";
import wobbleFragmentShader from "../../shaders-glsl/wobbleSphere/fragment.glsl";

export default function Experience() {
  //leva gui
  const {
    uWarpPositionFrequency,
    uWarpStrength,
    uWarpTimeFrequency,
    uPositionFrequency,
    uTimeFrequency,
    uStrength,
    metalness,
    roughness,
    transmission,
    ior,
    thickness,
    lightPosition,
    planePosition,
    uColorA,
    uColorB,
  } = useControls({
    "wobble tweaks": folder({
      uPositionFrequency: { value: 0.8, min: 0, max: 2, step: 0.001 },
      uTimeFrequency: { value: 0.5, min: 0, max: 2, step: 0.001 },
      uStrength: { value: 0.3, min: 0, max: 2, step: 0.01 },
    }),
    "warp tweaks": folder({
      uWarpPositionFrequency: { value: 0.38, min: 0, max: 2, step: 0.001 },
      uWarpTimeFrequency: { value: 0.12, min: 0, max: 2, step: 0.001 },
      uWarpStrength: { value: 1.7, min: 0, max: 2, step: 0.01 },
    }),

    "color tweaks": folder({
      uColorA: { value: "#09cece" },
      uColorB: { value: "#ff0000" },
    }),

    "material tweaks": folder({
      metalness: { value: 0, min: 0, max: 1, step: 0.001 },
      roughness: { value: 1.0, min: 0, max: 1, step: 0.001 },
      transmission: { value: 0, min: 0, max: 1, step: 0.001 },
      ior: { value: 1.5, min: 0, max: 10, step: 0.001 },
      thickness: { value: 1.5, min: 0, max: 10, step: 0.001 },
    }),

    "geometries tweaks": folder({
      lightPosition: { x: 0.25, y: 2, z: -2.25 },
      planePosition: { x: 0, y: -5, z: 5 },
    }),
  });

  //very important for the performance to create the geometry in an useMemo
  const geometry = useMemo(() => {
    let wobbleSphere = new THREE.IcosahedronGeometry(2.5, 100);
    wobbleSphere = mergeVertices(wobbleSphere);
    wobbleSphere.computeTangents();

    return wobbleSphere;
  }, []);

  const timeUniform = useRef({ uTime: new THREE.Uniform(0) });

  const tweaksUniforms = useMemo(
    () => ({
      uPositionFrequency: new THREE.Uniform(uPositionFrequency),
      uTimeFrequency: new THREE.Uniform(uTimeFrequency),
      uStrength: new THREE.Uniform(uStrength),

      uWarpPositionFrequency: new THREE.Uniform(uWarpPositionFrequency),
      uWarpTimeFrequency: new THREE.Uniform(uWarpTimeFrequency),
      uWarpStrength: new THREE.Uniform(uWarpStrength),

      uColorA: new THREE.Uniform(new THREE.Color(uColorA)),
      uColorB: new THREE.Uniform(new THREE.Color(uColorB)),
    }),
    [
      uPositionFrequency,
      uTimeFrequency,
      uStrength,
      uWarpPositionFrequency,
      uWarpStrength,
      uWarpTimeFrequency,
      uColorA,
      uColorB,
    ]
  );

  const uniforms = { ...timeUniform.current, ...tweaksUniforms };

  useFrame((state, delta) => {
    timeUniform.current.uTime.value += delta;
  });

  return (
    <>
      {/* <Perf /> */}
      <CameraControls />

      <Environment
        background={false}
        intensity={2}
        files="../textures/wobble-sphere/urban_alley_01_1k.hdr"
      />

      <directionalLight
        color={"#ffffff"}
        intensity={3}
        position={[lightPosition.x, lightPosition.y, lightPosition.z]}
        castShadow={true}
        shadow-mapSize={new THREE.Vector2(1024, 1024)}
        shadow-camera-far={15}
        shadow-camera-nor
        malBias={0.05}
      />

      <Center>
        <Float
          speed={2} // Animation speed, defaults to 1
          rotationIntensity={1} // XYZ rotation intensity, defaults to 1
          floatIntensity={1} // Up/down float intensity, works like a multiplier with floatingRange,defaults to 1
          floatingRange={[0.1, 0.5]} // Range of y-axis values the object will float within, defaults to [-0.1,0.1]
        >
          <group position={[-1.5, 4.2, 0]}>
            <Text3D font="../fonts/helvetiker_regular.typeface.json">
              NYE25
              <meshNormalMaterial />
            </Text3D>
          </group>

          <group position={[-1.5, 2.5, 0]}>
            <Text3D font="../fonts/helvetiker_regular.typeface.json">
              VINCENT IULIAN
              <meshNormalMaterial />
            </Text3D>
          </group>

          <group position={[-1.5, -4.2, 0]}>
            <Text3D font="../fonts/helvetiker_regular.typeface.json">
              BIGU
              <meshNormalMaterial />
            </Text3D>
          </group>

          <group position={[-1.5, -5.7, 0]}>
            <Text3D font="../fonts/helvetiker_regular.typeface.json">
              DIDIER
              <meshNormalMaterial />
            </Text3D>
          </group>

          <group position={[-1.5, -7.2, 0]}>
            <Text3D font="../fonts/helvetiker_regular.typeface.json">
              POLEAK
              <meshNormalMaterial />
            </Text3D>
          </group>
        </Float>
        <mesh receiveShadow castShadow geometry={geometry}>
          <CustomShaderMaterial
            baseMaterial={THREE.MeshPhysicalMaterial}
            vertexShader={wobbleVertexShader}
            fragmentShader={wobbleFragmentShader}
            uniforms={uniforms}
            metalness={metalness}
            roughness={roughness}
            transmission={transmission}
            ior={ior}
            thickness={thickness}
            silent={true}
          />
          <CustomShaderMaterial
            attach="customDepthMaterial"
            baseMaterial={THREE.MeshDepthMaterial}
            vertexShader={wobbleVertexShader}
            uniforms={uniforms}
            depthPacking={THREE.RGBADepthPacking}
            silent={true}
          />
        </mesh>

        {/* <mesh
          rotation={[0, Math.PI, 0]}
          position={[planePosition.x, planePosition.y, planePosition.z]}
          receiveShadow
        >
          <planeGeometry args={[15, 15, 15]} />
          <meshStandardMaterial side={THREE.DoubleSide} />
        </mesh> */}
      </Center>
    </>
  );
}
