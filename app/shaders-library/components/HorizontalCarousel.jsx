"use client";
import ShaderCard from "./ShaderCard";
import { shadersData } from "../shaderCardsData";
import { motion, useTransform, useScroll } from "framer-motion";
import { useRef } from "react";

export default function HorizontalCarousel() {
  const targetRef = useRef(null);

  const { scrollYProgress } = useScroll();

  const x = useTransform(scrollYProgress, [0, 1], ["1%", "-95%"]);

  return (
    <section ref={targetRef} className="relative h-[600vh] border-b-2">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <div>
          <div>
            <h1 className="ml-20 text-black text-6xl font-bold">Shaders</h1>
            <h1 className="ml-20 text-black mb-10 text-3xl">
              pixels sorcery in code
            </h1>
          </div>
          <motion.div style={{ x }} className="flex gap-10">
            {shadersData.map((item, index) => (
              <ShaderCard
                key={index}
                name={item.name}
                description={item.description}
                image={item.image}
                link={item.link}
              />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
