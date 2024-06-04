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
              // width: "100%",
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
        <div
          style={{ right: "1.25rem" }}
          className="fixed top-10 bg-white hover:bg-orange-500 w-12 h-12 rounded-md flex items-center justify-center"
        >
          <span style={{ color: "#181818", fontWeight: "bold" }}>CV</span>
        </div>
        <div
          style={{ right: "1.25rem" }}
          className="w-36 h-20 fixed bottom-2 right-10 rounded-md text-xs text-justify"
        >
          <p>
            Build with Next.js, React Three Fiber and Blender 3D model: Didier
            Chifan Sound: Vincent Iulian{" "}
          </p>
        </div>
      </div>
    </>
  );
}
