/**
 * Integration contracts for later phases.
 * These return null / disabled in Phase 1 so the UI stays honest.
 * Swap the factory functions when Supabase, weather, maps, or AI land.
 */

export function isSupabaseConfigured() {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  );
}

export function isWeatherConfigured() {
  return Boolean(process.env.WEATHER_API_KEY);
}

export function isMapsConfigured() {
  return Boolean(process.env.MAPS_API_KEY);
}

export function isAssistantConfigured() {
  return Boolean(process.env.AI_API_KEY);
}

export const INTEGRATION_STATUS = {
  auth: isSupabaseConfigured(),
  persistence: isSupabaseConfigured(),
  weather: isWeatherConfigured(),
  maps: isMapsConfigured(),
  assistant: isAssistantConfigured(),
} as const;
