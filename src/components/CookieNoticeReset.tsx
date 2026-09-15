"use client";

import { RotateCcw } from "lucide-react";
import { reset } from "@/lib/cookie-notice";

type Props = {
  className?: string;
  /** Compact styling for use inline in prose. */
  variant?: "button" | "link";
};

/** Clears the stored dismissal, which brings the cookie notice back. */
export function CookieNoticeReset({ className = "", variant = "button" }: Props) {
  const onClick = () => {
    reset();
    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
  };

  const classes =
    variant === "link"
      ? "inline-flex items-center gap-2 text-sm font-medium text-primary underline underline-offset-2 transition-colors hover:text-primary-dark"
      : "inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-primary-dark hover:shadow-lg hover:shadow-primary/25 active:translate-y-0 active:scale-[0.97]";

  return (
    <button
      type="button"
      onClick={onClick}
      className={`${classes} focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${className}`}
    >
      <RotateCcw size={15} aria-hidden="true" />
      Show the cookie notice again
    </button>
  );
}
