"use client";

import { ArrowDown, ArrowUp, Plus, Trash2 } from "lucide-react";
import { FormEvent, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAppState } from "@/providers/app-state-provider";
import type { Trip, TripDay } from "@/lib/types";

function AddNoteForm({ tripId, day }: { tripId: string; day: TripDay }) {
  const { addActivity } = useAppState();
  const [title, setTitle] = useState("");

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!title.trim()) return;
    addActivity(tripId, day.id, {
      type: "note",
      title: title.trim(),
    });
    setTitle("");
  }

  return (
    <form onSubmit={onSubmit} className="mt-4 flex min-w-0 gap-2">
      <Input
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        placeholder="Add a note or activity"
        className="h-10 min-w-0"
        aria-label={`Add a note to ${day.title}`}
      />
      <Button type="submit" variant="outline" size="icon" aria-label="Add note">
        <Plus className="size-4" />
      </Button>
    </form>
  );
}

export function DayItinerary({
  trip,
  onAddFromCatalog,
}: {
  trip: Trip;
  onAddFromCatalog?: (dayId: string) => void;
}) {
  const { removeActivity, moveActivity, updateTrip } = useAppState();

  return (
    <div className="space-y-6">
      {trip.days.map((day) => (
        <section
          key={day.id}
          className="border-border rounded-sm border p-5"
          aria-labelledby={`day-${day.id}`}
        >
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="min-w-0 flex-1">
              <label htmlFor={`day-title-${day.id}`} className="sr-only">
                Title for day {day.dayNumber}
              </label>
              <Input
                id={`day-title-${day.id}`}
                value={day.title}
                onChange={(event) =>
                  updateTrip(trip.id, {
                    days: trip.days.map((item) =>
                      item.id === day.id
                        ? { ...item, title: event.target.value }
                        : item,
                    ),
                  })
                }
                className="font-display h-10 border-transparent bg-transparent px-0 text-xl shadow-none focus-visible:border-input focus-visible:bg-background focus-visible:px-3"
              />
            </div>
            {onAddFromCatalog ? (
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="shrink-0"
                onClick={() => onAddFromCatalog(day.id)}
              >
                Add from catalog
              </Button>
            ) : null}
          </div>
          {day.activities.length === 0 ? (
            <p className="text-muted-foreground mt-3 text-sm">
              Nothing planned yet. Add a place or experience from the catalog,
              or write a note below.
            </p>
          ) : (
            <ol className="mt-4 space-y-2">
              {day.activities.map((activity, index) => (
                <li
                  key={activity.id}
                  className="bg-muted/50 flex items-start justify-between gap-3 rounded-sm px-3 py-2"
                >
                  <div className="min-w-0">
                    <p className="text-sm font-medium">{activity.title}</p>
                    <p className="text-muted-foreground text-xs capitalize">
                      {activity.type}
                    </p>
                  </div>
                  <div className="flex shrink-0 gap-1">
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon-xs"
                      aria-label={`Move ${activity.title} up`}
                      disabled={index === 0}
                      onClick={() =>
                        moveActivity(trip.id, day.id, activity.id, "up")
                      }
                    >
                      <ArrowUp className="size-3.5" />
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon-xs"
                      aria-label={`Move ${activity.title} down`}
                      disabled={index === day.activities.length - 1}
                      onClick={() =>
                        moveActivity(trip.id, day.id, activity.id, "down")
                      }
                    >
                      <ArrowDown className="size-3.5" />
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon-xs"
                      aria-label={`Remove ${activity.title}`}
                      onClick={() =>
                        removeActivity(trip.id, day.id, activity.id)
                      }
                    >
                      <Trash2 className="size-3.5" />
                    </Button>
                  </div>
                </li>
              ))}
            </ol>
          )}
          <AddNoteForm tripId={trip.id} day={day} />
        </section>
      ))}
    </div>
  );
}
