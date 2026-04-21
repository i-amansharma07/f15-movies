import { getAllMovies } from "@/actions/movie";
import HeroSection from "@/components/home/HeroSection";
import MovieGrid from "@/components/home/MovieGrid";
import SearchBar from "@/components/search/SearchBar";
import { Movie } from "@/types/movie";

export default async function HomePage() {
  const movies: Movie[] = await getAllMovies();
  if (!movies) return;
  const featured = movies && movies[0];

  return (
    <>
      <HeroSection movie={featured} />
      <section className="max-w-screen-xl mx-auto px-6 py-12">
        {/* <SearchBar /> */}
        <MovieGrid movies={movies} />
      </section>
    </>
  );
}
