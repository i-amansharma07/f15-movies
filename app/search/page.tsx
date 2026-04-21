// // app/search/page.tsx
// // import SearchResults from '@/components/search/SearchResults';

// interface Props {
//   searchParams: { q?: string };
// }

export default async function SearchPage() {
  return <></>
// export default async function SearchPage({ searchParams }: Props) {
//   const query = searchParams.q?.toLowerCase() ?? '';
//   const all = await getAllMovies();
//   const results = all.filter(
//     (m) =>
//       m.title.toLowerCase().includes(query) ||
//       m.genre.some((g) => g.toLowerCase().includes(query))
//   );

//   return (
//     <section className="max-w-screen-xl mx-auto px-6 py-12">
//       <h2 className="font-display text-3xl mb-8">
//         Results for <span className="text-[#E8B84B]">"{searchParams.q}"</span>
//       </h2>
//       {/* <SearchResults movies={results} /> */}
//     </section>
//   );
}