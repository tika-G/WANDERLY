"use client";

import { useMemo, useState } from "react";

import { DestinationCard } from "@/components/cards/destination-card";
import { ExperienceCard } from "@/components/cards/experience-card";
import { PlaceCard } from "@/components/cards/place-card";
import { EmptyState } from "@/components/shared/empty-state";
import { PageContainer } from "@/components/shared/page-container";
import { PageHeader } from "@/components/shared/page-header";
import { PageLoading } from "@/components/shared/page-loading";
import { SaveButton } from "@/components/shared/save-button";
import { destinations } from "@/data/destinations";
import { experiences } from "@/data/experiences";
import { places } from "@/data/places";
import { cn } from "@/lib/utils";
import { useAppState } from "@/providers/app-state-provider";

type SavedFilter = "all" | "destination" | "place" | "experience";

export default function SavedPage() {
  const { saved, hydrated } = useAppState();
  const [filter, setFilter] = useState<SavedFilter>("all");

  const savedDestinations = useMemo(
    () =>
      destinations.filter((destination) =>
        saved.some(
          (item) => item.type === "destination" && item.id === destination.slug,
        ),
      ),
    [saved],
  );
  const savedPlaces = useMemo(
    () =>
      places.filter((place) =>
        saved.some((item) => item.type === "place" && item.id === place.id),
      ),
    [saved],
  );
  const savedExperiences = useMemo(
    () =>
      experiences.filter((experience) =>
        saved.some(
          (item) => item.type === "experience" && item.id === experience.id,
        ),
      ),
    [saved],
  );

  if (!hydrated) {
    return <PageLoading cards={3} />;
  }

  const total =
    savedDestinations.length + savedPlaces.length + savedExperiences.length;
  const empty = total === 0;
  const typeCount =
    Number(savedDestinations.length > 0) +
    Number(savedPlaces.length > 0) +
    Number(savedExperiences.length > 0);

  const showDestinations =
    savedDestinations.length > 0 &&
    (filter === "all" || filter === "destination");
  const showPlaces =
    savedPlaces.length > 0 && (filter === "all" || filter === "place");
  const showExperiences =
    savedExperiences.length > 0 && (filter === "all" || filter === "experience");

  return (
    <main className="py-12 sm:py-16">
      <PageContainer>
        <PageHeader
          eyebrow="Saved"
          title="Kept for later"
          description="Favorites live in this browser. Unsave anything you no longer want — there is no account copy yet."
        />

        {empty ? (
          <div className="mt-10">
            <EmptyState
              title="Nothing saved yet"
              description="Use Save on a destination, place, or experience. It will show up here on this device."
              actionLabel="Explore destinations"
              actionHref="/explore"
            />
          </div>
        ) : (
          <div className="mt-10 space-y-14">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-muted-foreground text-sm">
                {total} {total === 1 ? "item" : "items"} on this device
              </p>
              {typeCount > 1 ? (
                <div className="flex flex-wrap gap-1">
                  {(
                    [
                      ["all", "All"],
                      ["destination", "Destinations"],
                      ["place", "Places"],
                      ["experience", "Experiences"],
                    ] as const
                  )
                    .filter(([value]) => {
                      if (value === "all") return true;
                      if (value === "destination")
                        return savedDestinations.length > 0;
                      if (value === "place") return savedPlaces.length > 0;
                      return savedExperiences.length > 0;
                    })
                    .map(([value, label]) => (
                      <button
                        key={value}
                        type="button"
                        onClick={() => setFilter(value)}
                        aria-pressed={filter === value}
                        className={cn(
                          "rounded-sm px-2.5 py-1.5 text-sm transition-colors duration-150",
                          filter === value
                            ? "bg-foreground text-background"
                            : "text-muted-foreground hover:text-foreground",
                        )}
                      >
                        {label}
                      </button>
                    ))}
                </div>
              ) : null}
            </div>

            {!showDestinations && !showPlaces && !showExperiences ? (
              <p className="text-muted-foreground text-sm">
                Nothing in this group. Choose another filter, or save something
                new from Explore.
              </p>
            ) : null}

            {showDestinations ? (
              <section>
                <h2 className="font-display text-2xl">Destinations</h2>
                <div className="mt-6 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                  {savedDestinations.map((destination) => (
                    <div key={destination.slug} className="min-w-0 space-y-3">
                      <DestinationCard destination={destination} />
                      <SaveButton
                        type="destination"
                        id={destination.slug}
                        label={destination.name}
                      />
                    </div>
                  ))}
                </div>
              </section>
            ) : null}

            {showPlaces ? (
              <section>
                <h2 className="font-display text-2xl">Places</h2>
                <div className="mt-6 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                  {savedPlaces.map((place) => (
                    <div key={place.id} className="min-w-0 space-y-3">
                      <PlaceCard
                        place={place}
                        href={`/destinations/${place.destinationSlug}`}
                      />
                      <SaveButton
                        type="place"
                        id={place.id}
                        label={place.name}
                      />
                    </div>
                  ))}
                </div>
              </section>
            ) : null}

            {showExperiences ? (
              <section>
                <h2 className="font-display text-2xl">Experiences</h2>
                <div className="mt-6 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                  {savedExperiences.map((experience) => (
                    <div key={experience.id} className="min-w-0 space-y-3">
                      <ExperienceCard experience={experience} />
                      <SaveButton
                        type="experience"
                        id={experience.id}
                        label={experience.title}
                      />
                    </div>
                  ))}
                </div>
              </section>
            ) : null}
          </div>
        )}
      </PageContainer>
    </main>
  );
}
