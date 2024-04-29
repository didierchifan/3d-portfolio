import { CameraControls, useGLTF, Center, useTexture } from "@react-three/drei";

export default function Experience() {
  return (
    <>
      <CameraControls />

      <Center>
        <mesh>
          <boxGeometry />
          <meshBasicMaterial />
        </mesh>
      </Center>
    </>
  );
}
