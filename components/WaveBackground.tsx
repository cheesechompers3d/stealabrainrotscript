import React, { useRef, useEffect } from "react";

const WaveBackground = () => {
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
      t += 0.02;
      ctx.clearRect(0, 0, width, height);
      // 多条波浪
      for (let j = 0; j < 3; j++) {
        ctx.beginPath();
        for (let i = 0; i <= width; i += 2) {
          const amp = 20 + j * 10;
          const y = height / 2 + Math.sin(i / 60 + t + j) * amp + Math.cos(i / 120 + t * 0.7 + j) * 10;
          if (i === 0) ctx.moveTo(i, y);
          else ctx.lineTo(i, y);
        }
        ctx.strokeStyle = `rgba(0,255,255,${0.18 + j * 0.08})`;
        ctx.lineWidth = 2 + j * 1.5;
        ctx.shadowColor = '#0ff';
        ctx.shadowBlur = 8;
        ctx.stroke();
      }
      ctx.shadowBlur = 0;
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

export default WaveBackground; 