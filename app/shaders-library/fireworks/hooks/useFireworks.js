"use client";

import { useTexture } from "@react-three/drei";
import { useCallback, useEffect } from "react";
import {
  AdditiveBlending,
  BufferGeometry,
  Color,
  Float32BufferAttribute,
  Points,
  ShaderMaterial,
  Spherical,
  Uniform,
  Vector2,
  Vector3,
} from "three";
import { useThree } from "@react-three/fiber";
import gsap from "gsap";

import vertexShader from "../../../shaders-glsl/fireworks/vertex.glsl";
import fragmentShader from "../../../shaders-glsl/fireworks/fragment.glsl";

import useStore from "../stores/useStore.js";

export default function useFireworks() {
  const scene = useThree((state) => state.scene); //default scene
  const sizes = useThree((state) => state.size); //bounds, fit 100%
  const gl = useThree((state) => state.gl); // webgl renderer

  //helps to create the firework on click
  const firePressed = useStore((state) => state.clicked); //useStore => ZUSTAND

  const textures = useTexture(
    [
      "../textures/fireworks/1.png",
      "../textures/fireworks/2.png",
      "../textures/fireworks/3.png",
      "../textures/fireworks/4.png",
      "../textures/fireworks/5.png",
      "../textures/fireworks/6.png",
      "../textures/fireworks/7.png",
      "../textures/fireworks/8.png",
    ],
    (textures) => {
      if (Array.isArray(textures)) {
        textures.forEach((texture) => {
          texture.flipY = false;
        });
      }
    }
  );

  //we want our function to be 'frozen' in time until the viewport sizes change => after change we want to readjust the uResolution uniform => so we use 'useCallback()'

  const createFirework = useCallback(
    ({ count, position, size, texture, radius, color }) => {
      const pixelRatio = gl.getPixelRatio();

      //geometry
      const positionsArray = new Float32Array(count * 3);
      const sizesArray = new Float32Array(count);
      const timeMultipliersArray = new Float32Array(count);

      const spherical = new Spherical();
      const sphericalPosition = new Vector3();

      for (let i = 0; i < count; i++) {
        const i3 = i * 3;

        spherical.set(
          radius * (0.75 + Math.random() * 0.25),
          Math.random() * Math.PI,
          Math.random() * Math.PI * 2
        );

        sphericalPosition.setFromSpherical(spherical);

        positionsArray[i3] = sphericalPosition.x;
        positionsArray[i3 + 1] = sphericalPosition.y;
        positionsArray[i3 + 2] = sphericalPosition.z;

        sizesArray[i] = Math.random();
        timeMultipliersArray[i] = 1 + Math.random();
      }

      const geometry = new BufferGeometry();

      //attributes for the vertex shader

      geometry.setAttribute(
        "position",
        new Float32BufferAttribute(positionsArray, 3)
      );

      geometry.setAttribute("aSize", new Float32BufferAttribute(sizesArray, 1));

      geometry.setAttribute(
        "aTimeMultiplier",
        new Float32BufferAttribute(timeMultipliersArray, 1)
      );

      //shader material

      const material = new ShaderMaterial({
        vertexShader,
        fragmentShader,
        transparent: true,
        depthWrite: false,
        blending: AdditiveBlending,
        uniforms: {
          uSize: new Uniform(size),
          uResolution: new Uniform(
            new Vector2(sizes.width * pixelRatio, sizes.height * pixelRatio)
          ),
          uTexture: new Uniform(texture),
          uColor: new Uniform(color),
          uProgress: new Uniform(0),
        },
      });

      //individual points

      const firework = new Points(geometry, material);
      firework.position.copy(position);
      scene.add(firework);

      //destroy

      const destroy = () => {
        firework.removeFromParent();
        geometry.dispose();
        material.dispose();
      };

      //animating the fireworks

      gsap.timeline().to(material.uniforms.uProgress, {
        value: 1,
        duration: 3,
        ease: "linear",
        onComplete: destroy,
      });
    },
    [gl, scene, sizes]
  );

  //random firework values using the create firework function

  const createRandomFirework = useCallback(() => {
    const count = Math.round(400 + Math.random() * 1000);
    const position = new Vector3(
      (Math.random() - 0.5) * 2,
      Math.random(),
      (Math.random() - 0.5) * 2
    );
    const size = 0.1 + Math.random() * 0.1;
    const texture = textures[Math.floor(Math.random() * textures.length)];
    const radius = Math.random() + 1;
    const color = new Color();
    color.setHSL(Math.random(), 1, 0.7);

    createFirework({ count, position, size, texture, radius, color });
  }, [createFirework, textures]);

  useEffect(() => {
    if (firePressed) {
      createRandomFirework();
    }
  }, [createRandomFirework, firePressed, textures]);
}

useTexture.preload("../textures/fireworks/1.png");
useTexture.preload("../textures/fireworks/2.png");
useTexture.preload("../textures/fireworks/3.png");
useTexture.preload("../textures/fireworks/4.png");
useTexture.preload("../textures/fireworks/5.png");
useTexture.preload("../textures/fireworks/6.png");
useTexture.preload("../textures/fireworks/7.png");
useTexture.preload("../textures/fireworks/8.png");
