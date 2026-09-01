"use client";

import { Label } from "@/components/ui/label";

export { ChipGroup } from "@/components/shared/chip-group";

export function FilterSelect({
  id,
  label,
  value,
  onChange,
  options,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <div className="min-w-0 space-y-1.5">
      <Label
        htmlFor={id}
        className="text-muted-foreground text-[0.65rem] font-medium tracking-[0.16em] uppercase"
      >
        {label}
      </Label>
      <select
        id={id}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="border-input bg-background h-10 w-full rounded-md border px-3 text-sm outline-none transition-colors duration-150 focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
      >
        <option value="">Any</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
