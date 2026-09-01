import Link from "next/link";

import { RemoteImage } from "@/components/shared/remote-image";
import { getDestinationBySlug } from "@/data/destinations";
import type { Place } from "@/lib/types";

export function PlaceCard({
  place,
  href,
}: {
  place: Place;
  href?: string;
}) {
  const destination = getDestinationBySlug(place.destinationSlug);
  const inner = (
    <>
      <div className="relative aspect-[4/3] overflow-hidden rounded-sm">
        <RemoteImage
          imageId={place.imageId}
          alt={place.name}
          size="card"
          className="motion-safe:transition-transform motion-safe:duration-500 motion-safe:ease-out motion-safe:group-hover:scale-[1.04]"
        />
        <div
          className="absolute inset-0 bg-[linear-gradient(to_top,rgba(28,25,23,0.28)_0%,transparent_55%)]"
          aria-hidden="true"
        />
      </div>
      <div className="pt-4">
        <p className="text-muted-foreground text-[0.65rem] tracking-[0.16em] uppercase">
          {place.kind}
        </p>
        <h3
          className={
            href
              ? "font-display mt-1.5 text-xl leading-snug tracking-tight transition-colors duration-150 group-hover:text-primary"
              : "font-display mt-1.5 text-xl leading-snug tracking-tight"
          }
        >
          {place.name}
        </h3>
        <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
          {place.description}
        </p>
        {href && destination ? (
          <p className="text-muted-foreground mt-3 text-[0.65rem] tracking-[0.16em] uppercase">
            {destination.name}
          </p>
        ) : null}
      </div>
    </>
  );

  if (href) {
    return (
      <article className="group h-full">
        <Link href={href} className="flex h-full flex-col rounded-sm">
          {inner}
        </Link>
      </article>
    );
  }

  return <article className="group">{inner}</article>;
}
