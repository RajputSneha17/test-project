import React, { useEffect, useRef } from "react";
import { Rabbit } from "lucide-react";

const MagicCursor = () => {
  const canvasRef = useRef(null);
  const cursorRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    let width = window.innerWidth;
    let height = window.innerHeight;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;

      canvas.width = width;
      canvas.height = height;
    };

    resize();

    const mouse = {
      x: width / 2,
      y: height / 2,
      lastX: width / 2,
      lastY: height / 2,
      moving: false,
    };

    const particles = [];

    const handleMouseMove = (e) => {
      mouse.lastX = mouse.x;
      mouse.lastY = mouse.y;

      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.moving = true;

      // Cursor position
      if (cursorRef.current) {
        cursorRef.current.style.left = `${mouse.x}px`;
        cursorRef.current.style.top = `${mouse.y}px`;
      }

      const dx = mouse.x - mouse.lastX;
      const dy = mouse.y - mouse.lastY;

      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < 3) return;

      // Direction in which cursor is moving
      const dirX = dx / distance;
      const dirY = dy / distance;

      // Create particles behind cursor
      const count = Math.min(7, Math.max(1, Math.floor(distance / 6)));

      for (let i = 0; i < count; i++) {
        // IMPORTANT:
        // Spawn particles BEHIND the cursor
        const behind = 10 + Math.random() * 25;

        particles.push({
          x: mouse.x - dirX * behind + (Math.random() - 0.5) * 8,

          y: mouse.y - dirY * behind + (Math.random() - 0.5) * 8,

          // Move backward along cursor's path
          vx:
            -dirX * (0.5 + Math.random() * 1.2) + (Math.random() - 0.5) * 0.25,

          vy:
            -dirY * (0.5 + Math.random() * 1.2) + (Math.random() - 0.5) * 0.25,

          size: 1.2 + Math.random() * 2.2,

          life: 1,

          decay: 0.008 + Math.random() * 0.012,

          sparkle: Math.random() > 0.82,
        });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", resize);

    let animationFrame;

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];

        p.x += p.vx;
        p.y += p.vy;

        // Very subtle drift
        p.vx *= 0.992;
        p.vy *= 0.992;

        p.life -= p.decay;

        if (p.life <= 0) {
          particles.splice(i, 1);
          continue;
        }

        ctx.save();

        ctx.globalAlpha = p.life * 0.7;

        // Green magical glow
        ctx.shadowBlur = 10;
        ctx.shadowColor = "rgba(77, 140, 82, 0.8)";

        if (p.sparkle) {
          drawSparkle(ctx, p.x, p.y, p.size * 2.2);
        } else {
          ctx.beginPath();

          ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2);

          ctx.fillStyle = "#6fa968";
          ctx.fill();
        }

        ctx.restore();
      }

      animationFrame = requestAnimationFrame(animate);
    };

    const drawSparkle = (ctx, x, y, size) => {
      ctx.beginPath();

      ctx.moveTo(x, y - size);
      ctx.lineTo(x + size * 0.3, y - size * 0.3);
      ctx.lineTo(x + size, y);
      ctx.lineTo(x + size * 0.3, y + size * 0.3);
      ctx.lineTo(x, y + size);
      ctx.lineTo(x - size * 0.3, y + size * 0.3);
      ctx.lineTo(x - size, y);
      ctx.lineTo(x - size * 0.3, y - size * 0.3);

      ctx.closePath();

      ctx.fillStyle = "#83b97c";
      ctx.fill();
    };

    animate();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <>
      {/* Hide normal cursor */}
      <style>
        {`
          @media (pointer: fine) {
            html,
            body,
            * {
              cursor: none !important;
            }
          }
        `}
      </style>

      {/* Magic trail */}
      <canvas
        ref={canvasRef}
        className="pointer-events-none fixed inset-0 z-[99997]"
      />

      {/* Custom Green Cursor */}
      <div
        ref={cursorRef}
        className="pointer-events-none fixed z-[99999]"
        style={{
          left: "50%",
          top: "50%",
          transform: "translate(-2px, -2px)",
        }}
      >
        <svg
          width="25"
          height="32"
          viewBox="0 0 25 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Glow */}
          <defs>
            <filter
              id="cursorGlow"
              x="-100%"
              y="-100%"
              width="300%"
              height="300%"
            >
              <feGaussianBlur stdDeviation="2.5" />
            </filter>
          </defs>

          <path
            d="M2 1.5L22 19.5L13.5 20.5L17.5 29L13.5 30.5L9.5 21.5L2 26V1.5Z"
            fill="#3F8F46"
            stroke="#FFFFFF"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </>
  );
};

export default MagicCursor;
