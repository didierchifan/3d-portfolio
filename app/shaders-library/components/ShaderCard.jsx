"use client";
import { motion, useSpring, useTransform, useMotionValue } from "framer-motion";
import Image from "next/image";

export default function ShaderCard({ name, description }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(
    mouseYSpring,
    [-0.5, 0.5],
    ["10.5deg", "-10.5deg"]
  );

  const rotateY = useTransform(
    mouseXSpring,
    [-0.5, 0.5],
    ["-10.5deg", "10.5deg"]
  );

  const handleMouseMove = (e) => {
    const rect = e.target.getBoundingClientRect();

    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPercentage = mouseX / width - 0.5;
    const yPercentage = mouseY / height - 0.5;

    x.set(xPercentage);
    y.set(yPercentage);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        backgroundColor: "#E6E6E8",
      }}
      id="shader--card"
      className="relative self-start rounded-3xl flex-shrink-0 gap-5 "
    >
      <div
        style={{ transform: "translateZ(75px)", transformStyle: "preserve-3d" }}
        className="absolute inset-4 bg-black rounded-2xl shadow-lg flex flex-col justify-between"
      >
        <div className="mt-5 ml-5 mr-5 ">
          <h1 className="text-2xl font-bold text-white">{name}</h1>
          <h2 className="text-base text-white font-normal">{description}</h2>
        </div>
        <div className="flex justify-center">
          <div className="w-10 h-10 m-5 ml-auto rounded-full bg-white flex justify-center">
            <Image
              src="./icons/play.svg"
              width={18}
              height={18}
              alt="play button"
              style={{ fill: "white" }}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
