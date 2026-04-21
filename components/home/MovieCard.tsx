"use client";

import Image from "next/image";
import Link from "next/link";
import { PlayCircleIcon } from "lucide-react";
import { Movie } from "@/types/movie";
import TMDBImage from "@/components/ui/TMDBImage";

interface Props {
  movie: Movie;
}

export default function MovieCard({ movie }: Props) {
  return (
    <Link
      href={`/watch/${movie.id}`}
      className="group relative block rounded-xl overflow-hidden bg-[#111114] 
                 shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-glow)]
                 transition-all duration-300 hover:-translate-y-2 hover:scale-[1.02]"
    >
      {/* Poster */}
      <div className="relative aspect-[2/3] overflow-hidden">
        <TMDBImage
          path={movie.poster_path}
          alt={movie.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          sizes="(max-width: 768px) 50vw, 25vw"
        />

        {/* Play overlay */}
        <div
          className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100
                        transition-opacity duration-300 flex items-center justify-center"
        >
          <PlayCircleIcon className="w-16 h-16 text-[#E8B84B] drop-shadow-2xl" />
        </div>
      </div>

      {/* Info */}
      <div className="p-3 flex flex-col gap-1">
        <h3 className="font-display text-lg leading-tight text-[#F0EDE8] line-clamp-1">
          {movie.title}
        </h3>
        <div className="flex items-center justify-between text-xs text-[#9B9591]">
          <span>{movie.year}</span>
          <span className="text-[#E8B84B]">★ {movie.vote_average.toFixed(1)}</span>
        </div>
      </div>
    </Link>
  );
}
