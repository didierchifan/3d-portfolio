"use client";
import { useScroll, motion, useTransform, progress } from "framer-motion";
import { useRef } from "react";

export default function TextReveal() {
  const element = useRef(null);

  const { scrollYProgress } = useScroll({
    target: element,
    offset: ["start 0.7", "start 0.25"],
  });

  const paragraph =
    "A GLSL shader is a specialized program executed on the GPU to process vertices and fragments. These shaders manipulate geometric data and pixel properties to generate visual effects and render lifelike graphics in real-time applications. By defining how light interacts with surfaces and determining the color and appearance of pixels on the screen, GLSL shaders are fundamental to modern graphics programming, enabling the creation of immersive and realistic virtual environments.";

  const words = paragraph.split(" ");

  return (
    <div className="flex justify-center items-center h-screen">
      <p
        ref={element}
        className="text-base p-10 md:text-3xl w-3/4 text-black  font-bold flex flex-wrap leading-none"
      >
        {words.map((word, i) => {
          const start = i / words.length;
          const end = start + 1 / words.length;
          return (
            <Word key={i} range={[start, end]} progress={scrollYProgress}>
              {word}
            </Word>
          );
        })}
      </p>
    </div>
  );
}

const Word = ({ children, range, progress }) => {
  const opacity = useTransform(progress, range, [0, 1]);
  return (
    <span id="word">
      <span id="shadow">{children}</span>
      <motion.span style={{ opacity }} id="word">
        {children}
      </motion.span>
    </span>
  );
};
