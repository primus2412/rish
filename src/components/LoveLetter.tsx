"use client";
import { useState } from "react";
import { motion } from "framer-motion";

const TABS = [
  { id: "beginning", label: "Our Beginning" },
  { id: "love", label: "Why I Love You" },
  { id: "promise", label: "A Promise" },
];

const LETTER_CONTENT: Record<string, string[]> = {
  beginning: [
    "My Dearest Ishu,",
    "",
    "There are moments in life that arrive so quietly, yet change everything. The day I first met you was one of those moments — unremarkable on the surface, extraordinary in every other way.",
    "",
    "I remember your smile and the way your eyes held a whole universe of warmth and kindness. I didn't know then that I was meeting the person who would become my favorite chapter in this story called life.",
    "",
    "From that first conversation to every little moment since — each one has been a gift I didn't know I deserved.",
  ],
  love: [
    "I love you for a thousand reasons,",
    "",
    "I love the way you find beauty in ordinary things — a cup of tea, a quiet afternoon, the sound of rain. I love how you care so deeply, how your heart is always open and genuine.",
    "",
    "I love your laughter — the kind that fills a room. I love your warmth, your honesty, and the way you make me feel safe just by being near. I love how you make ordinary days feel like celebrations.",
    "",
    "But most of all, I love you for being exactly, unapologetically you.",
  ],
  promise: [
    "And this is my promise to you,",
    "",
    "I promise to be your calm in every storm, your laughter in every sadness. I promise to hold your hand through every chapter — the beautiful ones, the difficult ones, and all the ordinary ones in between.",
    "",
    "I promise to choose you, again and again, in a thousand small ways every single day.",
    "",
    "Today, tomorrow, and every day that comes after — you are my favorite person, my greatest adventure, my home.",
    "",
    "Yours, always & completely,",
    "Rishu 💕",
  ],
};

export default function LoveLetter() {
  const [activeTab, setActiveTab] = useState("beginning");
  const [isRevealing, setIsRevealing] = useState(false);
  const [revealKey, setRevealKey] = useState(0);

  const switchTab = (tab: string) => {
    setActiveTab(tab);
    setIsRevealing(true);
    setRevealKey((k) => k + 1);
    setTimeout(() => setIsRevealing(false), 200);
  };

  const lines = LETTER_CONTENT[activeTab] || [];

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
          className="text-center mb-12"
        >
          <span className="text-sm tracking-widest uppercase" style={{ color: "var(--pink)" }}>
            ✦ Written from the heart ✦
          </span>
          <h2
            className="font-pinyon mt-3"
            style={{ fontSize: "clamp(3rem, 8vw, 5rem)", color: "var(--text)" }}
          >
            Love Letter
          </h2>
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
                lines.map((line, i) => (
                  <motion.p
                    key={`${revealKey}-${i}`}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    className={line === "" ? "h-2" : ""}
                    style={{
                      fontStyle: i === 0 ? "italic" : "normal",
                      fontWeight: i === 0 ? 600 : i === lines.length - 1 ? 600 : 400,
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
