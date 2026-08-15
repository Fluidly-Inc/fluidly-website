import type { Metadata } from "next";
import { ErrorShell } from "@/components/layout/ErrorShell";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <ErrorShell
      code="404"
      title="This page moved, or never existed."
      message="The link may be broken or the page may have been taken down. Let's get you back on track."
    />
  );
}
