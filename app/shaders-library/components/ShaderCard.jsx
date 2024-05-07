"use client";
import { motion, useSpring, useTransform, useMotionValue } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function ShaderCard({ name, description, image, link }) {
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
        width: "410px",
        height: "502px",
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        backgroundColor: "#E6E6E8",
      }}
      className="relative self-start rounded-3xl flex-shrink-0 gap-5 "
    >
      <div
        style={{
          transform: "translateZ(75px)",
          transformStyle: "preserve-3d",
        }}
        className="absolute inset-4 bg-black rounded-2xl shadow-lg flex flex-col justify-between"
      >
        {/* background image */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
          }}
        >
          <Image
            alt="shader-name"
            fill
            src={image}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              borderRadius: "1rem",
            }}
          />
        </div>

        {/* title and description */}
        <div className="absolute top-4 left-4 right-4">
          <h1 className="text-2xl font-bold text-white">{name}</h1>
          <h2 className="text-base text-white font-normal">{description}</h2>
        </div>

        {/* play button */}
        {/* the link doesn't work; it would be logic that the component wrapped inside link component to be clickable */}
        <Link href={link}>
          <div className="absolute bottom-4 right-4">
            <div className="w-10 h-10 rounded-full bg-white flex justify-center">
              <Image
                src="./icons/play.svg"
                width={18}
                height={18}
                alt="play button"
                style={{ fill: "white" }}
              />
            </div>
          </div>
        </Link>
      </div>
    </motion.div>
  );
}
