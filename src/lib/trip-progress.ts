import type { Trip } from "@/lib/types";

export function getTripProgress(trip: Trip) {
  const totalDays = trip.days.length;
  const plannedDays = trip.days.filter((day) => day.activities.length > 0)
    .length;
  const activityCount = trip.days.reduce(
    (count, day) => count + day.activities.length,
    0,
  );
  const destinationCount = trip.destinationSlugs.length;
  const percent =
    totalDays === 0 ? 0 : Math.round((plannedDays / totalDays) * 100);

  return {
    totalDays,
    plannedDays,
    activityCount,
    destinationCount,
    percent,
  };
}
