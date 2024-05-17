// "use client";
// import {
//   shaderMaterial,
//   CameraControls,
//   useGLTF,
//   useTexture,
//   Center,
//   SpotLight,
//   SpotLightShadow,
//   useHelper,
// } from "@react-three/drei";
// import * as THREE from "three";

// import { extend, useFrame } from "@react-three/fiber";

// //vanilla THREE.jS
// const textureLoader = new THREE.TextureLoader();
// const mapTexture = textureLoader.load("../3dModels/LeePerrySmith/color.jpg");
// mapTexture.colorSpace = THREE.SRGBColorSpace;

// const material = new THREE.MeshStandardMaterial({
//   map: mapTexture,
// });

// const depthMaterial = new THREE.MeshDepthMaterial({
//   depthPacking: THREE.RGBADepthPacking,
// });

// const customUniforms = {
//   uTime: { value: 10 },
// };
// material.onBeforeCompile = (shader) => {
//   shader.uniforms.uTime = customUniforms.uTime;
//   shader.vertexShader = shader.vertexShader.replace(
//     "#include <common>",
//     `
//       #include <common>

//       uniform float uTime;

//       mat2 get2dRotateMatrix(float _angle)
//       {
//           return mat2(cos(_angle), - sin(_angle), sin(_angle), cos(_angle));
//       }
//     `
//   );

//   shader.vertexShader = shader.vertexShader.replace(
//     "#include <beginnormal_vertex>",
//     `
//     #include <beginnormal_vertex>

//     float angle = sin(position.y + uTime) * 0.4 ;
//     mat2 rotateMatrix = get2dRotateMatrix(angle);

//     objectNormal.xz = rotateMatrix * objectNormal.xz;

//     `
//   );

//   shader.vertexShader = shader.vertexShader.replace(
//     "#include <begin_vertex>",
//     `
//       #include <begin_vertex>

//       transformed.xz = rotateMatrix * transformed.xz;
//     `
//   );
// };

// depthMaterial.onBeforeCompile = (shader) => {
//   shader.uniforms.uTime = customUniforms.uTime;
//   shader.vertexShader = shader.vertexShader.replace(
//     "#include <common>",
//     `
//         #include <common>

//         uniform float uTime;

//         mat2 get2dRotateMatrix(float _angle)
//         {
//             return mat2(cos(_angle), - sin(_angle), sin(_angle), cos(_angle));
//         }
//       `
//   );

//   shader.vertexShader = shader.vertexShader.replace(
//     "#include <begin_vertex>",
//     `
//         #include <begin_vertex>

//         float angle = sin(position.y + uTime) * 0.4 ;
//         mat2 rotateMatrix = get2dRotateMatrix(angle);

//         transformed.xz = rotateMatrix * transformed.xz;
//       `
//   );
// };

// export default function Experience() {
//   const { nodes } = useGLTF("../3dModels/LeePerrySmith/LeePerrySmith.glb");
//   const normalMap = useTexture("../3dModels/LeePerrySmith/normal.jpg");

//   useFrame((state, delta) => {
//     customUniforms.uTime.value += delta;
//   });

//   return (
//     <>
//       <ambientLight intensity={0.1} />

//       <directionalLight
//         color="#ffffff"
//         intensity={3}
//         position={[0.25, 2, -2.25]}
//         shadow-mapSize={[1024, 1024]}
//         shadow-camera-far={15}
//         shadow-camera-normalBias={0.05}
//       />

//       <CameraControls />
//       <Center>
//         <mesh
//           geometry={nodes.LeePerrySmith.geometry}
//           material={material}
//           normalMap={normalMap}
//           rotation-y={Math.PI * 0.5}
//         ></mesh>
//       </Center>
//     </>
//   );
// }

"use client";
import { useMemo, useRef, useEffect } from "react";
import * as THREE from "three";
import { extend } from "@react-three/fiber";
import {
  shaderMaterial,
  CameraControls,
  Center,
  useTexture,
  useGLTF,
  Environment,
  useHelper,
  MeshWobbleMaterial,
} from "@react-three/drei";
import { useControls } from "leva";
import { DirectionalLightHelper } from "three";
import { color } from "framer-motion";

function useLoadedTexture(texture) {
  const loadedTexture = useTexture(texture);
  if (loadedTexture) {
    loadedTexture.colorSpace = THREE.SRGBColorSpace; // Set the correct encoding
    loadedTexture.flipY = "false";
  }
  return loadedTexture;
}

export default function Experience() {
  const { nodes, materials } = useGLTF(
    "../3dModels/LeePerrySmith/LeePerrySmith.glb"
  );

  const colorTexture = useLoadedTexture("../3dModels/LeePerrySmith/color.jpg");
  const material = new THREE.MeshStandardMaterial({ map: colorTexture });

  const normalTexture = useLoadedTexture(
    "../3dModels/LeePerrySmith/normal.jpg"
  );

  return (
    <>
      <CameraControls />
      <ambientLight intensity={0.8} />
      <Center>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.LeePerrySmith.geometry}
          material={material}
          normalTexture={normalTexture}
        >
          <MeshWobbleMaterial />
        </mesh>
      </Center>
    </>
  );
}
useGLTF.preload("../3dModels/LeePerrySmith/LeePerrySmith.glb");
