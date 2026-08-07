"use client";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";

const LINES = [
  "I'll choose you,",
  "today,",
  "tomorrow,",
  "and every day after.",
];

function StarCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    const stars: { x: number; y: number; r: number; alpha: number; dAlpha: number }[] = [];

    const resize = () => {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    for (let i = 0; i < 120; i++) {
      stars.push({
        x:      Math.random() * canvas.width,
        y:      Math.random() * canvas.height,
        r:      Math.random() * 1.5 + 0.3,
        alpha:  Math.random(),
        dAlpha: (Math.random() - 0.5) * 0.02,
      });
    }

    const loop = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      stars.forEach((s) => {
        s.alpha += s.dAlpha;
        if (s.alpha > 1 || s.alpha < 0) s.dAlpha *= -1;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 200, 230, ${s.alpha})`;
        ctx.fill();
      });
      animId = requestAnimationFrame(loop);
    };
    loop();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
    />
  );
}

function ConfettiHeartsCanvas({ active }: { active: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef   = useRef<number>(0);

  useEffect(() => {
    if (!active) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width  = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    type Particle = {
      x: number; y: number; vx: number; vy: number;
      alpha: number; size: number; color: string; rotation: number; vr: number;
    };

    const particles: Particle[] = [];
    const colors = ["#FF5E9C", "#FF8AB4", "#F4C542", "#E9D5FF", "#C4B5FD", "#FFB3D1"];

    for (let i = 0; i < 120; i++) {
      particles.push({
        x:    canvas.width * 0.5 + (Math.random() - 0.5) * 200,
        y:    canvas.height * 0.45,
        vx:   (Math.random() - 0.5) * 10,
        vy:   -(Math.random() * 12 + 4),
        alpha: 1,
        size:  Math.random() * 14 + 5,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * Math.PI * 2,
        vr:   (Math.random() - 0.5) * 0.2,
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      let alive = false;
      particles.forEach((p) => {
        if (p.alpha <= 0) return;
        alive = true;
        p.x  += p.vx;
        p.y  += p.vy;
        p.vy += 0.25;
        p.vx *= 0.99;
        p.alpha -= 0.012;
        p.rotation += p.vr;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.globalAlpha = Math.max(0, p.alpha);
        ctx.fillStyle = p.color;

        // Draw heart
        const s = p.size * 0.5;
        ctx.beginPath();
        ctx.moveTo(0, -s * 0.3);
        ctx.bezierCurveTo(s * 0.5, -s * 1.0, s * 1.4, -s * 0.2, 0, s * 0.9);
        ctx.bezierCurveTo(-s * 1.4, -s * 0.2, -s * 0.5, -s * 1.0, 0, -s * 0.3);
        ctx.fill();
        ctx.restore();
      });
      if (alive) animRef.current = requestAnimationFrame(draw);
    };
    draw();

    return () => cancelAnimationFrame(animRef.current);
  }, [active]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
    />
  );
}

export default function Surprise() {
  const [phase, setPhase] = useState<"idle" | "revealing" | "done">("idle");
  const [lineIndex, setLineIndex] = useState(-1);
  const [showFinal, setShowFinal] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const triggered  = useRef(false);

  // Trigger on scroll into view
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && !triggered.current) {
          triggered.current = true;
          startSequence();
        }
      },
      { threshold: 0.4 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  const startSequence = () => {
    setPhase("revealing");
    setLineIndex(0);

    LINES.forEach((_, i) => {
      setTimeout(() => setLineIndex(i), i * 1000);
    });

    setTimeout(() => {
      setShowFinal(true);
      setPhase("done");
    }, LINES.length * 1000 + 800);

    setTimeout(() => {
      setShowConfetti(true);
      // Mobile haptic
      if (navigator.vibrate) navigator.vibrate([200, 100, 200, 100, 400]);
    }, LINES.length * 1000 + 1600);
  };

  return (
    <section
      id="surprise"
      ref={sectionRef}
      className="surprise-bg relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <StarCanvas />
      <ConfettiHeartsCanvas active={showConfetti} />

      {/* Glow rings behind heart */}
      <div
        className="absolute"
        style={{
          width: 300, height: 300,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(255,94,156,0.25) 0%, transparent 70%)",
          animation: "glowPulse 3s ease-in-out infinite",
        }}
      />

      <div className="relative z-10 flex flex-col items-center text-center px-4 max-w-2xl mx-auto">
        {/* Giant pulsing heart */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "backOut" }}
          className="anim-heartbeat mb-12 select-none"
          style={{ fontSize: "clamp(5rem, 15vw, 8rem)" }}
        >
          ❤️
        </motion.div>

        {/* Sequential text lines */}
        <div className="mb-10 space-y-3">
          <AnimatePresence>
            {LINES.map((line, i) => (
              lineIndex >= i && (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, y: 25 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="font-serif italic"
                  style={{
                    fontSize:   i === 0 ? "clamp(1.6rem, 5vw, 2.5rem)" : "clamp(1.2rem, 4vw, 2rem)",
                    color:      i === 0 ? "white" : i < 3 ? "rgba(255,255,255,0.85)" : "var(--gold)",
                    fontWeight: i === 0 ? 600 : 400,
                  }}
                >
                  {line}
                </motion.p>
              )
            ))}
          </AnimatePresence>
        </div>

        {/* Final reveal */}
        <AnimatePresence>
          {showFinal && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: "backOut" }}
              className="space-y-4"
            >
              <p
                className="font-script"
                style={{
                  fontSize:   "clamp(2.5rem, 7vw, 4.5rem)",
                  background: "linear-gradient(135deg, var(--gold), #FFD700, var(--gold-light))",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  filter: "drop-shadow(0 0 20px rgba(244,197,66,0.6))",
                }}
              >
                ❤️ Forever Yours ❤️
              </p>

              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="font-serif italic text-white/80"
                style={{ fontSize: "clamp(1rem, 3vw, 1.4rem)" }}
              >
                Happy Girlfriend&apos;s Day ❤️
              </motion.p>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="flex justify-center gap-3 mt-4"
              >
                {["💕", "🌸", "✨", "🌸", "💕"].map((e, i) => (
                  <motion.span
                    key={i}
                    className="text-2xl"
                    animate={{ y: [0, -12, 0], opacity: [0.6, 1, 0.6] }}
                    transition={{ repeat: Infinity, duration: 2, delay: i * 0.25 }}
                  >
                    {e}
                  </motion.span>
                ))}
              </motion.div>

              {/* Start over / replay button */}
              {phase === "done" && (
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.5 }}
                  onClick={() => {
                    triggered.current = false;
                    setPhase("idle");
                    setLineIndex(-1);
                    setShowFinal(false);
                    setShowConfetti(false);
                    setTimeout(() => {
                      triggered.current = true;
                      startSequence();
                    }, 400);
                  }}
                  className="mt-6 px-6 py-2 rounded-full border text-sm font-medium transition-all hover:bg-white/10"
                  style={{ borderColor: "rgba(255,255,255,0.3)", color: "rgba(255,255,255,0.7)" }}
                >
                  ↺ Replay
                </motion.button>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* CTA to scroll back top */}
        {showFinal && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
            onClick={() => document.querySelector("#hero")?.scrollIntoView({ behavior: "smooth" })}
            className="mt-14 flex flex-col items-center gap-1"
            style={{ color: "rgba(255,255,255,0.4)" }}
          >
            <span className="text-xs tracking-widest uppercase">Back to the beginning</span>
            <motion.span
              animate={{ y: [0, -6, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="text-lg"
            >
              ↑
            </motion.span>
          </motion.button>
        )}
      </div>
    </section>
  );
}
