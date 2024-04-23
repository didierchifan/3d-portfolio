import Link from "next/link";

export default function Home() {
  return (
    <div class="ml-5 mt-5">
      <div class="text-sky-400">SHADER LIBRARY</div>
      <div class="h-5"></div>
      <div>
        <h1>
          <Link href="/shaders-library/shader-patterns">SHADER PATTERNS</Link>
        </h1>
        <h1>
          <Link href="/shaders-library/animated-galaxy">ANIMATED GALAXY</Link>
        </h1>
        <h1>
          <Link href="/shaders-library/coffee-smoke">COFFEE SMOKE</Link>
        </h1>
        <h1>HOLOGRAM</h1>
        <h1>FIREWORKS</h1>
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
