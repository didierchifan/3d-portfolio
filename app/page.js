"use client";

import Link from "next/link";
import Head from "next/head";

import { useState } from "react";

import { Canvas } from "@react-three/fiber";
import {
  ACESFilmicToneMapping,
  CineonToneMapping,
  NoToneMapping,
  ReinhardToneMapping,
} from "three";

import Experience from "./isometric-room/Experience";
import Navigation from "./isometric-room/components/NavBar";

import LoadingScreen from "./isometric-room/components/LoadingScreen";
import useMediaQuery from "./isometric-room/components/useQuery";
import MobileNavBar from "./isometric-room/components/MobileNavBar";
import MobileNavTopBar from "./isometric-room/components/MobileNavTopBar";

import AmbientSound from "./isometric-room/components/AmbientSound";

export default function Homepage() {
  // @TODO Add an useEffect withouth a dependency so that you render the loading component once.
  // however if you come back to the homepage and this renders again, you can always set a session storage variable and check it

  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <>
      {/* <AmbientSound /> */}
      <Head>
        <link rel="icon" href="/favicon.png" />
      </Head>
      {/* <LoadingScreen /> */}
      {/* wrapper div */}

      <div className="flex flex-col md:flex-row h-screen">
        {isMobile ? <MobileNavTopBar /> : <></>}
        {isMobile ? <MobileNavBar /> : <Navigation />}
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
              zoom: isMobile ? 60 : 200,
            }}
          >
            <Experience />
          </Canvas>
        </div>

        {isMobile ? (
          <></>
        ) : (
          <div
            style={{ right: "1.25rem" }}
            className="fixed w-36 h-20 bottom-2 right-10 rounded-md text-xs text-justify"
          >
            <p>
              Build with Next.js, React Three Fiber and Blender 3D model: Didier
              Chifan Sound: Vincent Iulian{" "}
            </p>
          </div>
        )}
      </div>
    </>
  );
}
