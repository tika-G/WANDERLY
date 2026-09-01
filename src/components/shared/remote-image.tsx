import Image from "next/image";

import { resolveImageUrl, type ImageSize } from "@/lib/images";
import { cn } from "@/lib/utils";

export function RemoteImage({
  imageId,
  alt,
  size = "card",
  className,
  priority = false,
  sizes = "(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw",
}: {
  imageId: string;
  alt: string;
  size?: ImageSize;
  className?: string;
  priority?: boolean;
  sizes?: string;
}) {
  return (
    <Image
      src={resolveImageUrl(imageId, size)}
      alt={alt}
      fill
      priority={priority}
      sizes={sizes}
      className={cn("object-cover", className)}
    />
  );
}
