"use client";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";

const ParticleCanvas = dynamic(() => import("./ParticleCanvas"), { ssr: false });

export default function Hero() {
  const scrollToGallery = () => {
    document.querySelector("#gallery")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden gradient-hero py-20 w-full"
    >
      {/* Animated blobs */}
      <div
        className="blob w-96 h-96 top-[-8%] left-[-10%]"
        style={{ background: "radial-gradient(circle, #FF8AB4, #FFB3D1)" }}
      />
      <div
        className="blob w-80 h-80 bottom-[-5%] right-[-8%]"
        style={{ background: "radial-gradient(circle, #C4B5FD, #E9D5FF)", animationDelay: "2s" }}
      />
      <div
        className="blob w-64 h-64 top-[30%] right-[10%]"
        style={{ background: "radial-gradient(circle, #FAE08A, #F4C542)", animationDelay: "4s", opacity: 0.25 }}
      />
      <div
        className="blob w-56 h-56 bottom-[20%] left-[8%]"
        style={{ background: "radial-gradient(circle, #FF5E9C, #FF8AB4)", animationDelay: "1s", opacity: 0.2 }}
      />

      {/* Floating hearts */}
      {Array.from({ length: 10 }).map((_, i) => (
        <div
          key={i}
          className="absolute text-pink-300 select-none pointer-events-none"
          style={{
            left: `${8 + i * 9}%`,
            bottom: `${10 + (i % 4) * 18}%`,
            fontSize: `${0.8 + (i % 3) * 0.5}rem`,
            opacity: 0.25 + (i % 3) * 0.1,
            animation: `float ${3 + i * 0.5}s ease-in-out infinite`,
            animationDelay: `${i * 0.4}s`,
          }}
        >
          ♥
        </div>
      ))}

      <ParticleCanvas />

      {/* Hero card container */}
      <div
        className="relative z-10 flex flex-col items-center text-center px-4 max-w-3xl w-full gap-8"
        style={{ margin: "0 auto" }}
      >
        {/* Small tag */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.0 }}
          className="shrink-0 flex items-center gap-3"
        >
          <span
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-semibold tracking-widest uppercase glass shadow-sm"
            style={{ color: "var(--pink)", border: "1px solid rgba(255,94,156,0.3)" }}
          >
            ✦ Est. 12 February 2025 ✦
          </span>
        </motion.div>

        {/* Main glass card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="glass rounded-3xl p-8 md:p-12 w-full relative overflow-hidden flex flex-col items-center gap-6 shrink-0"
          style={{ boxShadow: "0 20px 80px rgba(255,94,156,0.18), inset 0 1px 0 rgba(255,255,255,0.9)" }}
        >
          {/* Decorative corner roses */}
          <span className="absolute top-6 left-6 text-2xl opacity-35">🌸</span>
          <span className="absolute top-6 right-6 text-2xl opacity-35">🌸</span>
          <span className="absolute bottom-6 left-6 text-xl opacity-25">✨</span>
          <span className="absolute bottom-6 right-6 text-xl opacity-25">✨</span>

          {/* Hero Profile Photo Avatar - Couple Together Photo */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.7 }}
            className="relative w-36 h-36 md:w-44 md:h-44 rounded-full p-1.5 shadow-xl"
            style={{ background: "linear-gradient(135deg, var(--pink), var(--rose), var(--gold-light))" }}
          >
            <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-white shadow-inner">
              <img
                src="/photos/photo-5.jpg"
                alt="Rishu & Ishu Together"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>

          <h1
            className="font-script leading-tight"
            style={{ fontSize: "clamp(3.2rem, 9vw, 5.8rem)", color: "var(--text)" }}
          >
            Rishu{" "}
            <span className="anim-heartbeat inline-block mx-1" style={{ color: "var(--pink)" }}>
              ❤️
            </span>{" "}
            Ishu
          </h1>

          <p
            className="font-serif italic tracking-wide"
            style={{ fontSize: "clamp(1.1rem, 3vw, 1.5rem)", color: "var(--text-muted)", fontWeight: 300 }}
          >
            Our Story
          </p>

          <div className="divider-heart my-1">
            <span>✦</span>
          </div>

          <blockquote
            className="font-serif italic leading-relaxed max-w-xl mx-auto text-center"
            style={{
              fontSize: "clamp(1rem, 2.5vw, 1.25rem)",
              color: "var(--text-muted)",
            }}
          >
            &ldquo;In all the world, there is no heart for me like yours.<br className="hidden md:block" />
            In all the world, there is no love for you like mine.&rdquo;
          </blockquote>
          <cite
            className="text-xs tracking-widest uppercase mt-1 block font-semibold text-center"
            style={{ color: "var(--pink-light)" }}
          >
            — Maya Angelou
          </cite>
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.4 }}
          className="shrink-0"
        >
          <button
            onClick={scrollToGallery}
            className="btn-primary group relative overflow-hidden px-10 py-4 text-base"
          >
            <span
              className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-20 transition-opacity"
              style={{ background: "white" }}
            />
            <span>Begin Our Journey</span>
            <motion.span
              className="ml-2 inline-block"
              animate={{ x: [0, 6, 0] }}
              transition={{ repeat: Infinity, duration: 1.6 }}
            >
              →
            </motion.span>
          </button>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.6 }}
          className="mt-6 flex flex-col items-center gap-2 shrink-0"
          style={{ color: "var(--text-light)" }}
        >
          <span className="text-xs tracking-widest uppercase">Scroll to explore</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.8 }}
            className="w-5 h-8 rounded-full border-2 flex items-start justify-center pt-1.5"
            style={{ borderColor: "var(--pink-light)" }}
          >
            <div className="w-1.5 h-2 rounded-full" style={{ background: "var(--pink)" }} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
