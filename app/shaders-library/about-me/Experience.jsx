import { CameraControls, Center } from "@react-three/drei";
import { BoxGeometry } from "three";

export default function Experience() {
  return (
    <>
      <CameraControls />
      <Center>
        <mesh>
          <torusKnotGeometry args={[0.6, 0.25, 128, 32]} />
          <meshBasicMaterial />
        </mesh>
      </Center>
    </>
  );
}
