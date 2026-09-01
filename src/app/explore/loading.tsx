import { PageContainer } from "@/components/shared/page-container";

export default function ExploreLoading() {
  return (
    <main className="py-12 sm:py-16">
      <PageContainer>
        <div className="bg-muted h-3 w-24 animate-pulse rounded-sm" />
        <div className="bg-muted mt-4 h-12 w-2/3 max-w-xl animate-pulse rounded-sm" />
        <div className="bg-muted mt-10 h-24 animate-pulse rounded-md" />
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="space-y-3">
              <div className="bg-muted aspect-[4/3] animate-pulse rounded-sm" />
              <div className="bg-muted h-7 w-1/2 animate-pulse rounded-sm" />
              <div className="bg-muted h-4 w-5/6 animate-pulse rounded-sm" />
            </div>
          ))}
        </div>
      </PageContainer>
    </main>
  );
}
