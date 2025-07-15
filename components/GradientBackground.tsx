import React, { useRef, useEffect } from "react";

const GradientBackground = () => {
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
      t += 0.01;
      ctx.clearRect(0, 0, width, height);
      // 动态线性渐变
      const grad1 = ctx.createLinearGradient(
        0, 0, width * Math.abs(Math.sin(t)), height * Math.abs(Math.cos(t))
      );
      grad1.addColorStop(0, `hsl(${(t * 40) % 360}, 80%, 60%)`);
      grad1.addColorStop(1, `hsl(${(t * 80 + 120) % 360}, 80%, 60%)`);
      ctx.fillStyle = grad1;
      ctx.fillRect(0, 0, width, height);
      // 动态径向渐变
      const grad2 = ctx.createRadialGradient(
        width / 2 + Math.sin(t) * width / 4,
        height / 2 + Math.cos(t) * height / 4,
        0,
        width / 2,
        height / 2,
        Math.max(width, height) / 1.2
      );
      grad2.addColorStop(0, `rgba(255,255,255,0.15)`);
      grad2.addColorStop(1, `rgba(0,0,0,0)`);
      ctx.globalCompositeOperation = "lighter";
      ctx.fillStyle = grad2;
      ctx.fillRect(0, 0, width, height);
      ctx.globalCompositeOperation = "source-over";
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

export default GradientBackground; 