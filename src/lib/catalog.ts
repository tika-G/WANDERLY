import { destinations } from "@/data/destinations";
import { DURATION_RANGES } from "@/lib/constants";
import type {
  Destination,
  DestinationFilters,
  DestinationSort,
} from "@/lib/types";

function rangesOverlap(
  a: { min: number; max: number },
  b: { min: number; max: number },
) {
  return a.min <= b.max && b.min <= a.max;
}

export function filterDestinations(
  filters: DestinationFilters,
  catalog: Destination[] = destinations,
) {
  const query = filters.query?.trim().toLowerCase();

  return catalog.filter((destination) => {
    if (query) {
      const haystack = [
        destination.name,
        destination.country,
        destination.tagline,
        destination.summary,
      ]
        .join(" ")
        .toLowerCase();
      if (!haystack.includes(query)) return false;
    }

    if (filters.region && destination.region !== filters.region) return false;
    if (filters.budget && destination.budget !== filters.budget) return false;
    if (filters.season && !destination.seasons.includes(filters.season)) {
      return false;
    }
    if (
      filters.duration &&
      !rangesOverlap(destination.durationDays, DURATION_RANGES[filters.duration])
    ) {
      return false;
    }
    if (filters.types?.length && !filters.types.includes(destination.type)) {
      return false;
    }
    if (
      filters.styles?.length &&
      !filters.styles.some((style) => destination.styles.includes(style))
    ) {
      return false;
    }
    if (
      filters.activities?.length &&
      !filters.activities.some((activity) =>
        destination.activities.includes(activity),
      )
    ) {
      return false;
    }

    return true;
  });
}

const BUDGET_ORDER = { budget: 0, moderate: 1, luxury: 2 } as const;

export function sortDestinations(
  list: Destination[],
  sort: DestinationSort = "featured",
) {
  const copy = [...list];
  copy.sort((a, b) => {
    switch (sort) {
      case "name":
        return a.name.localeCompare(b.name);
      case "budget":
        return BUDGET_ORDER[a.budget] - BUDGET_ORDER[b.budget];
      case "duration":
        return a.durationDays.min - b.durationDays.min;
      case "featured":
      default:
        if (a.featured !== b.featured) return a.featured ? -1 : 1;
        return a.name.localeCompare(b.name);
    }
  });
  return copy;
}

export function searchDestinations(query: string) {
  return filterDestinations({ query });
}
