import { cn } from "@/lib/utils";

export function PageContainer({
  children,
  className,
  as: Tag = "div",
}: {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "section" | "main";
}) {
  return <Tag className={cn("page-wrap", className)}>{children}</Tag>;
}

export function SkipToContent() {
  return (
    <a
      href="#main-content"
      className="bg-primary text-primary-foreground focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-100 sr-only rounded-md px-4 py-2"
    >
      Skip to content
    </a>
  );
}
