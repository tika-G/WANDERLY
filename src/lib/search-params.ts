import type { DestinationFilters, DestinationSort, TravelStyle } from "@/lib/types";

function first(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

function list(value: string | string[] | undefined) {
  const raw = first(value);
  return raw ? raw.split(",").filter(Boolean) : [];
}

export function parseExploreParams(
  params: Record<string, string | string[] | undefined>,
): DestinationFilters & { sort: DestinationSort; start?: string; end?: string; travelers?: string } {
  const sort = (first(params.sort) as DestinationSort | undefined) ?? "featured";
  return {
    query: first(params.q),
    region: first(params.region) as DestinationFilters["region"],
    budget: first(params.budget) as DestinationFilters["budget"],
    duration: first(params.duration) as DestinationFilters["duration"],
    season: first(params.season) as DestinationFilters["season"],
    styles: list(params.style) as TravelStyle[],
    activities: list(params.activity) as TravelStyle[],
    types: list(params.type) as DestinationFilters["types"],
    sort: ["featured", "name", "budget", "duration"].includes(sort)
      ? sort
      : "featured",
    start: first(params.start),
    end: first(params.end),
    travelers: first(params.travelers),
  };
}
