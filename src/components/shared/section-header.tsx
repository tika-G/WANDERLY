import { cn } from "@/lib/utils";

export function SectionHeader({
  eyebrow,
  title,
  description,
  action,
  className,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "mb-10 flex flex-col gap-5 sm:mb-12 sm:flex-row sm:items-end sm:justify-between",
        className,
      )}
    >
      <div className="max-w-2xl">
        {eyebrow ? (
          <p className="text-terracotta mb-3 text-[0.65rem] tracking-[0.2em] uppercase">
            {eyebrow}
          </p>
        ) : null}
        <h2 className="font-display text-[1.85rem] leading-[1.15] text-pretty sm:text-4xl lg:text-[2.5rem]">
          {title}
        </h2>
        {description ? (
          <p className="text-muted-foreground mt-3 max-w-xl text-[0.95rem] leading-relaxed text-pretty">
            {description}
          </p>
        ) : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}
