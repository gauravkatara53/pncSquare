interface ImageKitLoaderProps {
  src: string;
  width: number;
  quality?: number;
}

export default function imageKitLoader({
  src,
  width,
  quality,
}: ImageKitLoaderProps) {
  const url = new URL(src);
  // Append ImageKit transformation parameters
  url.searchParams.set("tr", `w-${width},q-${quality || 75},f-auto`);
  return url.href;
}
