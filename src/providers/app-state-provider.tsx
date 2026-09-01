"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useSyncExternalStore,
  type ReactNode,
} from "react";

import { experiences } from "@/data/experiences";
import { places } from "@/data/places";
import { createId, tripDurationDays } from "@/lib/dates";
import {
  getPersistedState,
  getServerAppState,
  hasHydratedStore,
  persistState,
  subscribeToAppState,
} from "@/lib/storage";
import type {
  LocalProfile,
  SavedItem,
  SavedItemType,
  TravelStyle,
  Trip,
  TripActivity,
  TripDay,
} from "@/lib/types";

interface CreateTripInput {
  title: string;
  startDate: string;
  endDate: string;
  travelers: number;
  estimatedBudget: number;
  destinationSlugs?: string[];
}

interface AppStateValue {
  hydrated: boolean;
  trips: Trip[];
  saved: SavedItem[];
  profile: LocalProfile | null;
  createTrip: (input: CreateTripInput) => Trip;
  updateTrip: (id: string, patch: Partial<Trip>) => void;
  deleteTrip: (id: string) => void;
  addDestinationToTrip: (tripId: string, slug: string) => void;
  removeDestinationFromTrip: (tripId: string, slug: string) => void;
  addActivity: (
    tripId: string,
    dayId: string,
    activity: Omit<TripActivity, "id">,
  ) => void;
  removeActivity: (tripId: string, dayId: string, activityId: string) => void;
  moveActivity: (
    tripId: string,
    dayId: string,
    activityId: string,
    direction: "up" | "down",
  ) => void;
  isSaved: (type: SavedItemType, id: string) => boolean;
  toggleSaved: (type: SavedItemType, id: string) => void;
  updateProfile: (patch: Partial<Omit<LocalProfile, "updatedAt">>) => void;
}

const AppStateContext = createContext<AppStateValue | null>(null);

function buildDays(startDate: string, endDate: string): TripDay[] {
  const count = Math.max(tripDurationDays(startDate, endDate), 1);
  return Array.from({ length: count }, (_, index) => ({
    id: createId(),
    dayNumber: index + 1,
    title: `Day ${index + 1}`,
    activities: [],
  }));
}

function persist(next: {
  trips: Trip[];
  saved: SavedItem[];
  profile: LocalProfile | null;
}) {
  persistState(next);
}

export function AppStateProvider({ children }: { children: ReactNode }) {
  const state = useSyncExternalStore(
    subscribeToAppState,
    getPersistedState,
    getServerAppState,
  );
  const hydrated = useSyncExternalStore(
    subscribeToAppState,
    hasHydratedStore,
    () => false,
  );

  const createTrip = useCallback(
    (input: CreateTripInput) => {
      const now = new Date().toISOString();
      const trip: Trip = {
        id: createId(),
        title: input.title.trim() || "Untitled trip",
        destinationSlugs: input.destinationSlugs ?? [],
        startDate: input.startDate,
        endDate: input.endDate,
        travelers: Math.max(1, input.travelers),
        estimatedBudget: Math.max(0, input.estimatedBudget),
        currency: "USD",
        days: buildDays(input.startDate, input.endDate),
        createdAt: now,
        updatedAt: now,
      };
      const current = getPersistedState();
      persist({
        ...current,
        trips: [trip, ...current.trips],
      });
      return trip;
    },
    [],
  );

  const updateTrip = useCallback((id: string, patch: Partial<Trip>) => {
    const current = getPersistedState();
    persist({
      ...current,
      trips: current.trips.map((trip) => {
        if (trip.id !== id) return trip;
        const next = { ...trip, ...patch, updatedAt: new Date().toISOString() };
        if (patch.startDate || patch.endDate) {
          const start = patch.startDate ?? trip.startDate;
          const end = patch.endDate ?? trip.endDate;
          if (start !== trip.startDate || end !== trip.endDate) {
            next.days = buildDays(start, end).map((day, index) => ({
              ...day,
              activities: trip.days[index]?.activities ?? [],
            }));
          }
        }
        return next;
      }),
    });
  }, []);

  const deleteTrip = useCallback((id: string) => {
    const current = getPersistedState();
    persist({
      ...current,
      trips: current.trips.filter((trip) => trip.id !== id),
    });
  }, []);

  const addDestinationToTrip = useCallback((tripId: string, slug: string) => {
    const current = getPersistedState();
    persist({
      ...current,
      trips: current.trips.map((trip) => {
        if (trip.id !== tripId || trip.destinationSlugs.includes(slug)) {
          return trip;
        }
        return {
          ...trip,
          destinationSlugs: [...trip.destinationSlugs, slug],
          updatedAt: new Date().toISOString(),
        };
      }),
    });
  }, []);

  const removeDestinationFromTrip = useCallback(
    (tripId: string, slug: string) => {
      const relatedIds = new Set([
        ...places
          .filter((place) => place.destinationSlug === slug)
          .map((place) => place.id),
        ...experiences
          .filter((experience) => experience.destinationSlug === slug)
          .map((experience) => experience.id),
      ]);
      const current = getPersistedState();
      persist({
        ...current,
        trips: current.trips.map((trip) => {
          if (trip.id !== tripId) return trip;
          return {
            ...trip,
            destinationSlugs: trip.destinationSlugs.filter(
              (item) => item !== slug,
            ),
            days: trip.days.map((day) => ({
              ...day,
              activities: day.activities.filter(
                (activity) =>
                  !activity.refId || !relatedIds.has(activity.refId),
              ),
            })),
            updatedAt: new Date().toISOString(),
          };
        }),
      });
    },
    [],
  );

  const addActivity = useCallback(
    (tripId: string, dayId: string, activity: Omit<TripActivity, "id">) => {
      const current = getPersistedState();
      persist({
        ...current,
        trips: current.trips.map((trip) => {
          if (trip.id !== tripId) return trip;
          return {
            ...trip,
            updatedAt: new Date().toISOString(),
            days: trip.days.map((day) =>
              day.id === dayId
                ? {
                    ...day,
                    activities: [
                      ...day.activities,
                      { ...activity, id: createId() },
                    ],
                  }
                : day,
            ),
          };
        }),
      });
    },
    [],
  );

  const removeActivity = useCallback(
    (tripId: string, dayId: string, activityId: string) => {
      const current = getPersistedState();
      persist({
        ...current,
        trips: current.trips.map((trip) => {
          if (trip.id !== tripId) return trip;
          return {
            ...trip,
            updatedAt: new Date().toISOString(),
            days: trip.days.map((day) =>
              day.id === dayId
                ? {
                    ...day,
                    activities: day.activities.filter(
                      (item) => item.id !== activityId,
                    ),
                  }
                : day,
            ),
          };
        }),
      });
    },
    [],
  );

  const moveActivity = useCallback(
    (
      tripId: string,
      dayId: string,
      activityId: string,
      direction: "up" | "down",
    ) => {
      const current = getPersistedState();
      persist({
        ...current,
        trips: current.trips.map((trip) => {
          if (trip.id !== tripId) return trip;
          return {
            ...trip,
            updatedAt: new Date().toISOString(),
            days: trip.days.map((day) => {
              if (day.id !== dayId) return day;
              const index = day.activities.findIndex(
                (item) => item.id === activityId,
              );
              if (index < 0) return day;
              const target = direction === "up" ? index - 1 : index + 1;
              if (target < 0 || target >= day.activities.length) return day;
              const next = [...day.activities];
              const [item] = next.splice(index, 1);
              next.splice(target, 0, item);
              return { ...day, activities: next };
            }),
          };
        }),
      });
    },
    [],
  );

  const isSaved = useCallback(
    (type: SavedItemType, id: string) =>
      state.saved.some((item) => item.type === type && item.id === id),
    [state.saved],
  );

  const toggleSaved = useCallback((type: SavedItemType, id: string) => {
    const current = getPersistedState();
    const exists = current.saved.some(
      (item) => item.type === type && item.id === id,
    );
    persist({
      ...current,
      saved: exists
        ? current.saved.filter((item) => !(item.type === type && item.id === id))
        : [{ type, id, savedAt: new Date().toISOString() }, ...current.saved],
    });
  }, []);

  const updateProfile = useCallback(
    (patch: Partial<Omit<LocalProfile, "updatedAt">>) => {
      const current = getPersistedState();
      const base: LocalProfile = current.profile ?? {
        displayName: "",
        homeCity: "",
        travelStyles: [] as TravelStyle[],
        notes: "",
        updatedAt: new Date().toISOString(),
      };
      persist({
        ...current,
        profile: { ...base, ...patch, updatedAt: new Date().toISOString() },
      });
    },
    [],
  );

  const value = useMemo<AppStateValue>(
    () => ({
      hydrated,
      trips: state.trips,
      saved: state.saved,
      profile: state.profile,
      createTrip,
      updateTrip,
      deleteTrip,
      addDestinationToTrip,
      removeDestinationFromTrip,
      addActivity,
      removeActivity,
      moveActivity,
      isSaved,
      toggleSaved,
      updateProfile,
    }),
    [
      hydrated,
      state.trips,
      state.saved,
      state.profile,
      createTrip,
      updateTrip,
      deleteTrip,
      addDestinationToTrip,
      removeDestinationFromTrip,
      addActivity,
      removeActivity,
      moveActivity,
      isSaved,
      toggleSaved,
      updateProfile,
    ],
  );

  return (
    <AppStateContext.Provider value={value}>{children}</AppStateContext.Provider>
  );
}

export function useAppState() {
  const context = useContext(AppStateContext);
  if (!context) {
    throw new Error("useAppState must be used within AppStateProvider");
  }
  return context;
}
