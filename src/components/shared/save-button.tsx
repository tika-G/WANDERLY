"use client";

import { Heart } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useAppState } from "@/providers/app-state-provider";
import type { SavedItemType } from "@/lib/types";
import { cn } from "@/lib/utils";

export function SaveButton({
  type,
  id,
  label,
  className,
}: {
  type: SavedItemType;
  id: string;
  label: string;
  className?: string;
}) {
  const { isSaved, toggleSaved } = useAppState();
  const saved = isSaved(type, id);

  return (
    <Button
      type="button"
      variant={saved ? "default" : "outline"}
      size="sm"
      className={cn("gap-2", className)}
      aria-pressed={saved}
      aria-label={saved ? `Remove ${label} from saved` : `Save ${label}`}
      onClick={() => toggleSaved(type, id)}
    >
      <Heart className={cn("size-3.5", saved && "fill-current")} />
      {saved ? "Saved" : "Save"}
    </Button>
  );
}
