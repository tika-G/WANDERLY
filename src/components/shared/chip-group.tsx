"use client";

import { cn } from "@/lib/utils";

export function ChipGroup({
  legend,
  values,
  selected,
  onToggle,
}: {
  legend: string;
  values: { value: string; label: string }[];
  selected: string[];
  onToggle: (value: string) => void;
}) {
  return (
    <fieldset>
      <legend className="text-muted-foreground mb-2.5 text-[0.65rem] font-medium tracking-[0.16em] uppercase">
        {legend}
      </legend>
      <div className="flex flex-wrap gap-2">
        {values.map((item) => {
          const active = selected.includes(item.value);
          return (
            <button
              key={item.value}
              type="button"
              onClick={() => onToggle(item.value)}
              aria-pressed={active}
              className={cn(
                "min-h-9 rounded-sm border px-2.5 text-[0.8125rem] transition-colors duration-150",
                active
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-background text-foreground hover:border-foreground/35",
              )}
            >
              {item.label}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}
