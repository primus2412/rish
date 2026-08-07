"use client";
import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Gallery from "@/components/Gallery";
import LoveLetter from "@/components/LoveLetter";
import Timeline from "@/components/Timeline";
import Counters from "@/components/Counters";
import Surprise from "@/components/Surprise";

// Music player is client-only (uses AudioContext)
const MusicPlayer = dynamic(() => import("@/components/MusicPlayer"), { ssr: false });

export default function Home() {
  return (
    <main className="relative min-h-screen">
      <Navbar />
      <Hero />
      <Gallery />
      <LoveLetter />
      <Timeline />
      <Counters />
      <Surprise />
      <MusicPlayer />
    </main>
  );
}
