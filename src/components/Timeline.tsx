"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const EVENTS = [
  {
    title: "Always Smiling",
    desc: "Your smile has always been my favorite.",
    img: "/photos/always%20smiling.png",
    icon: "😊",
    side: "left" as const,
  },
  {
    title: "Beautiful You",
    desc: "Just being yourself is more than enough.",
    img: "/photos/pretty%20as%20you%20are.png",
    icon: "✨",
    side: "right" as const,
  },
  {
    title: "Our First Date",
    desc: "The day everything started to feel different.",
    img: "/photos/first%20date%20(1).png",
    icon: "❤️",
    side: "left" as const,
  },
  {
    title: "A Walk Together",
    desc: "Every little moment became a beautiful memory.",
    img: "/photos/first%20date%20(2).png",
    icon: "🌿",
    side: "right" as const,
  },
  {
    title: "Our First Selfie",
    desc: "A simple picture, an unforgettable moment.",
    img: "/photos/first.jpg",
    icon: "📸",
    side: "left" as const,
  },
  {
    title: "Happy Together",
    desc: "Happiness always feels better with you.",
    img: "/photos/happy%20together.jpg",
    icon: "☀️",
    side: "right" as const,
  },
  {
    title: "Lovely Idiots",
    desc: "Still making each other laugh every day.",
    img: "/photos/lovely%20idoits.jpg",
    icon: "😄",
    side: "left" as const,
  },
  {
    title: "Better Days",
    desc: "Every day got brighter because of you.",
    img: "/photos/better%20day.jpg",
    icon: "🌅",
    side: "right" as const,
  },
  {
    title: "Just Us",
    desc: "Being silly together is our favorite hobby.",
    img: "/photos/silly%20together.jpg",
    icon: "🤪",
    side: "left" as const,
  },
  {
    title: "Goofy Moments",
    desc: "The little moments make the best memories.",
    img: "/photos/sillyy.png",
    icon: "🤍",
    side: "right" as const,
  },
  {
    title: "Forever Us",
    desc: "Home is wherever you're in my arms.",
    img: "/photos/together.png",
    icon: "🏡",
    side: "left" as const,
  },
  {
    title: "Still Smiling",
    desc: "And this is only the beginning of our story.",
    img: "/photos/WIN_20260416_11_26_01_Pro.jpg",
    icon: "🌟",
    side: "right" as const,
  },
];

function TimelineCard({ event, index, total }: { event: typeof EVENTS[0]; index: number; total: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const isLeft = event.side === "left";

  return (
    <div
      ref={ref}
      className="relative grid grid-cols-1 md:grid-cols-9 items-center mb-16 gap-6 md:gap-0"
    >
      {/* Card Wrapper (takes left 4 columns or right 4 columns) */}
      <div className={`col-span-1 md:col-span-4 ${isLeft ? "md:text-right" : "md:order-last"}`}>
        <motion.div
          initial={{ opacity: 0, x: isLeft ? -60 : 60 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
          className="w-full glass rounded-2xl overflow-hidden text-center mx-auto max-w-md md:max-w-none"
          style={{ boxShadow: "0 8px 30px rgba(255,94,156,0.1)", border: "1px solid rgba(255,180,215,0.3)" }}
        >
          {/* Image */}
          <div className="relative h-56 w-full">
            <img src={event.img} alt={event.title} className="w-full h-full object-cover" />
            <div
              className="absolute inset-0"
              style={{ background: "linear-gradient(to bottom, transparent 40%, rgba(255,240,248,0.9) 100%)" }}
            />
            {/* Icon badge */}
            <div
              className="absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center text-lg shadow-sm"
              style={{ background: "rgba(255,255,255,0.85)", backdropFilter: "blur(8px)" }}
            >
              {event.icon}
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            <h3 className="font-serif text-xl font-semibold mb-2" style={{ color: "var(--text)" }}>
              {event.title}
            </h3>
            <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
              {event.desc}
            </p>
          </div>
        </motion.div>
      </div>

      {/* Center dot (middle column) */}
      <div className="col-span-1 md:col-span-1 flex justify-center z-10">
        <motion.div
          className="flex flex-col items-center"
          initial={{ scale: 0, opacity: 0 }}
          animate={inView ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center text-xl anim-heartbeat"
            style={{
              background: "linear-gradient(135deg, var(--pink), var(--rose))",
              boxShadow: "0 0 0 6px rgba(255,94,156,0.15), 0 0 0 12px rgba(255,94,156,0.06)",
            }}
          >
            {event.icon}
          </div>
          {/* Floating small hearts between events */}
          {index < total - 1 && (
            <div className="hidden md:flex flex-col items-center gap-3 mt-4">
              {["💗", "💕", "💗"].map((h, i) => (
                <motion.span
                  key={i}
                  className="text-xs"
                  animate={{ opacity: [0.3, 0.8, 0.3], y: [0, -4, 0] }}
                  transition={{ repeat: Infinity, duration: 2, delay: i * 0.4 }}
                >
                  {h}
                </motion.span>
              ))}
            </div>
          )}
        </motion.div>
      </div>

      {/* Spacer (opposite side takes 4 columns) */}
      <div className="hidden md:block md:col-span-4" />
    </div>
  );
}

export default function Timeline() {
  const lineRef = useRef<HTMLDivElement>(null);
  const inView = useInView(lineRef, { once: true });

  return (
    <section id="timeline" className="section-pad w-full flex flex-col items-center justify-center" style={{ background: "var(--bg)" }}>
      <div className="max-w-5xl w-full" style={{ margin: "0 auto" }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="text-sm tracking-widest uppercase" style={{ color: "var(--pink)" }}>
            ✦ Chapter by Chapter ✦
          </span>
          <h2 className="section-title mt-3 mb-4">Our Story</h2>
          <p className="font-serif italic text-lg" style={{ color: "var(--text-muted)" }}>
            The moments that made us
          </p>
        </motion.div>

        {/* Timeline body */}
        <div className="relative" ref={lineRef}>
          {/* Animated center line (desktop) */}
          <div className="hidden md:block absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-pink-100" />
          <motion.div
            className="hidden md:block absolute left-1/2 -translate-x-1/2 top-0 w-px origin-top h-full"
            style={{ background: "linear-gradient(to bottom, var(--pink), var(--lavender-mid))" }}
            initial={{ scaleY: 0 }}
            animate={inView ? { scaleY: 1 } : {}}
            transition={{ duration: 2.5, ease: "easeInOut" }}
          />

          {/* Events */}
          <div className="space-y-8 md:space-y-0">
            {EVENTS.map((event, i) => (
              <TimelineCard key={i} event={event} index={i} total={EVENTS.length} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
