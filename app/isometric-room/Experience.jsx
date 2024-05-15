"use client";

import { CameraControls, Center } from "@react-three/drei";
import Model from "./Model";

export default function Experience() {
  return (
    <>
      {/* background color */}
      <color args={["#181818"]} attach="background" />

      <CameraControls
        makeDefault={true}
        //up-down limits
        minPolarAngle={-0.5}
        maxPolarAngle={Math.PI / 2}
        //left-right limits
        azimuthAngle={5.5}
        minAzimuthAngle={Math.PI * 2 - 1.57}
        maxAzimuthAngle={Math.PI * 2}
      />
      <ambientLight intensity={2.3} />
      <Center>
        <Model />
      </Center>
    </>
  );
}
