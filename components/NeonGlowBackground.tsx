import React, { useRef, useEffect } from "react";

const NeonGlowBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

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
    let t = 0;

    function draw() {
      if (!ctx) return;
      t += 0.015;
      ctx.clearRect(0, 0, width, height);
      // 多个霓虹光圈
      for (let i = 0; i < 4; i++) {
        const r = 60 + Math.sin(t + i) * 30 + i * 30;
        ctx.save();
        ctx.beginPath();
        ctx.arc(
          width / 2 + Math.cos(t + i) * 80,
          height / 2 + Math.sin(t + i * 1.2) * 60,
          r,
          0,
          2 * Math.PI
        );
        ctx.shadowColor = `hsl(${(t * 60 + i * 90) % 360},100%,60%)`;
        ctx.shadowBlur = 32;
        ctx.strokeStyle = `hsl(${(t * 60 + i * 90) % 360},100%,60%)`;
        ctx.lineWidth = 6 + Math.sin(t + i) * 2;
        ctx.globalAlpha = 0.45;
        ctx.stroke();
        ctx.restore();
      }
      ctx.globalAlpha = 1;
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

export default NeonGlowBackground; 