"use client";

import { TripCard } from "@/components/cards/trip-card";
import { EmptyState } from "@/components/shared/empty-state";
import { PageContainer } from "@/components/shared/page-container";
import { PageHeader } from "@/components/shared/page-header";
import { PageLoading } from "@/components/shared/page-loading";
import { CreateTripDialog } from "@/components/trip/create-trip-dialog";
import { useAppState } from "@/providers/app-state-provider";

export default function TripsPage() {
  const { trips, hydrated } = useAppState();

  if (!hydrated) {
    return <PageLoading cards={2} />;
  }

  return (
    <main className="py-12 sm:py-16">
      <PageContainer>
        <PageHeader
          eyebrow="Trips"
          title="Itineraries on this device"
          description="Create a trip, then add destinations and day-by-day notes. Nothing here is synced to an account yet."
          action={<CreateTripDialog />}
        />

        {trips.length === 0 ? (
          <div className="mt-10">
            <EmptyState
              title="No trips yet"
              description="Start with dates, a traveler count, and a budget you mean. You can add places afterward."
              action={<CreateTripDialog triggerLabel="Create a trip" />}
            />
          </div>
        ) : (
          <div className="mt-10 grid gap-8 md:grid-cols-2">
            {trips.map((trip) => (
              <TripCard key={trip.id} trip={trip} />
            ))}
          </div>
        )}
      </PageContainer>
    </main>
  );
}
