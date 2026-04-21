// components/home/MovieGrid.tsx
import { Movie } from '@/types/movie';
import MovieCard from './MovieCard';

interface Props {
  movies: Movie[];
  title?: string;
}

export default function MovieGrid({ movies, title = 'All Movies' }: Props) {
  return (
    <div className="mt-10">
      <h2 className="font-display text-4xl mb-6 text-[#F0EDE8]">{title}</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
}