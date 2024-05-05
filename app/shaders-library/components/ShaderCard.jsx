"use client";
import { motion, useSpring, useTransform, useMotionValue } from "framer-motion";

export default function ShaderCard({ name, description }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(
    mouseYSpring,
    [-0.5, 0.5],
    ["17.5deg", "-17.5deg"]
  );

  const rotateY = useTransform(
    mouseXSpring,
    [-0.5, 0.5],
    ["-17.5deg", "17.5deg"]
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

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      id="shader--card"
      className="relative bg-orange-500 self-start rounded-3xl flex-shrink-0 gap-5 "
    >
      <div
        style={{ transform: "translateZ(75px)", transformStyle: "preserve-3d" }}
        className="absolute inset-4 bg-orange-200 rounded-2xl shadow-lg"
      >
        <div className="mt-5 ml-5 ">
          <h1 className="text-black">{name}</h1>
          <h2 className="text-black">{description}</h2>
        </div>
      </div>
    </motion.div>
  );
}
