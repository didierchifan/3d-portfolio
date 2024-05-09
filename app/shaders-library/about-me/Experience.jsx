import { CameraControls, Center, shaderMaterial } from "@react-three/drei";

import * as THREE from "three";

import { useFrame } from "@react-three/fiber";

import { useState, useEffect, useRef } from "react";

import particlesVertexShader from "../../shaders-glsl/particleCursorAnimation/vertex.glsl";
import particlesFragmentShader from "../../shaders-glsl/particleCursorAnimation/fragment.glsl";

//the sizes object could be places in a component so it can be reused
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
  pixelRatio: Math.min(window.devicePixelRatio, 2),
};

//because we are outside of the main component, we have to use vanilla 3js texture loader, then pass it to the shader directly
const textureLoader = new THREE.TextureLoader();
const particlesGeometry = new THREE.PlaneGeometry(10, 10, 128, 128);

/**
 *
 * MAIN FUNCTION
 */

export default function Experience() {
  /**
   * 2D CANVAS -> CANVAS TEXTURE
   */
  const [canvas, setCanvas] = useState(null);
  const [context, setContext] = useState(null);

  const [canvasCursorX, setCanvasCursorX] = useState(0);
  const [canvasCursorY, setCanvasCursorY] = useState(0);

  const shaderMaterial = useRef();

  useEffect(() => {
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

    // Set the canvas and context state variables
    setCanvas(newCanvas);
    setContext(newCanvas.getContext("2d"));

    // Initialize canvas with black background and blend mode
    const ctx = newCanvas.getContext("2d");
    ctx.fillRect(0, 0, newCanvas.width, newCanvas.height);

    return () => {
      // remove the canvas from the DOM
      document.body.removeChild(newCanvas);
    };
  }, []);

  const glowImage = new Image();
  glowImage.src = "../textures/particleCursorAnimation/glow.png";

  const drawOnMove = function (e) {
    // Ensure canvas and context are available
    if (!canvas || !context) return;
    //calculate the canvas coordoninates from onPointerMove function
    const uv = e.intersections[0].uv;
    const newCanvasCursorX = uv.x * canvas.width;
    const newCanvasCursorY = (1 - uv.y) * canvas.height;

    setCanvasCursorX(newCanvasCursorX);
    setCanvasCursorY(newCanvasCursorY);
  };

  const displacementTexture = useRef();
  useEffect(() => {
    if (canvas) {
      displacementTexture.current = new THREE.CanvasTexture(canvas);
    }
  }, [canvas]);

  useFrame((state, delta) => {
    // Check if context and canvas are available
    if (!context || !canvas) return;

    //displacement
    context.globalCompositeOperation = "source-over";
    context.globalAlpha = 0.02;
    context.fillRect(0, 0, canvas.width, canvas.height);

    //speed alpha -> when the cursor stays, the particles remain exploded -> there is a fix in the lesson

    //draw glow
    const glowSize = canvas.width * 0.25;
    context.globalCompositeOperation = "lighten";
    context.globalAlpha = 1;
    context.drawImage(
      glowImage,
      canvasCursorX - glowSize * 0.5,
      canvasCursorY - glowSize * 0.5,
      glowSize,
      glowSize
    );

    // Update displacement texture
    displacementTexture.current.needsUpdate = true;
  });
  console.log(displacementTexture.current);

  return (
    <>
      <CameraControls />
      <Center>
        <points geometry={particlesGeometry}>
          <shaderMaterial
            ref={shaderMaterial}
            vertexShader={particlesVertexShader}
            fragmentShader={particlesFragmentShader}
            uniforms={{
              uResolution: new THREE.Uniform(
                new THREE.Vector2(
                  sizes.width * sizes.pixelRatio,
                  sizes.height * sizes.pixelRatio
                )
              ),
              uPictureTexture: new THREE.Uniform(
                textureLoader.load(
                  "../textures/particleCursorAnimation/picture-1.png"
                )
              ),
              uDisplacementTexture: new THREE.Uniform(
                displacementTexture.current
              ),
            }}
          />
        </points>

        <mesh onPointerMove={drawOnMove}>
          <planeGeometry args={[10, 10]} />
          <meshBasicMaterial wireframe={true} side={THREE.DoubleSide} />
        </mesh>
      </Center>
    </>
  );
}
