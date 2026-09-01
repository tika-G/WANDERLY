"use client";

import { useState } from "react";
import Link from "next/link";

import { DestinationCard } from "@/components/cards/destination-card";
import { EmptyState } from "@/components/shared/empty-state";
import { PageContainer } from "@/components/shared/page-container";
import { PageLoading } from "@/components/shared/page-loading";
import { AddToItinerarySheet } from "@/components/trip/add-to-itinerary-sheet";
import { DayItinerary } from "@/components/trip/day-itinerary";
import { DeleteTripDialog } from "@/components/trip/delete-trip-dialog";
import { PlanningProgress } from "@/components/trip/planning-progress";
import { TripDetailsForm } from "@/components/trip/trip-details-form";
import { TripSummary } from "@/components/trip/trip-summary";
import { Button } from "@/components/ui/button";
import { destinations } from "@/data/destinations";
import { useAppState } from "@/providers/app-state-provider";
import { useParams } from "next/navigation";

export default function TripPlannerPage() {
  const params = useParams<{ id: string }>();
  const { trips, hydrated, removeDestinationFromTrip } = useAppState();
  const trip = trips.find((item) => item.id === params.id);
  const [catalogOpen, setCatalogOpen] = useState(false);
  const [catalogDayId, setCatalogDayId] = useState<string | undefined>();

  if (!hydrated) {
    return <PageLoading detail cards={2} />;
  }

  if (!trip) {
    return (
      <main className="py-12 sm:py-16">
        <PageContainer>
          <EmptyState
            title="This trip is not on this device"
            description="It may have been deleted, or you are on a different browser. Trips are not synced yet."
            actionLabel="Back to trips"
            actionHref="/trips"
          />
        </PageContainer>
      </main>
    );
  }

  const tripDestinations = destinations.filter((destination) =>
    trip.destinationSlugs.includes(destination.slug),
  );

  function openCatalog(dayId?: string) {
    setCatalogDayId(dayId);
    setCatalogOpen(true);
  }

  return (
    <main className="pb-24 lg:pb-0">
      <PageContainer className="py-12 sm:py-16">
        <p className="text-muted-foreground text-xs tracking-[0.18em] uppercase">
          <Link href="/trips" className="hover:text-foreground">
            Trips
          </Link>
          <span aria-hidden="true"> / </span>
          Planner
        </p>
        <div className="mt-3 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <h1 className="font-display max-w-3xl text-4xl leading-[1.1] text-pretty sm:text-5xl">
            {trip.title}
          </h1>
          <div className="flex flex-wrap gap-2">
            <Button
              type="button"
              size="lg"
              className="hidden lg:inline-flex"
              onClick={() => openCatalog()}
            >
              Add to itinerary
            </Button>
            <DeleteTripDialog tripId={trip.id} tripTitle={trip.title} />
          </div>
        </div>
        <p className="text-muted-foreground mt-3 max-w-xl text-sm leading-relaxed">
          Edits save on this device as you type. Changing dates rebuilds empty
          days and keeps activities on overlapping days.
        </p>

        <TripDetailsForm trip={trip} />

        <div className="mt-8 grid gap-4 lg:grid-cols-2">
          <TripSummary trip={trip} />
          <PlanningProgress trip={trip} />
        </div>

        <div className="mt-14 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <h2 className="font-display text-3xl">Destinations</h2>
          <Button
            type="button"
            variant="outline"
            onClick={() => openCatalog()}
          >
            Add destinations
          </Button>
        </div>
        {tripDestinations.length === 0 ? (
          <p className="text-muted-foreground mt-4 text-sm">
            Add a destination from the catalog, or open one and use Add to trip.
          </p>
        ) : (
          <div className="mt-6 grid gap-8 sm:grid-cols-2">
            {tripDestinations.map((destination) => (
              <div key={destination.slug} className="min-w-0 space-y-3">
                <DestinationCard destination={destination} />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() =>
                    removeDestinationFromTrip(trip.id, destination.slug)
                  }
                >
                  Remove from trip
                </Button>
              </div>
            ))}
          </div>
        )}

        <h2 className="font-display mt-14 text-3xl">Day by day</h2>
        <p className="text-muted-foreground mt-2 max-w-2xl text-sm leading-relaxed">
          Reorder within a day. Add places and experiences from the catalog, or
          type a note if it is not in the list.
        </p>
        <div className="mt-6">
          <DayItinerary trip={trip} onAddFromCatalog={openCatalog} />
        </div>
      </PageContainer>

      <div className="border-border bg-background/95 supports-backdrop-filter:bg-background/90 sticky bottom-0 z-30 border-t px-4 py-3 backdrop-blur-sm lg:hidden">
        <Button
          type="button"
          size="lg"
          className="w-full"
          onClick={() => openCatalog()}
        >
          Add to itinerary
        </Button>
      </div>

      <AddToItinerarySheet
        trip={trip}
        open={catalogOpen}
        onOpenChange={setCatalogOpen}
        dayId={catalogDayId}
      />
    </main>
  );
}
