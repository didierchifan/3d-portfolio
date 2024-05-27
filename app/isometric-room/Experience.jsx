"use client";

import { useMemo } from "react";
import { CameraControls, Center } from "@react-three/drei";

import Model from "./Model";
import Lights from "./Lights";

export default function Experience() {
  return (
    <>
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
      <Lights />
      <Center>
        <Model />
      </Center>
    </>
  );
}
