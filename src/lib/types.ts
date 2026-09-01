export type Region =
  | "europe"
  | "asia"
  | "africa"
  | "north-america"
  | "south-america"
  | "oceania"
  | "middle-east";

export type BudgetLevel = "budget" | "moderate" | "luxury";

export type Season = "spring" | "summer" | "autumn" | "winter";

export type TravelStyle =
  | "adventure"
  | "culture"
  | "food"
  | "beach"
  | "nature"
  | "luxury"
  | "photography"
  | "wellness"
  | "nightlife";

export type DestinationType =
  | "city"
  | "coast"
  | "island"
  | "mountain"
  | "desert"
  | "countryside";

export type DurationBand = "weekend" | "short" | "week" | "extended";

export type PlaceKind =
  | "neighborhood"
  | "landmark"
  | "museum"
  | "market"
  | "nature"
  | "restaurant"
  | "viewpoint";

export type SavedItemType = "destination" | "place" | "experience";

export type TripActivityType = "place" | "experience" | "note";

export interface GeoPoint {
  lat: number;
  lng: number;
}

export interface Destination {
  slug: string;
  name: string;
  country: string;
  region: Region;
  type: DestinationType;
  tagline: string;
  summary: string;
  overview: string;
  bestTime: string;
  seasons: Season[];
  budget: BudgetLevel;
  durationDays: { min: number; max: number };
  styles: TravelStyle[];
  activities: TravelStyle[];
  featured: boolean;
  coordinates: GeoPoint;
  imageIds: string[];
  highlights: string[];
  practical: {
    language: string;
    currency: string;
    timezone: string;
  };
}

export interface Place {
  id: string;
  destinationSlug: string;
  name: string;
  kind: PlaceKind;
  description: string;
  imageId: string;
}

export interface Experience {
  id: string;
  destinationSlug: string;
  title: string;
  summary: string;
  duration: string;
  priceFrom: number;
  currency: "USD";
  category: TravelStyle;
  imageId: string;
}

export interface InspirationStory {
  id: string;
  title: string;
  excerpt: string;
  destinationSlug: string;
  imageId: string;
}

export interface TripActivity {
  id: string;
  type: TripActivityType;
  refId?: string;
  title: string;
  notes?: string;
}

export interface TripDay {
  id: string;
  dayNumber: number;
  title: string;
  activities: TripActivity[];
}

export interface Trip {
  id: string;
  title: string;
  destinationSlugs: string[];
  startDate: string;
  endDate: string;
  travelers: number;
  estimatedBudget: number;
  currency: "USD";
  days: TripDay[];
  createdAt: string;
  updatedAt: string;
}

export interface SavedItem {
  type: SavedItemType;
  id: string;
  savedAt: string;
}

export interface LocalProfile {
  displayName: string;
  homeCity: string;
  travelStyles: TravelStyle[];
  notes: string;
  updatedAt: string;
}

export interface DestinationFilters {
  query?: string;
  region?: Region;
  budget?: BudgetLevel;
  duration?: DurationBand;
  season?: Season;
  styles?: TravelStyle[];
  activities?: TravelStyle[];
  types?: DestinationType[];
}

export type DestinationSort = "featured" | "name" | "budget" | "duration";
