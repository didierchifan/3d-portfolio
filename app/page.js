import Link from "next/link";

export default function Home() {
  return (
    <div className="ml-5 mt-5">
      <div className="text-sky-400">SHADER LIBRARY</div>
      <div className="h-5"></div>
      <div>
        <h1>
          <Link href="/shaders-library/animated-galaxy">ANIMATED GALAXY</Link>
        </h1>
        <h1 className="text-orange-500">
          <Link href="/shaders-library/coffee-smoke">COFFEE SMOKE</Link>
        </h1>
        <h1 className="text-orange-500">
          <Link href="/shaders-library/hologram"> HOLOGRAM </Link>
        </h1>
        <h1 className="text-orange-500">
          <Link href="/shaders-library/fireworks"> FIREWORKS</Link>
        </h1>
        <h1>LIGHTS SHADING</h1>
        <h1>RAGING SEA SHADING</h1>
        <h1>HALFTONE SHADING</h1>
        <h1>EARTH</h1>
        <h1>PARTICLES CURSOR ANIMATION</h1>
        <h1>PARTICLES MORPHING</h1>
        <h1>GPGPU FLOW FIELD PARTICLES</h1>
        <h1>WOBBLE SPHERE</h1>
        <h1>SLICED MODEL</h1>
        <h1>PROCEDURAL TERRAIN</h1>
      </div>
    </div>
  );
}
