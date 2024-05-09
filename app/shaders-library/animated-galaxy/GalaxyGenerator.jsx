import { useRef, useMemo, useEffect } from "react";
import useGuiControls from "./hooks/useGuiControls";

import {
  AdditiveBlending,
  BufferAttribute,
  Color,
  ShaderMaterial,
} from "three";

import { shaderMaterial } from "@react-three/drei";

import * as THREE from "three";
import { extend, useFrame, useThree } from "@react-three/fiber";

import galaxyVertexShader from "../../shaders-glsl/galaxy/vertex.glsl";
import galaxyFragmentShader from "../../shaders-glsl/galaxy/fragment.glsl";

/**
 * Galaxy
 */
const parameters = {};
parameters.count = 200000;
parameters.size = 0.005;
parameters.radius = 5;
parameters.branches = 3;
parameters.spin = 1;
parameters.randomness = 0.2;
parameters.randomnessPower = 3;
parameters.insideColor = "#ff6030";
parameters.outsideColor = "#1b3984";

let geometry = null;
let material = null;
let points = null;

const generateGalaxy = () => {
  if (points !== null) {
    geometry.dispose();
    material.dispose();
    scene.remove(points);
  }

  /**
   * Geometry
   */
  geometry = new THREE.BufferGeometry();

  const positions = new Float32Array(parameters.count * 3);
  const randomness = new Float32Array(parameters.count * 3);
  const colors = new Float32Array(parameters.count * 3);
  const scales = new Float32Array(parameters.count * 1);

  const insideColor = new THREE.Color(parameters.insideColor);
  const outsideColor = new THREE.Color(parameters.outsideColor);

  for (let i = 0; i < parameters.count; i++) {
    const i3 = i * 3;

    // Position
    const radius = Math.random() * parameters.radius;

    const branchAngle =
      ((i % parameters.branches) / parameters.branches) * Math.PI * 2;

    const randomX =
      Math.pow(Math.random(), parameters.randomnessPower) *
      (Math.random() < 0.5 ? 1 : -1) *
      parameters.randomness *
      radius;
    const randomY =
      Math.pow(Math.random(), parameters.randomnessPower) *
      (Math.random() < 0.5 ? 1 : -1) *
      parameters.randomness *
      radius;
    const randomZ =
      Math.pow(Math.random(), parameters.randomnessPower) *
      (Math.random() < 0.5 ? 1 : -1) *
      parameters.randomness *
      radius;

    positions[i3] = Math.cos(branchAngle) * radius;
    positions[i3 + 1] = 0;
    positions[i3 + 2] = Math.sin(branchAngle) * radius;

    randomness[i3] = randomX;
    randomness[i3 + 1] = randomY;
    randomness[i3 + 2] = randomZ;

    // Color
    const mixedColor = insideColor.clone();
    mixedColor.lerp(outsideColor, radius / parameters.radius);

    colors[i3] = mixedColor.r;
    colors[i3 + 1] = mixedColor.g;
    colors[i3 + 2] = mixedColor.b;

    // Scale
    scales[i] = Math.random();
  }

  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute(
    "aRandomness",
    new THREE.BufferAttribute(randomness, 3)
  );
  geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
  geometry.setAttribute("aScale", new THREE.BufferAttribute(scales, 1));
};

generateGalaxy();

const ParticlesShaderMaterial = shaderMaterial(
  {
    uTime: 0,
    uSize: 30,
  },
  galaxyVertexShader,
  galaxyFragmentShader
);

extend({ ParticlesShaderMaterial: ParticlesShaderMaterial });

export default function GalaxyGenerator() {
  const {
    count,
    radius,
    branches,
    randomness,
    randomnessPower,
    insideColor,
    outsideColor,
  } = useGuiControls();

  const galaxyMaterialRef = useRef();

  const { gl, camera, clock } = useThree();

  useFrame((state) => {
    const { elapsedTime } = state.clock;

    if (galaxyMaterialRef.current) {
      galaxyMaterialRef.current.uTime = elapsedTime;
    }
  });

  useEffect(() => {
    clock.start();
  }, [clock]);

  return (
    <>
      <points geometry={geometry}>
        <particlesShaderMaterial
          ref={galaxyMaterialRef}
          depthWrite={false}
          blending={AdditiveBlending}
          vertexColors
        />
      </points>
    </>
  );
}
