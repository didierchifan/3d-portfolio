"use client";

import { useRef } from "react";
import { CameraControls, Center, Sparkles } from "@react-three/drei";

import Model from "./Model";
import Lights from "./Lights";

import { Perf } from "r3f-perf";

export default function Experience() {
  const cameraControlsRef = useRef();
  return (
    <>
      {/* <Perf /> */}
      <CameraControls
        ref={cameraControlsRef}
        makeDefault={true}
        //up-down limits
        minPolarAngle={-0.5}
        maxPolarAngle={Math.PI / 2}
        //left-right limits
        azimuthAngle={5.5}
        minAzimuthAngle={Math.PI * 2 - 1.57}
        maxAzimuthAngle={Math.PI * 2}
      />

      <Sparkles
        size={3}
        scale={[0.4, 0.4, 0.4]}
        position-y={-1}
        position-x={-0.5}
        position-z={-0.6}
        speed={0.3}
        count={50}
      />

      <Lights />

      <Center>
        <Model cameraControlsRef={cameraControlsRef} />
      </Center>
    </>
  );
}
