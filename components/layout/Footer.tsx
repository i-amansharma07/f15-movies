"use client";

import Link from "next/link";
import { FilmIcon } from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface FooterLink {
  label: string;
  href: string;
}

interface FooterColumn {
  heading: string;
  links: FooterLink[];
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const footerColumns: FooterColumn[] = [
  {
    heading: "Browse",
    links: [
      { label: "All Movies", href: "/" },
      { label: "Action", href: "/search?q=action" },
      { label: "Drama", href: "/search?q=drama" },
      { label: "Comedy", href: "/search?q=comedy" },
      { label: "Thriller", href: "/search?q=thriller" },
      { label: "Sci-Fi", href: "/search?q=sci-fi" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Careers", href: "/careers" },
      { label: "Press Kit", href: "/press" },
      { label: "Blog", href: "/blog" },
    ],
  },
  {
    heading: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
      { label: "Cookie Policy", href: "/cookies" },
      { label: "DMCA", href: "/dmca" },
    ],
  },
];

// const socialLinks = [
//   { label: 'GitHub',    href: 'https://github.com',    Icon: GithubIcon    },
//   { label: 'Twitter',   href: 'https://twitter.com',   Icon: TwitterIcon   },
//   { label: 'Instagram', href: 'https://instagram.com', Icon: InstagramIcon },
// ];

// ─── Component ────────────────────────────────────────────────────────────────

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative mt-24 border-t border-white/5 bg-[#0A0A0B]">
      {/* Subtle top glow line */}
      <div
        aria-hidden="true"
        className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px
                   bg-gradient-to-r from-transparent via-[#E8B84B]/30 to-transparent"
      />

      <div className="max-w-screen-xl mx-auto px-6">
        {/* ── Upper section ── */}
        <div className="py-16 grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-5">
          {/* Brand column */}
          <div className="lg:col-span-2 flex flex-col gap-5">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 w-fit group">
              <div className="relative">
                <FilmIcon
                  className="w-7 h-7 text-[#E8B84B] transition-transform
                             duration-300 group-hover:rotate-12"
                />
                {/* Glow behind icon */}
                <span
                  aria-hidden="true"
                  className="absolute inset-0 blur-md bg-[#E8B84B]/30
                             opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                />
              </div>
              <span className="font-display text-2xl tracking-tight text-[#F0EDE8]">
                Floor15
              </span>
            </Link>

            {/* Tagline */}
            <p className="text-[#6B6762] text-sm leading-relaxed max-w-xs font-body">
              Your cinematic universe — thousands of films, zero logins. Stream
              what you love, instantly.
            </p>

            {/* Social icons */}
            {/* <div className="flex items-center gap-3 mt-2">
              {socialLinks.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 rounded-full flex items-center justify-center
                             border border-white/8 text-[#6B6762]
                             hover:border-[#E8B84B]/40 hover:text-[#E8B84B]
                             hover:bg-[#E8B84B]/8 transition-all duration-200"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div> */}
          </div>

          {/* Link columns */}
          {footerColumns.map((col) => (
            <div key={col.heading} className="flex flex-col gap-4">
              <h4 className="font-body text-xs font-semibold uppercase tracking-widest text-[#E8B84B]">
                {col.heading}
              </h4>
              <ul className="flex flex-col gap-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <div
                      // href={link.href}
                      className="font-body text-sm text-[#6B6762] hover:text-[#F0EDE8]
                                 transition-colors duration-150 hover:translate-x-0.5
                                 inline-block"
                    >
                      {link.label}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* ── Divider ── */}
        <div className="h-px w-full bg-gradient-to-r from-transparent via-white/6 to-transparent" />

        {/* ── Bottom bar ── */}
        <div className="py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-body text-xs text-[#3A3835]">
            © {currentYear} Floor15. All rights reserved.
          </p>

          <p className="font-body text-xs text-[#3A3835] flex items-center gap-1.5">
            <span>Crafted with</span>
            {/* Heart */}
            <svg
              aria-hidden="true"
              viewBox="0 0 16 16"
              className="w-3 h-3 fill-[#E8B84B]/60"
            >
              <path d="M8 13.7C7.6 13.4 1 9.2 1 5a4 4 0 0 1 7-2.6A4 4 0 0 1 15 5c0 4.2-6.6 8.4-7 8.7z" />
            </svg>
            <span>using Next.js & Tailwind CSS</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
