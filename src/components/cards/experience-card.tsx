import Link from "next/link";

import { RemoteImage } from "@/components/shared/remote-image";
import { getDestinationBySlug } from "@/data/destinations";
import { formatMoney } from "@/lib/dates";
import { STYLE_LABELS } from "@/lib/constants";
import type { Experience } from "@/lib/types";

export function ExperienceCard({ experience }: { experience: Experience }) {
  const destination = getDestinationBySlug(experience.destinationSlug);

  return (
    <article className="group h-full">
      <Link
        href={`/destinations/${experience.destinationSlug}`}
        className="flex h-full flex-col rounded-sm"
      >
        <div className="relative aspect-[16/10] overflow-hidden rounded-sm">
          <RemoteImage
            imageId={experience.imageId}
            alt={experience.title}
            size="card"
            sizes="(min-width: 1024px) 30vw, (min-width: 640px) 50vw, 100vw"
            className="motion-safe:transition-transform motion-safe:duration-500 motion-safe:ease-out motion-safe:group-hover:scale-[1.04]"
          />
          <div
            className="absolute inset-0 bg-[linear-gradient(to_top,rgba(28,25,23,0.55)_0%,rgba(28,25,23,0.08)_40%,transparent_70%)]"
            aria-hidden="true"
          />
          <p className="absolute bottom-3 left-3 text-[0.65rem] tracking-[0.16em] text-white/90 uppercase">
            {STYLE_LABELS[experience.category]}
          </p>
        </div>
        <div className="flex flex-1 flex-col pt-4">
          <h3 className="font-display text-xl leading-snug tracking-tight transition-colors duration-150 group-hover:text-primary">
            {experience.title}
          </h3>
          <p className="text-muted-foreground mt-2 line-clamp-2 text-sm leading-relaxed">
            {experience.summary}
          </p>
          <div className="mt-auto pt-4">
            {destination ? (
              <p className="text-muted-foreground text-[0.65rem] tracking-[0.16em] uppercase">
                {destination.name}
              </p>
            ) : null}
            <p className="mt-1 text-sm">
              {experience.duration}
              {experience.priceFrom > 0
                ? ` · from ${formatMoney(experience.priceFrom, experience.currency)}`
                : " · self-guided"}
            </p>
          </div>
        </div>
      </Link>
    </article>
  );
}
