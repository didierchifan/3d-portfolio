"use client";
import { useScroll, motion, useTransform, progress } from "framer-motion";
import { useRef } from "react";

export default function TextReveal() {
  const element = useRef(null);

  const { scrollYProgress } = useScroll({
    target: element,
    offset: ["start 0.9", "start 0.25"],
  });

  const paragraph =
    "A GLSL shader, written in the OpenGL Shading Language (GLSL), is a specialized program executed on the GPU (Graphics Processing Unit) to process vertices and fragments. These shaders manipulate geometric data and pixel properties to generate visual effects and render lifelike graphics in real-time applications. By defining how light interacts with surfaces and determining the color and appearance of pixels on the screen, GLSL shaders are fundamental to modern graphics programming, enabling the creation of immersive and realistic virtual environments.";

  const words = paragraph.split(" ");

  return (
    <p
      ref={element}
      className="ml-20 mr-20 mb-20 mt-20 text-5xl font-bold flex flex-wrap leading-none"
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
