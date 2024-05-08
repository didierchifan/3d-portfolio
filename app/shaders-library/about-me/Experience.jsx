import { CameraControls, Center, shaderMaterial } from "@react-three/drei";

import * as THREE from "three";

import { Canvas, extend } from "@react-three/fiber";
import { useRef, useState } from "react";

import particlesVertexShader from "../../shaders-glsl/particleCursorAnimation/vertex.glsl";
import particlesFragmentShader from "../../shaders-glsl/particleCursorAnimation/fragment.glsl";
import CustomCanvas from "./2dCanvas";

//the sizes object could be places in a component so it can be reused
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
  pixelRatio: Math.min(window.devicePixelRatio, 2),
};

//because we are outside of the main component, we have to use vanilla 3js texture loader, then pass it to the shader directly
const textureLoader = new THREE.TextureLoader();
const pictureTexture = textureLoader.load(
  "../textures/particleCursorAnimation/picture-1.png"
);

const ParticlesMaterial = shaderMaterial(
  {
    uResolution: new THREE.Vector2(
      sizes.width * sizes.pixelRatio,
      sizes.height * sizes.pixelRatio
    ),
    uPictureTexture: pictureTexture,
  },
  particlesVertexShader,
  particlesFragmentShader
);

extend({ ParticlesMaterial: ParticlesMaterial });

const particlesGeometry = new THREE.PlaneGeometry(10, 10, 128, 128);

export default function Experience() {
  const [canvasWidth, setCanvasWidth] = useState(128);
  const [canvasHeight, setCanvasHeight] = useState(128);

  const screenCursor = new THREE.Vector2(9999, 9999);
  const canvasCursor = new THREE.Vector2(9999, 9999);

  return (
    <>
      <CameraControls />
      <Center>
        <CustomCanvas canvasHeight={canvasHeight} canvasWidth={canvasWidth} />

        <points geometry={particlesGeometry}>
          <particlesMaterial />
        </points>

        <mesh
          onPointerMove={(e) => {
            const uv = e.intersections[0].uv;
            canvasCursor.x = uv.x * canvasWidth;
            canvasCursor.y = uv.y * canvasHeight;
            //here we have the pixel coordinates
          }}
        >
          <planeGeometry args={[10, 10]} />
          <meshBasicMaterial wireframe={true} side={THREE.DoubleSide} />
        </mesh>
      </Center>
    </>
  );
}
