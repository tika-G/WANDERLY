import { formatDate, formatMoney, tripDurationDays } from "@/lib/dates";
import type { Trip } from "@/lib/types";

export function TripSummary({ trip }: { trip: Trip }) {
  const days = tripDurationDays(trip.startDate, trip.endDate);

  return (
    <dl className="border-border grid gap-4 rounded-sm border p-5 sm:grid-cols-2 lg:grid-cols-4">
      <div>
        <dt className="text-muted-foreground text-xs tracking-[0.16em] uppercase">
          Dates
        </dt>
        <dd className="mt-1 text-sm">
          {formatDate(trip.startDate)} – {formatDate(trip.endDate)}
        </dd>
      </div>
      <div>
        <dt className="text-muted-foreground text-xs tracking-[0.16em] uppercase">
          Duration
        </dt>
        <dd className="mt-1 text-sm">
          {days} {days === 1 ? "day" : "days"}
        </dd>
      </div>
      <div>
        <dt className="text-muted-foreground text-xs tracking-[0.16em] uppercase">
          Travelers
        </dt>
        <dd className="mt-1 text-sm">{trip.travelers}</dd>
      </div>
      <div>
        <dt className="text-muted-foreground text-xs tracking-[0.16em] uppercase">
          Estimated budget
        </dt>
        <dd className="mt-1 text-sm">
          {formatMoney(trip.estimatedBudget, trip.currency)}
        </dd>
      </div>
    </dl>
  );
}
