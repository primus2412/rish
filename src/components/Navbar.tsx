"use client";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const NAV_LINKS = [
  { label: "Home", href: "#hero" },
  { label: "Gallery", href: "#gallery" },
  { label: "Letter", href: "#letter" },
  { label: "Timeline", href: "#timeline" },
  { label: "Countdown", href: "#countdown" },
  { label: "Surprise", href: "#surprise" },
];

export default function Navbar() {
  const [visible, setVisible] = useState(true);
  const [atTop, setAtTop] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const lastY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setAtTop(y < 40);
      if (y > lastY.current + 8 && y > 80) {
        setVisible(false);
        setMenuOpen(false);
      } else if (y < lastY.current - 8) {
        setVisible(true);
      }
      lastY.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (href: string) => {
    setMenuOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.header
          key="navbar"
          initial={{ y: -80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -80, opacity: 0 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className={`fixed top-0 left-0 right-0 z-50 px-4 py-3 transition-all duration-300 ${
            atTop ? "bg-transparent" : "glass border-b border-pink-100/40"
          }`}
        >
          <div className="max-w-6xl mx-auto flex items-center justify-between">
            {/* Logo */}
            <button
              onClick={() => scrollTo("#hero")}
              className="font-script text-2xl tracking-wide flex items-center gap-1.5"
              style={{ color: "var(--pink)" }}
            >
              <span>R</span>
              <span className="text-pink-500 text-lg">❤️</span>
              <span>I</span>
            </button>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-1">
              {NAV_LINKS.map((link) => (
                <button
                  key={link.href}
                  onClick={() => scrollTo(link.href)}
                  className="px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 hover:bg-pink-50/60 hover:text-pink-500"
                  style={{ color: "var(--text-muted)" }}
                >
                  {link.label}
                </button>
              ))}
            </nav>

            {/* Mobile hamburger */}
            <div className="md:hidden flex items-center gap-2">
              <button
                className="flex flex-col gap-1.5 p-2"
                onClick={() => setMenuOpen((v) => !v)}
                aria-label="Toggle menu"
              >
                {[0, 1, 2].map((i) => (
                  <motion.span
                    key={i}
                    className="block h-0.5 w-6 rounded-full"
                    style={{ background: "var(--pink)" }}
                    animate={{
                      rotate: menuOpen ? (i === 0 ? 45 : i === 2 ? -45 : 0) : 0,
                      y: menuOpen ? (i === 0 ? 8 : i === 2 ? -8 : 0) : 0,
                      opacity: menuOpen && i === 1 ? 0 : 1,
                    }}
                    transition={{ duration: 0.25 }}
                  />
                ))}
              </button>
            </div>
          </div>

          {/* Mobile drawer */}
          <AnimatePresence>
            {menuOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="md:hidden overflow-hidden glass rounded-2xl mt-2 mx-1"
              >
                <div className="flex flex-col py-3">
                  {NAV_LINKS.map((link) => (
                    <button
                      key={link.href}
                      onClick={() => scrollTo(link.href)}
                      className="px-6 py-3 text-left text-sm font-medium hover:text-pink-500 transition-colors"
                      style={{ color: "var(--text-muted)" }}
                    >
                      {link.label}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.header>
      )}
    </AnimatePresence>
  );
}
