"use client";

import * as THREE from "three";
import { shaderMaterial, CameraControls, Center } from "@react-three/drei";
import useGuiControls from "./hooks/useGuiControls";
import { useFrame } from "@react-three/fiber";

import { useControls } from "leva";

import { useEffect, useMemo, useRef } from "react";
import { random } from "gsap";
import { color } from "framer-motion";

export default function Experience() {
  const {
    count,
    size,
    radius,
    branches,
    spin,
    randomness,
    randomnessPower,
    insideColor,
    outsideColor,
  } = useGuiControls();

  const pointsRef = useRef(null);

  const { positions, colors } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    const colorInside = new THREE.Color(insideColor);
    const colorOutside = new THREE.Color(outsideColor);

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;

      //particles positions attribute
      const randomRadius = Math.random() * radius;
      const spinAngle = randomRadius * spin;
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

      positions[i3] =
        Math.cos(branchAngle + spinAngle) * randomRadius + randomX;
      positions[i3 + 1] = randomY;
      positions[i3 + 2] =
        Math.sin(branchAngle + spinAngle) * randomRadius + randomZ;

      //particles colors attribute

      const mixedColor = colorInside.clone();
      mixedColor.lerp(colorOutside, randomRadius / radius);

      colors[i3] = mixedColor.r;
      colors[i3 + 1] = mixedColor.g;
      colors[i3 + 2] = mixedColor.b;
    }

    return { positions, colors };
  }, [
    count,
    radius,
    branches,
    spin,
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
        "color",
        new THREE.BufferAttribute(colors, 3)
      );
      //very important to set the needUpdate to true
      pointsRef.current.geometry.attributes.position.needsUpdate = true;
      pointsRef.current.geometry.attributes.color.needsUpdate = true;
    }
  }, [positions, colors]);

  return (
    <>
      <CameraControls />
      <Center>
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
          </bufferGeometry>
          <pointsMaterial
            size={size}
            sizeAttenuation
            depthWrite={false}
            blending={THREE.AdditiveBlending}
            vertexColors={true}
          />
        </points>
      </Center>
    </>
  );
}
