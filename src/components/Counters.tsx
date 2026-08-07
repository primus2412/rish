"use client";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

const ANNIVERSARY_DATE = new Date("2025-11-29T00:00:00");

function useCounter(target: number, duration = 1200) {
  const [count, setCount] = useState(0);
  const rafRef = useRef<number>(0);
  const startRef = useRef<number>(0);

  useEffect(() => {
    startRef.current = performance.now();
    const animate = (now: number) => {
      const elapsed = now - startRef.current;
      const progress = Math.min(elapsed / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(ease * target));
      if (progress < 1) rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [target, duration]);

  return count;
}

function getDiff(from: Date, to: Date) {
  const ms = to.getTime() - from.getTime();
  const secs = Math.max(0, Math.floor(ms / 1000));
  const days = Math.floor(secs / 86400);
  const hours = Math.floor((secs % 86400) / 3600);
  const mins = Math.floor((secs % 3600) / 60);
  const secsR = secs % 60;
  const months = Math.floor(days / 30.44);
  const years = Math.floor(days / 365.25);
  return { ms, days, hours, mins, secs: secsR, months, years };
}

function LoveStat({ emoji, value, label }: { emoji: string; value: string; label: string }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="glass rounded-2xl p-6 text-center"
      style={{ boxShadow: "0 4px 20px rgba(255,94,156,0.1)" }}
    >
      <div className="text-3xl mb-2">{emoji}</div>
      <div className="font-serif font-bold mb-1" style={{ fontSize: "1.75rem", color: "var(--pink)" }}>
        {value}
      </div>
      <p className="text-xs font-medium" style={{ color: "var(--text-muted)" }}>{label}</p>
    </motion.div>
  );
}

export default function Counters() {
  const [mounted, setMounted] = useState(false);
  const [now, setNow] = useState<Date>(ANNIVERSARY_DATE);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    setMounted(true);
    setNow(new Date());

    const interval = setInterval(() => {
      setNow(new Date());
    }, 1000);

    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setInView(true);
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);

    return () => {
      clearInterval(interval);
      obs.disconnect();
    };
  }, []);

  const together = getDiff(ANNIVERSARY_DATE, now);

  const daysCount = useCounter(inView ? together.days : 0, 1400);
  const monthsCount = useCounter(inView ? together.months : 0, 1200);
  const yearsCount = useCounter(inView ? together.years : 0, 1000);

  const stats = [
    { emoji: "❤️", value: "49+", label: "Hours Connected" },
    { emoji: "💬", value: "9999+", label: "Sweet Messages" },
    { emoji: "🌙", value: "Every Day", label: "Nights Dreaming About You" },
  ];

  return (
    <section
      id="countdown"
      className="section-pad w-full flex flex-col items-center justify-center"
      ref={sectionRef}
      style={{ background: "linear-gradient(160deg, #F9F0FF 0%, #FFF0F5 100%)" }}
    >
      <div className="max-w-5xl w-full space-y-16" style={{ margin: "0 auto" }}>
        {/* ── Days Together ── */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <span className="text-sm tracking-widest uppercase" style={{ color: "var(--pink)" }}>
            ✦ Since 29 November 2025 ✦
          </span>
          <h2 className="section-title mt-3 mb-10">Together Counter</h2>

          <div className="flex justify-center gap-6 flex-wrap mb-8">
            {[
              { val: daysCount, lbl: "Days" },
              { val: monthsCount, lbl: "Months" },
              { val: yearsCount, lbl: "Years" },
            ].map(({ val, lbl }) => (
              <div key={lbl} className="flex flex-col items-center gap-2">
                <div
                  className="glass rounded-3xl px-8 py-6"
                  style={{ boxShadow: "0 8px 32px rgba(255,94,156,0.15)" }}
                >
                  <span
                    className="counter-num"
                    style={{ fontSize: "clamp(3rem, 8vw, 5.5rem)" }}
                    suppressHydrationWarning
                  >
                    {val.toLocaleString()}
                  </span>
                </div>
                <span
                  className="text-sm tracking-widest uppercase font-medium"
                  style={{ color: "var(--text-light)" }}
                >
                  {lbl}
                </span>
              </div>
            ))}
          </div>

          <p className="font-serif italic text-lg" style={{ color: "var(--text-muted)" }}>
            …and every moment has been worth it ❤️
          </p>
        </motion.div>

        {/* ── Love Stats ── */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <div className="text-center mb-8">
            <h3 className="section-title" style={{ fontSize: "clamp(1.6rem, 4vw, 2.5rem)" }}>
              Love Statistics
            </h3>
            <p className="font-serif italic mt-2" style={{ color: "var(--text-muted)" }}>
              By the numbers (approximately infinite)
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
            {stats.map((s) => (
              <LoveStat key={s.label} {...s} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
