"use client";

import { useCallback, useId, useState } from "react";

import { RemoteImage } from "@/components/shared/remote-image";
import type { Destination } from "@/lib/types";
import { cn } from "@/lib/utils";

export function ImageGallery({ destination }: { destination: Destination }) {
  const [active, setActive] = useState(0);
  const labelId = useId();
  const images = destination.imageIds;
  const current = images[active] ?? images[0];
  const side = images
    .map((imageId, index) => ({ imageId, index }))
    .filter((item) => item.index !== active)
    .slice(0, 2);

  const go = useCallback(
    (index: number) => {
      const last = images.length - 1;
      if (last < 0) return;
      if (index < 0) setActive(last);
      else if (index > last) setActive(0);
      else setActive(index);
    },
    [images.length],
  );

  return (
    <div
      role="region"
      aria-labelledby={labelId}
      tabIndex={0}
      className="outline-none focus-visible:ring-3 focus-visible:ring-ring/50 rounded-sm"
      onKeyDown={(event) => {
        if (event.key === "ArrowRight") {
          event.preventDefault();
          go(active + 1);
        }
        if (event.key === "ArrowLeft") {
          event.preventDefault();
          go(active - 1);
        }
      }}
    >
      <p id={labelId} className="sr-only">
        Photographs of {destination.name}
      </p>
      <div className="grid gap-2 lg:grid-cols-12 lg:gap-3">
        <div className="relative aspect-[4/5] overflow-hidden rounded-sm sm:aspect-[16/10] lg:col-span-8 lg:aspect-auto lg:h-full lg:min-h-[28rem]">
          <RemoteImage
            imageId={current}
            alt={`${destination.name}, photograph ${active + 1} of ${images.length}`}
            size="gallery"
            priority
            sizes="(min-width: 1024px) 58vw, 100vw"
            className="motion-safe:transition-opacity motion-safe:duration-300"
          />
        </div>
        <div className="hidden lg:grid lg:col-span-4 lg:grid-rows-2 lg:gap-3">
          {side.map(({ imageId, index }) => (
              <button
                key={`${imageId}-${index}`}
                type="button"
                onClick={() => go(index)}
                aria-label={`Show photograph ${index + 1}`}
                className="relative min-h-[13.5rem] overflow-hidden rounded-sm"
              >
                <RemoteImage
                  imageId={imageId}
                  alt=""
                  size="card"
                  sizes="22vw"
                />
              </button>
          ))}
        </div>
      </div>
      <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
        {images.map((imageId, index) => (
          <button
            key={imageId + index}
            type="button"
            onClick={() => setActive(index)}
            aria-label={`Show photograph ${index + 1}`}
            aria-pressed={index === active}
            className={cn(
              "relative size-16 shrink-0 overflow-hidden rounded-sm border transition-opacity duration-150 sm:size-[4.5rem]",
              index === active
                ? "border-foreground"
                : "border-transparent opacity-70 hover:opacity-100",
            )}
          >
            <RemoteImage
              imageId={imageId}
              alt=""
              size="thumb"
              sizes="72px"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
