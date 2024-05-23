"use client";

import Link from "next/link";
import Head from "next/head";

import { Canvas } from "@react-three/fiber";
import {
  ACESFilmicToneMapping,
  CineonToneMapping,
  NoToneMapping,
  ReinhardToneMapping,
} from "three";

import Experience from "./isometric-room/Experience";
import Navigation from "./isometric-room/components/NavBar";

export default function Homepage() {
  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.png" />
      </Head>

      {/* wrapper div */}
      <div className="flex h-screen">
        <Navigation />
        <div className="flex-grow">
          <Canvas
            gl={{ toneMapping: NoToneMapping }}
            shadows
            orthographic
            style={{
              width: "100%",
              height: "100%",
            }}
            camera={{
              fov: 45,
              near: 0.1,
              far: 100,
              position: [-2.5, 1, 2.5],
              zoom: 200,
            }}
          >
            <Experience />
          </Canvas>
        </div>
      </div>
    </>
  );
}
