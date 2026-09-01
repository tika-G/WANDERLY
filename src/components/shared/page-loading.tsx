import { PageContainer } from "@/components/shared/page-container";

export function PageLoading({
  cards = 4,
  detail = false,
}: {
  cards?: number;
  detail?: boolean;
}) {
  return (
    <main className="py-12 sm:py-16">
      <PageContainer>
        <div className="bg-muted h-3 w-24 animate-pulse rounded-sm" />
        <div className="bg-muted mt-4 h-12 w-2/3 max-w-xl animate-pulse rounded-sm" />
        <div className="bg-muted mt-4 h-4 w-full max-w-lg animate-pulse rounded-sm" />
        {detail ? (
          <>
            <div className="bg-muted mt-10 h-28 animate-pulse rounded-sm" />
            <div className="bg-muted mt-6 h-20 animate-pulse rounded-sm" />
          </>
        ) : null}
        {cards > 0 ? (
          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {Array.from({ length: cards }).map((_, index) => (
              <div key={index} className="space-y-3">
                <div className="bg-muted aspect-[16/10] animate-pulse rounded-sm" />
                <div className="bg-muted h-6 w-1/2 animate-pulse rounded-sm" />
                <div className="bg-muted h-4 w-5/6 animate-pulse rounded-sm" />
              </div>
            ))}
          </div>
        ) : (
          <div className="mt-10 max-w-xl space-y-4">
            <div className="bg-muted h-10 animate-pulse rounded-sm" />
            <div className="bg-muted h-10 animate-pulse rounded-sm" />
            <div className="bg-muted h-24 animate-pulse rounded-sm" />
          </div>
        )}
      </PageContainer>
    </main>
  );
}
