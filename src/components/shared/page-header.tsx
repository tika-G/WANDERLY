import { cn } from "@/lib/utils";

export function PageHeader({
  eyebrow,
  title,
  description,
  action,
  className,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
}) {
  return (
    <header
      className={cn(
        "flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between",
        className,
      )}
    >
      <div className="max-w-2xl">
        <p className="text-terracotta text-[0.65rem] tracking-[0.2em] uppercase">
          {eyebrow}
        </p>
        <h1 className="font-display mt-3 text-4xl leading-[1.1] text-pretty sm:text-5xl lg:text-[3.25rem]">
          {title}
        </h1>
        {description ? (
          <p className="text-muted-foreground mt-4 max-w-xl text-[0.95rem] leading-relaxed text-pretty">
            {description}
          </p>
        ) : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </header>
  );
}
