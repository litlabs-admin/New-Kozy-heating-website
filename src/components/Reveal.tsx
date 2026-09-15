"use client";

import { useEffect, useRef, useState } from "react";
import type { ElementType, ReactNode } from "react";

type RevealVariant = "up" | "left" | "right" | "fade";

const variantClass: Record<RevealVariant, string> = {
  up: "",
  left: "kz-reveal-left",
  right: "kz-reveal-right",
  fade: "kz-reveal-fade",
};

type Props = {
  children: ReactNode;
  as?: ElementType;
  variant?: RevealVariant;
  /** Milliseconds, applied as transition-delay. Use for manual stagger. */
  delay?: number;
  className?: string;
};

/**
 * Reveals its children once when scrolled into view.
 *
 * CSS-driven — the observer only flips a data attribute, so there is no
 * animation dependency and the reduced-motion rules in globals.css win
 * automatically.
 */
export function Reveal({
  children,
  as: Tag = "div",
  variant = "up",
  delay,
  className = "",
}: Props) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.disconnect();
            break;
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      data-reveal={visible ? "in" : "out"}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
      className={`kz-reveal ${variantClass[variant]} ${className}`}
    >
      {children}
    </Tag>
  );
}
