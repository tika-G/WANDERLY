import Link from "next/link";

import { RemoteImage } from "@/components/shared/remote-image";
import { destinations } from "@/data/destinations";
import { formatDate, formatMoney, tripDurationDays } from "@/lib/dates";
import { getTripProgress } from "@/lib/trip-progress";
import type { Trip } from "@/lib/types";

export function TripCard({ trip }: { trip: Trip }) {
  const names = trip.destinationSlugs
    .map((slug) => destinations.find((item) => item.slug === slug)?.name)
    .filter(Boolean);
  const cover = destinations.find(
    (item) => item.slug === trip.destinationSlugs[0],
  );
  const days = tripDurationDays(trip.startDate, trip.endDate);
  const progress = getTripProgress(trip);

  return (
    <article className="group min-w-0">
      <Link
        href={`/trips/${trip.id}`}
        className="grid gap-4 rounded-sm sm:grid-cols-[11rem_minmax(0,1fr)] sm:items-center"
      >
        <div className="relative aspect-[16/10] overflow-hidden rounded-sm sm:aspect-[4/3]">
          {cover ? (
            <>
              <RemoteImage
                imageId={cover.imageIds[0]}
                alt=""
                size="thumb"
                sizes="(min-width: 640px) 11rem, 100vw"
                className="motion-safe:transition-transform motion-safe:duration-500 motion-safe:ease-out motion-safe:group-hover:scale-[1.04]"
              />
              <div
                className="absolute inset-0 bg-[linear-gradient(to_top,rgba(28,25,23,0.28)_0%,transparent_55%)]"
                aria-hidden="true"
              />
            </>
          ) : (
            <div className="bg-muted h-full w-full" aria-hidden="true" />
          )}
        </div>
        <div className="min-w-0 py-1">
          <p className="text-muted-foreground text-[0.65rem] tracking-[0.16em] uppercase">
            {days} {days === 1 ? "day" : "days"} · {trip.travelers}{" "}
            {trip.travelers === 1 ? "traveler" : "travelers"}
          </p>
          <h3 className="font-display mt-2 text-2xl tracking-tight transition-colors duration-150 group-hover:text-primary">
            {trip.title}
          </h3>
          <p className="text-muted-foreground mt-2 text-sm">
            {formatDate(trip.startDate)} – {formatDate(trip.endDate)}
          </p>
          <p className="mt-3 text-sm">
            {names.length ? names.join(" · ") : "No destinations added yet"}
          </p>
          <p className="text-muted-foreground mt-3 text-sm">
            {progress.plannedDays}/{progress.totalDays} days planned ·{" "}
            {formatMoney(trip.estimatedBudget, trip.currency)}
          </p>
        </div>
      </Link>
    </article>
  );
}
