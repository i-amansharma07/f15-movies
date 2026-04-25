import Image, { type ImageProps } from "next/image";

type ImageSize =
  | "w92"
  | "w154"
  | "w185"
  | "w342"
  | "w500"
  | "w780"
  | "w1280"
  | "original";

const TMDB_BASE_URL = "https://image.tmdb.org/t/p";

interface TMDBImageProps extends Omit<ImageProps, "src"> {
  path: string | null;
  size?: ImageSize;
  fallback?: string;
}

export default function TMDBImage({
  path,
  size = "w500",
  alt,
  className = "",
  fallback = "",
  ...rest // <-- all other ImageProps land here
}: TMDBImageProps) {
  const src = path ? `${TMDB_BASE_URL}/${size}${path}` : fallback;

  return (
    <Image
      src={src || fallback}
      alt={alt}
      fill
      className={`object-cover ${className}`}
      {...rest} // <-- passed through to Image
    />
  );
}
