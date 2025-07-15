import React, { useRef, useEffect } from "react";

interface Star {
  x: number;
  y: number;
  r: number;
  alpha: number;
  dx: number;
  dy: number;
}

const StarBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const starCount = 120;
  const stars = useRef<Star[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !canvas.parentElement) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // 只用属性设置宽高，不用 style
    const setCanvasSize = () => {
      if (!canvas.parentElement) return;
      canvas.width = canvas.parentElement.offsetWidth;
      canvas.height = canvas.parentElement.offsetHeight;
    };
    setCanvasSize();

    let width = canvas.width;
    let height = canvas.height;

    stars.current = Array.from({ length: starCount }).map(() => ({
      x: Math.random() * width,
      y: Math.random() * height,
      r: Math.random() * 1.2 + 0.2,
      alpha: Math.random(),
      dx: (Math.random() - 0.5) * 0.2,
      dy: (Math.random() - 0.5) * 0.2,
    }));

    function draw() {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);
      for (let star of stars.current) {
        ctx.save();
        ctx.globalAlpha = star.alpha;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.r, 0, 2 * Math.PI);
        ctx.fillStyle = "#fff";
        ctx.shadowColor = "#fff";
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.restore();

        star.x += star.dx;
        star.y += star.dy;
        if (star.x < 0 || star.x > width) star.x = Math.random() * width;
        if (star.y < 0 || star.y > height) star.y = Math.random() * height;
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

export default StarBackground; 