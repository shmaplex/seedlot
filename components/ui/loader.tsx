"use client";

import { useEffect, useState } from "react";
import "@/styles/animations.css";

interface LoaderProps {
  message?: string | string[];
  size?: number; // SVG size
  numCubes?: number;
  minCubeSize?: number;
  maxCubeSize?: number;
}

interface Cube {
  id: string;
  x: number;
  y: number;
  size: number;
  shade: number; // for grayscale
}

export const Loader: React.FC<LoaderProps> = ({
  message = "Calculating AI usage…",
  size = 90,
  numCubes = 25, // 5x5 grid
  minCubeSize = 18,
  maxCubeSize = 18,
}) => {
  const messages = Array.isArray(message) ? message : [message];
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

  const cols = Math.ceil(Math.sqrt(numCubes));
  const spacing = 0; // tight 1px gap

  // Initial cube positions
  const [cubes, setCubes] = useState<Cube[]>(() =>
    Array.from({ length: numCubes }).map((_, i) => {
      const row = Math.floor(i / cols);
      const col = i % cols;
      const size = Math.floor(
        Math.random() * (maxCubeSize - minCubeSize) + minCubeSize
      );
      const shade = Math.floor(Math.random() * 60) + 20; // 20% -> 80% gray
      return {
        id: `cube-${i}`,
        x: col * (maxCubeSize + spacing),
        y: row * (maxCubeSize + spacing),
        size,
        shade,
      };
    })
  );

  // Message rotation
  useEffect(() => {
    if (messages.length > 1) {
      const interval = setInterval(() => {
        setCurrentMessageIndex((prev) => (prev + 1) % messages.length);
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [messages.length]);

  // Cube motion
  useEffect(() => {
    const interval = setInterval(() => {
      setCubes((prev) => {
        const newCubes = [...prev];

        // pick a random cube to move
        const movingIndex = Math.floor(Math.random() * newCubes.length);
        const movingCube = { ...newCubes[movingIndex] };

        // pick another cube to swap or move into its place
        let targetIndex = movingIndex;
        while (targetIndex === movingIndex) {
          targetIndex = Math.floor(Math.random() * newCubes.length);
        }
        const targetCube = { ...newCubes[targetIndex] };

        // swap positions and optionally sizes/shade for dimension
        [movingCube.x, targetCube.x] = [targetCube.x, movingCube.x];
        [movingCube.y, targetCube.y] = [targetCube.y, movingCube.y];
        [movingCube.size, targetCube.size] = [targetCube.size, movingCube.size];
        [movingCube.shade, targetCube.shade] = [
          targetCube.shade,
          movingCube.shade,
        ];

        newCubes[movingIndex] = movingCube;
        newCubes[targetIndex] = targetCube;

        return newCubes;
      });
    }, 300); // faster, smooth motion
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen p-4 flex-col">
      <div className="rounded-2xl bg-foreground dark:bg-background overflow-hidden mb-3">
        <svg
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          xmlns="http://www.w3.org/2000/svg"
          role="img"
        >
          <title>{messages[currentMessageIndex]}</title>
          {cubes.map((cube) => (
            <rect
              key={cube.id}
              x={cube.x}
              y={cube.y}
              width={cube.size}
              height={cube.size}
              fill={`hsl(0, 0%, ${cube.shade}%)`}
              className="mix-blend-color-dodge"
              style={{
                transition: "all 0.35s ease-in-out",
                borderRadius: "1rem",
              }}
            />
          ))}
        </svg>
      </div>
      <p className="mt-2 text-sm font-medium text-muted-foreground text-center animate-pulse">
        {messages[currentMessageIndex]}
      </p>
    </div>
  );
};
