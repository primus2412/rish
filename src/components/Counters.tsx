"use client";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

const ANNIVERSARY_DATE = new Date("2025-02-12T00:00:00");
const NEXT_MEETING = new Date("2026-08-14T18:00:00");

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

function CountdownUnit({ value, label, pulse }: { value: number; label: string; pulse?: boolean }) {
  const [flip, setFlip] = useState(false);
  const prevRef = useRef(value);

  useEffect(() => {
    if (value !== prevRef.current) {
      setFlip(true);
      prevRef.current = value;
      setTimeout(() => setFlip(false), 350);
    }
  }, [value]);

  return (
    <div className="flex flex-col items-center gap-1">
      <motion.div
        animate={pulse && flip ? { scale: [1, 1.15, 1] } : {}}
        transition={{ duration: 0.35 }}
        className="glass rounded-2xl px-4 py-4 min-w-[70px] text-center"
        style={{ boxShadow: "0 4px 20px rgba(255,94,156,0.15)" }}
      >
        <motion.span
          key={value}
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="counter-num block"
          suppressHydrationWarning
        >
          {String(value).padStart(2, "0")}
        </motion.span>
      </motion.div>
      <span className="text-xs tracking-widest uppercase" style={{ color: "var(--text-light)" }}>
        {label}
      </span>
    </div>
  );
}

function LoveStat({ emoji, value, label }: { emoji: string; value: string; label: string }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="glass rounded-2xl p-5 text-center"
      style={{ boxShadow: "0 4px 20px rgba(255,94,156,0.1)" }}
    >
      <div className="text-3xl mb-2">{emoji}</div>
      <div className="font-serif font-bold mb-1" style={{ fontSize: "1.5rem", color: "var(--pink)" }}>
        {value}
      </div>
      <p className="text-xs" style={{ color: "var(--text-muted)" }}>{label}</p>
    </motion.div>
  );
}

export default function Counters() {
  const [mounted, setMounted] = useState(false);
  const [now, setNow] = useState<Date>(ANNIVERSARY_DATE);
  const [heartbeat, setHeartbeat] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    setMounted(true);
    setNow(new Date());

    const interval = setInterval(() => {
      setNow(new Date());
      setHeartbeat(true);
      setTimeout(() => setHeartbeat(false), 400);
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
  const countdown = getDiff(now, NEXT_MEETING);

  const daysCount = useCounter(inView ? together.days : 0, 1400);
  const monthsCount = useCounter(inView ? together.months : 0, 1200);
  const yearsCount = useCounter(inView ? together.years : 0, 1000);

  const stats = [
    { emoji: "☕", value: `${mounted ? (together.days * 2).toLocaleString() : "..."}+`, label: "Cups of Love" },
    { emoji: "📱", value: `${mounted ? (together.hours + together.days * 24).toLocaleString() : "..."}+`, label: "Hours Connected" },
    { emoji: "😂", value: "∞", label: "Laughs Shared" },
    { emoji: "💌", value: `${mounted ? (together.days * 3).toLocaleString() : "..."}+`, label: "Sweet Messages" },
    { emoji: "🌙", value: `${mounted ? together.days : "..."}`, label: "Nights Dreaming" },
    { emoji: "💕", value: "1", label: "Perfect Person" },
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
            ✦ Since 12 February 2025 ✦
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

        {/* ── Countdown to Next Meeting ── */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center"
        >
          <span className="text-sm tracking-widest uppercase" style={{ color: "var(--lavender-mid)" }}>
            ✦ Can&apos;t Wait to See You ✦
          </span>
          <h2 className="section-title mt-3 mb-3">Next Meeting</h2>
          <p className="font-serif italic mb-8" style={{ color: "var(--text-muted)" }}>
            Counting every second until then…
          </p>

          {mounted ? (
            countdown.ms > 0 ? (
              <div className="flex justify-center gap-4 flex-wrap">
                <CountdownUnit value={countdown.days} label="Days" pulse={heartbeat} />
                <CountdownUnit value={countdown.hours} label="Hours" pulse={heartbeat} />
                <CountdownUnit value={countdown.mins} label="Minutes" pulse={heartbeat} />
                <CountdownUnit value={countdown.secs} label="Seconds" pulse={heartbeat} />
              </div>
            ) : (
              <div
                className="glass rounded-3xl p-8 inline-block"
                style={{ fontSize: "2rem", color: "var(--pink)" }}
              >
                🎉 Today is the day! ❤️
              </div>
            )
          ) : (
            <div className="flex justify-center gap-4 flex-wrap">
              {["Days", "Hours", "Minutes", "Seconds"].map((lbl) => (
                <div key={lbl} className="flex flex-col items-center gap-1">
                  <div className="glass rounded-2xl px-4 py-4 min-w-[70px] text-center">
                    <span className="counter-num block">--</span>
                  </div>
                  <span className="text-xs tracking-widest uppercase" style={{ color: "var(--text-light)" }}>
                    {lbl}
                  </span>
                </div>
              ))}
            </div>
          )}

          <div className="mt-4 flex justify-center">
            <motion.span
              animate={{ scale: heartbeat ? [1, 1.3, 1] : 1 }}
              transition={{ duration: 0.35 }}
              className="text-3xl"
            >
              💗
            </motion.span>
          </div>
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
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {stats.map((s) => (
              <LoveStat key={s.label} {...s} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
