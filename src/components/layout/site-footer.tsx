import Link from "next/link";
import { Compass } from "lucide-react";

import { PageContainer } from "@/components/shared/page-container";
import { NAV_LINKS, SITE_NAME, SITE_TAGLINE } from "@/lib/constants";

export function SiteFooter() {
  return (
    <footer className="border-border mt-20 border-t sm:mt-28">
      <PageContainer className="py-14 sm:py-20">
        <div className="grid gap-12 md:grid-cols-[1.6fr_1fr_1fr]">
          <div>
            <Link href="/" className="inline-flex items-center gap-2.5">
              <Compass className="text-primary size-5" aria-hidden="true" />
              <span className="font-display text-2xl tracking-tight">
                {SITE_NAME}
              </span>
            </Link>
            <p className="text-muted-foreground mt-5 max-w-sm text-sm leading-relaxed">
              {SITE_TAGLINE} A quieter way to find places, sketch a trip, and
              keep the ones that matter — on this device, for now.
            </p>
          </div>

          <div>
            <p className="text-terracotta text-[0.65rem] tracking-[0.18em] uppercase">
              Explore
            </p>
            <ul className="mt-4 space-y-2.5">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="hover:text-foreground text-muted-foreground text-sm transition-colors duration-150"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-terracotta text-[0.65rem] tracking-[0.18em] uppercase">
              Later
            </p>
            <ul className="text-muted-foreground mt-4 space-y-2.5 text-sm leading-relaxed">
              <li>Accounts and cloud-synced trips</li>
              <li>Live weather and maps</li>
              <li>An AI travel assistant</li>
            </ul>
          </div>
        </div>

        <p className="text-muted-foreground mt-14 border-t pt-6 text-xs">
          © 2026 {SITE_NAME}. Editorial mock catalog — not a booking engine.
        </p>
      </PageContainer>
    </footer>
  );
}
