"use client";
import Content from "./Content";

export default function Footer({ backgroundColor, color, fill }) {
  return (
    <div
      className="relative h-[400px]"
      style={{
        clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)",
        backgroundColor,
      }}
    >
      <div className="relative h-[calc(100vh+400px)] -top-[100vh]">
        <div className="h-[400px] sticky top-[calc(100vh-400px)]">
          <Content
            backgroundColor={backgroundColor}
            color={color}
            fill={fill}
          />
        </div>
      </div>
    </div>
  );
}
