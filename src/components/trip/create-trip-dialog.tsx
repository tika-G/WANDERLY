"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { CreateTripForm } from "@/components/trip/create-trip-form";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export function CreateTripDialog({
  triggerLabel = "Create a trip",
  destinationSlug,
  defaultStart = "",
  defaultEnd = "",
  defaultTravelers = 2,
  triggerVariant = "default",
  triggerClassName,
  redirectOnCreate = true,
}: {
  triggerLabel?: string;
  destinationSlug?: string;
  defaultStart?: string;
  defaultEnd?: string;
  defaultTravelers?: number;
  triggerVariant?: "default" | "secondary" | "outline";
  triggerClassName?: string;
  redirectOnCreate?: boolean;
}) {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        setOpen(Boolean(next));
      }}
    >
      <DialogTrigger
        render={
          <Button
            size="lg"
            variant={triggerVariant}
            className={triggerClassName}
          />
        }
      >
        {triggerLabel}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-display text-2xl">
            Create a trip
          </DialogTitle>
          <DialogDescription>
            Saved on this device. Cloud sync arrives with accounts in a later
            phase.
          </DialogDescription>
        </DialogHeader>
        <CreateTripForm
          destinationSlug={destinationSlug}
          defaultStart={defaultStart}
          defaultEnd={defaultEnd}
          defaultTravelers={defaultTravelers}
          onCreated={(trip) => {
            setOpen(false);
            if (redirectOnCreate) router.push(`/trips/${trip.id}`);
          }}
        />
      </DialogContent>
    </Dialog>
  );
}
