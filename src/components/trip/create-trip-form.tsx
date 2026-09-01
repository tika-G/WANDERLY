"use client";

import { FormEvent, useId, useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { tripDurationDays } from "@/lib/dates";
import type { Trip } from "@/lib/types";
import { useAppState } from "@/providers/app-state-provider";

export function CreateTripForm({
  destinationSlug,
  defaultStart = "",
  defaultEnd = "",
  defaultTravelers = 2,
  submitLabel = "Save trip",
  onCreated,
}: {
  destinationSlug?: string;
  defaultStart?: string;
  defaultEnd?: string;
  defaultTravelers?: number;
  submitLabel?: string;
  onCreated: (trip: Trip) => void;
}) {
  const uid = useId();
  const { createTrip } = useAppState();
  const [title, setTitle] = useState("");
  const [startDate, setStartDate] = useState(defaultStart);
  const [endDate, setEndDate] = useState(defaultEnd);
  const [travelers, setTravelers] = useState(String(defaultTravelers));
  const [budget, setBudget] = useState("2500");
  const [error, setError] = useState("");

  const duration =
    startDate && endDate && endDate >= startDate
      ? tripDurationDays(startDate, endDate)
      : 0;

  const suggestedTitle = useMemo(() => {
    if (title) return title;
    return destinationSlug
      ? `Trip to ${destinationSlug.replace(/-/g, " ")}`
      : "";
  }, [destinationSlug, title]);

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!startDate || !endDate) {
      setError("Choose a start and end date.");
      return;
    }
    if (endDate < startDate) {
      setError("The end date must be on or after the start date.");
      return;
    }
    const trip = createTrip({
      title: suggestedTitle || "Untitled trip",
      startDate,
      endDate,
      travelers: Number(travelers) || 1,
      estimatedBudget: Number(budget) || 0,
      destinationSlugs: destinationSlug ? [destinationSlug] : [],
    });
    onCreated(trip);
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-4">
      <div className="space-y-1.5">
        <Label htmlFor={`${uid}-title`}>Trip name</Label>
        <Input
          id={`${uid}-title`}
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder={suggestedTitle || "Spring in Kyoto"}
        />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1.5">
          <Label htmlFor={`${uid}-start`}>Start</Label>
          <Input
            id={`${uid}-start`}
            type="date"
            required
            value={startDate}
            onChange={(event) => setStartDate(event.target.value)}
            className="scheme-light"
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor={`${uid}-end`}>End</Label>
          <Input
            id={`${uid}-end`}
            type="date"
            required
            min={startDate || undefined}
            value={endDate}
            onChange={(event) => setEndDate(event.target.value)}
            className="scheme-light"
          />
        </div>
      </div>
      {duration ? (
        <p className="text-muted-foreground -mt-2 text-sm">
          {duration} {duration === 1 ? "day" : "days"}
        </p>
      ) : null}
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1.5">
          <Label htmlFor={`${uid}-travelers`}>Travelers</Label>
          <Input
            id={`${uid}-travelers`}
            type="number"
            min={1}
            max={12}
            value={travelers}
            onChange={(event) => setTravelers(event.target.value)}
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor={`${uid}-budget`}>Budget (USD)</Label>
          <Input
            id={`${uid}-budget`}
            type="number"
            min={0}
            step={50}
            value={budget}
            onChange={(event) => setBudget(event.target.value)}
          />
        </div>
      </div>
      {error ? (
        <p className="text-destructive text-sm" role="alert">
          {error}
        </p>
      ) : null}
      <Button type="submit" size="lg">
        {submitLabel}
      </Button>
    </form>
  );
}
