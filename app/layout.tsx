// app/layout.tsx
import type { Metadata } from "next";
import { DM_Serif_Display, Sora } from "next/font/google";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import "./globals.css"

const dmSerif = DM_Serif_Display({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-display",
});

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: "Floor15 — Watch Movies",
  description: "Your cinematic universe, no login required.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${dmSerif.variable} ${sora.variable} dark`}>
      <body
        suppressHydrationWarning
        className="bg-[#0A0A0B] text-[#F0EDE8] font-body antialiased"
      >
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
