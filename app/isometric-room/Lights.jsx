import { useEffect, useState, useMemo, useRef } from "react";

import { useHelper } from "@react-three/drei";

import * as THREE from "three";
import useLeva from "./useLeva";

export default function Lights() {
  const lightRef = useRef();
  useHelper(lightRef, THREE.RectAreaLightHelper, "red");
  // painting spotlight
  const spotlight = useMemo(() => new THREE.SpotLight("#ffffff"), []);

  //lights on / off events
  const [ambientLight, setAmbientLight] = useState(2.3);
  const [mainLightClicked, setMainLightClicked] = useState(false);

  const [donutLight, setDonutLight] = useState(12.5);
  const [donutLightClicked, setDonutLightClicked] = useState(false);

  const [lamp, setLamp] = useState(5);
  const [lampLightClicked, setLampClicked] = useState(false);

  const [paintLamp, setPaintLamp] = useState(80);
  const [paintLampLightClicked, setPaintLampLightClicked] = useState(false);

  const [tvLight, setTVLight] = useState(25);
  const [tvLightClicked, setTvLightClicked] = useState(false);

  function handleMainLight() {
    setMainLightClicked((prevIsClicked) => !prevIsClicked);
  }

  function handleDonutLight() {
    setDonutLightClicked((prevIsClicked) => !prevIsClicked);
  }

  function handleLampLight() {
    setLampClicked((prevIsClicked) => !prevIsClicked);
  }

  function handlePaintLampLight() {
    setPaintLampLightClicked((prevIsClicked) => !prevIsClicked);
  }

  function handleTvLightClicked() {
    setTvLightClicked((prevIsClicked) => !prevIsClicked);
  }

  useEffect(() => {
    window.addEventListener("mainLightButtonClick", handleMainLight);
    window.addEventListener("donutLightButtonClick", handleDonutLight);
    window.addEventListener("lampLightButtonClick", handleLampLight);
    window.addEventListener("paintLampLightButtonClick", handlePaintLampLight);
    window.addEventListener("tvLightButtonClick", handleTvLightClicked);

    return () => {
      window.removeEventListener("mainLightButtonClick", handleMainLight);
      window.removeEventListener("donutLightButtonClick", handleDonutLight);
      window.removeEventListener("lampLightButtonClick", handleLampLight);
      window.removeEventListener(
        "paintLampLightButtonClick",
        handlePaintLampLight
      );
      window.removeEventListener("tvLightButtonClick", handleTvLightClicked);
    };
  }, []);

  useEffect(() => {
    setAmbientLight(mainLightClicked ? 0.1 : 2.3);
    setDonutLight(donutLightClicked ? 0 : 12.5);
    setLamp(lampLightClicked ? 0 : 5);
    setPaintLamp(paintLampLightClicked ? 0 : 80);
    setTVLight(tvLightClicked ? 0 : 20);
  }, [
    mainLightClicked,
    donutLightClicked,
    lampLightClicked,
    paintLampLightClicked,
    tvLightClicked,
  ]);

  return (
    <>
      {/* background color */}
      <color args={["#181818"]} attach="background" />

      <ambientLight intensity={ambientLight} />

      {/* tv ambient light */}
      <rectAreaLight
        ref={lightRef}
        width={1}
        height={0.5}
        intensity={tvLight}
        color={"#ffffff"}
        position={[-0.18, -0.17, -1.4]}
        rotation-x={3.12}
        rotation-y={3.15}
        rotation-z={0}
      />

      {/* ikea donut light */}
      <rectAreaLight
        width={0.5}
        height={0.5}
        position={[-1.28, 0.55, -1.6]}
        intensity={donutLight}
        color={"#ff8f00"}
      />

      {/* akja light */}
      <pointLight
        position-x={-2}
        position-y={0.9}
        position-z={-0.43}
        intensity={lamp}
        color={"#ffffff"}
        distance={1.5}
        decay={0.5}
      />

      {/* painting spotlight */}
      <group position={[-0.05, -0.35, -0.55]}>
        <primitive
          object={spotlight}
          position-x={2.03}
          position-y={1.7}
          position-z={0}
          intensity={paintLamp}
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
