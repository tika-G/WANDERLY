import { PageContainer } from "@/components/shared/page-container";

export default function Loading() {
  return (
    <main className="py-16">
      <PageContainer>
        <div className="bg-muted h-8 w-40 animate-pulse rounded" />
        <div className="bg-muted mt-4 h-12 w-2/3 max-w-xl animate-pulse rounded" />
        <div className="bg-muted mt-10 h-64 animate-pulse rounded-lg" />
      </PageContainer>
    </main>
  );
}
