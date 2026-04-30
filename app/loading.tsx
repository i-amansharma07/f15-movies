export default function Loading() {
  return (
    <div className="flex items-center justify-center h-screen backdrop-blur bg-black/50">
      <div className="w-16 h-16 border-4 border-t-transparent border-white rounded-full animate-spin" />
    </div>
  );
}
