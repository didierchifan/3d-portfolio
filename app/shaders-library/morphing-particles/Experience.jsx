import { useMemo, useRef, useEffect } from "react";
import * as THREE from "three";
import { extend } from "@react-three/fiber";
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
    uSize: 0.07,
    uResolution: new THREE.Vector2(
      window.innerWidth * Math.min(window.devicePixelRatio, 2),
      window.innerHeight * Math.min(window.devicePixelRatio, 2)
    ),
    uProgress: 0,
  },
  morphingParticlesVertexShader,
  morphingParticlesFragmentShader
);

extend({ MorphingParticlesMaterial: MorphingParticlesMaterial });

export default function Experience() {
  //leva gui
  const { color, progress, morph0, morph1, morph2, morph3 } = useControls({
    color: { value: "#FFFFFF" },
    progress: { value: 0, min: 0, max: 1, step: 0.01 },
    morph0: button(() => {
      // Animate uProgress
      gsap.fromTo(
        progress,
        { value: 0 },
        {
          value: 1,
          duration: 3,
          ease: "linear",
          onUpdate: () => {
            console.log(progress);
          },
        }
      );
    }),
    morph1: button(() => morph.current()),
    morph2: button(() => console.log("morph2")),
    morph3: button(() => console.log("morph3")),
  });

  // load the 3d models
  const models = useGLTF("../3dModels/morphing-particles/models.glb");

  //references
  const materialRef = useRef();
  const particlesGeometry = useRef();
  const particlesIndex = useRef(0);
  const morph = useRef();

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

    particlesGeometry.current.setAttribute(
      "position",
      particlesPositions[particlesIndex.current]
    );
    particlesGeometry.current.setAttribute(
      "aPositionTarget",
      particlesPositions[3]
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
        progress,
        { value: 0 },
        {
          value: 1,
          duration: 3,
          ease: "linear",
          onUpdate: () => {
            console.log(progress);
          },
        }
      );

      // Save index
      particlesIndex.current = index;
    };

    morph.current = () => {
      particlesMorph(3);
    };

    // cleanup function to remove the event listener when component is unmounted
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [models.scene.children, particlesIndex, progress]);

  return (
    <>
      <CameraControls />
      <ambientLight intensity={10} />
      <Center>
        <points>
          <bufferGeometry ref={particlesGeometry} />
          <morphingParticlesMaterial
            ref={materialRef}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
            uProgress={progress}
          />
        </points>
      </Center>
    </>
  );
}
