"use client";

import { PageContainer } from "@/components/shared/page-container";
import { Button } from "@/components/ui/button";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="py-24">
      <PageContainer className="text-center">
        <h1 className="font-display text-4xl">Something came off the rails</h1>
        <p className="text-muted-foreground mx-auto mt-4 max-w-md text-sm">
          {error.message || "An unexpected error occurred."}
        </p>
        <Button className="mt-8" size="lg" onClick={reset}>
          Try again
        </Button>
      </PageContainer>
    </main>
  );
}
