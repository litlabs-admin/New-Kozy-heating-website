"use client";

import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import type { LegalSection } from "@/lib/legal-content";

type Props = {
  sections: LegalSection[];
  /** Optional control rendered beneath the navigation, inside the card. */
  footer?: React.ReactNode;
};

const ITEM_HEIGHT = 32; // Must match the li height of a nav item below.

/** Clearance for the sticky header. Pairs with `scroll-mt-24` on each section. */
const HEADER_OFFSET = 100;

/** How close to the page end counts as "at the bottom". */
const BOTTOM_SLACK = 120;

/**
 * Sticky table of contents with scroll-spy.
 *
 * Desktop: a rail whose primary-coloured marker slides to the active section.
 * Mobile: a <details> disclosure, so the contents are reachable rather than
 * hidden entirely.
 */
export function SectionNav({ sections, footer }: Props) {
  const [activeId, setActiveId] = useState(sections[0]?.id ?? "");
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const elements = sections
      .map((s) => document.getElementById(s.id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    // The heading you are reading is the last one to have passed under the
    // sticky header. Deriving it from live positions (rather than from which
    // entries happen to be intersecting) keeps the highlight exact after an
    // anchor jump, where the target sits right on the band edge.
    const update = () => {
      // A short final section can never reach the top of the viewport, so once
      // the page is scrolled to the end, it is the one being read.
      const atBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - BOTTOM_SLACK;

      if (atBottom) {
        setActiveId(elements[elements.length - 1].id);
        return;
      }

      let current = elements[0];
      for (const el of elements) {
        if (el.getBoundingClientRect().top <= HEADER_OFFSET) current = el;
        else break;
      }
      setActiveId(current.id);
    };

    // The observer is only a cheap trigger; it fires as sections cross the
    // band, and `update` does the actual work.
    const observer = new IntersectionObserver(update, {
      rootMargin: `-${HEADER_OFFSET}px 0px -60% 0px`,
      threshold: 0,
    });

    elements.forEach((el) => observer.observe(el));
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    update();

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [sections]);

  const activeIndex = Math.max(
    0,
    sections.findIndex((s) => s.id === activeId),
  );
  const activeLabel = sections[activeIndex]?.label ?? "";

  const closeMobile = () => setMobileOpen(false);

  const items = (onSelect?: () => void) => (
    <ul className="relative flex flex-col">
      {/* Rail */}
      <span
        aria-hidden="true"
        className="absolute left-0 top-0 w-0.5 rounded-full bg-border"
        style={{ height: `${sections.length * ITEM_HEIGHT}px` }}
      />
      {/* Marker */}
      <span
        aria-hidden="true"
        className="absolute left-0 w-0.5 rounded-full bg-primary transition-transform duration-300 ease-out"
        style={{
          height: `${ITEM_HEIGHT}px`,
          transform: `translateY(${activeIndex * ITEM_HEIGHT}px)`,
        }}
      />
      {sections.map((section) => {
        const active = section.id === activeId;
        return (
          <li key={section.id} style={{ height: `${ITEM_HEIGHT}px` }}>
            <a
              href={`#${section.id}`}
              aria-current={active ? "true" : undefined}
              onClick={onSelect}
              className={`flex h-full items-center pl-4 text-sm transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${
                active
                  ? "font-semibold text-primary"
                  : "text-muted hover:text-primary"
              }`}
            >
              {section.label}
            </a>
          </li>
        );
      })}
    </ul>
  );

  return (
    <>
      {/* Mobile */}
      <details
        open={mobileOpen}
        onToggle={(e) => setMobileOpen(e.currentTarget.open)}
        className="group mb-8 rounded-2xl border border-border bg-white shadow-sm lg:hidden"
      >
        <summary className="flex cursor-pointer items-center justify-between gap-3 px-5 py-4 [&::-webkit-details-marker]:hidden">
          <span className="min-w-0">
            <span className="block font-heading text-xs font-semibold uppercase tracking-wider text-foreground">
              On this page
            </span>
            <span className="mt-0.5 block truncate text-sm text-muted">
              {activeLabel}
            </span>
          </span>
          <ChevronDown
            size={18}
            aria-hidden="true"
            className="shrink-0 text-muted transition-transform duration-200 group-open:rotate-180"
          />
        </summary>
        <nav
          aria-label="On this page"
          className="border-t border-border px-5 py-4"
        >
          {items(closeMobile)}
          {footer && (
            <div className="mt-5 border-t border-border pt-5">{footer}</div>
          )}
        </nav>
      </details>

      {/* Desktop */}
      <div className="sticky top-24 hidden h-fit rounded-2xl border border-border bg-white p-6 shadow-sm lg:block">
        <h2 className="mb-4 border-b border-border pb-3 font-heading text-xs font-semibold uppercase tracking-wider text-foreground">
          On this page
        </h2>
        <nav aria-label="On this page">{items()}</nav>
        {footer && (
          <div className="mt-6 border-t border-border pt-5">{footer}</div>
        )}
      </div>
    </>
  );
}
