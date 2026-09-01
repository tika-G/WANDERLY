import Link from "next/link";

import { PageContainer } from "@/components/shared/page-container";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function NotFound() {
  return (
    <main className="py-24">
      <PageContainer className="text-center">
        <p className="text-muted-foreground text-xs tracking-[0.18em] uppercase">
          404
        </p>
        <h1 className="font-display mt-3 text-4xl">That page is not on the map</h1>
        <p className="text-muted-foreground mx-auto mt-4 max-w-md text-sm">
          The link may be old, or the destination is not in this catalog.
        </p>
        <Link
          href="/explore"
          className={cn(buttonVariants({ size: "lg" }), "mt-8")}
        >
          Browse destinations
        </Link>
      </PageContainer>
    </main>
  );
}
