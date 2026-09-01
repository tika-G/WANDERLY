import Link from "next/link";

import { DestinationCard } from "@/components/cards/destination-card";
import { ExperienceCard } from "@/components/cards/experience-card";
import { PageContainer } from "@/components/shared/page-container";
import { RemoteImage } from "@/components/shared/remote-image";
import { SectionHeader } from "@/components/shared/section-header";
import { DestinationSearch } from "@/components/search/destination-search";
import { CreateTripDialog } from "@/components/trip/create-trip-dialog";
import { buttonVariants } from "@/components/ui/button";
import {
  getDestinationBySlug,
  getFeaturedDestinations,
} from "@/data/destinations";
import { getPopularExperiences } from "@/data/experiences";
import { inspirationStories } from "@/data/inspiration";
import { SITE_TAGLINE } from "@/lib/constants";
import { cn } from "@/lib/utils";

export default function HomePage() {
  const featured = getFeaturedDestinations();
  const experiences = getPopularExperiences(6);
  const lead = featured[0];
  const supporting = featured.slice(1, 4);

  return (
    <main>
      <section className="relative isolate min-h-[calc(100svh-4rem)] sm:min-h-[calc(100svh-4.25rem)]">
        <div className="absolute inset-0">
          <RemoteImage
            imageId="photo-1506905925346-21bda4d32df4"
            alt="Snow ridges above a cloud inversion at first light"
            size="hero"
            priority
            sizes="100vw"
            className="object-[center_40%]"
          />
          <div
            className="absolute inset-0 bg-[linear-gradient(to_top,rgba(28,25,23,0.82)_0%,rgba(28,25,23,0.32)_48%,rgba(28,25,23,0.2)_100%)]"
            aria-hidden="true"
          />
        </div>
        <PageContainer className="relative flex min-h-[calc(100svh-4rem)] flex-col justify-end pb-8 pt-10 sm:min-h-[calc(100svh-4.25rem)] sm:pb-12 sm:pt-16">
          <p className="text-[0.65rem] tracking-[0.22em] text-white/75 uppercase">
            Southern Alps
          </p>
          <span
            className="bg-terracotta mt-3 block h-px w-8"
            aria-hidden="true"
          />
          <h1 className="font-display mt-5 max-w-3xl text-[2.35rem] leading-[1.05] text-pretty text-white sm:text-6xl lg:text-[4.25rem]">
            {SITE_TAGLINE}
          </h1>
          <p className="mt-5 max-w-md text-sm leading-relaxed text-white/80 sm:max-w-lg sm:text-base">
            Destinations with a point of view. Sketch a trip, save what you
            want to return to, and ignore the rest.
          </p>
          <div className="mt-8 w-full max-w-5xl sm:mt-10">
            <DestinationSearch />
          </div>
        </PageContainer>
      </section>

      <PageContainer className="mt-16 sm:mt-24 lg:mt-28">
        <SectionHeader
          eyebrow="Featured"
          title="Places that hold their own"
          description="A short list, written as if you might actually go. Not a ranking."
          action={
            <Link
              href="/explore"
              className={cn(buttonVariants({ variant: "outline", size: "lg" }))}
            >
              All destinations
            </Link>
          }
        />
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-x-10 lg:gap-y-16">
          {lead ? (
            <div className="lg:col-span-7">
              <DestinationCard destination={lead} featured priority />
            </div>
          ) : null}
          {supporting[0] ? (
            <div className="lg:col-span-5 lg:mt-16">
              <DestinationCard
                destination={supporting[0]}
                featured
                portrait
                priority
              />
            </div>
          ) : null}
          {supporting.slice(1).map((destination) => (
            <div key={destination.slug} className="lg:col-span-6">
              <DestinationCard destination={destination} />
            </div>
          ))}
        </div>
      </PageContainer>

      <PageContainer className="mt-20 sm:mt-28 lg:mt-32">
        <SectionHeader
          eyebrow="Experiences"
          title="Days worth putting on the itinerary"
          description="Walks, meals, and one or two things that require a reservation. Prices are estimates."
        />
        <div className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {experiences.map((experience) => (
            <ExperienceCard key={experience.id} experience={experience} />
          ))}
        </div>
      </PageContainer>

      <PageContainer className="mt-20 sm:mt-28 lg:mt-32">
        <SectionHeader
          eyebrow="Notes from the road"
          title="How to travel these places without collecting them"
        />
        <div className="grid gap-10 md:grid-cols-2 md:gap-12">
          {inspirationStories.map((story) => {
            const destination = getDestinationBySlug(story.destinationSlug);
            return (
              <Link
                key={story.id}
                href={`/destinations/${story.destinationSlug}`}
                className="group rounded-sm"
              >
                <div className="relative aspect-[16/9] overflow-hidden rounded-sm">
                  <RemoteImage
                    imageId={story.imageId}
                    alt={story.title}
                    size="card"
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="motion-safe:transition-transform motion-safe:duration-500 motion-safe:group-hover:scale-[1.04]"
                  />
                  <div
                    className="absolute inset-0 bg-[linear-gradient(to_top,rgba(28,25,23,0.28)_0%,transparent_50%)]"
                    aria-hidden="true"
                  />
                </div>
                {destination ? (
                  <p className="text-terracotta mt-4 text-[0.65rem] tracking-[0.18em] uppercase">
                    {destination.name}
                  </p>
                ) : null}
                <h3 className="font-display mt-2 text-2xl leading-snug text-pretty transition-colors duration-150 group-hover:text-primary sm:text-[1.75rem]">
                  {story.title}
                </h3>
                <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
                  {story.excerpt}
                </p>
              </Link>
            );
          })}
        </div>
      </PageContainer>

      <section className="bg-primary text-primary-foreground mt-20 sm:mt-28 lg:mt-32">
        <PageContainer className="py-16 sm:py-20 lg:py-24">
          <h2 className="font-display max-w-2xl text-3xl leading-tight sm:text-5xl">
            Make a trip before the tabs pile up.
          </h2>
          <p className="mt-5 max-w-xl text-sm leading-relaxed text-primary-foreground/75 sm:text-base">
            Name the dates, set a budget you actually mean, and add places as
            you find them. It stays on this device until accounts exist.
          </p>
          <div className="mt-8">
            <CreateTripDialog
              triggerLabel="Start a trip"
              triggerVariant="secondary"
              triggerClassName="bg-background text-primary hover:bg-background/90"
            />
          </div>
        </PageContainer>
      </section>
    </main>
  );
}
