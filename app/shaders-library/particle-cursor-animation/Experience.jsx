"use client";
import {
  shaderMaterial,
  CameraControls,
  Center,
  useTexture,
} from "@react-three/drei";
import * as THREE from "three";

import { useEffect, useRef, useState } from "react";

import { extend, useFrame } from "@react-three/fiber";

import particlesVertexShader from "../../shaders-glsl/particleCursorAnimation/vertex.glsl";
import particlesFragmentShader from "../../shaders-glsl/particleCursorAnimation/fragment.glsl";

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
  pixelRatio: Math.min(window.devicePixelRatio, 2),
};

const ParticlesMaterial = shaderMaterial(
  {
    uResolution: new THREE.Vector2(
      sizes.width * sizes.pixelRatio,
      sizes.height * sizes.pixelRatio
    ),
    uPictureTexture: null,
    uDisplacementTexture: null,
  },
  particlesVertexShader,
  particlesFragmentShader
);

extend({ ParticlesMaterial: ParticlesMaterial });

export default function Experience() {
  console.log(window.innerWidth, window.innerHeight, window.devicePixelRatio);
  //store all the canvas information in an object that will persist across renderings
  const canvasInfo = useRef({
    displacementTexture: null,
    canvas: null,
    context: null,
    canvasCursor: new THREE.Vector2(9999, 9999),
    canvaCursorPrevious: new THREE.Vector2(9999, 9999),
  });
  const materialRef = useRef();
  const particlesGeometry = useRef();

  const pictureTexture = useTexture(
    "../textures/particleCursorAnimation/picture-1.png"
  );

  /**
   * 2D CANVAS -> CANVAS TEXTURE
   */
  useEffect(() => {
    //particles geometry attributes that are sent to the shader
    particlesGeometry.current.setIndex(null);
    particlesGeometry.current.deleteAttribute("normal");

    const intensitiesArray = new Float32Array(
      particlesGeometry.current.attributes.position.count
    );
    const anglesArray = new Float32Array(
      particlesGeometry.current.attributes.position.count
    );

    for (
      let i = 1;
      i < particlesGeometry.current.attributes.position.count;
      i++
    ) {
      intensitiesArray[i] = Math.random();
      anglesArray[i] = Math.random() * Math.PI * 2;
    }
    particlesGeometry.current.setAttribute(
      "aIntensity",
      new THREE.BufferAttribute(intensitiesArray, 1)
    );
    particlesGeometry.current.setAttribute(
      "aAngle",
      new THREE.BufferAttribute(anglesArray, 1)
    );

    // Create the 2D canvas
    const newCanvas = document.createElement("canvas");
    newCanvas.width = 128;
    newCanvas.height = 128;

    // Style the canvas
    newCanvas.style.position = "fixed";
    newCanvas.style.width = "256px";
    newCanvas.style.height = "256px";
    newCanvas.style.top = "0";
    newCanvas.style.right = "0";
    newCanvas.style.zIndex = 1000;

    // Add the canvas to the DOM
    document.body.append(newCanvas);

    // Initialize canvas with black background and blend mode
    const canvasContext = newCanvas.getContext("2d");
    canvasContext.fillRect(0, 0, newCanvas.width, newCanvas.height);

    canvasInfo.current.canvas = newCanvas;
    canvasInfo.current.context = canvasContext;

    // create the displacement texture that it is sent to the shader
    canvasInfo.current.displacementTexture = new THREE.CanvasTexture(
      canvasInfo.current.canvas
    );

    //update the displacement texture directly in the shader material
    materialRef.current.uniforms.uDisplacementTexture.value =
      canvasInfo.current.displacementTexture;

    return () => {
      // remove the canvas from the DOM
      document.body.removeChild(newCanvas);
    };
  }, []);

  //the function below extracts the cursor coordinates
  const drawOnMove = function (e) {
    // Ensure canvas and context are available
    if (!canvasInfo.current.canvas || !canvasInfo.current.context) return;

    //calculate the canvas coordoninates from onPointerMove function
    const uv = e.intersections[0].uv;
    const newCanvasCursorX = uv.x * canvasInfo.current.canvas.width;
    const newCanvasCursorY = (1 - uv.y) * canvasInfo.current.canvas.height;

    //save the canvas cursor position inside the canvas Info ref object
    canvasInfo.current.canvasCursor.x = newCanvasCursorX;
    canvasInfo.current.canvasCursor.y = newCanvasCursorY;
  };

  const brushTexture = new Image();
  brushTexture.src = "../textures/particleCursorAnimation/glow.png";

  useFrame((state, delta) => {
    // Check if context and canvas are available
    if (!canvasInfo.current.context || !canvasInfo.current.canvas) return;

    //displacement
    canvasInfo.current.context.globalCompositeOperation = "source-over";
    canvasInfo.current.context.globalAlpha = 0.02;
    canvasInfo.current.context.fillRect(
      0,
      0,
      canvasInfo.current.canvas.width,
      canvasInfo.current.canvas.height
    );

    //speed alpha
    //we calculate the distance the previous and the present cursor position
    const cursorDistance = canvasInfo.current.canvaCursorPrevious.distanceTo(
      canvasInfo.current.canvasCursor
    );
    const alpha = Math.min(cursorDistance * 0.1, 1);
    canvasInfo.current.canvaCursorPrevious.copy(
      canvasInfo.current.canvasCursor
    );

    //draw glow
    const glowSize = canvasInfo.current.canvas.width * 0.25;
    canvasInfo.current.context.globalCompositeOperation = "lighten";
    canvasInfo.current.context.globalAlpha = alpha;
    canvasInfo.current.context.drawImage(
      brushTexture,
      canvasInfo.current.canvasCursor.x - glowSize * 0.5,
      canvasInfo.current.canvasCursor.y - glowSize * 0.5,
      glowSize,
      glowSize
    );

    // update the canvas texture that it is sent to the shader
    canvasInfo.current.displacementTexture.needsUpdate = true;
  });

  return (
    <>
      <CameraControls />
      <ambientLight intensity={10} />
      <Center>
        <points>
          <planeGeometry ref={particlesGeometry} args={[10, 10, 128, 128]} />
          <particlesMaterial
            ref={materialRef}
            uPictureTexture={pictureTexture}
            uDisplacementTexture={canvasInfo.current.displacementTexture}
          />
        </points>

        <mesh onPointerMove={drawOnMove}>
          <planeGeometry args={[10, 10]} />
          <meshBasicMaterial
            wireframe={true}
            side={THREE.DoubleSide}
            visible={false}
          />
        </mesh>
      </Center>
    </>
  );
}
