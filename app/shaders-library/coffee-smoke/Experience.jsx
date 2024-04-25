import { CameraControls, useGLTF, Center, useTexture } from "@react-three/drei";

import { useFrame } from "@react-three/fiber";

import { useRef } from "react";

import coffeeSmokeVertexShader from "../../shaders-glsl/coffeeSmoke/vertex.glsl";
import coffeeSmokeFragmentShader from "../../shaders-glsl/coffeeSmoke/fragment.glsl";

import * as THREE from "three";

const smokeGeometry = new THREE.PlaneGeometry(1, 1, 16, 64);
smokeGeometry.translate(0, 0.5, 0);
smokeGeometry.scale(1.5, 6, 1.5);

export default function Experience() {
  const { nodes } = useGLTF("../3dModels/bakedModel.glb");
  const perlinTexture = useTexture("../textures/coffee-smoke/perlin.png");
  perlinTexture.wrapS = THREE.RepeatWrapping;
  perlinTexture.wrapT = THREE.RepeatWrapping;

  const mesh = nodes.baked;

  const coffeeSmokeMaterial = useRef();

  useFrame((state, delta) => {
    coffeeSmokeMaterial.current.uniforms.uTime.value += delta;
  });

  return (
    <>
      <CameraControls />
      <ambientLight intensity={1} />

      <Center>
        <mesh geometry={mesh.geometry} material={mesh.material} />

        <mesh geometry={smokeGeometry}>
          <shaderMaterial
            ref={coffeeSmokeMaterial}
            vertexShader={coffeeSmokeVertexShader}
            fragmentShader={coffeeSmokeFragmentShader}
            transparent={true}
            depthWrite={false}
            uniforms={{
              uTime: { value: 0 },
              uPerlinTexture: new THREE.Uniform(perlinTexture),
            }}
            side={THREE.DoubleSide}
          />
        </mesh>
      </Center>
    </>
  );
}
