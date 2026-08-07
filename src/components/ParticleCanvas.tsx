"use client";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    const particles: Particle[] = [];
    const PARTICLE_COUNT = 55;

    function resize() {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener("resize", resize);

    class Particle {
      x: number; y: number; size: number;
      speedX: number; speedY: number;
      opacity: number; fadeSpeed: number;
      type: "heart" | "sparkle" | "circle";
      color: string; rotation: number; rotSpeed: number;

      constructor() {
        this.x = Math.random() * (canvas?.width || window.innerWidth);
        this.y = Math.random() * (canvas?.height || window.innerHeight) + (canvas?.height || window.innerHeight);
        this.size = Math.random() * 14 + 6;
        this.speedX = (Math.random() - 0.5) * 0.8;
        this.speedY = -(Math.random() * 1.2 + 0.4);
        this.opacity = Math.random() * 0.6 + 0.2;
        this.fadeSpeed = 0.003 + Math.random() * 0.004;
        this.type = (["heart", "sparkle", "circle"] as const)[Math.floor(Math.random() * 3)];
        this.color = [
          "#FF5E9C", "#FF8AB4", "#E9D5FF", "#C4B5FD", "#F4C542", "#FFB3D1",
        ][Math.floor(Math.random() * 6)];
        this.rotation = Math.random() * Math.PI * 2;
        this.rotSpeed = (Math.random() - 0.5) * 0.04;
      }

      draw() {
        if (!ctx) return;
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        ctx.globalAlpha = this.opacity;
        ctx.fillStyle = this.color;

        if (this.type === "heart") {
          drawHeart(ctx, this.size);
        } else if (this.type === "sparkle") {
          drawSparkle(ctx, this.size);
        } else {
          ctx.beginPath();
          ctx.arc(0, 0, this.size * 0.4, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.rotation += this.rotSpeed;
        this.opacity -= this.fadeSpeed;
        this.speedX += (Math.random() - 0.5) * 0.05;
      }

      isDead() {
        return this.opacity <= 0 || this.y < -(canvas?.height || window.innerHeight) * 0.1;
      }
    }

    function drawHeart(c: CanvasRenderingContext2D, size: number) {
      const s = size * 0.55;
      c.beginPath();
      c.moveTo(0, -s * 0.3);
      c.bezierCurveTo(s * 0.5, -s * 1.0, s * 1.4, -s * 0.2, 0, s * 0.9);
      c.bezierCurveTo(-s * 1.4, -s * 0.2, -s * 0.5, -s * 1.0, 0, -s * 0.3);
      c.fill();
    }

    function drawSparkle(c: CanvasRenderingContext2D, size: number) {
      const s = size * 0.5;
      for (let i = 0; i < 4; i++) {
        c.save();
        c.rotate((i * Math.PI) / 2);
        c.beginPath();
        c.ellipse(0, -s, s * 0.15, s, 0, 0, Math.PI * 2);
        c.fill();
        c.restore();
      }
    }

    function init() {
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const p = new Particle();
        p.y = Math.random() * (canvas?.height || 800);
        particles.push(p);
      }
    }

    function loop() {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = particles.length - 1; i >= 0; i--) {
        particles[i].draw();
        particles[i].update();
        if (particles[i].isDead()) {
          particles.splice(i, 1);
          particles.push(new Particle());
        }
      }
      animId = requestAnimationFrame(loop);
    }

    init();
    loop();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <AnimatePresence>
      {mounted && (
        <motion.canvas
          ref={canvasRef}
          className="absolute inset-0 pointer-events-none z-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
        />
      )}
    </AnimatePresence>
  );
}
