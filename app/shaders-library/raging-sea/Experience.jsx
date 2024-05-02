import {
  shaderMaterial,
  CameraControls,
  useGLTF,
  Center,
} from "@react-three/drei";
import * as THREE from "three";

import { extend, useFrame } from "@react-three/fiber";
import { useRef } from "react";

import { useControls } from "leva";
import { ToneMapping } from "@react-three/postprocessing";

import waterVertexShader from "../../shaders-glsl/water/vertex.glsl";
import waterFragmentShader from "../../shaders-glsl/water/fragment.glsl";

const WaterMaterial = shaderMaterial(
  {
    uTime: 0,

    uBigWavesElevation: 0.2,
    uBigWavesFrequency: new THREE.Vector2(4, 1.5),
    uBigWavesSpeed: 0.75,

    uSmallWavesElevation: 0.15,
    uSmallWavesFrequency: 3,
    uSmallWavesSpeed: 0.2,
    uSmallIterations: 4,

    uDepthColor: new THREE.Color("#ff4000"),
    uSurfaceColor: new THREE.Color("#151c37"),
    uColorOffset: 0.925,
    uColorMultiplier: 1,
  },
  waterVertexShader,
  waterFragmentShader
);

extend({ WaterMaterial: WaterMaterial });

export default function Experience() {
  //leva GUI
  const {
    color1,
    color2,
    uBigWavesElevation,
    uBigWavesFrequencyX,
    uBigWavesFrequencyY,
    uBigWavesSpeed,
    uSmallWavesElevation,
    uSmallWavesFrequency,
    uSmallWavesSpeed,
    uSmallIterations,
    uColorOffset,
    uColorMultiplier,
  } = useControls({
    color1: { value: "#5c74c7" },
    color2: { value: "#0033ff" },

    uBigWavesElevation: { value: 0.2, min: 0, max: 1, step: 0.001 },
    uBigWavesFrequencyX: { value: 4, min: 0, max: 10, step: 0.001 },
    uBigWavesFrequencyY: { value: 1.5, min: 0, max: 10, step: 0.001 },
    uBigWavesSpeed: { value: 0.75, min: 0, max: 4, step: 0.001 },

    uSmallWavesElevation: { value: 0.15, min: 0, max: 1, step: 0.001 },
    uSmallWavesFrequency: { value: 3, min: 0, max: 30, step: 0.001 },
    uSmallWavesSpeed: { value: 0.2, min: 0, max: 4, step: 0.001 },
    uSmallIterations: { value: 4, min: 0, max: 5, step: 1 },

    uColorOffset: { value: 0.925, min: 0, max: 1, step: 0.001 },
    uColorMultiplier: { value: 1, min: 0, max: 10, step: 0.001 },
  });

  const waterMaterial = useRef();

  //it would be cool to animate other properties
  useFrame((state, delta) => {
    waterMaterial.current.uTime += delta;

    // waterMaterial.current.uSmallWavesSpeed += Math.sin(delta) * 0.02;
  });

  return (
    <>
      <ToneMapping
        adaptive={true} // toggle adaptive luminance map usage
        resolution={256} // texture resolution of the luminance map
        middleGrey={0.6} // middle grey factor
        maxLuminance={16.0} // maximum luminance
        averageLuminance={1.0} // average luminance
        adaptationRate={1.0} // luminance adaptation rate
      />
      <CameraControls />
      <ambientLight intensity={5} />
      <Center>
        <mesh rotation={[-Math.PI * 0.5, 0, 0]}>
          <planeGeometry args={[2, 2, 512, 512]} />
          {/* <meshStandardMaterial side={THREE.DoubleSide} color={color1} /> */}
          <waterMaterial
            ref={waterMaterial}
            uBigWavesElevation={uBigWavesElevation}
            uBigWavesFrequency={
              new THREE.Vector2(uBigWavesFrequencyX, uBigWavesFrequencyY)
            }
            uBigWavesSpeed={uBigWavesSpeed}
            uSmallWavesElevation={uSmallWavesElevation}
            uSmallWavesFrequency={uSmallWavesFrequency}
            uSmallWavesSpeed={uSmallWavesSpeed}
            uSmallIterations={uSmallIterations}
            uDepthColor={color1}
            uSurfaceColor={color2}
            uColorOffset={uColorOffset}
            uColorMultiplier={uColorMultiplier}
          />
        </mesh>
      </Center>
    </>
  );
}
