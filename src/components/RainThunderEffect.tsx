"use client";

import { useEffect, useRef } from "react";

export default function RainThunderEffect() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const flashRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number | null = null;
    let flashTimeout: NodeJS.Timeout | null = null;
    let isVisible = false;

    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };

    window.addEventListener("resize", handleResize, { passive: true });

    // Subtle, delicate realistic raindrops
    const dropCount = 45;
    const drops = Array.from({ length: dropCount }, () => ({
      x: Math.random() * (width + 100) - 50,
      y: Math.random() * height,
      length: Math.random() * 12 + 8,
      speed: Math.random() * 4 + 4,
      opacity: Math.random() * 0.18 + 0.07,
      thickness: Math.random() * 0.4 + 0.5,
    }));

    // Rain Loop
    const draw = () => {
      if (!isVisible) return;
      ctx.clearRect(0, 0, width, height);

      // Draw delicate rain streaks
      for (let i = 0; i < dropCount; i++) {
        const drop = drops[i];
        ctx.lineWidth = drop.thickness;
        ctx.strokeStyle = `rgba(180, 215, 255, ${drop.opacity})`;
        ctx.lineCap = "round";

        ctx.beginPath();
        const endX = drop.x - drop.length * 0.2;
        const endY = drop.y + drop.length;
        ctx.moveTo(drop.x, drop.y);
        ctx.lineTo(endX, endY);
        ctx.stroke();

        // Move rain down smoothly
        drop.x -= drop.speed * 0.2;
        drop.y += drop.speed;

        if (drop.y > height) {
          drop.y = -drop.length;
          drop.x = Math.random() * (width + 100) - 50;
        }
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    // Thunderstorm / Real Bijli Lightning Controller
    const triggerLightning = () => {
      if (!isVisible) return;
      const flashEl = flashRef.current;
      if (!flashEl) return;

      // Realistic natural double-strike flicker
      flashEl.style.opacity = "0.35";
      setTimeout(() => {
        if (flashEl) flashEl.style.opacity = "0.05";
        setTimeout(() => {
          if (flashEl) flashEl.style.opacity = "0.55";
          setTimeout(() => {
            if (flashEl) flashEl.style.opacity = "0";
          }, 90);
        }, 35);
      }, 50);

      // Next lightning pulse between 5 and 9 seconds
      const nextDelay = Math.random() * 4000 + 5000;
      flashTimeout = setTimeout(triggerLightning, nextDelay);
    };

    const startAnimation = () => {
      if (isVisible) return;
      isVisible = true;
      handleResize();
      if (width > 0 && height > 0) {
        animationFrameId = requestAnimationFrame(draw);
        flashTimeout = setTimeout(triggerLightning, 3000);
      }
    };

    const stopAnimation = () => {
      isVisible = false;
      if (animationFrameId !== null) {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = null;
      }
      if (flashTimeout !== null) {
        clearTimeout(flashTimeout);
        flashTimeout = null;
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && entry.intersectionRatio > 0) {
          startAnimation();
        } else {
          stopAnimation();
        }
      },
      { threshold: 0.05 }
    );

    observer.observe(canvas);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", handleResize);
      stopAnimation();
    };
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none z-15 overflow-hidden">
      {/* Delicate Rain Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      {/* Atmospheric Bijli / Lightning Sky Flash */}
      <div
        ref={flashRef}
        className="absolute inset-0 bg-gradient-to-r from-cyan-100/25 via-blue-50/40 to-indigo-100/30 mix-blend-overlay opacity-0 transition-opacity duration-75 pointer-events-none"
      />
    </div>
  );
}
