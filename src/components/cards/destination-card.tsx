import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { RemoteImage } from "@/components/shared/remote-image";
import { BUDGET_LABELS, DESTINATION_TYPE_LABELS } from "@/lib/constants";
import type { Destination } from "@/lib/types";
import { cn } from "@/lib/utils";

export function DestinationCard({
  destination,
  featured = false,
  portrait = false,
  priority = false,
}: {
  destination: Destination;
  featured?: boolean;
  portrait?: boolean;
  priority?: boolean;
}) {
  return (
    <article className="group h-full">
      <Link
        href={`/destinations/${destination.slug}`}
        className="flex h-full flex-col rounded-sm"
      >
        <div
          className={cn(
            "relative overflow-hidden rounded-sm",
            featured
              ? portrait
                ? "aspect-[4/3] sm:aspect-[4/5]"
                : "aspect-[4/3] sm:aspect-[16/10] lg:aspect-[3/2]"
              : "aspect-[4/3]",
          )}
        >
          <RemoteImage
            imageId={destination.imageIds[0]}
            alt={`${destination.name}, ${destination.country}`}
            size={featured ? "hero" : "card"}
            priority={priority}
            className="motion-safe:transition-transform motion-safe:duration-500 motion-safe:ease-out motion-safe:group-hover:scale-[1.04]"
            sizes={
              featured
                ? portrait
                  ? "(min-width: 1024px) 38vw, 100vw"
                  : "(min-width: 1024px) 58vw, 100vw"
                : "(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
            }
          />
          <div
            className="absolute inset-0 bg-[linear-gradient(to_top,rgba(28,25,23,0.62)_0%,rgba(28,25,23,0.12)_42%,transparent_70%)]"
            aria-hidden="true"
          />
          <p className="absolute bottom-3 left-3 text-[0.65rem] tracking-[0.18em] text-white/90 uppercase sm:bottom-4 sm:left-4">
            {destination.country}
          </p>
        </div>
        <div className="flex flex-1 flex-col pt-4">
          <h3 className="font-display text-[1.65rem] leading-tight tracking-tight transition-colors duration-150 group-hover:text-primary sm:text-[1.85rem]">
            {destination.name}
          </h3>
          <p className="text-muted-foreground mt-2 line-clamp-2 text-sm leading-relaxed">
            {destination.tagline}
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-2">
            <Badge variant="outline">{BUDGET_LABELS[destination.budget]}</Badge>
            <span className="text-muted-foreground text-xs">
              {DESTINATION_TYPE_LABELS[destination.type]}
              <span className="mx-1.5 text-border" aria-hidden="true">
                ·
              </span>
              {destination.durationDays.min}–{destination.durationDays.max} days
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}
