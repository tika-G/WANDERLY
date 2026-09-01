import type {
  BudgetLevel,
  DestinationSort,
  DestinationType,
  DurationBand,
  Region,
  Season,
  TravelStyle,
} from "@/lib/types";

export const SITE_NAME = "Wanderly";
export const SITE_TAGLINE = "Go somewhere worth remembering.";

export const NAV_LINKS = [
  { href: "/explore", label: "Explore" },
  { href: "/trips", label: "Trips" },
  { href: "/saved", label: "Saved" },
  { href: "/about", label: "About" },
  { href: "/profile", label: "Profile" },
] as const;

export const REGION_LABELS: Record<Region, string> = {
  europe: "Europe",
  asia: "Asia",
  africa: "Africa",
  "north-america": "North America",
  "south-america": "South America",
  oceania: "Oceania",
  "middle-east": "Middle East",
};

export const BUDGET_LABELS: Record<BudgetLevel, string> = {
  budget: "Budget",
  moderate: "Moderate",
  luxury: "Luxury",
};

export const SEASON_LABELS: Record<Season, string> = {
  spring: "Spring",
  summer: "Summer",
  autumn: "Autumn",
  winter: "Winter",
};

export const STYLE_LABELS: Record<TravelStyle, string> = {
  adventure: "Adventure",
  culture: "Culture",
  food: "Food",
  beach: "Beach",
  nature: "Nature",
  luxury: "Luxury",
  photography: "Photography",
  wellness: "Wellness",
  nightlife: "Nightlife",
};

export const DESTINATION_TYPE_LABELS: Record<DestinationType, string> = {
  city: "City",
  coast: "Coast",
  island: "Island",
  mountain: "Mountain",
  desert: "Desert",
  countryside: "Countryside",
};

export const DURATION_LABELS: Record<DurationBand, string> = {
  weekend: "Weekend (2–3 days)",
  short: "Short trip (4–6 days)",
  week: "A week (7–10 days)",
  extended: "Extended (11+ days)",
};

export const DURATION_RANGES: Record<DurationBand, { min: number; max: number }> =
  {
    weekend: { min: 2, max: 3 },
    short: { min: 4, max: 6 },
    week: { min: 7, max: 10 },
    extended: { min: 11, max: 30 },
  };

export const SORT_LABELS: Record<DestinationSort, string> = {
  featured: "Featured",
  name: "Name",
  budget: "Budget",
  duration: "Suggested duration",
};

export const TRAVEL_STYLES = Object.keys(STYLE_LABELS) as TravelStyle[];
export const REGIONS = Object.keys(REGION_LABELS) as Region[];
export const BUDGET_LEVELS = Object.keys(BUDGET_LABELS) as BudgetLevel[];
export const SEASONS = Object.keys(SEASON_LABELS) as Season[];
export const DESTINATION_TYPES = Object.keys(
  DESTINATION_TYPE_LABELS,
) as DestinationType[];
export const DURATION_BANDS = Object.keys(DURATION_LABELS) as DurationBand[];
export const SORT_OPTIONS = Object.keys(SORT_LABELS) as DestinationSort[];

export const STORAGE_KEYS = {
  trips: "wanderly.trips.v1",
  saved: "wanderly.saved.v1",
  profile: "wanderly.profile.v1",
} as const;
