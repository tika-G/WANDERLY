"use client";

import Link from "next/link";
import { useId, useState } from "react";

import { CreateTripForm } from "@/components/trip/create-trip-form";
import { Button, buttonVariants } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { formatDate } from "@/lib/dates";
import type { Trip, TripActivityType } from "@/lib/types";
import { cn } from "@/lib/utils";
import { useAppState } from "@/providers/app-state-provider";

export function AddToTripDialog({
  destinationSlug,
  destinationName,
  activity,
  triggerLabel = "Add to trip",
  triggerClassName,
}: {
  destinationSlug: string;
  destinationName?: string;
  activity?: {
    type: TripActivityType;
    refId: string;
    title: string;
  };
  triggerLabel?: string;
  triggerClassName?: string;
}) {
  const { trips, hydrated, addDestinationToTrip, addActivity } = useAppState();
  const dayFieldId = useId();
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<"select" | "create">("select");
  const [tripId, setTripId] = useState("");
  const [dayId, setDayId] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState<Trip | null>(null);

  const selected = trips.find((trip) => trip.id === tripId);

  function reset() {
    setMode("select");
    setTripId("");
    setDayId("");
    setError("");
    setSuccess(null);
  }

  function finish(trip: Trip) {
    setSuccess(trip);
    setError("");
  }

  function onAdd() {
    if (!tripId) {
      setError("Choose a trip first.");
      return;
    }
    addDestinationToTrip(tripId, destinationSlug);
    if (activity) {
      const day = dayId || selected?.days[0]?.id;
      if (day) {
        addActivity(tripId, day, {
          type: activity.type,
          refId: activity.refId,
          title: activity.title,
        });
      }
    }
    const trip = trips.find((item) => item.id === tripId);
    if (trip) finish(trip);
  }

  return (
    <Sheet
      open={open}
      onOpenChange={(next) => {
        const nextOpen = Boolean(next);
        setOpen(nextOpen);
        if (!nextOpen) reset();
      }}
    >
      <SheetTrigger
        className={cn(
          buttonVariants({ variant: "outline", size: "lg" }),
          triggerClassName,
        )}
      >
        {triggerLabel}
      </SheetTrigger>
      <SheetContent
        side="right"
        className="bg-background w-[min(100%,26rem)] gap-0 p-0"
      >
        <SheetHeader className="border-border border-b px-5 py-5">
          <SheetTitle className="font-display text-2xl">
            {success ? "Added" : "Add to a trip"}
          </SheetTitle>
          <SheetDescription>
            {success
              ? "Saved on this device. Nothing was booked."
              : "Trips stay in this browser until accounts exist."}
          </SheetDescription>
        </SheetHeader>

        <div className="min-h-0 flex-1 overflow-y-auto px-5 py-6">
          {!hydrated ? (
            <p className="text-muted-foreground text-sm">Loading trips…</p>
          ) : success ? (
            <div className="space-y-5">
              <p role="status" className="text-sm leading-relaxed">
                {activity
                  ? `${activity.title} is on “${success.title}”.`
                  : `${destinationName ?? "This destination"} is on “${success.title}”.`}
              </p>
              <div className="flex flex-col gap-2">
                <Link
                  href={`/trips/${success.id}`}
                  className={cn(buttonVariants({ size: "lg" }), "w-full")}
                  onClick={() => setOpen(false)}
                >
                  Open trip
                </Link>
                <Button
                  type="button"
                  variant="outline"
                  size="lg"
                  onClick={() => setOpen(false)}
                >
                  Keep browsing
                </Button>
              </div>
            </div>
          ) : mode === "create" ? (
            <div className="space-y-5">
              <button
                type="button"
                onClick={() => setMode("select")}
                className="text-muted-foreground hover:text-foreground text-sm underline-offset-4 hover:underline"
              >
                Back to trips
              </button>
              <CreateTripForm
                destinationSlug={destinationSlug}
                submitLabel="Create and add"
                onCreated={(trip) => {
                  if (activity && trip.days[0]) {
                    addActivity(trip.id, trip.days[0].id, {
                      type: activity.type,
                      refId: activity.refId,
                      title: activity.title,
                    });
                  }
                  finish(trip);
                }}
              />
            </div>
          ) : trips.length === 0 ? (
            <div className="space-y-4">
              <p className="text-muted-foreground text-sm leading-relaxed">
                You do not have a trip yet. Create one on this device.
              </p>
              <Button type="button" size="lg" onClick={() => setMode("create")}>
                Create a trip
              </Button>
            </div>
          ) : (
            <div className="grid gap-5">
              <fieldset className="space-y-2">
                <legend className="text-muted-foreground mb-2 text-[0.65rem] font-medium tracking-[0.16em] uppercase">
                  Your trips
                </legend>
                {trips.map((trip) => {
                  const active = trip.id === tripId;
                  return (
                    <button
                      key={trip.id}
                      type="button"
                      onClick={() => {
                        setTripId(trip.id);
                        setDayId(trip.days[0]?.id ?? "");
                        setError("");
                      }}
                      aria-pressed={active}
                      className={cn(
                        "w-full rounded-sm border px-4 py-3 text-left transition-colors duration-150",
                        active
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-foreground/30",
                      )}
                    >
                      <p className="font-medium">{trip.title}</p>
                      <p className="text-muted-foreground mt-1 text-xs">
                        {formatDate(trip.startDate)} – {formatDate(trip.endDate)}
                        {" · "}
                        {trip.travelers}{" "}
                        {trip.travelers === 1 ? "traveler" : "travelers"}
                      </p>
                    </button>
                  );
                })}
              </fieldset>

              {activity && selected ? (
                <div className="space-y-1.5">
                  <Label htmlFor={dayFieldId}>Day on the itinerary</Label>
                  <select
                    id={dayFieldId}
                    className="border-input bg-background h-10 w-full rounded-md border px-3 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
                    value={dayId}
                    onChange={(event) => setDayId(event.target.value)}
                  >
                    {selected.days.map((day) => (
                      <option key={day.id} value={day.id}>
                        {day.title}
                      </option>
                    ))}
                  </select>
                </div>
              ) : null}

              {error ? (
                <p className="text-destructive text-sm" role="alert">
                  {error}
                </p>
              ) : null}

              <div className="flex flex-col gap-2">
                <Button type="button" size="lg" onClick={onAdd}>
                  Add to trip
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => setMode("create")}
                >
                  Create a new trip
                </Button>
              </div>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
