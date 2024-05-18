"use client";
import { useMemo, useRef, useEffect } from "react";
import * as THREE from "three";
import { extend, useFrame } from "@react-three/fiber";
import {
  shaderMaterial,
  CameraControls,
  Center,
  useTexture,
  useGLTF,
} from "@react-three/drei";
import { useControls, button } from "leva";

import gsap from "gsap";

import morphingParticlesVertexShader from "../../shaders-glsl/morphing-particles/vertex.glsl";
import morphingParticlesFragmentShader from "../../shaders-glsl/morphing-particles/fragment.glsl";

const MorphingParticlesMaterial = shaderMaterial(
  {
    //to ask on discord => why is always my particles size bigger than in lessons 0.4 lesson => 0.2 my project
    uSize: 0.13,
    uResolution: new THREE.Vector2(),
    uProgress: 0,
    uColorA: new THREE.Color(),
    uColorB: new THREE.Color(),
  },
  morphingParticlesVertexShader,
  morphingParticlesFragmentShader
);

extend({ MorphingParticlesMaterial: MorphingParticlesMaterial });

export default function Experience() {
  //leva gui
  const { morph0, morph1, morph2, morph3, colorA, colorB } = useControls({
    colorA: { value: "#ff7300" },
    colorB: { value: "#0091ff" },

    morph0: button(() => {
      morphAnimation0.current();
    }),
    morph1: button(() => {
      morphAnimation1.current();
    }),
    morph2: button(() => {
      morphAnimation2.current();
    }),
    morph3: button(() => {
      morphAnimation3.current();
    }),
  });

  // load the 3d models
  const models = useGLTF("../3dModels/morphing-particles/models.glb");
  const testProgress = useRef({ value: 0 });

  //references
  const materialRef = useRef();
  const particlesGeometry = useRef();
  const particlesIndex = useRef(0);
  const morphAnimation0 = useRef();
  const morphAnimation1 = useRef();
  const morphAnimation2 = useRef();
  const morphAnimation3 = useRef();

  useEffect(() => {
    //very important to do this => particles size scale when viewport scaled on y
    const handleResize = () => {
      materialRef.current.uResolution.set(
        window.innerWidth * Math.min(window.devicePixelRatio, 2),
        window.innerHeight * Math.min(window.devicePixelRatio, 2)
      );
    };
    window.addEventListener("resize", handleResize);

    // the code below can be optimized to use array methods like reduce
    // get the vertex positions of the 3d models
    const positions = models.scene.children.map((child) => {
      return child.geometry.attributes.position;
    });

    let particlesMaxCount = 0;
    for (const position of positions) {
      if (position.count > particlesMaxCount)
        particlesMaxCount = position.count;
    }

    const particlesPositions = [];
    for (const position of positions) {
      const originalArray = position.array;
      const newArray = new Float32Array(particlesMaxCount * 3);

      for (let i = 0; i < particlesMaxCount; i++) {
        // 3 x 3 => x, y, z
        const i3 = i * 3;
        if (i3 < originalArray.length) {
          newArray[i3 + 0] = originalArray[i3 + 0]; //x
          newArray[i3 + 1] = originalArray[i3 + 1]; //y
          newArray[i3 + 2] = originalArray[i3 + 2]; //z
        } else {
          const randomIndex = Math.floor(position.count * Math.random()) * 3; //we need to go 3x3
          newArray[i3 + 0] = originalArray[randomIndex + 0]; //x
          newArray[i3 + 1] = originalArray[randomIndex + 1]; //y
          newArray[i3 + 2] = originalArray[randomIndex + 2]; //z
        }
      }

      particlesPositions.push(new THREE.Float32BufferAttribute(newArray, 3));
    }

    //random particle sizes
    const sizesArray = new Float32Array(particlesMaxCount);
    for (let i = 0; i < particlesMaxCount; i++) {
      sizesArray[i] = Math.random();
    }

    particlesGeometry.current.setAttribute(
      "position",
      particlesPositions[particlesIndex.current]
    );
    particlesGeometry.current.setAttribute(
      "aPositionTarget",
      particlesPositions[3]
    );
    particlesGeometry.current.setAttribute(
      "aSize",
      new THREE.BufferAttribute(sizesArray, 1)
    );

    // morphing function to be sent to
    const particlesMorph = (index) => {
      // Update attributes
      particlesGeometry.current.attributes.position =
        particlesPositions[particlesIndex.current];
      particlesGeometry.current.attributes.aPositionTarget =
        particlesPositions[index];

      // Animate uProgress
      gsap.fromTo(
        testProgress.current,
        { value: 0 },
        {
          value: 1,
          duration: 3,
          ease: "linear",
        }
      );

      // Save index
      particlesIndex.current = index;
    };

    morphAnimation0.current = () => {
      particlesMorph(0);
    };
    morphAnimation1.current = () => {
      particlesMorph(1);
    };
    morphAnimation2.current = () => {
      particlesMorph(2);
    };
    morphAnimation3.current = () => {
      particlesMorph(3);
    };

    // cleanup function to remove the event listener when component is unmounted
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [models.scene.children, particlesIndex, testProgress]);

  //ensure the uProgress is synced with the gsap animation
  useFrame(() => {
    materialRef.current.uProgress = testProgress.current.value;
  });

  return (
    <>
      <CameraControls />
      <ambientLight intensity={10} />
      <Center>
        <points frustumCulled={false}>
          <bufferGeometry ref={particlesGeometry} />
          <morphingParticlesMaterial
            ref={materialRef}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
            uProgress={testProgress.current.value}
            uResolution={
              new THREE.Vector2(
                window.innerWidth * Math.min(window.devicePixelRatio, 2),
                window.innerHeight * Math.min(window.devicePixelRatio, 2)
              )
            }
            uColorA={colorA}
            uColorB={colorB}
          />
        </points>
      </Center>
    </>
  );
}
