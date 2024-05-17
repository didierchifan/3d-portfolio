"use client";
import { useMemo, useRef, useEffect } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { CameraControls, Center, Environment } from "@react-three/drei";
import { useControls, folder } from "leva";

import { Geometry, Base, Subtraction } from "@react-three/csg";

import CustomShaderMaterial from "three-custom-shader-material";

import terrainVertexShader from "../../shaders-glsl/procedural-terrain/vertex.glsl";
import terrainFragmentShader from "../../shaders-glsl/procedural-terrain/fragment.glsl";

export default function Experience() {
  const geometry = useMemo(() => {
    const boxgeometry = new THREE.BoxGeometry(11, 2, 11);
    return boxgeometry;
  }, []);

  //very important for the performances to create the goemetry in an useMemo();
  //normally I would have created the geometry inside return <PlaneGeometry> but the thing is I wanted to rotated the geometry directly, so I can preserve de Y axis => in the jsx the rotation can be applied on the mesh only
  const planeGeometry = useMemo(() => {
    const geometry = new THREE.PlaneGeometry(10, 10, 500, 500);
    geometry.deleteAttribute("uv");
    geometry.deleteAttribute("normal");
    geometry.rotateX(-Math.PI * 0.5);

    return geometry;
  }, []);

  const {
    positionX,
    positionY,
    positionZ,
    uPositionFrequency,
    uStrength,
    uWarpFrequency,
    uWarpStrength,
    waterDeep,
    waterSurface,
    sand,
    grass,
    snow,
    rock,
  } = useControls({
    "light position": folder({
      positionX: { value: 6.25, min: 0, max: 10 },
      positionY: { value: 3, min: 0, max: 10 },
      positionZ: { value: 4, min: 0, max: 10 },
    }),

    uniforms: folder({
      uPositionFrequency: { value: 0.2, min: 0, max: 1, step: 0.001 },
      uStrength: { value: 2.0, min: 0, max: 10, step: 0.001 },
      uWarpFrequency: { value: 5, min: 0, max: 10, step: 0.001 },
      uWarpStrength: { value: 0.5, min: 0, max: 1, step: 0.001 },
    }),

    colors: folder({
      waterDeep: { value: "#002b3d" },
      waterSurface: { value: "#9db5ba" },
      sand: { value: "#ffe894" },
      grass: { value: "#d68f33" },
      snow: { value: "#ffffff" },
      rock: { value: "#bfbd8d" },
    }),
  });

  const uniforms = {
    uPositionFrequency: new THREE.Uniform(uPositionFrequency),
    uStrength: new THREE.Uniform(uStrength),
    uWarpFrequency: new THREE.Uniform(uWarpFrequency),
    uWarpStrength: new THREE.Uniform(uWarpStrength),
    uWaterDeep: new THREE.Uniform(new THREE.Color(waterDeep)),
    uWaterSurface: new THREE.Uniform(new THREE.Color(waterSurface)),
    uSand: new THREE.Uniform(new THREE.Color(sand)),
    uGrass: new THREE.Uniform(new THREE.Color(grass)),
    uSnow: new THREE.Uniform(new THREE.Color(snow)),
    uRock: new THREE.Uniform(new THREE.Color(rock)),
  };

  const timeUniform = { uTime: new THREE.Uniform(0) };

  const allUniforms = { ...uniforms, ...timeUniform };

  useFrame((state, delta) => (timeUniform.uTime.value += delta));
  return (
    <>
      <CameraControls />
      <Environment
        background={false}
        environmentIntensity={0.5}
        files="../textures/procedural-terrain/spruit_sunrise.hdr"
        backgroundBlurriness={0.5}
      />
      <directionalLight
        color={"#ffffff"}
        intensity={1}
        position={[positionX, positionY, positionZ]}
        castShadow={true}
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-near={0.1}
        shadow-camera-far={50}
        shadow-camera-top={20}
        shadow-camera-right={20}
        shadow-camera-bottom={-20}
        shadow-camera-left={-20}
        shadow-bias={-0.0001}
      />

      <ambientLight />
      <Center>
        <mesh receiveShadow castShadow>
          <Geometry>
            <Base geometry={geometry} />
            <Subtraction>
              <boxGeometry args={[10, 10, 10]} />
            </Subtraction>
          </Geometry>
          <meshStandardMaterial color={"#181818"} />
        </mesh>

        <mesh geometry={planeGeometry} receiveShadow castShadow>
          <CustomShaderMaterial
            baseMaterial={THREE.MeshStandardMaterial}
            silent={true}
            metalness={0}
            roughness={0.5}
            color={"#85d534"}
            fragmentShader={terrainFragmentShader}
            vertexShader={terrainVertexShader}
            uniforms={allUniforms}
          />
          <CustomShaderMaterial
            attach="customDepthMaterial"
            baseMaterial={THREE.MeshDepthMaterial}
            depthPacking={THREE.RGBADepthPacking}
            silent={true}
            vertexShader={terrainVertexShader}
            uniforms={allUniforms}
          />
        </mesh>

        <mesh rotation-x={-Math.PI * 0.5} position-y={-0.1}>
          <planeGeometry args={[10, 10, 1, 1]} />
          <meshPhysicalMaterial transmission={1} roughness={0.3} />
        </mesh>
      </Center>
    </>
  );
}
