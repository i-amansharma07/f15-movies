import TMDBImage from "@/components/ui/TMDBImage";
import { formatCurrency, formatDate, formatRuntime } from "@/lib/utils";
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
import { Movie } from "@/types/movie";

export default function MovieInfoCard({ movie }: { movie: Movie | any }) {
  return (
    <div className="rounded-2xl bg-[#111114] border border-white/6 overflow-hidden">
      {/* Poster + Core Details */}
      <div className="flex flex-col sm:flex-row gap-6 p-6">
        {/* Poster */}
        <div className="hidden sm:flex relative flex-shrink-0 w-full sm:w-36 aspect-[2/3] sm:aspect-auto sm:h-52 rounded-xl overflow-hidden shadow-[0_16px_48px_rgba(0,0,0,0.6)]">
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
            {movie.genres.map((g: any) => (
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
  );
}

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
