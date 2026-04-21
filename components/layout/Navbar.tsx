'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { SearchIcon, FilmIcon } from 'lucide-react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-500 px-6 py-4 flex items-center justify-between
        ${scrolled
          ? 'bg-[#0A0A0B]/80 backdrop-blur-xl shadow-2xl'
          : 'bg-transparent'
        }`}
    >
      <Link href="/" className="flex items-center gap-2 group">
        <FilmIcon className="w-6 h-6 text-[#E8B84B] group-hover:rotate-12 transition-transform" />
        <span className="font-display text-2xl tracking-tight">Floor15</span>
      </Link>

      {/* <Link
        href="/search"
        className="p-2 rounded-full hover:bg-white/10 transition-colors"
        aria-label="Search"
      >
        <SearchIcon className="w-5 h-5 text-[#9B9591] hover:text-white transition-colors" />
      </Link> */}
    </nav>
  );
}