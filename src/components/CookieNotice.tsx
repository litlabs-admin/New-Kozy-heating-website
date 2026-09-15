"use client";

import { useEffect, useSyncExternalStore } from "react";
import Link from "next/link";
import { Cookie } from "lucide-react";
import {
  acknowledge,
  getServerSnapshot,
  getSnapshot,
  subscribe,
} from "@/lib/cookie-notice";

/**
 * A plain notice, not a consent gate.
 *
 * The site runs nothing optional, so there is no "reject" — offering one would
 * imply a control that blocks something. See src/lib/cookie-notice.ts.
 *
 * It is a region rather than a dialog: it does not trap focus and does not
 * block the page, so it never gets in the way of reading the site.
 */
export function CookieNotice() {
  const acknowledged = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );

  useEffect(() => {
    if (acknowledged) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") acknowledge();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [acknowledged]);

  if (acknowledged) return null;

  return (
    <div
      role="region"
      aria-label="Cookie notice"
      className="fixed inset-x-0 bottom-0 z-50 p-3 print:hidden sm:p-5"
    >
      <div className="animate-fade-in-up mx-auto flex max-w-4xl flex-col gap-4 rounded-2xl border border-border bg-white p-5 shadow-lg sm:flex-row sm:items-center sm:gap-6">
        <span
          aria-hidden="true"
          className="hidden h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary-light text-primary sm:inline-flex"
        >
          <Cookie size={20} />
        </span>

        <p className="flex-1 text-sm leading-relaxed text-muted">
          This site uses no analytics, advertising or tracking cookies. We only
          store a note in your browser so this message does not appear again,
          and our contact form uses a spam check that sets one short-lived
          security cookie.{" "}
          <Link
            href="/cookies"
            className="font-medium text-primary underline underline-offset-2 hover:text-primary-dark"
          >
            Read our cookie policy
          </Link>
          .
        </p>

        <button
          type="button"
          onClick={acknowledge}
          className="inline-flex w-full items-center justify-center gap-2 whitespace-nowrap rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-primary-dark hover:shadow-lg hover:shadow-primary/25 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary active:translate-y-0 active:scale-[0.97] sm:w-auto"
        >
          Got it
        </button>
      </div>
    </div>
  );
}
