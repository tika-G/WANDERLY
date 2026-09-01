import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { ExperienceCard } from "@/components/cards/experience-card";
import { PlaceCard } from "@/components/cards/place-card";
import { ImageGallery } from "@/components/destination/image-gallery";
import {
  MapPlaceholder,
  WeatherPlaceholder,
} from "@/components/destination/placeholders";
import { PageContainer } from "@/components/shared/page-container";
import { SaveButton } from "@/components/shared/save-button";
import { AddToTripDialog } from "@/components/trip/add-to-trip-dialog";
import { destinations, getDestinationBySlug } from "@/data/destinations";
import { getExperiencesByDestination } from "@/data/experiences";
import { getPlacesByDestination } from "@/data/places";
import {
  BUDGET_LABELS,
  DESTINATION_TYPE_LABELS,
  REGION_LABELS,
  SEASON_LABELS,
  STYLE_LABELS,
} from "@/lib/constants";
import { cn } from "@/lib/utils";

export function generateStaticParams() {
  return destinations.map((destination) => ({ slug: destination.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/destinations/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const destination = getDestinationBySlug(slug);
  if (!destination) return { title: "Destination" };
  return {
    title: destination.name,
    description: destination.tagline,
  };
}

function Actions({
  slug,
  name,
  fullWidth = false,
  className,
}: {
  slug: string;
  name: string;
  fullWidth?: boolean;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-wrap gap-2", fullWidth && "w-full", className)}>
      <SaveButton
        type="destination"
        id={slug}
        label={name}
        className={cn("min-h-11 px-4", fullWidth && "flex-1")}
      />
      <AddToTripDialog
        destinationSlug={slug}
        destinationName={name}
        triggerClassName={cn("min-h-11", fullWidth && "flex-1")}
      />
    </div>
  );
}

export default async function DestinationPage({
  params,
}: PageProps<"/destinations/[slug]">) {
  const { slug } = await params;
  const destination = getDestinationBySlug(slug);
  if (!destination) notFound();

  const places = getPlacesByDestination(destination.slug);
  const destinationExperiences = getExperiencesByDestination(destination.slug);

  return (
    <main className="pb-24 lg:pb-0">
      <PageContainer className="pt-8 sm:pt-12">
        <p className="text-muted-foreground text-sm">
          <Link href="/explore" className="hover:text-foreground transition-colors">
            Explore
          </Link>
          <span aria-hidden="true"> / </span>
          <span>{destination.country}</span>
        </p>

        <div className="mt-6 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <p className="text-terracotta text-[0.65rem] tracking-[0.2em] uppercase">
              {destination.country}
              <span className="text-border mx-2" aria-hidden="true">
                ·
              </span>
              {REGION_LABELS[destination.region]}
            </p>
            <h1 className="font-display mt-3 text-4xl leading-[1.05] sm:text-6xl lg:text-[4.25rem]">
              {destination.name}
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-pretty sm:text-lg">
              {destination.tagline}
            </p>
          </div>
          <Actions
            slug={destination.slug}
            name={destination.name}
            className="hidden lg:flex"
          />
        </div>

        <div className="mt-8 sm:mt-10">
          <ImageGallery destination={destination} />
        </div>

        <dl className="border-border mt-8 grid gap-4 border-y py-6 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <dt className="text-muted-foreground text-[0.65rem] tracking-[0.16em] uppercase">
              Type
            </dt>
            <dd className="mt-1 text-sm">{DESTINATION_TYPE_LABELS[destination.type]}</dd>
          </div>
          <div>
            <dt className="text-muted-foreground text-[0.65rem] tracking-[0.16em] uppercase">
              Budget
            </dt>
            <dd className="mt-1 text-sm">{BUDGET_LABELS[destination.budget]}</dd>
          </div>
          <div>
            <dt className="text-muted-foreground text-[0.65rem] tracking-[0.16em] uppercase">
              Stay
            </dt>
            <dd className="mt-1 text-sm">
              {destination.durationDays.min}–{destination.durationDays.max} days
            </dd>
          </div>
          <div>
            <dt className="text-muted-foreground text-[0.65rem] tracking-[0.16em] uppercase">
              Season
            </dt>
            <dd className="mt-1 text-sm">
              {destination.seasons.map((season) => SEASON_LABELS[season]).join(", ")}
            </dd>
          </div>
        </dl>

        <div className="mt-12 grid gap-10 lg:grid-cols-[1.45fr_0.85fr] lg:gap-16">
          <article>
            <h2 className="font-display text-3xl sm:text-4xl">Overview</h2>
            <p className="mt-5 max-w-2xl text-[0.95rem] leading-relaxed text-pretty">
              {destination.overview}
            </p>
            <p className="text-muted-foreground mt-5 text-sm leading-relaxed">
              Best time: {destination.bestTime}
            </p>
            <p className="text-muted-foreground mt-1 text-sm">
              {destination.practical.language} · {destination.practical.currency}{" "}
              · {destination.practical.timezone}
            </p>

            <h2 className="font-display mt-14 text-3xl sm:text-4xl">Highlights</h2>
            <ol className="mt-6 max-w-2xl space-y-4">
              {destination.highlights.map((item, index) => (
                <li key={item} className="flex gap-4 text-sm leading-relaxed">
                  <span
                    className="text-terracotta w-6 shrink-0 text-[0.65rem] tracking-[0.16em]"
                    aria-hidden="true"
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ol>

            <ul className="mt-8 flex flex-wrap gap-2">
              {destination.styles.map((style) => (
                <li
                  key={style}
                  className="border-border text-muted-foreground rounded-sm border px-2.5 py-1 text-[0.65rem] tracking-[0.14em] uppercase"
                >
                  {STYLE_LABELS[style]}
                </li>
              ))}
            </ul>
          </article>
          <aside className="space-y-4 lg:pt-2">
            <WeatherPlaceholder destination={destination} />
            <MapPlaceholder destination={destination} />
          </aside>
        </div>

        <section className="mt-16 sm:mt-20">
          <h2 className="font-display text-3xl sm:text-4xl">Places to visit</h2>
          <p className="text-muted-foreground mt-3 max-w-xl text-sm leading-relaxed">
            Neighborhoods, tables, and a few things that repay the walk.
          </p>
          {places.length === 0 ? (
            <p className="text-muted-foreground mt-6 text-sm">
              No places listed for this destination yet.
            </p>
          ) : (
            <div className="mt-8 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
              {places.map((place) => (
                <div key={place.id}>
                  <PlaceCard place={place} />
                  <div className="mt-3 flex flex-wrap gap-2">
                    <SaveButton type="place" id={place.id} label={place.name} />
                    <AddToTripDialog
                      destinationSlug={destination.slug}
                      destinationName={destination.name}
                      triggerLabel="Add place"
                      triggerClassName="h-8 px-3 text-[0.8125rem]"
                      activity={{
                        type: "place",
                        refId: place.id,
                        title: place.name,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        <section className="mt-16 pb-10 sm:mt-20 sm:pb-16">
          <h2 className="font-display text-3xl sm:text-4xl">Experiences</h2>
          <p className="text-muted-foreground mt-3 max-w-xl text-sm leading-relaxed">
            Walks, meals, and one or two things that require a reservation.
            Prices are estimates.
          </p>
          {destinationExperiences.length === 0 ? (
            <p className="text-muted-foreground mt-6 text-sm">
              No experiences listed for this destination yet.
            </p>
          ) : (
            <div className="mt-8 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
              {destinationExperiences.map((experience) => (
                <div key={experience.id}>
                  <ExperienceCard experience={experience} />
                  <div className="mt-3 flex flex-wrap gap-2">
                    <SaveButton
                      type="experience"
                      id={experience.id}
                      label={experience.title}
                    />
                    <AddToTripDialog
                      destinationSlug={destination.slug}
                      destinationName={destination.name}
                      triggerLabel="Add experience"
                      triggerClassName="h-8 px-3 text-[0.8125rem]"
                      activity={{
                        type: "experience",
                        refId: experience.id,
                        title: experience.title,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </PageContainer>

      <div className="border-border bg-background/95 supports-backdrop-filter:backdrop-blur-sm lg:hidden sticky bottom-0 z-30 border-t px-4 py-3">
        <Actions
          slug={destination.slug}
          name={destination.name}
          fullWidth
        />
      </div>
    </main>
  );
}
