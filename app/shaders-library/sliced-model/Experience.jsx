"use client";
import { useMemo, useRef, useEffect } from "react";
import * as THREE from "three";
import { extend, useFrame, useThree } from "@react-three/fiber";
import {
  CameraControls,
  Center,
  useGLTF,
  Environment,
} from "@react-three/drei";

import CustomShaderMaterial from "three-custom-shader-material";

import slicedModelVertextShader from "../../shaders-glsl/sliced-model/vertex.glsl";
import slicedModelFragmentShader from "../../shaders-glsl/sliced-model/fragment.glsl";
import { useControls } from "leva";

export default function Experience() {
  const { nodes, materials } = useGLTF("../3dModels/sliced-model/gears.glb");

  const modelRef = useRef();

  const { uSliceStart, uSliceArc } = useControls({
    uSliceStart: { value: 1.75, min: -Math.PI, max: Math.PI, step: 0.001 },
    uSliceArc: { value: 1.25, min: 0, max: Math.PI * 2, step: 0.001 },
  });

  const uniforms = {
    uSliceStart: new THREE.Uniform(uSliceStart),
    uSliceArc: new THREE.Uniform(uSliceArc),
  };

  const patchMap = {
    csm_Slice: {
      "#include <colorspace_fragment>": `
      #include <colorspace_fragment>
      
      if(!gl_FrontFacing)
        gl_FragColor = vec4(0.75, 0.15, 0.3, 1.0); 
      `,
    },
  };

  useFrame((state, delta) => {
    modelRef.current.rotation.y += delta * 0.1;
  });

  return (
    <>
      <CameraControls />
      <Environment
        files="../textures/sliced-model/aerodynamics_workshop.hdr"
        background={false}
        backgroundBlurriness={0.5}
        intensity={5}
      />
      <directionalLight
        intensity={4}
        color={"#ffffff"}
        position={[6.25, 3, 4]}
        castShadow={true}
        shadow-mapSize={new THREE.Vector2(1024, 1024)}
        shadow-cameraNear={0.1}
        shadow-cameraFar={30}
        shadow-normalBias={0.05}
        shadow-cameraTop={8}
        shadow-cameraRight={8}
        shadow-cameraBottom={-8}
        shadow-cameraLeft={-8}
      />
      <Center>
        <mesh castShadow ref={modelRef}>
          <group dispose={null}>
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.outerHull.geometry}
              scale={3.714}
            >
              <CustomShaderMaterial
                baseMaterial={THREE.MeshStandardMaterial}
                metalness={0.5}
                roughness={0.25}
                envMapIntensity={0.5}
                color={"#808080"}
                silent={true}
                vertexShader={slicedModelVertextShader}
                fragmentShader={slicedModelFragmentShader}
                uniforms={uniforms}
                patchMap={patchMap}
                side={THREE.DoubleSide}
              />
              <CustomShaderMaterial
                attach="customDepthMaterial"
                baseMaterial={THREE.MeshDepthMaterial}
                depthPacking={THREE.RGBADepthPacking}
                silent={true}
                vertexShader={slicedModelVertextShader}
                fragmentShader={slicedModelFragmentShader}
                uniforms={uniforms}
                patchMap={patchMap}
              />
            </mesh>
            <mesh castShadow receiveShadow geometry={nodes.axle.geometry}>
              <meshStandardMaterial
                metalness={0.5}
                roughness={0.25}
                envMapIntensity={0.5}
                color={"#808080"}
              />
            </mesh>
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.gears.geometry}
              position={[0, 1.595, -0.691]}
              rotation={[-Math.PI, 0, -Math.PI]}
              scale={[1, 1, 1.016]}
            >
              <meshStandardMaterial
                metalness={0.5}
                roughness={0.25}
                envMapIntensity={0.5}
                color={"#808080"}
              />
            </mesh>
          </group>
        </mesh>
      </Center>
    </>
  );
}
useGLTF.preload("../3dModels/sliced-model/gears.glb");
