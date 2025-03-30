import React, { useEffect, useState } from "react";
import { Box, keyframes } from "@mui/material";

interface Firework {
  id: number;
  x: number;
  y: number;
  color: string;
  size: number;
}

const colors = [
  "#ff0000",
  "#00ff00",
  "#0000ff",
  "#ffff00",
  "#ff00ff",
  "#00ffff",
];

const explode = keyframes`
  0% {
    transform: scale(0);
    opacity: 1;
  }
  100% {
    transform: scale(1);
    opacity: 0;
  }
`;

const Fireworks: React.FC<{ active: boolean }> = ({ active }) => {
  const [fireworks, setFireworks] = useState<Firework[]>([]);

  useEffect(() => {
    if (!active) return;

    const createFirework = () => {
      const id = Date.now();
      const x = Math.random() * 100;
      const y = Math.random() * 100;
      const color = colors[Math.floor(Math.random() * colors.length)];
      const size = Math.random() * 50 + 50;

      setFireworks((prev) => [...prev, { id, x, y, color, size }]);

      setTimeout(() => {
        setFireworks((prev) => prev.filter((f) => f.id !== id));
      }, 1000);
    };

    const interval = setInterval(createFirework, 200);
    return () => clearInterval(interval);
  }, [active]);

  if (!active) return null;

  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        pointerEvents: "none",
        zIndex: 9999,
      }}
    >
      {fireworks.map((firework) => (
        <Box
          key={firework.id}
          sx={{
            position: "absolute",
            left: `${firework.x}%`,
            top: `${firework.y}%`,
            width: firework.size,
            height: firework.size,
            borderRadius: "50%",
            background: firework.color,
            animation: `${explode} 1s ease-out forwards`,
            boxShadow: `0 0 20px ${firework.color}`,
          }}
        />
      ))}
    </Box>
  );
};

export default Fireworks;
