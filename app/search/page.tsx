// // app/search/page.tsx
import { Movie } from "@/types/movie";
import { notFound } from "next/navigation";
import { searchMovies } from "@/actions/movie";
import MovieGrid from "@/components/home/MovieGrid";
import SearchBar from "@/components/search/SearchBar";

type SearchPageProps = {
  searchParams: Promise<{ q?: string }>;
};

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { q } = await searchParams;
  if (!q) {
    return notFound();
  }

  const movies: Movie[] = await searchMovies(q);

  return (
    <section className="max-w-screen-xl mt-5 gap-5  sm:mt-8 flex  sm:gap-8  flex-col  px-6 py-12">
      <SearchBar />
      <h2 className="font-display text-3xl">
        Results for <span className="text-[#E8B84B]">"{q}"</span>
      </h2>
      <MovieGrid title="" movies={movies} />
    </section>
  );
}
