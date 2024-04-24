import { CameraControls, useGLTF, Center } from "@react-three/drei";

import coffeeSmokeVertexShader from "../../shaders-glsl/coffeeSmoke/vertex.glsl";
import coffeeSmokeFragmentShader from "../../shaders-glsl/coffeeSmoke/fragment.glsl";

console.log(coffeeSmokeFragmentShader);
console.log(coffeeSmokeVertexShader);

import * as THREE from "three";

export default function Experience() {
  const { nodes } = useGLTF("../3dModels/bakedModel.glb");

  const mesh = nodes.baked;

  return (
    <>
      <CameraControls />
      <ambientLight intensity={1} />

      <Center>
        <mesh geometry={mesh.geometry} material={mesh.material} />

        <mesh scale={[1.5, 3, 1.5]} position={[0, 1.5, 0]}>
          <planeGeometry args={[1, 1, 16, 64]}></planeGeometry>
          <shaderMaterial side={THREE.DoubleSide} />
        </mesh>
      </Center>
    </>
  );
}
