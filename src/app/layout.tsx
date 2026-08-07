import type { Metadata } from "next";
import {
  Cormorant_Garamond,
  Dancing_Script,
  Inter,
  Pinyon_Script,
} from "next/font/google";
import "./globals.css";

/* ─── Font definitions (next/font/google) ─────────────────── */
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const dancing = Dancing_Script({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-dancing",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

const pinyon = Pinyon_Script({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-pinyon",
  display: "swap",
});

/* ─── Metadata ────────────────────────────────────────────── */
export const metadata: Metadata = {
  title: "Rishu ❤️ Ishu — Our Love Story",
  description:
    "A beautiful, cinematic website celebrating the love story of Rishu and Ishu.",
  keywords: ["anniversary", "love story", "Rishu", "Ishu", "romantic"],
  openGraph: {
    title: "Rishu ❤️ Ishu — Our Love Story",
    description:
      "Celebrating our beautiful journey together.",
    type: "website",
  },
};

/* ─── Root Layout ─────────────────────────────────────────── */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${cormorant.variable} ${dancing.variable} ${inter.variable} ${pinyon.variable}`}
        style={{ fontFamily: "var(--font-inter), sans-serif" }}
      >
        {children}
      </body>
    </html>
  );
}
