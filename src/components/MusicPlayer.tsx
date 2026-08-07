"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const LS_KEY = "love-music-playing";

// Romantic piano chord sequence using Web Audio API
function createRomanticPlayer(ctx: AudioContext) {
  // Soft romantic chord progression: Cmaj7 → Am7 → Fmaj7 → G7
  const chordProgression = [
    [261.63, 329.63, 392.00, 493.88],  // Cmaj7
    [220.00, 261.63, 329.63, 440.00],  // Am7
    [174.61, 220.00, 261.63, 349.23],  // Fmaj7
    [196.00, 246.94, 293.66, 392.00],  // G7
  ];

  let stepIndex = 0;
  let scheduled = false;

  const playChord = (freqs: number[], time: number) => {
    freqs.forEach((freq, noteIndex) => {
      const osc  = ctx.createOscillator();
      const gain = ctx.createGain();
      const panner = ctx.createStereoPanner();

      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, time);

      panner.pan.setValueAtTime((noteIndex - 1.5) * 0.25, time);

      const vol = 0.04 / freqs.length;
      gain.gain.setValueAtTime(0, time);
      gain.gain.linearRampToValueAtTime(vol, time + 0.15);
      gain.gain.setValueAtTime(vol, time + 1.2);
      gain.gain.exponentialRampToValueAtTime(0.001, time + 3.5);

      osc.connect(gain);
      gain.connect(panner);
      panner.connect(ctx.destination);

      osc.start(time);
      osc.stop(time + 3.5);
    });
  };

  const scheduleNext = () => {
    if (!scheduled) return;
    const now = ctx.currentTime;
    playChord(chordProgression[stepIndex % chordProgression.length], now);
    stepIndex++;
    setTimeout(scheduleNext, 3200);
  };

  return {
    start: () => {
      scheduled = true;
      scheduleNext();
    },
    stop: () => {
      scheduled = false;
    },
  };
}

const EQ_BARS = [1.0, 0.5, 0.8, 0.35, 0.95, 0.55, 0.75, 0.4];

export default function MusicPlayer() {
  const [playing, setPlaying]       = useState(false);
  const [expanded, setExpanded]     = useState(false);
  const [volume, setVolume]         = useState(0.7);
  const ctxRef    = useRef<AudioContext | null>(null);
  const playerRef = useRef<ReturnType<typeof createRomanticPlayer> | null>(null);
  const hasStartedRef = useRef(false);

  const startAudio = useCallback(() => {
    if (!ctxRef.current) {
      ctxRef.current = new (window.AudioContext || (window as typeof window & { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
    }
    const ctx = ctxRef.current;
    if (ctx.state === "suspended") ctx.resume();
    if (!playerRef.current) {
      playerRef.current = createRomanticPlayer(ctx);
      playerRef.current.start();
    }
  }, []);

  const stopAudio = useCallback(() => {
    playerRef.current?.stop();
    playerRef.current = null;
  }, []);

  // Autoplay handler
  useEffect(() => {
    const startPlay = () => {
      if (hasStartedRef.current) return;
      hasStartedRef.current = true;
      setPlaying(true);
      startAudio();
      
      // Clean up event listeners
      EVENTS_TO_TRIGGER.forEach((evt) => {
        window.removeEventListener(evt, startPlay);
      });
    };

    const EVENTS_TO_TRIGGER = ["click", "scroll", "touchstart", "keydown", "mousemove"];

    // Try starting immediately
    try {
      startPlay();
    } catch (e) {
      // Ignored - will start on first interaction gesture
    }

    // Add listeners for interaction fallback
    EVENTS_TO_TRIGGER.forEach((evt) => {
      window.addEventListener(evt, startPlay, { passive: true });
    });

    return () => {
      EVENTS_TO_TRIGGER.forEach((evt) => {
        window.removeEventListener(evt, startPlay);
      });
    };
  }, [startAudio]);

  const toggle = () => {
    const next = !playing;
    // Mark as started so autoplay doesn't re-trigger
    hasStartedRef.current = true;
    setPlaying(next);
    localStorage.setItem(LS_KEY, String(next));
    if (next) startAudio();
    else stopAudio();
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3">
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="glass rounded-2xl p-5 w-64"
            style={{ boxShadow: "0 16px 48px rgba(255,94,156,0.25)" }}
          >
            {/* Track info */}
            <div className="flex items-center gap-3 mb-4">
              <motion.div
                animate={playing ? { rotate: 360 } : { rotate: 0 }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                className="w-12 h-12 rounded-full flex items-center justify-center text-2xl shrink-0"
                style={{ background: "linear-gradient(135deg, var(--pink), var(--lavender-mid))" }}
              >
                🎵
              </motion.div>
              <div>
                <p className="font-medium text-sm" style={{ color: "var(--text)" }}>
                  Romantic Piano
                </p>
                <p className="text-xs" style={{ color: "var(--text-muted)" }}>
                  Our Love Theme
                </p>
              </div>
            </div>

            {/* EQ visualizer */}
            <div className="flex items-end justify-center gap-1 h-8 mb-4">
              {EQ_BARS.map((h, i) => (
                <motion.div
                  key={i}
                  className="eq-bar"
                  style={{
                    height:           `${h * 100}%`,
                    animationDelay:   `${i * 0.1}s`,
                    animationDuration: `${0.6 + i * 0.07}s`,
                    animationPlayState: playing ? "running" : "paused",
                    opacity: playing ? 1 : 0.3,
                  }}
                />
              ))}
            </div>

            {/* Volume */}
            <div className="flex items-center gap-2">
              <span className="text-xs" style={{ color: "var(--text-muted)" }}>🔈</span>
              <input
                type="range" min="0" max="1" step="0.05"
                value={volume}
                onChange={(e) => setVolume(Number(e.target.value))}
                className="flex-1 accent-pink-400"
              />
              <span className="text-xs" style={{ color: "var(--text-muted)" }}>🔊</span>
            </div>

            <p className="text-[10px] text-center mt-3" style={{ color: "var(--text-light)" }}>
              {playing ? "♪ Playing ambient love music" : "Click ♪ to play"}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main floating button */}
      <motion.button
        onClick={() => {
          setExpanded((v) => !v);
          if (!expanded && !playing) toggle();
          if (expanded) { /* just toggle panel */ }
        }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.93 }}
        className="w-14 h-14 rounded-full flex items-center justify-center text-white text-xl shadow-lg relative overflow-hidden"
        style={{
          background: playing
            ? "linear-gradient(135deg, var(--pink), var(--rose))"
            : "linear-gradient(135deg, rgba(255,94,156,0.7), rgba(255,138,180,0.7))",
          backdropFilter: "blur(12px)",
          boxShadow: playing ? "0 0 20px rgba(255,94,156,0.6), 0 4px 16px rgba(255,94,156,0.3)" : undefined,
        }}
        aria-label={playing ? "Pause music" : "Play music"}
      >
        {playing ? (
          <motion.span
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            🎵
          </motion.span>
        ) : (
          "🎵"
        )}

        {/* Ripple ring when playing */}
        {playing && (
          <motion.div
            className="absolute inset-0 rounded-full border-2"
            style={{ borderColor: "rgba(255,94,156,0.6)" }}
            animate={{ scale: [1, 1.8], opacity: [0.7, 0] }}
            transition={{ repeat: Infinity, duration: 1.8 }}
          />
        )}
      </motion.button>

      {/* Play/pause mini-button when expanded */}
      {expanded && (
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          onClick={toggle}
          className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm"
          style={{ background: playing ? "var(--pink)" : "rgba(255,94,156,0.5)" }}
          aria-label="Toggle play"
        >
          {playing ? "⏸" : "▶"}
        </motion.button>
      )}
    </div>
  );
}
