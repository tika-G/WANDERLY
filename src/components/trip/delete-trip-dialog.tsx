"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useAppState } from "@/providers/app-state-provider";

export function DeleteTripDialog({
  tripId,
  tripTitle,
}: {
  tripId: string;
  tripTitle: string;
}) {
  const router = useRouter();
  const { deleteTrip } = useAppState();
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={(next) => setOpen(Boolean(next))}>
      <DialogTrigger
        render={<Button variant="destructive" />}
      >
        Delete trip
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-display text-2xl">
            Delete “{tripTitle}”?
          </DialogTitle>
          <DialogDescription>
            This only removes the trip from this browser. Nothing is booked, and
            there is no cloud copy to restore.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="gap-2 sm:justify-end">
          <Button type="button" variant="outline" onClick={() => setOpen(false)}>
            Keep trip
          </Button>
          <Button
            type="button"
            variant="destructive"
            onClick={() => {
              deleteTrip(tripId);
              setOpen(false);
              router.push("/trips");
            }}
          >
            Delete trip
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
