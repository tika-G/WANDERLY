"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Compass, Menu } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { NAV_LINKS, SITE_NAME, SITE_TAGLINE } from "@/lib/constants";
import { cn } from "@/lib/utils";

function isActivePath(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

function NavLinks({
  onNavigate,
  className,
  variant = "desktop",
}: {
  onNavigate?: () => void;
  className?: string;
  variant?: "desktop" | "mobile";
}) {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Primary"
      className={cn(
        variant === "desktop"
          ? "flex items-center gap-0.5"
          : "flex flex-col gap-1",
        className,
      )}
    >
      {NAV_LINKS.map((link) => {
        const active = isActivePath(pathname, link.href);
        return (
          <Link
            key={link.href}
            href={link.href}
            onClick={onNavigate}
            className={cn(
              "relative rounded-sm transition-colors duration-150",
              variant === "desktop"
                ? "px-3 py-2 text-sm"
                : "min-h-11 px-1 py-3 font-display text-2xl tracking-tight",
              active
                ? "text-foreground"
                : "text-muted-foreground hover:text-foreground",
            )}
            aria-current={active ? "page" : undefined}
          >
            {link.label}
            {active ? (
              <span
                aria-hidden="true"
                className={cn(
                  "bg-terracotta absolute",
                  variant === "desktop"
                    ? "inset-x-3 -bottom-px h-px"
                    : "bottom-2 left-1 h-px w-6",
                )}
              />
            ) : null}
          </Link>
        );
      })}
    </nav>
  );
}

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="border-border/80 bg-background/92 sticky top-0 z-40 border-b backdrop-blur-sm">
      <div className="page-wrap flex h-16 items-center justify-between gap-4 sm:h-[4.25rem]">
        <Link
          href="/"
          className="group flex items-center gap-2.5 rounded-sm py-1"
          aria-current={pathname === "/" ? "page" : undefined}
        >
          <Compass
            className="text-primary size-[1.15rem] transition-transform duration-200 group-hover:rotate-45 motion-reduce:transition-none motion-reduce:group-hover:rotate-0"
            aria-hidden="true"
          />
          <span className="font-display text-[1.35rem] leading-none tracking-tight">
            {SITE_NAME}
          </span>
        </Link>

        <NavLinks className="hidden md:flex" />

        <div className="flex items-center gap-2">
          <Link
            href="/trips"
            className={cn(
              buttonVariants({ size: "sm" }),
              "hidden min-h-10 px-3.5 sm:inline-flex",
            )}
          >
            Plan a trip
          </Link>

          <Sheet key={pathname}>
            <SheetTrigger
              className={cn(
                buttonVariants({ variant: "outline", size: "icon" }),
                "md:hidden",
              )}
              aria-label="Open menu"
            >
              <Menu className="size-4" />
            </SheetTrigger>
            <SheetContent
              side="right"
              className="bg-background w-[min(100%,22rem)] gap-0 p-0"
            >
              <SheetHeader className="border-border border-b px-5 py-5">
                <SheetTitle className="font-display text-2xl">
                  {SITE_NAME}
                </SheetTitle>
                <p className="text-muted-foreground mt-1 text-sm">
                  {SITE_TAGLINE}
                </p>
              </SheetHeader>
              <div className="flex h-full flex-1 flex-col px-5 py-6">
                <NavLinks variant="mobile" />
                <Link
                  href="/trips"
                  className={cn(
                    buttonVariants({ size: "lg" }),
                    "mt-auto w-full",
                  )}
                >
                  Plan a trip
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
