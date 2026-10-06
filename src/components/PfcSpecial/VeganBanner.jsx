import React, { useRef } from "react";

const VeganBanner = () => {
  const bannerRef = useRef(null);

  const handleMouseMove = (e) => {
    const el = bannerRef.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const rotateY = (x / rect.width - 0.5) * 5;
    const rotateX = (y / rect.height - 0.5) * -5;
    const moveX = (x / rect.width - 0.5) * 18;
    const moveY = (y / rect.height - 0.5) * 18;

    el.style.transform = `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    el.style.setProperty("--mx", `${moveX}px`);
    el.style.setProperty("--my", `${moveY}px`);
  };

  const handleMouseLeave = () => {
    const el = bannerRef.current;
    if (!el) return;

    el.style.transform = "perspective(1200px) rotateX(0deg) rotateY(0deg)";
    el.style.setProperty("--mx", "0px");
    el.style.setProperty("--my", "0px");
  };

  return (
    <section className="w-full bg-[#f3f8ef] px-4 py-12 md:px-8">
      <div
        ref={bannerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative mx-auto min-h-[500px] max-w-[1400px] overflow-hidden rounded-[30px] bg-[radial-gradient(circle_at_80%_20%,rgba(126,217,87,0.18),transparent_30%),linear-gradient(135deg,#0b301d,#124d2c_50%,#082517)] text-white shadow-[0_30px_70px_rgba(9,55,29,0.25)] transition-transform duration-150 ease-out"
      >
        <div
          className="pointer-events-none absolute -left-5 top-0 text-[80px] opacity-10"
          style={{ transform: "translate(var(--mx),var(--my)) rotate(-20deg)" }}
        >
          🌿
        </div>
        <div
          className="pointer-events-none absolute right-8 top-10 text-[100px] opacity-10"
          style={{
            transform: "translate(calc(var(--mx)*-.6),calc(var(--my)*-.6))",
          }}
        >
          🍃
        </div>
        <div
          className="pointer-events-none absolute bottom-0 left-[45%] text-[70px] opacity-10"
          style={{
            transform: "translate(calc(var(--mx)*.5),calc(var(--my)*.5))",
          }}
        >
          🌱
        </div>

        <div className="absolute left-1/2 top-6 flex -translate-x-1/2 items-center gap-3 text-[10px] font-bold tracking-[4px] text-[#c9e9b6]">
          <span className="h-px w-8 bg-[#80bd68]" />
          VEGAN COLLECTION
          <span className="h-px w-8 bg-[#80bd68]" />
        </div>

        <div className="relative z-10 flex min-h-[500px] items-center justify-center gap-16 px-8 pb-16 pt-20 md:px-16">
          <div className="z-10 w-full md:w-[35%]">
            <span className="inline-flex rounded-full border border-[#bff09f]/30 bg-white/5 px-3 py-2 text-[10px] font-bold tracking-wider text-[#d7f4c9] backdrop-blur">
              🌱 100% PLANT POWER
            </span>
            <h2 className="my-5 text-5xl font-black leading-[.9] tracking-[-3px] md:text-7xl">
              GOOD FOOD.
              <br />
              <span className="text-[#9bd477]">GOOD MOOD.</span>
            </h2>
            <p className="mb-6 max-w-md text-sm leading-7 text-[#c5d8ca]">
              Fresh, plant-based choices made for a happier plate and a
              healthier planet.
            </p>
            <button className="group inline-flex items-center gap-3 rounded-full bg-[#a5d681] px-5 py-3 font-extrabold text-[#12321e] transition hover:-translate-y-1 hover:bg-[#c1efa0]">
              Explore Vegan{" "}
              <span className="text-xl transition group-hover:translate-x-1">
                →
              </span>
            </button>
          </div>

          <div
            className="relative h-[270px] w-[360px] shrink-0 rounded-xl border-[7px] border-[#8a5a31] bg-gradient-to-br from-[#d4a66b] to-[#b98045] shadow-[0_25px_45px_rgba(0,0,0,.35)] transition-transform duration-200"
            style={{
              transform: "translate(calc(var(--mx)*-.35),calc(var(--my)*-.35))",
            }}
          >
            <div className="absolute left-4 top-4 h-3 w-3 rounded-full bg-[#4b2c18] shadow-inner" />
            <div className="absolute right-4 top-4 h-3 w-3 rounded-full bg-[#4b2c18] shadow-inner" />
            <div className="flex h-full flex-col items-center justify-center">
              <span className="text-[11px] font-extrabold tracking-[5px] text-[#49301e]">
                FROM PLANTS
              </span>
              <div className="mt-1 text-7xl font-black leading-none tracking-[-4px] text-[#f5f0df] [text-shadow:3px_3px_0_#704522]">
                VEGAN
              </div>
              <span className="mt-2 text-xs font-extrabold tracking-[3px] text-[#50311c]">
                MADE WITH LOVE
              </span>
              <div className="my-3 h-0.5 w-36 bg-[#6c4425]" />
              <div className="flex gap-7 text-[#4c301d]">
                <div className="flex items-center gap-1">
                  <span>🌱</span>
                  <small className="font-extrabold">PLANT</small>
                </div>
                <div className="flex items-center gap-1">
                  <span>🥬</span>
                  <small className="font-extrabold">FRESH</small>
                </div>
                <div className="flex items-center gap-1">
                  <span>💚</span>
                  <small className="font-extrabold">GOOD</small>
                </div>
              </div>
            </div>
          </div>

          <div
            className="absolute left-[48%] top-[22%] flex h-20 w-20 -translate-x-1/2 flex-col items-center justify-center rounded-full border-4 border-[#9aca7b] bg-[#f5ffee] text-[#183c24] shadow-xl"
            style={{ transform: "translate(var(--mx),var(--my))" }}
          >
            <span className="text-3xl">🥑</span>
            <small className="text-[8px] font-black tracking-wider">
              FRESH
            </small>
          </div>
          <div
            className="absolute bottom-[18%] right-[8%] flex h-20 w-20 flex-col items-center justify-center rounded-full border-4 border-[#9aca7b] bg-[#f5ffee] text-[#183c24] shadow-xl"
            style={{
              transform: "translate(calc(var(--mx)*-.8),calc(var(--my)*-.8))",
            }}
          >
            <span className="text-3xl">🥦</span>
            <small className="text-[8px] font-black tracking-wider">
              GREEN
            </small>
          </div>
          <div
            className="absolute bottom-[8%] left-[39%] flex h-20 w-20 flex-col items-center justify-center rounded-full border-4 border-[#9aca7b] bg-[#f5ffee] text-[#183c24] shadow-xl"
            style={{
              transform: "translate(calc(var(--mx)*.7),calc(var(--my)*.7))",
            }}
          >
            <span className="text-3xl">🌿</span>
            <small className="text-[8px] font-black tracking-wider">PURE</small>
          </div>
        </div>

        <div className="absolute bottom-5 left-1/2 flex w-full -translate-x-1/2 flex-wrap justify-center gap-2 px-3">
          <span className="rounded-full border border-[#bef0aa]/20 bg-white/5 px-3 py-1.5 text-[9px] font-extrabold tracking-wider text-[#b9dca9]">
            PLANT BASED
          </span>
          <span className="rounded-full border border-[#bef0aa]/20 bg-white/5 px-3 py-1.5 text-[9px] font-extrabold tracking-wider text-[#b9dca9]">
            100% VEGAN
          </span>
          <span className="rounded-full border border-[#bef0aa]/20 bg-white/5 px-3 py-1.5 text-[9px] font-extrabold tracking-wider text-[#b9dca9]">
            EARTH FRIENDLY
          </span>
        </div>
      </div>
    </section>
  );
};

export default VeganBanner;
