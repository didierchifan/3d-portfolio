"use client";
import Content from "./Content";

export default function Footer({ backgroundColor, color, fill }) {
  return (
    <div
      className="relative h-[550px]"
      style={{
        clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)",
        backgroundColor,
      }}
    >
      <div className="relative h-[calc(100vh+550px)] -top-[100vh]">
        <div className="h-[550px] sticky top-[calc(100vh-550px)]">
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
