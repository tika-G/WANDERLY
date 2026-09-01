import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function EmptyState({
  title,
  description,
  action,
  actionLabel,
  actionHref,
}: {
  title: string;
  description: string;
  action?: React.ReactNode;
  actionLabel?: string;
  actionHref?: string;
}) {
  const resolvedAction =
    action ??
    (actionLabel && actionHref ? (
      <Link href={actionHref} className={cn(buttonVariants({ size: "lg" }))}>
        {actionLabel}
      </Link>
    ) : null);

  return (
    <div className="border-border bg-card rounded-sm border px-6 py-16 text-center">
      <h2 className="font-display text-2xl">{title}</h2>
      <p className="text-muted-foreground mx-auto mt-3 max-w-md text-sm leading-relaxed">
        {description}
      </p>
      {resolvedAction ? <div className="mt-6">{resolvedAction}</div> : null}
    </div>
  );
}
