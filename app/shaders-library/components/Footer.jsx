"use client";
import Link from "next/link";

export default function Footer() {
  return (
    <div
      style={{ backgroundColor: "#E6E6E8" }}
      className="flex justify-center items-center h-96"
    >
      <Link href="./shaders-library/about-me">
        {" "}
        <h1 className="text-7xl text-black font-bold">DIDIER CHIFAN</h1>
      </Link>
    </div>
  );
}
