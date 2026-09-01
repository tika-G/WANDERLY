"use client";

import { FormEvent, useState } from "react";

import { ChipGroup } from "@/components/shared/chip-group";
import { PageContainer } from "@/components/shared/page-container";
import { PageHeader } from "@/components/shared/page-header";
import { PageLoading } from "@/components/shared/page-loading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { STYLE_LABELS, TRAVEL_STYLES } from "@/lib/constants";
import { formatDate } from "@/lib/dates";
import type { LocalProfile, TravelStyle } from "@/lib/types";
import { useAppState } from "@/providers/app-state-provider";

function ProfileForm({ initial }: { initial: LocalProfile | null }) {
  const { updateProfile, profile } = useAppState();
  const [displayName, setDisplayName] = useState(initial?.displayName ?? "");
  const [homeCity, setHomeCity] = useState(initial?.homeCity ?? "");
  const [notes, setNotes] = useState(initial?.notes ?? "");
  const [styles, setStyles] = useState<TravelStyle[]>(
    initial?.travelStyles ?? [],
  );
  const [saved, setSaved] = useState(false);

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    updateProfile({
      displayName: displayName.trim(),
      homeCity: homeCity.trim(),
      notes,
      travelStyles: styles,
    });
    setSaved(true);
  }

  const lastSaved = profile?.updatedAt
    ? formatDate(profile.updatedAt.slice(0, 10))
    : null;

  return (
    <form onSubmit={onSubmit} className="mt-10 max-w-xl space-y-6">
      <div className="space-y-1.5">
        <Label htmlFor="profile-name">Display name</Label>
        <Input
          id="profile-name"
          className="h-10"
          value={displayName}
          onChange={(event) => {
            setDisplayName(event.target.value);
            setSaved(false);
          }}
          placeholder="How you want to be addressed"
          autoComplete="name"
        />
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="profile-city">Home city</Label>
        <Input
          id="profile-city"
          className="h-10"
          value={homeCity}
          onChange={(event) => {
            setHomeCity(event.target.value);
            setSaved(false);
          }}
          placeholder="Lisbon, Kyoto, nowhere in particular"
          autoComplete="address-level2"
        />
      </div>
      <ChipGroup
        legend="Travel styles"
        values={TRAVEL_STYLES.map((style) => ({
          value: style,
          label: STYLE_LABELS[style],
        }))}
        selected={styles}
        onToggle={(value) => {
          const style = value as TravelStyle;
          setSaved(false);
          setStyles((current) =>
            current.includes(style)
              ? current.filter((item) => item !== style)
              : [...current, style],
          );
        }}
      />
      <div className="space-y-1.5">
        <Label htmlFor="profile-notes">Notes</Label>
        <Textarea
          id="profile-notes"
          value={notes}
          onChange={(event) => {
            setNotes(event.target.value);
            setSaved(false);
          }}
          placeholder="Dietary needs, pace, who you travel with."
          rows={5}
        />
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <Button type="submit" size="lg">
          Save on this device
        </Button>
        {saved ? (
          <p className="text-sm" role="status">
            Saved on this device.
          </p>
        ) : lastSaved ? (
          <p className="text-muted-foreground text-sm">
            Last saved {lastSaved}
          </p>
        ) : null}
      </div>
    </form>
  );
}

export default function ProfilePage() {
  const { profile, hydrated } = useAppState();

  if (!hydrated) {
    return <PageLoading cards={0} />;
  }

  return (
    <main className="py-12 sm:py-16">
      <PageContainer>
        <PageHeader
          eyebrow="Profile"
          title="A traveler note, not an account"
          description="This stays in this browser. There is no login, email, or cloud backup in this version."
        />

        <aside className="border-border bg-card mt-8 max-w-xl rounded-sm border px-4 py-3 text-sm leading-relaxed">
          Until authentication exists, this profile is device-local. Clearing
          site data, switching browsers, or using another phone will not bring
          it with you.
        </aside>

        <ProfileForm key="ready" initial={profile} />
      </PageContainer>
    </main>
  );
}
