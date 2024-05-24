import { useControls, folder } from "leva";

export default function useLeva() {
  const controls = useControls({
    "main controls": folder({
      goToSleep: false,
      bgcolor: { value: "#181818" },
    }),
    "lamp lights": folder({
      donutLight: {
        value: 10,
        step: 0.2,
        min: 0,
        max: 25,
      },
      ackjaLampOn: true,
      spotLampOn: true,
    }),
    "tv controls": folder({
      color: "#7ac9ff",
      strength: {
        value: 25,
        step: 0.2,
        min: 0,
        max: 50,
      },
    }),
  });

  ///////camera controls///////
  // const { DEG2RAD } = THREE.MathUtils;
  // const {} = useControls({
  //   phiGrp: buttonGroup({
  //     label: "rotate vertical",
  //     opts: {
  //       "+20º": () => cameraControlsRef.current?.rotate(0, 20 * DEG2RAD, true),
  //       "-20º": () => cameraControlsRef.current?.rotate(0, -20 * DEG2RAD, true),
  //     },
  //   }),
  //   thetaGrp: buttonGroup({
  //     label: "rotate horizontal",
  //     opts: {
  //       "+45º": () => cameraControlsRef.current?.rotate(45 * DEG2RAD, 0, true),
  //       "-45º": () => cameraControlsRef.current?.rotate(-45 * DEG2RAD, 0, true),
  //     },
  //   }),
  //   resetCamera: button(() => cameraControlsRef.current?.reset(true)),
  // });

  return controls;
}
