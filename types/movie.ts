// types/movie.ts

export interface Movie {
  id: number;
  title: string;
  tagline?: string;
  description?: string;
  genre?: string[];
  rating?: number; // 0–10
  year?: number;
  duration?: number; // in minutes
  posterUrl?: string;
  backdropUrl?: string;
  videoUrl?: string; // mp4 URL or YouTube embed
  director?: string;
  cast?: string[];
  isFeatured?: boolean;
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  poster_path: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  release_date: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export type MovieCardProps = {
  movie: Movie;
  variant?: "default" | "compact" | "wide";
};
