import type { Metadata } from "next";
import { Fraunces, Geist } from "next/font/google";

import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { SkipToContent } from "@/components/shared/page-container";
import { SITE_NAME, SITE_TAGLINE } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { AppStateProvider } from "@/providers/app-state-provider";

import "./globals.css";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  axes: ["SOFT", "WONK"],
});

export const metadata: Metadata = {
  title: {
    default: SITE_NAME,
    template: `%s · ${SITE_NAME}`,
  },
  description: SITE_TAGLINE,
  applicationName: SITE_NAME,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={cn("font-sans", geist.variable, fraunces.variable)}
    >
      <body className="flex min-h-dvh flex-col">
        <AppStateProvider>
          <SkipToContent />
          <SiteHeader />
          <div id="main-content" className="flex-1">
            {children}
          </div>
          <SiteFooter />
        </AppStateProvider>
      </body>
    </html>
  );
}
