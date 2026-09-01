"use client";

import { useCallback } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const FILTER_KEYS = [
  "region",
  "budget",
  "duration",
  "season",
  "style",
  "activity",
  "type",
] as const;

const KEEP_ON_CLEAR = ["q", "start", "end", "travelers", "sort"] as const;

export function useExploreQuery() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();

  const replace = useCallback(
    (mutate: (next: URLSearchParams) => void) => {
      const next = new URLSearchParams(params.toString());
      mutate(next);
      const qs = next.toString();
      router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
    },
    [params, pathname, router],
  );

  const set = useCallback(
    (key: string, value: string | null) => {
      replace((next) => {
        if (!value) next.delete(key);
        else next.set(key, value);
      });
    },
    [replace],
  );

  const selectedList = useCallback(
    (key: string) => params.get(key)?.split(",").filter(Boolean) ?? [],
    [params],
  );

  const toggleList = useCallback(
    (key: string, value: string) => {
      const current = selectedList(key);
      const next = current.includes(value)
        ? current.filter((item) => item !== value)
        : [...current, value];
      set(key, next.length ? next.join(",") : null);
    },
    [selectedList, set],
  );

  const setExclusive = useCallback(
    (key: string, value: string) => {
      const current = selectedList(key);
      if (current.length === 1 && current[0] === value) {
        set(key, null);
        return;
      }
      set(key, value);
    },
    [selectedList, set],
  );

  const clearFilters = useCallback(() => {
    replace((next) => {
      FILTER_KEYS.forEach((key) => next.delete(key));
    });
  }, [replace]);

  const removeValue = useCallback(
    (key: string, value?: string) => {
      if (!value) {
        set(key, null);
        return;
      }
      const next = selectedList(key).filter((item) => item !== value);
      set(key, next.length ? next.join(",") : null);
    },
    [selectedList, set],
  );

  const filterCount = FILTER_KEYS.reduce((count, key) => {
    const raw = params.get(key);
    if (!raw) return count;
    return count + raw.split(",").filter(Boolean).length;
  }, 0);

  return {
    params,
    set,
    selectedList,
    toggleList,
    setExclusive,
    clearFilters,
    removeValue,
    filterCount,
    hasFilters: filterCount > 0,
    isNarrowed: filterCount > 0 || Boolean(params.get("q")?.trim()),
    keepKeys: KEEP_ON_CLEAR,
  };
}
