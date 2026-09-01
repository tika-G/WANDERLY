"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useId, useState } from "react";
import { Minus, Plus, Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

function Field({
  id,
  label,
  children,
  className,
}: {
  id: string;
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("min-w-0 px-4 py-3 sm:px-5 sm:py-3.5", className)}>
      <Label
        htmlFor={id}
        className="text-muted-foreground text-[0.65rem] font-medium tracking-[0.16em] uppercase"
      >
        {label}
      </Label>
      <div className="mt-1.5">{children}</div>
    </div>
  );
}

const ghostInput =
  "h-9 border-0 bg-transparent px-0 shadow-none md:text-sm focus-visible:ring-0 focus-visible:border-transparent";

export function DestinationSearch({
  defaultQuery = "",
  defaultStart = "",
  defaultEnd = "",
  defaultTravelers = "2",
  variant = "hero",
}: {
  defaultQuery?: string;
  defaultStart?: string;
  defaultEnd?: string;
  defaultTravelers?: string;
  variant?: "hero" | "toolbar";
}) {
  const router = useRouter();
  const uid = useId();
  const [query, setQuery] = useState(defaultQuery);
  const [start, setStart] = useState(defaultStart);
  const [end, setEnd] = useState(defaultEnd);
  const [travelers, setTravelers] = useState(defaultTravelers);

  const destinationId = `${uid}-destination`;
  const startId = `${uid}-start`;
  const endId = `${uid}-end`;
  const travelersId = `${uid}-travelers`;

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const params = new URLSearchParams();
    if (query.trim()) params.set("q", query.trim());
    if (start) params.set("start", start);
    if (end) params.set("end", end);
    if (travelers) params.set("travelers", travelers);
    const qs = params.toString();
    router.push(qs ? `/explore?${qs}` : "/explore");
  }

  const count = Math.min(12, Math.max(1, Number(travelers) || 1));

  return (
    <form
      role="search"
      aria-label="Search destinations"
      onSubmit={onSubmit}
      className={cn(
        "border-border bg-card overflow-hidden rounded-md border",
        variant === "hero"
          ? "shadow-[0_18px_50px_-20px_rgba(28,25,23,0.45)]"
          : "shadow-none",
      )}
    >
      <div
        className={cn(
          "flex flex-col lg:flex-row lg:items-stretch",
          variant === "toolbar" && "lg:flex-row",
        )}
      >
        <Field id={destinationId} label="Where" className="lg:flex-[1.4]">
          <Input
            id={destinationId}
            name="q"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Kyoto, Lisbon, Patagonia…"
            autoComplete="off"
            className={ghostInput}
          />
        </Field>

        <div
          className="bg-border hidden w-px self-stretch lg:my-3 lg:block"
          aria-hidden="true"
        />
        <div className="bg-border h-px lg:hidden" aria-hidden="true" />

        <Field id={startId} label="Start" className="lg:flex-1">
          <Input
            id={startId}
            name="start"
            type="date"
            value={start}
            onChange={(event) => setStart(event.target.value)}
            className={cn(ghostInput, "min-w-0 scheme-light")}
          />
        </Field>

        <div
          className="bg-border hidden w-px self-stretch lg:my-3 lg:block"
          aria-hidden="true"
        />
        <div className="bg-border h-px lg:hidden" aria-hidden="true" />

        <Field id={endId} label="End" className="lg:flex-1">
          <Input
            id={endId}
            name="end"
            type="date"
            value={end}
            min={start || undefined}
            onChange={(event) => setEnd(event.target.value)}
            className={cn(ghostInput, "min-w-0 scheme-light")}
          />
        </Field>

        <div
          className="bg-border hidden w-px self-stretch lg:my-3 lg:block"
          aria-hidden="true"
        />
        <div className="bg-border h-px lg:hidden" aria-hidden="true" />

        <Field id={travelersId} label="Travelers" className="lg:w-[11.5rem]">
          <div className="flex h-9 items-center justify-between gap-2">
            <button
              type="button"
              className="border-border hover:bg-muted flex size-9 shrink-0 items-center justify-center rounded-sm border transition-colors duration-150 disabled:pointer-events-none disabled:opacity-40"
              aria-label="Fewer travelers"
              disabled={count <= 1}
              onClick={() => setTravelers(String(count - 1))}
            >
              <Minus className="size-3.5" />
            </button>
            <Input
              id={travelersId}
              name="travelers"
              type="number"
              min={1}
              max={12}
              value={String(count)}
              onChange={(event) => setTravelers(event.target.value)}
              className={cn(
                ghostInput,
                "appearance-none text-center [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none",
              )}
              aria-live="polite"
            />
            <button
              type="button"
              className="border-border hover:bg-muted flex size-9 shrink-0 items-center justify-center rounded-sm border transition-colors duration-150 disabled:pointer-events-none disabled:opacity-40"
              aria-label="More travelers"
              disabled={count >= 12}
              onClick={() => setTravelers(String(count + 1))}
            >
              <Plus className="size-3.5" />
            </button>
          </div>
        </Field>

        <div className="p-3 sm:p-3.5 lg:flex lg:p-0">
          <Button
            type="submit"
            size="lg"
            className="h-12 w-full gap-2 rounded-sm lg:h-full lg:min-h-[4.75rem] lg:rounded-none lg:px-8"
          >
            <Search className="size-4" />
            Search
          </Button>
        </div>
      </div>
    </form>
  );
}
