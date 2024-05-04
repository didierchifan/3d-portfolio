import ShaderCard from "./ShaderCard";
import { shadersData } from "../shaderCardsData";
import { motion, useTransform, useScroll } from "framer-motion";
import { useRef } from "react";

export default function HorizontalCarousel() {
  const targetRef = useRef(null);

  const { scrollYProgress } = useScroll();

  const x = useTransform(scrollYProgress, [0, 1], ["1%", "-95%"]);

  return (
    <section ref={targetRef}>
      <div className="sticky top-0  flex  h-screen items-center overflow-hidden">
        <motion.div style={{ x }} className="flex gap-10">
          {shadersData.map((item, index) => (
            <ShaderCard
              key={index}
              name={item.name}
              description={item.description}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
