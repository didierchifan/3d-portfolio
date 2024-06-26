import { useControls } from "leva";

export default function useGuiControls() {
  const controls = useControls("Galaxy configurator", {
    count: {
      value: 20000,
      min: 1,
      max: 100000,
      step: 1,
    },
    size: {
      value: 0.02,
      min: 0.001,
      max: 0.1,
    },
    radius: {
      value: 10,
      min: 0.1,
      max: 30,
    },
    branches: {
      value: 3,
      min: 2,
      max: 20,
      step: 1,
    },
    spin: {
      value: 1,
      min: -5,
      max: 5,
    },
    randomness: {
      value: 0.2,
      min: 0,
      max: 2,
      step: 0.01,
    },
    randomnessPower: {
      value: 3,
      min: 0.1,
      max: 10,
      step: 1,
    },
    insideColor: {
      value: "#ffffff",
    },
    outsideColor: {
      value: "#5786F5",
    },
  });

  return controls;
}
