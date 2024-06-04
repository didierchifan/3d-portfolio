import { useVideoTexture } from "@react-three/drei";
import { SRGBColorSpace } from "three";
import * as THREE from "three";

const ShadersVideo = ({ src }) => {
  const texture = useVideoTexture(src);
  texture.colorSpace = THREE.SRGBColorSpace;
  return <meshBasicMaterial map={texture} toneMapped={false} />;
};

export default ShadersVideo;
