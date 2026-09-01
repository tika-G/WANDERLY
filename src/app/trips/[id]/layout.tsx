import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Trip planner",
};

export default function TripPlannerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
