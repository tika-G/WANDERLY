"use client";

import { useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { destinations } from "@/data/destinations";
import { experiences } from "@/data/experiences";
import { places } from "@/data/places";
import { cn } from "@/lib/utils";
import { useAppState } from "@/providers/app-state-provider";
import type { Trip } from "@/lib/types";

type CatalogTab = "destinations" | "places" | "experiences";

export function AddToItinerarySheet({
  trip,
  open,
  onOpenChange,
  dayId,
}: {
  trip: Trip;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  dayId?: string;
}) {
  const { addDestinationToTrip, addActivity } = useAppState();
  const [tab, setTab] = useState<CatalogTab>("destinations");
  const [query, setQuery] = useState("");
  const [selectedDay, setSelectedDay] = useState("");
  const [status, setStatus] = useState("");

  const activeDayId = selectedDay || dayId || trip.days[0]?.id || "";

  const q = query.trim().toLowerCase();

  const destinationResults = useMemo(
    () =>
      destinations.filter((destination) => {
        if (!q) return true;
        return `${destination.name} ${destination.country} ${destination.tagline}`
          .toLowerCase()
          .includes(q);
      }),
    [q],
  );

  const placeResults = useMemo(() => {
    const list = [...places].sort((a, b) => {
      const aOn = trip.destinationSlugs.includes(a.destinationSlug) ? 0 : 1;
      const bOn = trip.destinationSlugs.includes(b.destinationSlug) ? 0 : 1;
      return aOn - bOn;
    });
    return list.filter((place) => {
      if (!q) return true;
      const destination = destinations.find(
        (item) => item.slug === place.destinationSlug,
      );
      return `${place.name} ${place.kind} ${destination?.name ?? ""}`
        .toLowerCase()
        .includes(q);
    });
  }, [q, trip.destinationSlugs]);

  const experienceResults = useMemo(() => {
    const list = [...experiences].sort((a, b) => {
      const aOn = trip.destinationSlugs.includes(a.destinationSlug) ? 0 : 1;
      const bOn = trip.destinationSlugs.includes(b.destinationSlug) ? 0 : 1;
      return aOn - bOn;
    });
    return list.filter((experience) => {
      if (!q) return true;
      const destination = destinations.find(
        (item) => item.slug === experience.destinationSlug,
      );
      return `${experience.title} ${destination?.name ?? ""}`
        .toLowerCase()
        .includes(q);
    });
  }, [q, trip.destinationSlugs]);

  function announce(message: string) {
    setStatus(message);
  }

  return (
    <Sheet
      open={open}
      onOpenChange={(next) => {
        const nextOpen = Boolean(next);
        onOpenChange(nextOpen);
        if (!nextOpen) {
          setQuery("");
          setStatus("");
          setSelectedDay("");
        }
      }}
    >
      <SheetContent
        side="right"
        className="bg-background w-[min(100%,26rem)] gap-0 p-0"
      >
        <SheetHeader className="border-border border-b px-5 py-5">
          <SheetTitle className="font-display text-2xl">
            Add to itinerary
          </SheetTitle>
          <SheetDescription>
            Destinations, places, and experiences from the Wanderly catalog.
            Nothing is booked.
          </SheetDescription>
        </SheetHeader>

        <div className="min-h-0 flex-1 overflow-y-auto px-5 py-5">
          <div className="flex flex-wrap gap-1 border-b pb-3">
            {(
              [
                ["destinations", "Destinations"],
                ["places", "Places"],
                ["experiences", "Experiences"],
              ] as const
            ).map(([value, label]) => (
              <button
                key={value}
                type="button"
                onClick={() => setTab(value)}
                aria-pressed={tab === value}
                className={cn(
                  "rounded-sm px-2.5 py-1.5 text-sm transition-colors duration-150",
                  tab === value
                    ? "bg-foreground text-background"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {label}
              </button>
            ))}
          </div>

          <div className="mt-4 space-y-4">
            <Input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={`Search ${tab}`}
              aria-label={`Search ${tab}`}
              className="h-10"
            />

            {tab !== "destinations" && trip.days.length > 0 ? (
              <div className="space-y-1.5">
                <Label htmlFor="itinerary-day">Day</Label>
                <select
                  id="itinerary-day"
                  className="border-input bg-background h-10 w-full rounded-md border px-3 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
                  value={activeDayId}
                  onChange={(event) => setSelectedDay(event.target.value)}
                >
                  {trip.days.map((day) => (
                    <option key={day.id} value={day.id}>
                      {day.title}
                    </option>
                  ))}
                </select>
              </div>
            ) : null}

            {status ? (
              <p className="text-sm" role="status">
                {status}
              </p>
            ) : null}

            {tab === "destinations" ? (
              <ul className="space-y-2">
                {destinationResults.map((destination) => {
                  const onTrip = trip.destinationSlugs.includes(
                    destination.slug,
                  );
                  return (
                    <li key={destination.slug}>
                      <div className="border-border flex items-start justify-between gap-3 rounded-sm border px-3 py-3">
                        <div className="min-w-0">
                          <p className="font-medium">{destination.name}</p>
                          <p className="text-muted-foreground mt-0.5 text-xs">
                            {destination.country}
                          </p>
                        </div>
                        <Button
                          type="button"
                          size="sm"
                          variant={onTrip ? "secondary" : "outline"}
                          disabled={onTrip}
                          onClick={() => {
                            addDestinationToTrip(trip.id, destination.slug);
                            announce(`${destination.name} is on this trip.`);
                          }}
                        >
                          {onTrip ? "Added" : "Add"}
                        </Button>
                      </div>
                    </li>
                  );
                })}
              </ul>
            ) : null}

            {tab === "places" ? (
              <ul className="space-y-2">
                {placeResults.map((place) => {
                  const destination = destinations.find(
                    (item) => item.slug === place.destinationSlug,
                  );
                  return (
                    <li key={place.id}>
                      <div className="border-border flex items-start justify-between gap-3 rounded-sm border px-3 py-3">
                        <div className="min-w-0">
                          <p className="font-medium">{place.name}</p>
                          <p className="text-muted-foreground mt-0.5 text-xs">
                            {destination?.name ?? place.destinationSlug} ·{" "}
                            {place.kind}
                          </p>
                        </div>
                        <Button
                          type="button"
                          size="sm"
                          variant="outline"
                          disabled={!activeDayId}
                          onClick={() => {
                            addDestinationToTrip(
                              trip.id,
                              place.destinationSlug,
                            );
                            addActivity(trip.id, activeDayId, {
                              type: "place",
                              refId: place.id,
                              title: place.name,
                            });
                            announce(`${place.name} added to the day.`);
                          }}
                        >
                          Add
                        </Button>
                      </div>
                    </li>
                  );
                })}
              </ul>
            ) : null}

            {tab === "experiences" ? (
              <ul className="space-y-2">
                {experienceResults.map((experience) => {
                  const destination = destinations.find(
                    (item) => item.slug === experience.destinationSlug,
                  );
                  return (
                    <li key={experience.id}>
                      <div className="border-border flex items-start justify-between gap-3 rounded-sm border px-3 py-3">
                        <div className="min-w-0">
                          <p className="font-medium">{experience.title}</p>
                          <p className="text-muted-foreground mt-0.5 text-xs">
                            {destination?.name ?? experience.destinationSlug}
                          </p>
                        </div>
                        <Button
                          type="button"
                          size="sm"
                          variant="outline"
                          disabled={!activeDayId}
                          onClick={() => {
                            addDestinationToTrip(
                              trip.id,
                              experience.destinationSlug,
                            );
                            addActivity(trip.id, activeDayId, {
                              type: "experience",
                              refId: experience.id,
                              title: experience.title,
                            });
                            announce(`${experience.title} added to the day.`);
                          }}
                        >
                          Add
                        </Button>
                      </div>
                    </li>
                  );
                })}
              </ul>
            ) : null}

            {(tab === "destinations" && destinationResults.length === 0) ||
            (tab === "places" && placeResults.length === 0) ||
            (tab === "experiences" && experienceResults.length === 0) ? (
              <p className="text-muted-foreground text-sm">
                Nothing in the catalog matches that search.
              </p>
            ) : null}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
