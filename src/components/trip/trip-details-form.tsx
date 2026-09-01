"use client";

import { tripDurationDays } from "@/lib/dates";
import type { Trip } from "@/lib/types";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAppState } from "@/providers/app-state-provider";

export function TripDetailsForm({ trip }: { trip: Trip }) {
  const { updateTrip } = useAppState();
  const duration = tripDurationDays(trip.startDate, trip.endDate);

  return (
    <form
      className="border-border mt-10 grid gap-4 rounded-sm border p-5 sm:grid-cols-2 lg:grid-cols-4"
      onSubmit={(event) => event.preventDefault()}
    >
      <div className="min-w-0 space-y-1.5 sm:col-span-2">
        <Label htmlFor="edit-title">Trip name</Label>
        <Input
          id="edit-title"
          className="h-10"
          value={trip.title}
          onChange={(event) =>
            updateTrip(trip.id, { title: event.target.value })
          }
        />
      </div>
      <div className="min-w-0 space-y-1.5">
        <Label htmlFor="edit-start">Start</Label>
        <Input
          id="edit-start"
          type="date"
          className="scheme-light h-10"
          value={trip.startDate}
          onChange={(event) => {
            const startDate = event.target.value;
            const endDate =
              trip.endDate && trip.endDate < startDate
                ? startDate
                : trip.endDate;
            updateTrip(trip.id, { startDate, endDate });
          }}
        />
      </div>
      <div className="min-w-0 space-y-1.5">
        <Label htmlFor="edit-end">End</Label>
        <Input
          id="edit-end"
          type="date"
          className="scheme-light h-10"
          min={trip.startDate}
          value={trip.endDate}
          onChange={(event) => {
            const endDate = event.target.value;
            if (endDate && endDate < trip.startDate) return;
            updateTrip(trip.id, { endDate });
          }}
        />
      </div>
      <div className="min-w-0 space-y-1.5">
        <Label htmlFor="edit-travelers">Travelers</Label>
        <Input
          id="edit-travelers"
          type="number"
          min={1}
          max={12}
          className="h-10"
          value={trip.travelers}
          onChange={(event) =>
            updateTrip(trip.id, {
              travelers: Math.max(1, Number(event.target.value) || 1),
            })
          }
        />
      </div>
      <div className="min-w-0 space-y-1.5">
        <Label htmlFor="edit-budget">Estimated budget (USD)</Label>
        <Input
          id="edit-budget"
          type="number"
          min={0}
          step={50}
          className="h-10"
          value={trip.estimatedBudget}
          onChange={(event) =>
            updateTrip(trip.id, {
              estimatedBudget: Math.max(0, Number(event.target.value) || 0),
            })
          }
        />
      </div>
      <div className="min-w-0 space-y-1.5">
        <p className="text-sm font-medium">Duration</p>
        <p className="text-muted-foreground flex h-10 items-center text-sm">
          {duration} {duration === 1 ? "day" : "days"} — updates when the dates
          change
        </p>
      </div>
    </form>
  );
}
