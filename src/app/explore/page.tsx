import { Suspense } from "react";
import type { Metadata } from "next";

import { DestinationCard } from "@/components/cards/destination-card";
import { ExploreToolbar } from "@/components/explore/explore-toolbar";
import { EmptyState } from "@/components/shared/empty-state";
import { PageContainer } from "@/components/shared/page-container";
import { SectionHeader } from "@/components/shared/section-header";
import { DestinationSearch } from "@/components/search/destination-search";
import { destinations, getFeaturedDestinations } from "@/data/destinations";
import { filterDestinations, sortDestinations } from "@/lib/catalog";
import { parseExploreParams } from "@/lib/search-params";

export const metadata: Metadata = {
  title: "Explore",
  description:
    "Filter Wanderly’s short catalog by region, season, budget, and how you like to travel.",
};

function ToolbarFallback() {
  return (
    <div className="space-y-4" aria-hidden="true">
      <div className="bg-muted h-10 animate-pulse rounded-sm" />
      <div className="bg-muted h-10 w-48 animate-pulse rounded-sm" />
    </div>
  );
}

export default async function ExplorePage({
  searchParams,
}: PageProps<"/explore">) {
  const raw = await searchParams;
  const parsed = parseExploreParams(raw);
  const results = sortDestinations(filterDestinations(parsed), parsed.sort);
  const featured = getFeaturedDestinations();
  const isFiltering = Boolean(
    parsed.query ||
      parsed.region ||
      parsed.budget ||
      parsed.duration ||
      parsed.season ||
      parsed.styles?.length ||
      parsed.activities?.length ||
      parsed.types?.length,
  );

  return (
    <main className="py-12 sm:py-16">
      <PageContainer>
        <header className="max-w-2xl">
          <p className="text-terracotta text-[0.65rem] tracking-[0.2em] uppercase">
            The catalog
          </p>
          <h1 className="font-display mt-3 text-4xl leading-[1.1] text-pretty sm:text-5xl lg:text-[3.25rem]">
            Find a place with a reason to go
          </h1>
          <p className="text-muted-foreground mt-4 max-w-xl text-[0.95rem] leading-relaxed text-pretty">
            Twelve destinations, written as if you might actually go. Search
            looks through names, countries, and the short descriptions — not a
            live booking inventory.
          </p>
        </header>

        <div className="mt-8 sm:mt-10">
          <DestinationSearch
            defaultQuery={parsed.query ?? ""}
            defaultStart={parsed.start ?? ""}
            defaultEnd={parsed.end ?? ""}
            defaultTravelers={parsed.travelers ?? "2"}
            variant="toolbar"
          />
        </div>
        {parsed.start || parsed.end || parsed.travelers ? (
          <p className="text-muted-foreground mt-4 text-sm">
            Dates and traveler count are kept for when you create a trip. They
            do not check availability.
          </p>
        ) : null}

        <div className="mt-10 sm:mt-12">
          <Suspense fallback={<ToolbarFallback />}>
            <ExploreToolbar resultCount={results.length} />
          </Suspense>
        </div>

        {results.length === 0 ? (
          <div className="mt-10">
            <EmptyState
              title="Nothing matches those filters"
              description="The catalog is small on purpose. Clear a filter or two, or start from the shortlist below."
              actionLabel="Reset explore"
              actionHref="/explore"
            />
          </div>
        ) : (
          <div className="mt-10 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {results.map((destination, index) => (
              <DestinationCard
                key={destination.slug}
                destination={destination}
                priority={index < 3}
              />
            ))}
          </div>
        )}

        {isFiltering ? (
          <div className="mt-20 sm:mt-28">
            <SectionHeader
              eyebrow="Editors’ shortlist"
              title="Worth a look regardless of filters"
              description="A few places we would still send you, even if they sit outside this search."
            />
            <div className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
              {featured.slice(0, 3).map((destination) => (
                <DestinationCard
                  key={destination.slug}
                  destination={destination}
                />
              ))}
            </div>
          </div>
        ) : null}

        <p className="text-muted-foreground mt-16 text-xs">
          {destinations.length} destinations in this mock catalog.
        </p>
      </PageContainer>
    </main>
  );
}
