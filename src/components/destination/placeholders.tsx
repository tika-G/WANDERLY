import { CloudSun, Map } from "lucide-react";

import { isMapsConfigured, isWeatherConfigured } from "@/lib/integrations";
import type { Destination } from "@/lib/types";

export function WeatherPlaceholder({
  destination,
}: {
  destination: Destination;
}) {
  const enabled = isWeatherConfigured();

  return (
    <section className="border-border rounded-sm border px-5 py-5">
      <p className="text-terracotta text-[0.65rem] tracking-[0.18em] uppercase">
        Weather
      </p>
      <div className="mt-3 flex items-start gap-3">
        <CloudSun className="text-muted-foreground mt-0.5 size-5 shrink-0" aria-hidden="true" />
        <div>
          <h2 className="font-display text-xl">Typical season, not a forecast</h2>
          {enabled ? (
            <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
              A live forecast will appear here once the weather service is
              wired.
            </p>
          ) : (
            <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
              {destination.bestTime} Live conditions are not connected in this
              phase.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}

export function MapPlaceholder({ destination }: { destination: Destination }) {
  const enabled = isMapsConfigured();

  return (
    <section className="border-border rounded-sm border px-5 py-5">
      <p className="text-terracotta text-[0.65rem] tracking-[0.18em] uppercase">
        Map
      </p>
      <div className="mt-3 flex items-start gap-3">
        <Map className="text-muted-foreground mt-0.5 size-5 shrink-0" aria-hidden="true" />
        <div>
          <h2 className="font-display text-xl">Coordinates, not a map yet</h2>
          <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
            {destination.name} sits at {destination.coordinates.lat.toFixed(2)},{" "}
            {destination.coordinates.lng.toFixed(2)}.{" "}
            {enabled
              ? "A map will render here once geocoding is connected."
              : "An interactive map is not connected yet."}
          </p>
        </div>
      </div>
    </section>
  );
}
