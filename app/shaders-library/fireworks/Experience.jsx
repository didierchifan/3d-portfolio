import { CameraControls, Center } from "@react-three/drei";
import { useEffect } from "react";
import Firework from "./Firework";

import useFireworks from "./hooks/useFireworks";

export default function Experience() {
  return (
    <>
      <CameraControls />

      <Center>
        <Firework />
      </Center>
    </>
  );
}
