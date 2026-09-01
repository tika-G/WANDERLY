"use client";

import { SlidersHorizontal, X } from "lucide-react";

import { ChipGroup, FilterSelect } from "@/components/explore/filter-controls";
import { useExploreQuery } from "@/components/explore/use-explore-query";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  BUDGET_LABELS,
  BUDGET_LEVELS,
  DESTINATION_TYPE_LABELS,
  DESTINATION_TYPES,
  DURATION_BANDS,
  DURATION_LABELS,
  REGION_LABELS,
  REGIONS,
  SEASON_LABELS,
  SEASONS,
  SORT_LABELS,
  SORT_OPTIONS,
  STYLE_LABELS,
  TRAVEL_STYLES,
} from "@/lib/constants";
import { cn } from "@/lib/utils";

function FilterSelects({ idPrefix }: { idPrefix: string }) {
  const { params, set } = useExploreQuery();

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <FilterSelect
        id={`${idPrefix}-region`}
        label="Region"
        value={params.get("region") ?? ""}
        onChange={(value) => set("region", value || null)}
        options={REGIONS.map((region) => ({
          value: region,
          label: REGION_LABELS[region],
        }))}
      />
      <FilterSelect
        id={`${idPrefix}-budget`}
        label="Budget"
        value={params.get("budget") ?? ""}
        onChange={(value) => set("budget", value || null)}
        options={BUDGET_LEVELS.map((level) => ({
          value: level,
          label: BUDGET_LABELS[level],
        }))}
      />
      <FilterSelect
        id={`${idPrefix}-duration`}
        label="Duration"
        value={params.get("duration") ?? ""}
        onChange={(value) => set("duration", value || null)}
        options={DURATION_BANDS.map((band) => ({
          value: band,
          label: DURATION_LABELS[band],
        }))}
      />
      <FilterSelect
        id={`${idPrefix}-season`}
        label="Season"
        value={params.get("season") ?? ""}
        onChange={(value) => set("season", value || null)}
        options={SEASONS.map((season) => ({
          value: season,
          label: SEASON_LABELS[season],
        }))}
      />
    </div>
  );
}

function FilterChips() {
  const { selectedList, toggleList } = useExploreQuery();

  return (
    <div className="space-y-5">
      <ChipGroup
        legend="Travel style"
        values={TRAVEL_STYLES.map((style) => ({
          value: style,
          label: STYLE_LABELS[style],
        }))}
        selected={selectedList("style")}
        onToggle={(value) => toggleList("style", value)}
      />
      <ChipGroup
        legend="Activities"
        values={TRAVEL_STYLES.map((style) => ({
          value: style,
          label: STYLE_LABELS[style],
        }))}
        selected={selectedList("activity")}
        onToggle={(value) => toggleList("activity", value)}
      />
    </div>
  );
}

function FilterFields({ idPrefix }: { idPrefix: string }) {
  return (
    <div className="space-y-6">
      <FilterSelects idPrefix={idPrefix} />
      <FilterChips />
    </div>
  );
}

function CategoryNav() {
  const { selectedList, setExclusive, set } = useExploreQuery();
  const selected = selectedList("type");

  return (
    <nav aria-label="Destination types" className="-mx-1 overflow-x-auto px-1">
      <ul className="flex min-w-max gap-1.5 pb-1">
        <li>
          <button
            type="button"
            onClick={() => set("type", null)}
            aria-current={selected.length === 0 ? "true" : undefined}
            className={cn(
              "min-h-10 rounded-sm px-3.5 text-sm transition-colors duration-150",
              selected.length === 0
                ? "bg-foreground text-background"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            All
          </button>
        </li>
        {DESTINATION_TYPES.map((type) => {
          const active = selected.includes(type);
          return (
            <li key={type}>
              <button
                type="button"
                onClick={() => setExclusive("type", type)}
                aria-pressed={active}
                className={cn(
                  "min-h-10 rounded-sm px-3.5 text-sm transition-colors duration-150",
                  active
                    ? "bg-foreground text-background"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {DESTINATION_TYPE_LABELS[type]}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

function ActiveFilterChips() {
  const { params, selectedList, removeValue, clearFilters, hasFilters } =
    useExploreQuery();

  if (!hasFilters) return null;

  const chips: { key: string; value?: string; label: string }[] = [];

  const region = params.get("region");
  if (region && region in REGION_LABELS) {
    chips.push({
      key: "region",
      label: REGION_LABELS[region as keyof typeof REGION_LABELS],
    });
  }
  const budget = params.get("budget");
  if (budget && budget in BUDGET_LABELS) {
    chips.push({
      key: "budget",
      label: BUDGET_LABELS[budget as keyof typeof BUDGET_LABELS],
    });
  }
  const duration = params.get("duration");
  if (duration && duration in DURATION_LABELS) {
    chips.push({
      key: "duration",
      label: DURATION_LABELS[duration as keyof typeof DURATION_LABELS],
    });
  }
  const season = params.get("season");
  if (season && season in SEASON_LABELS) {
    chips.push({
      key: "season",
      label: SEASON_LABELS[season as keyof typeof SEASON_LABELS],
    });
  }
  selectedList("style").forEach((value) => {
    if (value in STYLE_LABELS) {
      chips.push({
        key: "style",
        value,
        label: STYLE_LABELS[value as keyof typeof STYLE_LABELS],
      });
    }
  });
  selectedList("activity").forEach((value) => {
    if (value in STYLE_LABELS) {
      chips.push({
        key: "activity",
        value,
        label: `Activity: ${STYLE_LABELS[value as keyof typeof STYLE_LABELS]}`,
      });
    }
  });
  selectedList("type").forEach((value) => {
    if (value in DESTINATION_TYPE_LABELS) {
      chips.push({
        key: "type",
        value,
        label: DESTINATION_TYPE_LABELS[value as keyof typeof DESTINATION_TYPE_LABELS],
      });
    }
  });

  return (
    <div className="flex flex-wrap items-center gap-2">
      {chips.map((chip) => (
        <button
          key={`${chip.key}-${chip.value ?? chip.label}`}
          type="button"
          onClick={() => removeValue(chip.key, chip.value)}
          className="border-border hover:border-foreground/40 inline-flex min-h-8 items-center gap-1.5 rounded-sm border px-2.5 text-xs transition-colors duration-150"
        >
          {chip.label}
          <X className="size-3" aria-hidden="true" />
          <span className="sr-only">Remove {chip.label} filter</span>
        </button>
      ))}
      <button
        type="button"
        onClick={clearFilters}
        className="text-muted-foreground hover:text-foreground text-xs underline-offset-4 hover:underline"
      >
        Clear all
      </button>
    </div>
  );
}

function SortControl({ id }: { id: string }) {
  const { params, set } = useExploreQuery();

  return (
    <div className="flex min-w-0 items-center gap-2">
      <label
        htmlFor={id}
        className="text-muted-foreground shrink-0 text-[0.65rem] font-medium tracking-[0.16em] uppercase"
      >
        Sort
      </label>
      <select
        id={id}
        value={params.get("sort") ?? "featured"}
        onChange={(event) =>
          set("sort", event.target.value === "featured" ? null : event.target.value)
        }
        className="border-input bg-background h-10 min-w-0 rounded-md border px-3 text-sm outline-none transition-colors duration-150 focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
      >
        {SORT_OPTIONS.map((sort) => (
          <option key={sort} value={sort}>
            {SORT_LABELS[sort]}
          </option>
        ))}
      </select>
    </div>
  );
}

export function ExploreToolbar({ resultCount }: { resultCount: number }) {
  const { filterCount, hasFilters, isNarrowed, clearFilters } = useExploreQuery();

  return (
    <div className="space-y-6">
      <CategoryNav />

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm" aria-live="polite">
          <span className="font-medium">{resultCount}</span>
          <span className="text-muted-foreground">
            {resultCount === 1 ? " destination" : " destinations"}
            {isNarrowed ? " match" : " in the catalog"}
          </span>
        </p>

        <div className="flex items-center gap-2">
          <Sheet>
            <SheetTrigger
              className={cn(
                buttonVariants({ variant: "outline" }),
                "lg:hidden",
              )}
            >
              <SlidersHorizontal className="size-4" />
              Filters
              {filterCount > 0 ? (
                <span className="bg-primary text-primary-foreground ml-1 inline-flex size-5 items-center justify-center rounded-sm text-[0.65rem]">
                  {filterCount}
                </span>
              ) : null}
            </SheetTrigger>
            <SheetContent
              side="right"
              className="bg-background w-[min(100%,24rem)] gap-0 p-0"
            >
              <SheetHeader className="border-border border-b px-5 py-5">
                <SheetTitle className="font-display text-2xl">Filters</SheetTitle>
                <SheetDescription>
                  Narrow the catalog. Nothing here checks live availability.
                </SheetDescription>
              </SheetHeader>
              <div className="min-h-0 flex-1 overflow-y-auto px-5 py-6">
                <FilterFields idPrefix="mobile-filter" />
              </div>
              <SheetFooter className="border-border border-t">
                {hasFilters ? (
                  <Button type="button" variant="ghost" onClick={clearFilters}>
                    Clear filters
                  </Button>
                ) : null}
                <SheetClose render={<Button />}>Show results</SheetClose>
              </SheetFooter>
            </SheetContent>
          </Sheet>

          <SortControl id="explore-sort" />
        </div>
      </div>

      <ActiveFilterChips />

      <div className="hidden space-y-5 lg:block">
        <FilterSelects idPrefix="desktop-filter" />
        <FilterChips />
        {hasFilters ? (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={clearFilters}
          >
            Clear filters
          </Button>
        ) : null}
      </div>
    </div>
  );
}
