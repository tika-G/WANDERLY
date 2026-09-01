import { PageContainer } from "@/components/shared/page-container";

export default function DestinationLoading() {
  return (
    <main className="py-10 sm:py-14">
      <PageContainer>
        <div className="bg-muted h-3 w-24 animate-pulse rounded-sm" />
        <div className="bg-muted mt-6 h-14 w-1/2 animate-pulse rounded-sm" />
        <div className="bg-muted mt-8 aspect-[16/10] animate-pulse rounded-sm" />
        <div className="mt-10 grid gap-4 sm:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="bg-muted h-12 animate-pulse rounded-sm" />
          ))}
        </div>
      </PageContainer>
    </main>
  );
}
