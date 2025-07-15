import React, { useRef, useEffect } from "react";

interface Shape {
  x: number;
  y: number;
  r: number;
  dx: number;
  dy: number;
  color: string;
}

const ShapeBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const shapeCount = 24;
  const shapes = useRef<Shape[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !canvas.parentElement) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const setCanvasSize = () => {
      if (!canvas.parentElement) return;
      canvas.width = canvas.parentElement.offsetWidth;
      canvas.height = canvas.parentElement.offsetHeight;
    };
    setCanvasSize();

    let width = canvas.width;
    let height = canvas.height;

    // 初始化形状
    const colors = ["#ff6ec4", "#7873f5", "#42e695", "#ffb86c", "#faffd1", "#00c3ff"];
    shapes.current = Array.from({ length: shapeCount }).map(() => ({
      x: Math.random() * width,
      y: Math.random() * height,
      r: Math.random() * 18 + 8,
      dx: (Math.random() - 0.5) * 1.2,
      dy: (Math.random() - 0.5) * 1.2,
      color: colors[Math.floor(Math.random() * colors.length)],
    }));

    function draw() {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);
      for (let shape of shapes.current) {
        ctx.save();
        ctx.globalAlpha = 0.18 + Math.abs(Math.sin(shape.x + shape.y)) * 0.5;
        ctx.beginPath();
        ctx.arc(shape.x, shape.y, shape.r, 0, 2 * Math.PI);
        ctx.fillStyle = shape.color;
        ctx.shadowColor = shape.color;
        ctx.shadowBlur = 16;
        ctx.fill();
        ctx.restore();

        // 移动
        shape.x += shape.dx;
        shape.y += shape.dy;
        if (shape.x < -shape.r) shape.x = width + shape.r;
        if (shape.x > width + shape.r) shape.x = -shape.r;
        if (shape.y < -shape.r) shape.y = height + shape.r;
        if (shape.y > height + shape.r) shape.y = -shape.r;
      }
      requestAnimationFrame(draw);
    }
    draw();

    const handleResize = () => {
      setCanvasSize();
      width = canvas.width;
      height = canvas.height;
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
        display: "block",
      }}
    />
  );
};

export default ShapeBackground; 