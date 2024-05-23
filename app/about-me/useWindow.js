"use client";
import { useEffect, useState } from "react";
import { HemisphereLight } from "three";

export default function useWindow() {
  const [dimension, setDimension] = useState({ width: 0, height: 0 });

  const resize = () => {
    setDimension({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  };

  useEffect(() => {
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  return { dimension };
}
