import type { Metadata } from "next";
import Link from "next/link";

import { PageContainer } from "@/components/shared/page-container";
import { PageHeader } from "@/components/shared/page-header";
import { buttonVariants } from "@/components/ui/button";
import { SITE_NAME, SITE_TAGLINE } from "@/lib/constants";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "About",
  description: `${SITE_NAME} is a quieter way to find places and sketch a trip. ${SITE_TAGLINE}`,
};

export default function AboutPage() {
  return (
    <main className="py-12 sm:py-16">
      <PageContainer>
        <PageHeader
          eyebrow="About"
          title={`${SITE_NAME} is for the trip you will still talk about.`}
          description={SITE_TAGLINE}
        />

        <div className="mt-10 max-w-2xl space-y-5 text-base leading-relaxed">
          <p>
            Most travel sites are a grid of interchangeable cards and a search
            bar that pretends the world is inventory. Wanderly is slower on
            purpose: a short catalog, written in full sentences, with enough
            structure to plan days without turning the week into a spreadsheet.
          </p>
          <p>
            This version is a frontend. Destinations, places, and experiences
            are an editorial mock catalog. Trips, saves, and a simple profile
            live in your browser. There is no account, no booking, no live
            weather, and no map — those belong later, without changing the bones
            of the product.
          </p>
        </div>

        <div className="mt-14 grid gap-10 md:grid-cols-2">
          <section className="max-w-md">
            <h2 className="font-display text-2xl">What you can do now</h2>
            <ul className="text-muted-foreground mt-4 space-y-2.5 text-sm leading-relaxed">
              <li>Browse twelve destinations, with places and experiences</li>
              <li>Filter and search the catalog</li>
              <li>Save what you want to return to, on this device</li>
              <li>Sketch a trip with dates, a budget, and a day-by-day list</li>
              <li>Keep a local traveler note — not a login</li>
            </ul>
          </section>
          <section className="max-w-md">
            <h2 className="font-display text-2xl">Not in this version</h2>
            <ul className="text-muted-foreground mt-4 space-y-2.5 text-sm leading-relaxed">
              <li>Accounts, cloud sync, or booking</li>
              <li>Live maps, weather, or availability</li>
              <li>An AI travel assistant</li>
              <li>Invented reviews, rankings, or company lore</li>
            </ul>
          </section>
        </div>

        <div className="mt-12 flex flex-wrap gap-3">
          <Link href="/explore" className={cn(buttonVariants({ size: "lg" }))}>
            Explore the catalog
          </Link>
          <Link
            href="/trips"
            className={cn(buttonVariants({ variant: "outline", size: "lg" }))}
          >
            Plan a trip
          </Link>
        </div>
      </PageContainer>
    </main>
  );
}
