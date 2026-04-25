"use server";
import { Movie } from "@/types/movie";
const BASE_URL = "https://api.themoviedb.org/3";
const headers = {
  Authorization: `Bearer ${process.env.API_READ_ACCESS_TOKEN}`,
  Accept: "application/json",
};

const filters = ["now_playing", "popular", "top_rated"];

async function fetchTMDB<T>(url: string, retries = 3): Promise<T> {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const res = await fetch(url, { headers, cache: "no-store" });

      if (!res.ok) {
        throw new Error(`TMDB error: ${res.status} ${res.statusText}`);
      }

      return res.json() as Promise<T>;
    } catch (err) {
      if (attempt === retries) throw err;
      // Exponential backoff: 1s, 2s, 4s
      await new Promise((resolve) => setTimeout(resolve, 2 ** attempt * 500));
    }
  }
  throw new Error("Unreachable");
}

async function getAllMovies() : Promise<Movie[]> {
  const kind = filters[Math.floor(Math.random() * 3)];
  const url = `${BASE_URL}/movie/${kind}?language=en-US&page=1`;

  const data = await fetchTMDB<{ results: Movie[] }>(url);
  return data.results;
}

async function getMovieById(id: string) : Promise<Movie> {
  const url = `${BASE_URL}/movie/${id}?language=en-US&page=1`;

  return fetchTMDB(url);
}

async function searchMovies(query: string) : Promise<Movie[]> {
  const url = `${BASE_URL}/search/movie?query=${encodeURIComponent(query)}&language=en-US&page=1`;
  
  const data = await fetchTMDB<{ results: Movie[] }>(url);
  return data.results;
}


export { getAllMovies, getMovieById, searchMovies };