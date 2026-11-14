import { notFound } from "next/navigation";
import { Movie } from "@/types/movie";
import Link from "next/link";
import { getAllMovies } from "@/actions/movie";
import { getMovieById } from "@/actions/movie";
import { MovieRealatedGrid } from "@/components/home/MovieGrid";
import MovieInfoCard from "@/components/ui/cards/MovieInfoCard";
interface Props {
  params: Promise<{ id: string }>;
}

export default async function WatchPage({ params }: Props) {
  const { id } = await params;
  const movie: Movie | any = await getMovieById(id);
  const movies: Movie[] = await getAllMovies();
  if (!movies) return;
  if (!movie) notFound();

  return (
    <div className="min-h-screen bg-[#0A0A0B]">
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
                  src={`https://www.vidpop.stream/movie/${id}?theme=masterclass&autoplay=true`}
                  className="absolute inset-0 w-full h-full"
                  allowFullScreen
                  allow="autoplay; encrypted-media; picture-in-picture"
                  style={{ border: "none" }}
                />
              </div>
            </div>

            {/* ── Movie Info Card ── */}
            <MovieInfoCard movie={movie} />
          </div>

          {/* ══ RIGHT / SIDEBAR ═════════════════════════════════════════ */}
          <aside className="flex flex-col gap-6 mt-10">
            {/* Up Next heading */}
            <div className="flex items-center justify-between">
              <h3 className="font-display text-xl text-[#F0EDE8]">Up Next</h3>
              <Link
                href="/"
                className="cursor-pointer text-sm font-body text-[#E8B84B] hover:text-[#F5CC6A] transition-colors"
              >
                Browse all →
              </Link>
            </div>
            <MovieRealatedGrid movies={movies?.slice(4, 10)} title="" />
          </aside>
        </div>
      </div>
    </div>
  );
}
