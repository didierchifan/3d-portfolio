import { CameraControls, useGLTF, Center, useTexture } from "@react-three/drei";

export default function Experience() {
  const { nodes } = useGLTF("../3dModels/bakedModel.glb");

  const mesh = nodes.baked;

  return (
    <>
      <CameraControls />
      <Center>
        <mesh geometry={mesh.geometry} material={mesh.material} />
      </Center>
    </>
  );
}
