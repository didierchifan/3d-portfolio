"use client";
import { useControls } from "leva";

export default function useGuiControls() {
  const controls = useControls("Galaxy", {
    count: {
      value: 200000,
      min: 100,
      max: 1000000,
      step: 100,
    },

    radius: {
      value: 5,
      min: 0.01,
      max: 20,
      step: 0.01,
    },

    branches: {
      value: 3,
      min: 2,
      max: 20,
      step: 1,
    },

    randomness: {
      value: 0.2,
      min: 0,
      max: 2,
      step: 0.001,
    },

    randomnessPower: {
      value: 3,
      min: 0,
      max: 10,
      step: 0.001,
    },

    insideColor: {
      value: "#ff6030",
    },
    outsideColor: {
      value: "#4076ff",
    },
  });

  return controls;
}
