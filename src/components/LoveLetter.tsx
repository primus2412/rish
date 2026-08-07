"use client";
import { useState } from "react";
import { motion } from "framer-motion";

const TABS = [
  { id: "letter", label: "My Letter ❤️" },
  { id: "love", label: "Why I Love You 💗" },
  { id: "promise", label: "A Promise 🤍" },
];

const LETTER_CONTENT: Record<string, { title: string; subtitle?: string; lines: string[] }> = {
  letter: {
    title: "Love Letter ❤️",
    subtitle: "To Rishu, from Ishu",
    lines: [
      "My Love ❤️",
      "",
      "There are so many things I want to say to you, but somehow words never feel enough.",
      "",
      "Thank you for being the person who never stopped believing in me, even when I struggled to believe in myself. You've supported me through so much, loved me in ways I never thought I deserved, and stayed by my side through everything.",
      "",
      "You make my life brighter just by being in it. Every call, every message, every little moment with you means more to me than you probably realize.",
      "",
      "And thank you for calling me that day. You may not know how much it meant to me, but it reminded me that no matter what happens, I have someone who truly cares about me. I'll always be grateful for that.",
    ],
  },
  love: {
    title: "Why I Love You 💗",
    lines: [
      "If someone asked me why I love you...",
      "",
      "I honestly don't think I'd have an answer.",
      "",
      "I don't know why I fell in love with you.",
      "",
      "I just know that I did.",
      "",
      "And I know that I love you more than anyone and everything else.",
      "",
      "I love your smile.",
      "",
      "I love your laugh.",
      "",
      "I love your beautiful eyes that I could get lost in forever.",
      "",
      "I love your cute little nose—especially your nose.",
      "",
      "I love your face.",
      "",
      "I love the way you care.",
      "",
      "I love your heart.",
      "",
      "I love your imperfections because they're a part of you.",
      "",
      "I love every little thing that makes you... you.",
      "",
      "There isn't one reason I love you.",
      "",
      "I love all of you.",
      "",
      "And if I had to choose again, in every lifetime, it would always be you.",
      "",
      "I love you.",
      "",
      "Always.",
    ],
  },
  promise: {
    title: "A Promise 🤍",
    lines: [
      "I know life won't always be easy.",
      "",
      "There will be days when we're happy, days when we're stressed, and days when emotions get the better of us. I know you get overwhelmed sometimes, and to be honest, sometimes you overwhelm me too. But that doesn't scare me, because I know we'll figure it out—together.",
      "",
      "I promise I'll stay by your side through the good days and the bad ones. I'll support you when you need someone to lean on, listen when you need to be heard, and remind you how amazing you are whenever you forget.",
      "",
      "Thank you for coming into my life. Having you is one of the greatest blessings I've ever received, and I'll never take that for granted.",
    ],
  },
};

export default function LoveLetter() {
  const [activeTab, setActiveTab] = useState("letter");
  const [isRevealing, setIsRevealing] = useState(false);
  const [revealKey, setRevealKey] = useState(0);

  const switchTab = (tab: string) => {
    setActiveTab(tab);
    setIsRevealing(true);
    setRevealKey((k) => k + 1);
    setTimeout(() => setIsRevealing(false), 200);
  };

  const current = LETTER_CONTENT[activeTab] || LETTER_CONTENT.letter;

  return (
    <section
      id="letter"
      className="section-pad w-full flex flex-col items-center justify-center"
      style={{ background: "linear-gradient(160deg, #FFF0F8 0%, #F8F0FF 100%)" }}
    >
      <div className="max-w-3xl w-full" style={{ margin: "0 auto" }}>
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-10"
        >
          <span className="text-sm tracking-widest uppercase" style={{ color: "var(--pink)" }}>
            ✦ Written from the heart ✦
          </span>
          <h2
            className="font-pinyon mt-3"
            style={{ fontSize: "clamp(3rem, 8vw, 4.5rem)", color: "var(--text)" }}
          >
            {current.title}
          </h2>
          {current.subtitle && (
            <p className="font-serif italic text-lg mt-1" style={{ color: "var(--text-muted)" }}>
              {current.subtitle}
            </p>
          )}
          <div className="divider-heart mt-4">
            <span>🌸</span>
          </div>
        </motion.div>

        {/* Tab navigation */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex justify-center gap-2 mb-8 flex-wrap"
        >
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => switchTab(tab.id)}
              className="px-5 py-2 rounded-full text-sm font-serif italic transition-all duration-300"
              style={{
                background: activeTab === tab.id ? "var(--pink)" : "rgba(255,94,156,0.07)",
                color: activeTab === tab.id ? "white" : "var(--text-muted)",
                border: `1px solid ${activeTab === tab.id ? "var(--pink)" : "rgba(255,94,156,0.2)"}`,
              }}
            >
              {tab.label}
            </button>
          ))}
        </motion.div>

        {/* Parchment Letter Card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="relative"
        >
          {/* Decorative shadow layers */}
          <div
            className="absolute -inset-1 rounded-3xl"
            style={{ background: "linear-gradient(135deg, rgba(255,94,156,0.12), rgba(196,181,253,0.12))", filter: "blur(12px)" }}
          />

          <div
            className="relative rounded-3xl p-8 md:p-14 overflow-hidden"
            style={{
              background: "linear-gradient(160deg, #FFFDF8 0%, #FFF8FA 50%, #F9F5FF 100%)",
              border: "1px solid rgba(255,180,215,0.4)",
              boxShadow: "0 20px 60px rgba(255,94,156,0.1), inset 0 1px 0 rgba(255,255,255,0.9)",
            }}
          >
            {/* Paper texture dots */}
            <div
              className="absolute inset-0 opacity-[0.025] pointer-events-none rounded-3xl"
              style={{
                backgroundImage: "radial-gradient(circle, #FF5E9C 1px, transparent 1px)",
                backgroundSize: "24px 24px",
              }}
            />

            {/* Decorative corners */}
            <div className="absolute top-6 left-6 text-3xl opacity-20">🌸</div>
            <div className="absolute top-6 right-6 text-3xl opacity-20">🌸</div>
            <div className="absolute bottom-6 left-6 text-2xl opacity-15">💕</div>
            <div className="absolute bottom-6 right-6 text-2xl opacity-15">💕</div>

            {/* Letter content */}
            <div
              className="relative font-serif leading-loose space-y-4 text-center"
              style={{ fontSize: "clamp(0.95rem, 2.2vw, 1.1rem)", color: "var(--text)" }}
            >
              {!isRevealing &&
                current.lines.map((line, i) => (
                  <motion.p
                    key={`${revealKey}-${i}`}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: i * 0.05 }}
                    className={line === "" ? "h-2" : ""}
                    style={{
                      fontStyle: i === 0 ? "italic" : "normal",
                      fontWeight: i === 0 ? 600 : i === current.lines.length - 1 ? 600 : 400,
                      color: i === 0 ? "var(--pink)" : "inherit",
                      fontSize: i === 0 ? "1.25em" : "inherit",
                    }}
                  >
                    {line}
                  </motion.p>
                ))}
            </div>

            {/* Divider */}
            <div className="divider-heart mt-8 mb-4">
              <span>❤️</span>
            </div>

            {/* Wax seal */}
            <div className="flex justify-center">
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="w-14 h-14 rounded-full flex items-center justify-center text-2xl cursor-default select-none"
                style={{
                  background: "linear-gradient(135deg, var(--pink), var(--rose))",
                  boxShadow: "0 4px 16px rgba(255,94,156,0.4)",
                }}
                title="Sealed with love"
              >
                💌
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
