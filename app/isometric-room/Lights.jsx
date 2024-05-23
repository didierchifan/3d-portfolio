import { useMemo } from "react";

import * as THREE from "three";
import useLeva from "./useLeva";

export default function Lights() {
  const {
    goToSleep,
    bgcolor,
    donutLight,
    ackjaLampOn,
    spotLampOn,
    color,
    strength,
  } = useLeva();

  // painting spotlight
  const spotlight = useMemo(() => new THREE.SpotLight("#fff"), []);

  return (
    <>
      <ambientLight intensity={2.3} />

      {/* tv ambient light */}
      <rectAreaLight
        width={1.0}
        height={0.5}
        intensity={strength}
        color={color}
        position-x={-0.08}
        position-y={-0.11}
        position-z={-1.92}
        rotation-x={3.12}
        rotation-y={3.15}
        rotation-z={0}
      />

      {/* ikea donut light */}
      <rectAreaLight
        width={0.3}
        height={0.3}
        position={[-1.14, 0.53, -1.75]}
        intensity={donutLight}
        color={"#ff8f00"}
      />

      <pointLight
        position-x={-1.88}
        position-y={0.9}
        position-z={-0.43}
        intensity={ackjaLampOn ? 5 : 0}
        color={"#fff59f"}
        distance={1.5}
        decay={0.5}
      />

      {/* painting spotlight */}
      <group position-z={-0.55}>
        <primitive
          object={spotlight}
          position-x={2.03}
          position-y={1.7}
          position-z={0}
          intensity={spotLampOn ? 80 : 0}
          decay={0.5}
          distance={1.68}
          angle={1.2}
          penumbra={0.5}
        />
        <primitive
          object={spotlight.target}
          position={[0.1, 0.2, 0]}
          rotation={[Math.PI / 2, Math.PI / 2, Math.PI / 2]}
        />
      </group>
    </>
  );
}

{
  /* laptop light */
}
{
  /* <rectAreaLight
    width={0.1}
    height={0.1}
    intensity={500}
    color={"#2004fc"}
    position={[1.551, 1, -0.502]}
    rotation={[Math.PI / 2, -0.254, Math.PI / 2]}
  /> */
}
