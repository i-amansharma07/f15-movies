import Image from "next/image";
import { notFound } from "next/navigation";
import { Movie } from "@/types/movie";
import {
  StarIcon,
  ClockIcon,
  CalendarIcon,
  GlobeIcon,
  DollarSignIcon,
  TrendingUpIcon,
  BuildingIcon,
  PlayCircleIcon,
} from "lucide-react";
import Link from "next/link";

import { getMovieById } from "@/actions/movie";
import TMDBImage from "@/components/ui/TMDBImage";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Props {
  params: Promise<{ id: string }>;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatCurrency(amount: number): string {
  if (amount >= 1_000_000_000)
    return `$${(amount / 1_000_000_000).toFixed(2)}B`;
  if (amount >= 1_000_000) return `$${(amount / 1_000_000).toFixed(0)}M`;
  return `$${amount.toLocaleString()}`;
}

function formatRuntime(minutes: number): string {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return `${h}h ${m}m`;
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

const TMDB_IMG = "https://image.movie.org/t/p";

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function WatchPage({ params }: Props) {
  const { id } = await params;
  const movie : Movie | any = await getMovieById(id);
  if (!movie) notFound();


  // const related = allMovies
  //   .filter(
  //     (m) =>
  //       m.id !== movie.id &&
  //       m.genre?.some((g: string) => movie.genre?.includes(g)),
  //   )
  //   .slice(0, 5);

  // Avatar: Fire & Ash movie data baked in for demo

  // const backdropUrl = `${TMDB_IMG}/original${movie.backdrop_path}`;
  // const posterUrl = `${TMDB_IMG}/w500${movie.poster_path}`;

  return (
    <div className="min-h-screen bg-[#0A0A0B]">
      {/* ── Blurred cinematic backdrop behind everything ── */}
      {/* <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <Image
          src={backdropUrl}
          alt=""
          fill
          priority
          className="object-cover object-top opacity-[0.07] blur-2xl scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0B]/60 via-[#0A0A0B]/80 to-[#0A0A0B]" />
      </div> */}

      <div className="relative z-10 max-w-screen-xl mx-auto px-4 sm:px-6 pt-6 pb-20">
        {/* ── Main layout: player + sidebar ── */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* ══ LEFT / MAIN COLUMN ══════════════════════════════════════ */}
          <div className="xl:col-span-2 flex flex-col gap-6 mt-28">
            {/* Video Player */}
            <div
              className="w-full overflow-hidden rounded-2xl
                         ring-1 ring-white/8
                         shadow-[0_32px_80px_rgba(0,0,0,0.8)]"
            >
              <div className="relative w-full" style={{ paddingTop: "56.25%" }}>
                <iframe
                  src={`https://www.vidking.net/embed/movie/${id}`}
                  className="absolute inset-0 w-full h-full"
                  allowFullScreen
                  allow="autoplay; encrypted-media; picture-in-picture"
                  style={{ border: "none" }}
                  sandbox="allow-scripts allow-same-origin allow-forms allow-presentation"
                />
              </div>
            </div>

            {/* ── Movie Info Card ── */}
            <div className="rounded-2xl bg-[#111114] border border-white/6 overflow-hidden">
              {/* Poster + Core Details */}
              <div className="flex flex-col sm:flex-row gap-6 p-6">
                {/* Poster */}
                <div className="relative flex-shrink-0 w-full sm:w-36 aspect-[2/3] sm:aspect-auto sm:h-52 rounded-xl overflow-hidden shadow-[0_16px_48px_rgba(0,0,0,0.6)]">
                  <TMDBImage
                    path={movie.poster_path}
                    alt={movie.title}
                    fill
                    className="object-cover"
                    sizes="144px"
                  />
                </div>

                {/* Title block */}
                <div className="flex flex-col gap-3 flex-1 min-w-0">
                  {/* Collection badge */}
                  {movie.belongs_to_collection && (
                    <span className="text-[10px] font-body font-semibold uppercase tracking-widest text-[#E8B84B]/70">
                      {movie.belongs_to_collection.name}
                    </span>
                  )}

                  <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl leading-none text-[#F0EDE8]">
                    {movie.title}
                  </h1>

                  <p className="font-body text-sm text-[#6B6762] italic">
                    {movie.tagline}
                  </p>

                  {/* Genre pills */}
                  <div className="flex flex-wrap gap-2 mt-1">
                    {movie.genres.map((g:any) => (
                      <span
                        key={g.id}
                        className="px-3 py-1 rounded-full text-xs font-body font-medium
                                   bg-white/6 text-[#9B9591] border border-white/8
                                   uppercase tracking-wider"
                      >
                        {g.name}
                      </span>
                    ))}
                  </div>

                  {/* Quick stats row */}
                  <div className="flex flex-wrap items-center gap-4 mt-2 text-sm font-body">
                    {/* Rating */}
                    <div className="flex items-center gap-1.5">
                      <StarIcon className="w-4 h-4 text-[#E8B84B] fill-[#E8B84B]" />
                      <span className="text-[#F0EDE8] font-semibold">
                        {movie.vote_average.toFixed(1)}
                      </span>
                      <span className="text-[#4A4845]">
                        / 10 · {movie.vote_count.toLocaleString()} votes
                      </span>
                    </div>

                    {/* Runtime */}
                    <div className="flex items-center gap-1.5 text-[#9B9591]">
                      <ClockIcon className="w-4 h-4" />
                      <span>{formatRuntime(movie.runtime)}</span>
                    </div>

                    {/* Release */}
                    <div className="flex items-center gap-1.5 text-[#9B9591]">
                      <CalendarIcon className="w-4 h-4" />
                      <span>{formatDate(movie.release_date)}</span>
                    </div>

                    {/* Status */}
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-xs font-semibold
                        ${
                          movie.status === "Released"
                            ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/20"
                            : "bg-amber-500/15 text-amber-400 border border-amber-500/20"
                        }`}
                    >
                      {movie.status}
                    </span>
                  </div>
                </div>
              </div>

              {/* Divider */}
              <div className="h-px mx-6 bg-white/6" />

              {/* Overview */}
              <div className="p-6 flex flex-col gap-2">
                <h2 className="font-body text-xs font-semibold uppercase tracking-widest text-[#E8B84B]">
                  Overview
                </h2>
                <p className="font-body text-[#9B9591] leading-relaxed text-sm sm:text-base">
                  {movie.overview}
                </p>
              </div>

              {/* Divider */}
              <div className="h-px mx-6 bg-white/6" />

              {/* ── Stats grid ── */}
              <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-y divide-white/6">
                <StatCell
                  icon={<DollarSignIcon className="w-4 h-4" />}
                  label="Budget"
                  value={formatCurrency(movie.budget)}
                />
                <StatCell
                  icon={<TrendingUpIcon className="w-4 h-4" />}
                  label="Revenue"
                  value={formatCurrency(movie.revenue)}
                  highlight
                />
                <StatCell
                  icon={<GlobeIcon className="w-4 h-4" />}
                  label="Language"
                  value={movie.original_language.toUpperCase()}
                />
                <StatCell
                  icon={<BuildingIcon className="w-4 h-4" />}
                  label="Studio"
                  value={movie.production_companies[0].name}
                />
              </div>
            </div>
          </div>

          {/* ══ RIGHT / SIDEBAR ═════════════════════════════════════════ */}
          <aside className="flex flex-col gap-6">
            {/* Up Next heading */}
            <div className="flex items-center justify-between">
              <h3 className="font-display text-xl text-[#F0EDE8]">Up Next</h3>
              <Link
                href="/"
                className="text-xs font-body text-[#E8B84B] hover:text-[#F5CC6A] transition-colors"
              >
                Browse all →
              </Link>
            </div>

            {/* Related movies list */}
            {/* <div className="flex flex-col gap-3">
              {related.length > 0
                ? related.map((m) => <RelatedCard key={m.id} movie={m} />)
                : allMovies
                    .filter((m) => m.id !== movie.id)
                    .slice(0, 5)
                    .map((m) => <RelatedCard key={m.id} movie={m} />)}
            </div> */}
          </aside>
        </div>
      </div>
    </div>
  );
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function StatCell({
  icon,
  label,
  value,
  highlight = false,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div className="flex flex-col gap-1.5 p-5">
      <div
        className={`flex items-center gap-1.5 text-xs font-body uppercase tracking-widest
                      ${highlight ? "text-[#E8B84B]" : "text-[#4A4845]"}`}
      >
        {icon}
        {label}
      </div>
      <p
        className={`font-body font-semibold text-sm
                    ${highlight ? "text-[#E8B84B]" : "text-[#F0EDE8]"}`}
      >
        {value}
      </p>
    </div>
  );
}

function RelatedCard({ movie }: { movie: Movie }) {
  const posterSrc = movie.posterUrl?.startsWith("http")
    ? movie.posterUrl
    : `${TMDB_IMG}/w300${movie.posterUrl}`;

  return (
    <Link
      href={`/watch/${movie.id}`}
      className="group flex gap-3 p-3 rounded-xl bg-[#111114] border border-white/6
                 hover:border-[#E8B84B]/25 hover:bg-[#1A1A1F]
                 transition-all duration-200"
    >
      {/* Thumbnail */}
      <div className="relative flex-shrink-0 w-24 aspect-video rounded-lg overflow-hidden bg-[#1A1A1F]">
        <Image
          src={posterSrc}
          alt={movie.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="96px"
        />
        {/* Play icon on hover */}
        <div
          className="absolute inset-0 flex items-center justify-center
                        bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
        >
          <PlayCircleIcon className="w-8 h-8 text-[#E8B84B]" />
        </div>
      </div>

      {/* Info */}
      <div className="flex flex-col gap-1 justify-center min-w-0">
        <p className="font-display text-sm text-[#F0EDE8] leading-tight line-clamp-2">
          {movie.title}
        </p>
        <div className="flex items-center gap-2 text-xs font-body text-[#6B6762]">
          <span>{movie.year}</span>
          <span className="text-[#E8B84B]">★ {movie.rating}</span>
          {movie.duration && <span>{formatRuntime(movie.duration)}</span>}
        </div>
      </div>
    </Link>
  );
}
