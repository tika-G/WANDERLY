import { STORAGE_KEYS } from "@/lib/constants";
import type { LocalProfile, SavedItem, Trip } from "@/lib/types";

/**
 * Local persistence for Phase 1.
 * Later: replace this module with a Supabase-backed store that implements
 * the same load/save shape so UI and providers do not change.
 */
export interface PersistedAppState {
  trips: Trip[];
  saved: SavedItem[];
  profile: LocalProfile | null;
}

export const EMPTY_STATE: PersistedAppState = {
  trips: [],
  saved: [],
  profile: null,
};

const listeners = new Set<() => void>();
let snapshot: PersistedAppState = EMPTY_STATE;
let didRead = false;

function canUseStorage() {
  return typeof window !== "undefined" && typeof localStorage !== "undefined";
}

function readJson<T>(key: string, fallback: T): T {
  if (!canUseStorage()) return fallback;
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function readAll(): PersistedAppState {
  return {
    trips: readJson<Trip[]>(STORAGE_KEYS.trips, []),
    saved: readJson<SavedItem[]>(STORAGE_KEYS.saved, []),
    profile: readJson<LocalProfile | null>(STORAGE_KEYS.profile, null),
  };
}

function emitChange() {
  listeners.forEach((listener) => listener());
}

export function subscribeToAppState(listener: () => void) {
  listeners.add(listener);
  if (canUseStorage() && !didRead) {
    setTimeout(() => {
      if (didRead) return;
      snapshot = readAll();
      didRead = true;
      emitChange();
    }, 0);
  }
  return () => listeners.delete(listener);
}

export function hasHydratedStore() {
  return didRead;
}

export function getPersistedState(): PersistedAppState {
  return snapshot;
}

export function getServerAppState(): PersistedAppState {
  return EMPTY_STATE;
}

export function persistState(next: PersistedAppState) {
  snapshot = next;
  didRead = true;
  if (canUseStorage()) {
    localStorage.setItem(STORAGE_KEYS.trips, JSON.stringify(next.trips));
    localStorage.setItem(STORAGE_KEYS.saved, JSON.stringify(next.saved));
    localStorage.setItem(STORAGE_KEYS.profile, JSON.stringify(next.profile));
  }
  emitChange();
}
