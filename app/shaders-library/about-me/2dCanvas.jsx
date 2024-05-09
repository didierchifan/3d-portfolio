import { useState, useEffect } from "react";

export default function CustomCanvas({
  canvasWidth,
  canvasHeight,
  cursorPosition,
  context,
}) {
  useEffect(() => {
    // Create the canvas element
    const canvas = document.createElement("canvas");

    // trebuie trimise ca propuri in <CustomCanvas> pentru ca am nevoie sa calculez pixel coordinates din uv coordinates

    const canvasWidth = 128;
    const canvasHeight = 128;

    canvas.width = canvasWidth;
    canvas.height = canvasHeight;

    // 2d-canvas styles
    canvas.style.position = "fixed";
    canvas.style.width = "256px";
    canvas.style.height = "256px";
    canvas.style.top = "0";
    canvas.style.right = "0";
    canvas.style.zIndex = 1000;

    // Add the canvas to the DOM directly
    document.body.append(canvas);

    const context = canvas.getContext("2d");

    context.fillRect(0, 0, canvas.width, canvas.height);

    // Load the image
    const glowImage = new Image();

    glowImage.src = "../textures/particleCursorAnimation/glow.png";

    context.drawImage(glowImage, cursorPosition.x, cursorPosition.y, 32, 32);

    // Return a cleanup function to remove the canvas when the component unmounts
    return () => {
      if (canvas) {
        document.body.removeChild(canvas);
      }
    };
  }, []); // Run only once on component mount

  // Return null because the canvas is being rendered directly in the DOM
  return null;
}
