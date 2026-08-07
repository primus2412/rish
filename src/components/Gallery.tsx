"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const GALLERY_IMAGES = [
  { id: "g1", src: "/photos/photo-5.jpg", alt: "Together Always", caption: "Our sweetest moment together", category: "Special" },
  { id: "g2", src: "/photos/photo-8.jpg", alt: "Heart to Heart", caption: "My favorite place is right beside you", category: "Special" },
  { id: "g3", src: "/photos/photo-6.jpg", alt: "Our Adventures", caption: "Exploring new paths hand in hand", category: "Travels" },
  { id: "g4", src: "/photos/photo-7.jpg", alt: "Cozy Time", caption: "Warmth in every moment we share", category: "Travels" },
  { id: "g5", src: "/photos/photo-1.png", alt: "Golden Moments", caption: "Our golden hour together", category: "First Dates" },
  { id: "g6", src: "/photos/photo-2.png", alt: "Sweet Smile", caption: "Your smile brightens every day", category: "Memories" },
  { id: "g7", src: "/photos/photo-3.png", alt: "Precious Togetherness", caption: "Holding onto every moment with you", category: "Special" },
  { id: "g8", src: "/photos/photo-4.png", alt: "Quiet Evening", caption: "Watching the stars and sharing dreams", category: "Memories" },
  { id: "g9", src: "/photos/photo-9.jpg", alt: "Everyday Magic", caption: "Making ordinary days feel extraordinary", category: "Memories" },
  { id: "g10", src: "/photos/photo-10.jpg", alt: "Forever & Always", caption: "Just us, today and forever", category: "Special" },
];

const CATEGORIES = ["All", "First Dates", "Travels", "Special", "Memories"];

export default function Gallery() {
  const [filter, setFilter] = useState("All");
  const [lightbox, setLightbox] = useState<number | null>(null);

  const filtered = filter === "All" ? GALLERY_IMAGES : GALLERY_IMAGES.filter((img) => img.category === filter);

  const closeLightbox = () => setLightbox(null);
  const prevImg = () => setLightbox((i) => (i !== null ? Math.max(0, i - 1) : null));
  const nextImg = () => setLightbox((i) => (i !== null ? Math.min(filtered.length - 1, i + 1) : null));

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") prevImg();
      if (e.key === "ArrowRight") nextImg();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [filtered.length]);

  return (
    <section id="gallery" className="section-pad w-full flex flex-col items-center justify-center" style={{ background: "var(--bg)" }}>
      <div className="max-w-6xl w-full" style={{ margin: "0 auto" }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-10"
        >
          <span className="text-sm tracking-widest uppercase" style={{ color: "var(--pink)" }}>
            ✦ Our Memories ✦
          </span>
          <h2 className="section-title mt-3 mb-4">Photo Gallery</h2>
          <p className="font-serif italic text-lg" style={{ color: "var(--text-muted)" }}>
            Every picture tells a piece of our story
          </p>
        </motion.div>

        {/* Filter pills */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-2 mb-10"
        >
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className="px-5 py-2 rounded-full text-sm font-medium transition-all duration-300"
              style={{
                background: filter === cat ? "var(--pink)" : "rgba(255,94,156,0.08)",
                color: filter === cat ? "white" : "var(--pink)",
                border: `1px solid ${filter === cat ? "var(--pink)" : "rgba(255,94,156,0.25)"}`,
                transform: filter === cat ? "scale(1.05)" : "scale(1)",
              }}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Masonry Grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
          <AnimatePresence mode="popLayout">
            {filtered.map((img, i) => (
              <motion.div
                key={img.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.08 }}
                layout
                className="break-inside-avoid rounded-2xl overflow-hidden cursor-pointer img-hover-glow relative group"
                style={{ border: "1px solid rgba(255,180,215,0.3)" }}
                onClick={() => setLightbox(i)}
              >
                <div className="relative w-full" style={{ aspectRatio: i % 3 === 0 ? "4/5" : i % 3 === 1 ? "3/4" : "4/3" }}>
                  <img
                    src={img.src}
                    alt={img.alt}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  {/* Hover overlay */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 flex items-end p-4"
                    style={{ background: "linear-gradient(to top, rgba(255,94,156,0.75) 0%, transparent 60%)" }}
                  >
                    <div>
                      <span className="text-[10px] uppercase font-bold tracking-widest text-pink-200 block">
                        {img.category}
                      </span>
                      <p className="text-white font-medium text-sm">{img.caption}</p>
                    </div>
                  </div>
                  {/* Pink glow ring on hover */}
                  <div
                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none"
                    style={{ boxShadow: "inset 0 0 0 2px rgba(255,94,156,0.5)" }}
                  />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Lightbox */}
        <AnimatePresence>
          {lightbox !== null && filtered[lightbox] && (
            <motion.div
              className="lightbox-overlay z-[90]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeLightbox}
            >
              <div className="relative max-w-4xl w-full mx-4" onClick={(e) => e.stopPropagation()}>
                {/* Close */}
                <button
                  onClick={closeLightbox}
                  className="absolute -top-10 right-0 text-white/80 hover:text-white text-3xl transition-colors z-10"
                >
                  ×
                </button>

                {/* Image Container */}
                <motion.div
                  className="relative rounded-2xl overflow-hidden bg-black/40 border border-white/20 flex items-center justify-center min-h-[300px] max-h-[75vh]"
                  initial={{ scale: 0.85, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.85, opacity: 0 }}
                >
                  <img
                    src={filtered[lightbox].src}
                    alt={filtered[lightbox].alt}
                    className="max-h-[75vh] w-auto max-w-full object-contain mx-auto rounded-lg shadow-2xl"
                  />
                </motion.div>

                {/* Caption */}
                <div className="text-center mt-4">
                  <p className="text-white font-serif italic text-lg">{filtered[lightbox].caption}</p>
                  <p className="text-white/60 text-xs mt-1">
                    {filtered[lightbox].category} • {lightbox + 1} of {filtered.length}
                  </p>
                </div>

                {/* Nav buttons */}
                <button
                  onClick={prevImg}
                  disabled={lightbox === 0}
                  className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full glass flex items-center justify-center text-white text-xl disabled:opacity-30 transition-opacity"
                >
                  ‹
                </button>
                <button
                  onClick={nextImg}
                  disabled={lightbox === filtered.length - 1}
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full glass flex items-center justify-center text-white text-xl disabled:opacity-30 transition-opacity"
                >
                  ›
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
