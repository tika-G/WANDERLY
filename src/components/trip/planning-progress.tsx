import { getTripProgress } from "@/lib/trip-progress";
import type { Trip } from "@/lib/types";

export function PlanningProgress({ trip }: { trip: Trip }) {
  const progress = getTripProgress(trip);

  return (
    <div className="border-border rounded-sm border px-5 py-5">
      <p className="text-muted-foreground text-[0.65rem] tracking-[0.16em] uppercase">
        Planning progress
      </p>
      <p className="mt-2 text-sm leading-relaxed">
        {progress.plannedDays} of {progress.totalDays}{" "}
        {progress.totalDays === 1 ? "day has" : "days have"} something on them
        {progress.destinationCount
          ? ` · ${progress.destinationCount} ${progress.destinationCount === 1 ? "destination" : "destinations"}`
          : " · no destinations yet"}
        {progress.activityCount
          ? ` · ${progress.activityCount} ${progress.activityCount === 1 ? "activity" : "activities"}`
          : ""}
      </p>
      <div
        className="bg-muted mt-4 h-1 overflow-hidden rounded-full"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={progress.percent}
        aria-label="Share of days with at least one activity"
      >
        <div
          className="bg-primary h-full motion-safe:transition-[width] motion-safe:duration-300"
          style={{ width: `${progress.percent}%` }}
        />
      </div>
    </div>
  );
}
