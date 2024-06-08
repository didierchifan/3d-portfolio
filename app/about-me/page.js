"use client";
import Experience from "./Experience";
import Scene from "./Scene";
import Text from "./Text";
import TextMobile from "./TextMobile.jsx";

import { Canvas } from "@react-three/fiber";
import Footer from "../components/Footer";

import useMediaQuery from "../isometric-room/components/useQuery";

export default function AboutMe() {
  const isMobile = useMediaQuery("(max-width: 768px)");
  console.log(isMobile);
  return (
    <div>
      {/* text on mobile - without the 2d canvas */}
      <div
        style={{ backgroundColor: "#181818" }}
        className="min-h-screen w-full md:hidden"
      >
        <TextMobile />
      </div>
      <div className="flex">
        {/* 2d canvas api */}
        {!isMobile && (
          <div
            style={{ backgroundColor: "#181818" }}
            className="flex w-1/2 h-screen items-center justify-center"
          >
            <Text />
            <Scene />
          </div>
        )}

        {/* react three fiber canvas */}
        <div
          style={{ backgroundColor: "#181818" }}
          className=" min-h-screen w-full lg:w-1/2"
        >
          <Canvas
            style={{
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
            }}
          >
            <Experience />
          </Canvas>
        </div>
      </div>
      <Footer backgroundColor="#F5F5F7" color="#181818" />
    </div>
  );
}
