// components/home/HeroSection.tsx
import Link from 'next/link';
import { Movie } from '@/types/movie';
import Button from '@/components/ui/Button';
import { PlayIcon, InfoIcon, StarIcon, CalendarIcon, UsersIcon } from 'lucide-react';
import TMDBImage from '@/components/ui/TMDBImage';

interface Props {
  movie: Movie;
}

const GENRE_MAP: Record<number, string> = {
  28: 'Action', 12: 'Adventure', 16: 'Animation', 35: 'Comedy',
  80: 'Crime', 99: 'Documentary', 18: 'Drama', 10751: 'Family',
  14: 'Fantasy', 36: 'History', 27: 'Horror', 10402: 'Music',
  9648: 'Mystery', 10749: 'Romance', 878: 'Sci-Fi', 10770: 'TV Movie',
  53: 'Thriller', 10752: 'War', 37: 'Western',
};

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

function VoteBar({ value }: { value: number }) {
  const pct = (value / 10) * 100;
  return (
    <div className="flex items-center gap-3">
      <div className="h-1 w-28 rounded-full bg-white/10 overflow-hidden">
        <div
          className="h-full rounded-full bg-gradient-to-r from-[#E8B84B] to-[#f4d06f] transition-all duration-700"
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className="text-xs text-[#9B9591]">{value.toFixed(1)} / 10</span>
    </div>
  );
}

export default function HeroSection({ movie }: Props) {


  const genres = (movie.genre_ids ?? [])
    .map((id) => GENRE_MAP[id])
    .filter(Boolean)
    .slice(0, 3);

  const description = movie.overview ?? movie.tagline;

  return (
    <section className="relative w-full h-[95vh] min-h-[640px] overflow-hidden">

      {/* ── Backdrop ── */}
      <TMDBImage
        path={movie.backdrop_path}
        alt={movie.title}
        fill
        priority
        className="object-cover object-top scale-[1.03]"
      />

      {/* ── Gradient layers ── */}
      {/* Left fade for text readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0B] via-[#0A0A0B]/75 to-[#0A0A0B]/10" />
      {/* Bottom fade into page */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0B] via-transparent to-[#0A0A0B]/30" />
      {/* Subtle vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,#0A0A0B_100%)] opacity-60" />

      {/* ── Letterbox bars (cinematic feel) ── */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      {/* ── Content ── */}
      <div className="absolute inset-0 flex items-end md:items-center pb-16 md:pb-0">
        <div className="max-w-screen-xl mx-auto px-6 w-full">
          <div className="flex items-end md:items-center justify-between gap-12">

            {/* Left: Text content */}
            <div className="max-w-2xl flex flex-col gap-5" style={{ animation: 'heroFadeUp 0.8s ease both' }}>

              {/* Genre pills */}
              {genres.length > 0 && (
                <div className="flex gap-2 flex-wrap">
                  {genres.map((g) => (
                    <span
                      key={g}
                      className="px-3 py-0.5 rounded-full text-[11px] font-semibold tracking-widest uppercase
                                 border border-white/15 text-[#9B9591] bg-white/5 backdrop-blur-sm"
                    >
                      {g}
                    </span>
                  ))}
                </div>
              )}

              {/* Title */}
              <h1
                className="font-display text-5xl md:text-7xl xl:text-8xl leading-[0.95] tracking-tight text-[#F0EDE8]"
                style={{ textShadow: '0 4px 40px rgba(0,0,0,0.6)' }}
              >
                {movie.title}
              </h1>

              {/* Overview */}
              {description && (
                <p className="text-[#9B9591] text-base font-body max-w-lg leading-relaxed line-clamp-3">
                  {description}
                </p>
              )}

              {/* Meta row */}
              <div className="flex flex-col gap-2.5">
                {/* Star rating + bar */}
                <div className="flex items-center gap-3">
                  <StarIcon className="w-4 h-4 fill-[#E8B84B] text-[#E8B84B]" />
                  <span className="text-[#E8B84B] font-semibold text-sm">
                    {movie.vote_average.toFixed(1)}
                  </span>
                  <VoteBar value={movie.vote_average} />
                </div>

                {/* Date + vote count */}
                <div className="flex items-center gap-5 text-xs text-[#6B6663]">
                  <span className="flex items-center gap-1.5">
                    <CalendarIcon className="w-3.5 h-3.5" />
                    {formatDate(movie.release_date)}
                  </span>
                  {movie.vote_count && (
                    <span className="flex items-center gap-1.5">
                      <UsersIcon className="w-3.5 h-3.5" />
                      {movie.vote_count.toLocaleString()} ratings
                    </span>
                  )}
                </div>
              </div>

              {/* CTAs */}
              <div className="flex gap-3 mt-1">
                <Link href={`/watch/${movie.id}`}>
                  <Button variant="primary" icon={<PlayIcon className="w-4 h-4" />}>
                    Watch Now
                  </Button>
                </Link>
                <Button variant="ghost" icon={<InfoIcon className="w-4 h-4" />}>
                  More Info
                </Button>
              </div>
            </div>

            {/* Right: Poster card — hidden on small screens */}
            <div
              className="hidden lg:block flex-shrink-0"
              style={{ animation: 'heroFadeUp 0.9s 0.15s ease both' }}
            >
              <div className="relative w-52 xl:w-60 aspect-[2/3] rounded-xl overflow-hidden
                              shadow-[0_24px_80px_rgba(0,0,0,0.7)] ring-1 ring-white/10">
                <TMDBImage
                  path={movie.poster_path}
                  alt={`${movie.title} poster`}
                  fill
                  className="object-cover"
                />
                {/* Subtle gloss overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* ── Keyframes ── injected via a style tag ── */}
      <style>{`
        @keyframes heroFadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}