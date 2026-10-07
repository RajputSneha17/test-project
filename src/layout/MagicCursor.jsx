import React, { useEffect, useRef } from "react";

const MagicCursor = () => {
  const canvasRef = useRef(null);
  const cursorRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const isMobile = "ontouchstart" in window || navigator.maxTouchPoints > 0;

    let width = window.innerWidth;
    let height = window.innerHeight;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;

      canvas.width = width;
      canvas.height = height;
    };

    resize();

    const particles = [];

    const createMobileStars = (x, y) => {
      for (let i = 0; i < 4; i++) {
        particles.push({
          x: x + (Math.random() - 0.5) * 20,
          y: y + (Math.random() - 0.5) * 20,
          vx: (Math.random() - 0.5) * 0.8,
          vy: (Math.random() - 0.5) * 0.8 - 0.5,
          size: 2 + Math.random() * 3,
          life: 1,
          decay: 0.02 + Math.random() * 0.025,
          mobile: true,
        });
      }
    };

    const drawStar = (x, y, size, alpha) => {
      ctx.save();

      ctx.globalAlpha = alpha;

      ctx.shadowBlur = 12;
      ctx.shadowColor = "rgba(63, 143, 70, 0.9)";

      ctx.beginPath();

      ctx.moveTo(x, y - size);
      ctx.lineTo(x + size * 0.25, y - size * 0.25);

      ctx.lineTo(x + size, y);

      ctx.lineTo(x + size * 0.25, y + size * 0.25);

      ctx.lineTo(x, y + size);

      ctx.lineTo(x - size * 0.25, y + size * 0.25);

      ctx.lineTo(x - size, y);

      ctx.lineTo(x - size * 0.25, y - size * 0.25);

      ctx.closePath();

      ctx.fillStyle = "#6fa968";
      ctx.fill();

      ctx.restore();
    };

    const handleTouchStart = (e) => {
      for (const touch of e.changedTouches) {
        createMobileStars(touch.clientX, touch.clientY);
      }
    };

    const handleTouchMove = (e) => {
      for (const touch of e.changedTouches) {
        createMobileStars(touch.clientX, touch.clientY);
      }
    };

    if (isMobile) {
      canvas.style.display = "block";

      window.addEventListener("touchstart", handleTouchStart, {
        passive: true,
      });

      window.addEventListener("touchmove", handleTouchMove, { passive: true });
    }

    const mouse = {
      x: width / 2,
      y: height / 2,
      lastX: width / 2,
      lastY: height / 2,
    };

    const handleMouseMove = (e) => {
      if (isMobile) return;

      mouse.lastX = mouse.x;
      mouse.lastY = mouse.y;

      mouse.x = e.clientX;
      mouse.y = e.clientY;

      if (cursorRef.current) {
        cursorRef.current.style.left = `${mouse.x}px`;

        cursorRef.current.style.top = `${mouse.y}px`;
      }

      const dx = mouse.x - mouse.lastX;
      const dy = mouse.y - mouse.lastY;

      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < 3) return;

      const dirX = dx / distance;
      const dirY = dy / distance;

      const count = Math.min(7, Math.max(1, Math.floor(distance / 6)));

      for (let i = 0; i < count; i++) {
        const behind = 10 + Math.random() * 25;

        particles.push({
          x: mouse.x - dirX * behind + (Math.random() - 0.5) * 8,

          y: mouse.y - dirY * behind + (Math.random() - 0.5) * 8,

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

        if (p.mobile) {
          p.vx *= 0.98;
          p.vy *= 0.98;

          p.life -= p.decay;

          if (p.life <= 0) {
            particles.splice(i, 1);
            continue;
          }

          drawStar(p.x, p.y, p.size * p.life, p.life);

          continue;
        }

        p.vx *= 0.992;
        p.vy *= 0.992;

        p.life -= p.decay;

        if (p.life <= 0) {
          particles.splice(i, 1);
          continue;
        }

        ctx.save();

        ctx.globalAlpha = p.life * 0.7;

        ctx.shadowBlur = 10;

        ctx.shadowColor = "rgba(77, 140, 82, 0.8)";

        if (p.sparkle) {
          drawStar(p.x, p.y, p.size * 2.2, p.life);
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

    animate();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);

      window.removeEventListener("resize", resize);

      window.removeEventListener("touchstart", handleTouchStart);

      window.removeEventListener("touchmove", handleTouchMove);

      cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <>
      <style>
        {`
          @media (pointer: fine) {
            html,
            body,
            * {
              cursor: none !important;
            }
          }

          @media (pointer: coarse) {
            .magic-cursor {
              display: none !important;
            }
          }
        `}
      </style>

      <canvas
        ref={canvasRef}
        className="pointer-events-none fixed inset-0 z-[99997]"
        style={{
          width: "100vw",
          height: "100vh",
        }}
      />

      <div
        ref={cursorRef}
        className="magic-cursor pointer-events-none fixed z-[99999]"
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
