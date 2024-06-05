"use client";

import * as THREE from "three";
import { shaderMaterial, CameraControls, Center } from "@react-three/drei";
import useGuiControls from "./hooks/useGuiControls";
import { useFrame, extend, useThree } from "@react-three/fiber";

import { useEffect, useMemo, useRef } from "react";

import galaxyVertexShader from "../../shaders-glsl/galaxy/vertex.glsl";
import galaxyFragmentShader from "../../shaders-glsl/galaxy/fragment.glsl";

const GalaxyMaterial = shaderMaterial(
  {
    uSize: 1,
    uTime: 0,
  },
  galaxyVertexShader,
  galaxyFragmentShader
);

extend({ GalaxyMaterial: GalaxyMaterial });

export default function Experience() {
  const {
    count,
    radius,
    branches,
    randomness,
    randomnessPower,
    insideColor,
    outsideColor,
    uSize,
  } = useGuiControls();

  const pointsRef = useRef(null);
  const pointsMaterialRef = useRef(null);
  const { gl } = useThree();

  const { positions, colors, scales, randomnessAttribute } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const randomnessAttribute = new Float32Array(count * 3);
    const scales = new Float32Array(count * 1);

    const colorInside = new THREE.Color(insideColor);
    const colorOutside = new THREE.Color(outsideColor);

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;

      //particles positions attribute
      const randomRadius = Math.random() * radius;

      const branchAngle = ((i % branches) / branches) * Math.PI * 2;

      const randomX =
        Math.pow(Math.random(), randomnessPower) *
        (Math.random() < 0.5 ? 1 : -1) *
        randomness *
        randomRadius;
      const randomY =
        Math.pow(Math.random(), randomnessPower) *
        (Math.random() < 0.5 ? 1 : -1) *
        randomness *
        randomRadius;
      const randomZ =
        Math.pow(Math.random(), randomnessPower) *
        (Math.random() < 0.5 ? 1 : -1) *
        randomness *
        randomRadius;

      positions[i3] = Math.cos(branchAngle) * randomRadius;
      positions[i3 + 1] = 0;
      positions[i3 + 2] = Math.sin(branchAngle) * randomRadius;

      randomnessAttribute[i3] = randomX;
      randomnessAttribute[i3 + 1] = randomY;
      randomnessAttribute[i3 + 2] = randomZ;

      //particles colors attribute
      const mixedColor = colorInside.clone();
      mixedColor.lerp(colorOutside, randomRadius / radius);

      colors[i3] = mixedColor.r;
      colors[i3 + 1] = mixedColor.g;
      colors[i3 + 2] = mixedColor.b;

      //scale attribute
      scales[i] = Math.random();
    }

    return { positions, colors, scales, randomnessAttribute };
  }, [
    count,
    radius,
    branches,
    randomness,
    randomnessPower,
    outsideColor,
    insideColor,
  ]);

  // We use useEffect to update the geometry attribute whenever the positions array changes => this ensures that the geometry is updated correctly.
  useEffect(() => {
    if (pointsRef.current) {
      pointsRef.current.geometry.setAttribute(
        "position",
        new THREE.BufferAttribute(positions, 3)
      );

      pointsRef.current.geometry.setAttribute(
        "aRandomness",
        new THREE.BufferAttribute(randomnessAttribute, 3)
      );

      pointsRef.current.geometry.setAttribute(
        "color",
        new THREE.BufferAttribute(colors, 3)
      );

      pointsRef.current.geometry.setAttribute(
        "aScale",
        new THREE.BufferAttribute(scales, 1)
      );

      //very important to set the needUpdate to true
      pointsRef.current.geometry.attributes.position.needsUpdate = true;
      pointsRef.current.geometry.attributes.aRandomness.needsUpdate = true;
      pointsRef.current.geometry.attributes.color.needsUpdate = true;
      pointsRef.current.geometry.attributes.aScale.needsUpdate = true;
    }
  }, [positions, colors, scales, randomnessAttribute]);

  useFrame((state, delta) => {
    pointsMaterialRef.current.uTime += delta;
  });

  return (
    <>
      <CameraControls />

      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={count}
            array={positions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            count={count}
            array={colors}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-aScale"
            count={count}
            array={scales}
            itemSize={1}
          />
          <bufferAttribute
            attach="attributes-aRandomness"
            count={count}
            array={randomnessAttribute}
            itemSize={3}
          />
        </bufferGeometry>
        <galaxyMaterial
          ref={pointsMaterialRef}
          uSize={uSize * gl.getPixelRatio()}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          vertexColors={true}
        />
      </points>
    </>
  );
}
